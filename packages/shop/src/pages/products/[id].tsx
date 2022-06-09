import { getLayout } from "@components/layouts/site-layout";
import { AttributesProvider } from "@components/products/details/attributes.context";
import { useProductQuery } from "@generated/graphql";
import { useWindowSize } from "@lib/use-window-size";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";

const Details = dynamic(() => import("@components/products/details/details"));

// const CartCounterButton = dynamic(
//   () => import("@components/cart/cart-counter-button"),
//   { ssr: false }
// );

export default function ProductPage() {
  const router = useRouter();
  const { data } = useProductQuery({
    variables: {
      id: router.query.id as string,
    },
  });
  const { width } = useWindowSize();

  return (
    <>
      <Head>
        <title>Labian Farms | {data?.product?.name}</title>
      </Head>
      <AttributesProvider>
        <div className="min-h-screen bg-white">
          <Details product={data?.product!} />
        </div>
        {/* {width > 1023 && <CartCounterButton />} */}
      </AttributesProvider>
    </>
  );
}
ProductPage.getLayout = getLayout;
