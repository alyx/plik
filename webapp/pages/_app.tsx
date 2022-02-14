import { AppProps } from "next/app";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { Provider as ReduxProvider } from "react-redux";

import {
	Box, ChakraProvider, Container, ScaleFade, VStack
} from "@chakra-ui/react";

import { ServerHealth } from "../components/ServerHealth";
import { createStore } from "../redux";
import { theme } from "../theme";

const store = createStore({});

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();

	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<style>{`
					body {
						overflow: hidden;
					}
				`}</style>
			</Head>
			<ReduxProvider store={store}>
				<ChakraProvider theme={theme}>
					<ServerHealth />
					<Container textAlign="center" height="100vh">
						<VStack alignItems="center" height="100%">
							<Box maxWidth="64px" maxHeight="64px" width="100%" margin={10}>
								<Image
									src={"/img/icon.svg"}
									alt="snips.to"
									layout="responsive"
									width={64}
									height={64}
								/>
							</Box>
							<ScaleFade
								key={router.route}
								initialScale={0.9}
								in={true}
								style={{ height: "100%" }}
							>
								<Component {...pageProps} />
							</ScaleFade>
						</VStack>
					</Container>
				</ChakraProvider>
			</ReduxProvider>
		</>
	);
}
