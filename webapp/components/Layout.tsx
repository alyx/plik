import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";

import { Box, Container, ScaleFade, VStack } from "@chakra-ui/react";

type Props = {
	children?: ReactNode;
	title?: string;
	height?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => {
	const router = useRouter();

	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>
			<Container textAlign="center" height="100vh">
				<VStack alignItems="center" height="100%">
					<Box maxWidth="100px" maxHeight="100px" width="100%" margin={10}>
						<Image
							src={"/img/icon.svg"}
							alt="snips.to"
							layout="responsive"
							width={100}
							height={100}
						/>
					</Box>
					<ScaleFade
						key={router.route}
						initialScale={0.9}
						in={true}
						style={{ height: "100%" }}
					>
						{children}
					</ScaleFade>
				</VStack>
			</Container>
		</>
	);
};

export default Layout;
