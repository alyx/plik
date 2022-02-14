import Head from "next/head";

export const WithTitle: React.FC<{ title: string }> = ({ title, children }) => (
	<>
		<Head>
			<title>{title}</title>
		</Head>
		{children}
	</>
);
