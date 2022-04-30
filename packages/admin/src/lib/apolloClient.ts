import { useMemo } from "react";
import {
  ApolloClient,
  ApolloLink,
  from,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";

import deepMerge from "deepmerge";
import isEqual from "lodash/isEqual";
import { createUploadLink } from "apollo-upload-client";
import { onError } from "@apollo/client/link/error";
import { IncomingHttpHeaders } from "http";
export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";
import Router from "next/router";
import { Farm } from "@generated/graphql";

let apolloClient: ApolloClient<NormalizedCacheObject>;

interface IApolloStateProps {
  [APOLLO_STATE_PROP_NAME]?: NormalizedCacheObject;
}

const errorLink = onError((errors) => {
  if (
    errors.graphQLErrors &&
    errors.graphQLErrors[0].extensions?.code === "UNAUTHENTICATED" &&
    errors.response
  ) {
    errors.response.errors = undefined;
    Router.replace("/login");
  }
});

function createApolloClient(headers: IncomingHttpHeaders | null = null) {
  const enhancedFetch = (url: RequestInfo, init: RequestInit) => {
    return fetch(url, {
      ...init,
      headers: {
        ...init.headers,
        "Access-Control-Allow-Origin": "*",
        // here we pass the cookie along for each request
        Cookie: headers?.cookie ?? "",
      },
    });
  };


  const uploadLink = createUploadLink({
    uri:
      process.env.NODE_ENV === "production"
        ? ""
        : "http://localhost:4000/graphql",
    credentials: "include",
    fetch: enhancedFetch,
  });

  const links = from([
    errorLink,
    uploadLink as unknown as ApolloLink,
  ]);

  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: links,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            farms: {
              keyArgs: false,
              merge(existing, incoming) {
                // console.log("existing", existing);
                // console.log("incoming", incoming);
                let paginatedFarms: Farm[] = [];

                if (existing && existing.paginatedFarms) {
                  paginatedFarms = paginatedFarms.concat(
                    existing.paginatedFarms
                  );
                }

                if (incoming && incoming.paginatedFarms) {
                  paginatedFarms = paginatedFarms.concat(
                    incoming.paginatedCourses
                  );
                }

                return { ...incoming, paginatedFarms };
              },
            },
          },
        },
      },
    }),
  });
}

export function initializeApollo(
  initialState: NormalizedCacheObject | null = null
) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = deepMerge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function addApolloState(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: { props: IApolloStateProps }
) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(pageProps: IApolloStateProps) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
}
