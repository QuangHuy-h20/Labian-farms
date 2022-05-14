import Router from "next/router";

export function getErrorMessage(error: any) {
  let processedError = {
    message: "",
    validation: [],
  };

  if (error.graphQLErrors) {
    for (const graphQLError of error.graphQLErrors) {
      if (
        graphQLError.extensions &&
        graphQLError.extensions.category === "validation"
      ) {
        processedError["message"] = graphQLError.message;
        processedError["validation"] = graphQLError.extensions.validation;
        return processedError;
      } else if (
        graphQLError.extensions &&
        graphQLError.extensions.category === "authorization"
      ) {
        Router.push("/");
      }
    }
  }
  processedError["message"] = error.message;
  return processedError;
}
