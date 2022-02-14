import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import {
	Center, Heading, Progress, ScaleFade, Spinner, Text, VStack
} from "@chakra-ui/react";

import { createAndUpload, uploadFileWithMode } from "../api/upload";
import { WithTitle } from "../components/WithTitle";
import { useAppSelector } from "../redux/hooks";

enum UploadState {
	CreateUpload,
	UploadFile,
}

const uploadStateToString = ({
	state,
	current,
	total,
}: {
	state: UploadState;
	current?: number;
	total?: number;
}) => {
	switch (state) {
		case UploadState.CreateUpload:
			return "Creating upload bucket...";
		case UploadState.UploadFile:
			return `Uploading file ${current} of ${total}...`;
		default:
			return "";
	}
};

const getUploadProgress = ({
	state,
	current,
	total,
}: {
	state: UploadState;
	current?: number;
	total?: number;
}) => {
	switch (state) {
		case UploadState.CreateUpload:
			return 5;
		case UploadState.UploadFile:
			return ((current - 1) / total) * 95 + 5;
		default:
			return 0;
	}
};

export default function Upload() {
	const router = useRouter();
	const files = useAppSelector(state => state.upload.files);

	const [state, setState] = useState(UploadState.CreateUpload);
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		(async () => {
			const filesWithReferences = files.map((file, i) => ({
				fileName: file.name,
				fileSize: file.size,
				fileType: file.type,
				reference: `${i}`,
			}));

			const { data } = await createAndUpload({
				files: filesWithReferences,
				// 30 days
				ttl: 30 * 24 * 60 * 60,
			}).catch(() => {
				router.push("/error");
				return { data: null };
			});
			// prevent execution if there was an error
			// TODO: error handling
			if (!data) {
				return;
			}
			// map references to files
			const filesWithId = filesWithReferences.map(file => {
				const uploadedFile = data.files.find(
					uploadedFile => uploadedFile.reference === file.reference
				);
				return { ...file, id: uploadedFile.id };
			});
			// set upload state
			setState(UploadState.UploadFile);
			// iterate through files and upload
			for (const file of filesWithId) {
				setCurrent(current + 1);
				await uploadFileWithMode({
					mode: "file",
					fileName: file.fileName,
					fileId: file.id,
					uploadId: data.uploadId,
					url: data.url,
					uploadToken: data.uploadToken,
				}).catch(console.error);
			}
			// redirect to success
			router.push("/success");
		})();
	}, []);

	if (typeof window !== "undefined" && files.length === 0) {
		router.push("/");
		return <></>;
	}

	return (
		<WithTitle title="snips.to &middot; uploading...">
			<Center height="100%">
				<VStack spacing={50}>
					<VStack spacing={10}>
						<Spinner size="xl"></Spinner>
						<Progress
							minWidth="400px"
							width="100%"
							value={getUploadProgress({ state, current, total: files.length })}
						/>
					</VStack>
					<VStack spacing={1}>
						<Heading size="md">Your files are being uploaded...</Heading>
						<ScaleFade key={state} initialScale={0.9} in={true}>
							<Text>
								{uploadStateToString({ state, current, total: files.length })}
							</Text>
						</ScaleFade>
					</VStack>
				</VStack>
			</Center>
		</WithTitle>
	);
}
