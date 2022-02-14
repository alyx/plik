import { useEffect, useState } from "react";

import { WarningIcon } from "@chakra-ui/icons";
import { Box, ScaleFade, Tooltip } from "@chakra-ui/react";

import { getVersion } from "../api/server";

export const ServerHealth: React.FC = () => {
	const [error, setError] = useState(false);

	useEffect(() => {
		getVersion().catch(err => {
			setError(true);
		});
	}, []);

	return (
		<Box position="absolute" right="0" top="0" padding={5}>
			<ScaleFade in={true}>
				{error && (
					<Tooltip label="There was an error fetching version information from the server. Uploading files may not work correctly!">
						<WarningIcon height="32px" width="32px" color="#ffaaaa" />
					</Tooltip>
				)}
			</ScaleFade>
		</Box>
	);
};
