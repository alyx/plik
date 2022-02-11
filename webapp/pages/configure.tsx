import { useRouter } from "next/router";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

import {
	Button, Checkbox, Collapse, Divider, FormControl, FormHelperText, FormLabel,
	HStack, Input, StackDivider, Textarea, VStack
} from "@chakra-ui/react";

import Layout from "../components/Layout";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { UploadConfig } from "../redux/slices/upload";
import { wait } from "../utils/wait";

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
	if (files.length === 0) {
		router.push("/");
	}

	const upload = useCallback(async (config: UploadConfig) => {
		await wait(5e3);
		router.push("/success");
	}, []);

	return (
		<Layout title="snips.to &middot; configure" height="100vh">
			<form onSubmit={handleSubmit(upload)}>
				<VStack height="100%" spacing={5}>
					<Divider />
					<VStack height="50vh" overflow={"scroll"} spacing={5} width="90%">
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

						<Collapse
							in={passwordProtected && !isSubmitting}
							animateOpacity
							style={{
								width: "100%",
								background: "rgba(255,255,255,0.1)",
								padding: 10,
								borderBottomLeftRadius: 5,
								borderBottomRightRadius: 5,
							}}
							startingHeight={0}
							endingHeight={90}
						>
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
						</Collapse>
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
					<Input
						as={Button}
						type="submit"
						variant="filled"
						height={50}
						style={{ marginBottom: 50 }}
						isLoading={isSubmitting}
						disabled={isSubmitting}
					>
						Upload
					</Input>
				</VStack>
			</form>
		</Layout>
	);
}
