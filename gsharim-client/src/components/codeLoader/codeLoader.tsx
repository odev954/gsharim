import { Box } from "@mui/material";
import * as styles from "./styles";
import { Dash } from "./dash";

export function CodeLoader(): JSX.Element {
	return (
		<Box sx={styles.loaderContainer}>
			<Box sx={styles.groupOne}>
				<Box sx={(styles.line, styles.noTabs)}>
					<Dash expand={24} animationDelay="0.1s" />
					<Dash expand={42} animationDelay="0.1s" />
					<Dash expand={66} animationDelay="0.2s" />
					<Dash expand={42} animationDelay="0.3s" />
				</Box>
				<Box sx={[styles.line, styles.oneTab]}>
					<Dash expand={24} animationDelay="0.4s" />
					<Dash expand={42} animationDelay="0.5s" />
					<Dash expand={54} animationDelay="0.6s" />
				</Box>
				<Box sx={[styles.line, styles.twoTabs]}>
					<Dash expand={180} animationDelay="0.7s" />
				</Box>
				<Box sx={[styles.line, styles.twoTabs]}>
					<Dash expand={120} animationDelay="0.8s" />
				</Box>
				<Box sx={[styles.line, styles.oneTab]}>
					<Dash expand={24} animationDelay="0.85s" />
				</Box>
				<Box sx={[styles.line, styles.noTabs]}>
					<Dash expand={24} animationDelay="0.925s" />
				</Box>
			</Box>
			<Box sx={styles.groupTwo}>
				<Box sx={[styles.line, styles.noTabs]}>
					<Dash expand={24} />

					<Dash expand={24} />
					<Dash expand={42} />
					<Dash expand={66} />
					<Dash expand={42} />
				</Box>
				<Box sx={[styles.line, styles.oneTab]}>
					<Dash expand={24} />
					<Dash expand={42} />
					<Dash expand={54} />
				</Box>
				<Box sx={[styles.line, styles.twoTabs]}>
					<Dash expand={180} />
				</Box>
				<Box sx={[styles.line, styles.twoTabs]}>
					<Dash expand={120} />
				</Box>
				<Box sx={[styles.line, styles.oneTab]}>
					<Dash expand={24} />
				</Box>
				<Box sx={[styles.line, styles.noTabs]}>
					<Dash expand={24} />
				</Box>
			</Box>
		</Box>
	);
}
