import { useRouter } from "next/router";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { Heading, Text, VStack } from "@chakra-ui/react";

import Layout from "../components/Layout";
import { useAppDispatch } from "../redux/hooks";
import { addFiles } from "../redux/slices/upload";

const Index = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();

	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			dispatch(
				addFiles(
					acceptedFiles.map(file => ({
						name: file.name,
						size: file.size,
						type: file.type,
						url: URL.createObjectURL(file),
					}))
				)
			);
			router.push("/configure");
		},
		[dispatch]
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	return (
		<Layout title="snips.to &middot; upload">
			<VStack
				{...getRootProps()}
				border="5px dashed rgba(255,255,255,0.1)"
				padding={50}
				minHeight={400}
				width="100%"
				justifyContent="center"
				_hover={isDragActive ? { bg: "rgba(255,255,255,1)" } : {}}
			>
				<input {...getInputProps()} />
				{isDragActive ? (
					<>
						<Heading>Release to upload!</Heading>
						<Text>Alternatively, you can click here to upload them manually.</Text>
					</>
				) : (
					<>
						<Heading>Drop your files here</Heading>
						<Text>Alternatively, you can click here to upload them manually.</Text>
					</>
				)}
			</VStack>
		</Layout>
	);
};

export default Index;
