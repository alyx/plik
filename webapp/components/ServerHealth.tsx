import { useEffect, useState } from "react";

import { InfoIcon, WarningIcon } from "@chakra-ui/icons";
import { Box, ScaleFade, Tooltip } from "@chakra-ui/react";

import { getVersion } from "../api/server";

export const ServerHealth: React.FC = () => {
	const [version, setVersion] = useState("");

	useEffect(() => {
		(async () => {
			const version = await getVersion().catch(err => {
				console.error(err);
				return null;
			});
			setVersion(version);
		})();
	}, []);

	return (
		<Box position="absolute" right="0" top="0" padding={5}>
			<ScaleFade in={true}>
				{version === null && (
					<Tooltip label="There was an error fetching version information from the server. Uploading files may not work correctly!">
						<WarningIcon height="32px" width="32px" color="#ffaaaa" />
					</Tooltip>
				)}
				{typeof version === "string" && <InfoIcon height="32px" width="32px" />}
			</ScaleFade>
		</Box>
	);
};
