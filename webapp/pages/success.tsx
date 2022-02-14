import { useRouter } from "next/router";

import { CheckIcon } from "@chakra-ui/icons";
import { Button, Code, Heading, Text, VStack } from "@chakra-ui/react";

import { WithTitle } from "../components/WithTitle";

export default function Success() {
	const router = useRouter();

	return (
		<WithTitle title="snips.to &middot; success">
			<VStack spacing={10}>
				<VStack spacing={2}>
					<CheckIcon
						width={"40px"}
						height={"40px"}
						color="white"
						background="#68D391"
						borderRadius="100%"
						padding={3}
					/>
					<Heading>Success!</Heading>
					<Text>
						Your files were successfully uploaded. You can view them by clicking the
						following link:
					</Text>
					<a href="https://github.com">
						<Code padding={2} marginTop={3}>
							https://snips.to/some-weird/link/goes/here
						</Code>
					</a>
				</VStack>
				<Button onClick={() => router.push("/")}>Upload More</Button>
			</VStack>
		</WithTitle>
	);
}
