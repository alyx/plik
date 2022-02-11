import { AppProps } from "next/app";
import Head from "next/head";
import { Provider as ReduxProvider } from "react-redux";

import { ChakraProvider } from "@chakra-ui/react";

import { createStore } from "../redux";
import { theme } from "../theme";

const store = createStore({});

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<ReduxProvider store={store}>
				<ChakraProvider theme={theme}>
					<Component {...pageProps} />
				</ChakraProvider>
			</ReduxProvider>
		</>
	);
}
