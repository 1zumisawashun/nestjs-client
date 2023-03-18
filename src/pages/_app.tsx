import "../styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import axios from "axios";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { apolloClient } from "graphql/apollo-client";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  axios.defaults.withCredentials = true; // cookieのやりとりをするときはこれをtrueにする必要がある

  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/csrf`
      );
      console.log(data, "data");
      axios.defaults.headers.common["csrf-token"] = data.csrfToken;
    };
    getCsrfToken();
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: "dark",
            fontFamily: "Verdana, sans-serif",
          }}
        >
          <Component {...pageProps} />
        </MantineProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ApolloProvider>
  );
}

export default MyApp;
