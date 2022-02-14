import { useRouter } from "next/router";

import { Button, Code, Heading, HStack, Text, VStack } from "@chakra-ui/react";

import { WithTitle } from "../components/WithTitle";

export default function Error() {
	const router = useRouter();

	return (
		<WithTitle title="snips.to &middot; error">
			<VStack spacing={10}>
				<VStack>
					<Heading>Uh oh!</Heading>
					<Text>
						An error was encountered while trying to upload your files. You can try
						uploading your files again, or you can return to the upload configuration
						page.
					</Text>
				</VStack>
				<HStack>
					<Button size="lg" onClick={() => router.push("/upload")} colorScheme="green">
						Retry
					</Button>
					<Button size="lg" onClick={() => router.push("/configure")}>
						Return to Configuration
					</Button>
				</HStack>
				<VStack>
					<Text>For the developers:</Text>
					<Code color="colors.gray.200">NetworkError</Code>
				</VStack>
			</VStack>
		</WithTitle>
	);
}
