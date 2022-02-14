import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import {
	Box, Button, Checkbox, Divider, FormControl, FormHelperText, FormLabel,
	Heading, HStack, Input, StackDivider, Text, Textarea, VStack
} from "@chakra-ui/react";

import Layout from "../components/Layout";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { UploadConfig } from "../redux/slices/upload";

export default function Configure() {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const {
		register,
		handleSubmit,
		watch,
		formState: { isSubmitting },
	} = useForm<UploadConfig>({ mode: "onChange" });

	const destructOnDownload = watch("destructOnDownload");
	const streaming = watch("streaming");
	const passwordProtected = watch("passwordProtected");

	const files = useAppSelector(state => state.upload.files);
	if (typeof window !== "undefined" && files.length === 0) {
		router.push("/");
		return <></>;
	}

	return (
		<Layout title="snips.to &middot; configure" height="100vh">
			<form onSubmit={handleSubmit(() => router.push("/upload"))}>
				<Box marginBottom={5}>
					<Heading size="md">
						You are about to upload {files.length} file{files.length === 1 ? "" : "s"}.
					</Heading>
					<Text color="gray.500">
						You can configure your upload options below, or - alternatively - you can
						add more files to your upload.
					</Text>
				</Box>
				<VStack height="100%" spacing={5}>
					<Divider />
					<VStack height="40vh" overflow={"scroll"} spacing={5} width="90%">
						<FormControl isDisabled={streaming || isSubmitting}>
							<VStack alignItems="start" textAlign="left">
								<HStack>
									<Checkbox
										{...register("destructOnDownload", {
											disabled: streaming || isSubmitting,
										})}
										isDisabled={streaming || isSubmitting}
										isChecked={destructOnDownload || streaming}
									/>
									<FormLabel>Destruct after first download</FormLabel>
								</HStack>
								<FormHelperText>
									When enabled, your file will self-destruct once it is
									downloaded.
								</FormHelperText>
							</VStack>
						</FormControl>
						<Divider />
						<FormControl isDisabled={isSubmitting}>
							<VStack alignItems="start" textAlign="left">
								<HStack>
									<Checkbox
										{...register("streaming", { disabled: isSubmitting })}
										isDisabled={isSubmitting}
									/>
									<FormLabel>Streaming</FormLabel>
								</HStack>
								<FormHelperText>
									When enabled, your upload will not be stored on the server.
									Instead, it will be streamed to the remote user when they begin
									downloading.
								</FormHelperText>
							</VStack>
						</FormControl>
						<Divider />
						<FormControl isDisabled={isSubmitting}>
							<VStack alignItems="start" textAlign="left">
								<HStack>
									<Checkbox
										{...register("removable", { disabled: isSubmitting })}
										isDisabled={isSubmitting}
									/>
									<FormLabel>Removable</FormLabel>
								</HStack>
								<FormHelperText>
									Allow the upload to be manually removed at any given time.
								</FormHelperText>
							</VStack>
						</FormControl>
						<Divider />
						<FormControl isDisabled={isSubmitting}>
							<VStack alignItems="start" textAlign="left">
								<HStack>
									<Checkbox
										{...register("passwordProtected", {
											disabled: isSubmitting,
										})}
										isDisabled={isSubmitting}
									/>
									<FormLabel>Password Protection</FormLabel>
								</HStack>
								<FormHelperText>
									Enable a text-based password protection requirement before
									remote users can download your file.
								</FormHelperText>
							</VStack>
						</FormControl>

						{passwordProtected && (
							<FormControl>
								<VStack alignItems="start" textAlign="left">
									<Input
										type="password"
										{...register("password", { disabled: isSubmitting })}
									/>
									<FormHelperText>
										Your password must be at least 8 characters long.
									</FormHelperText>
								</VStack>
							</FormControl>
						)}
						<Divider />

						<FormControl>
							<VStack alignItems="start" textAlign="left">
								<FormLabel>Comment</FormLabel>
								<Textarea
									{...register("comment", { disabled: isSubmitting })}
									maxLength={256}
								/>
								<FormHelperText>
									Your password must be at least 8 characters long.
								</FormHelperText>
							</VStack>
						</FormControl>

						<StackDivider flex={1}></StackDivider>
					</VStack>
					<Divider />
					<HStack style={{ marginBottom: 50 }} flex={1}>
						<Input
							as={Button}
							type="submit"
							variant="filled"
							height={50}
							isLoading={isSubmitting}
							disabled={isSubmitting}
							colorScheme="green"
						>
							Upload
						</Input>
						<Button
							size="lg"
							paddingLeft={10}
							paddingRight={10}
							onClick={() => router.push("/")}
						>
							Add more
						</Button>
					</HStack>
				</VStack>
			</form>
		</Layout>
	);
}
