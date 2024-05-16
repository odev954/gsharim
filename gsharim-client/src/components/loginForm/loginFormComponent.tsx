import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
import Text from "components/text";
import * as strings from "./strings";
import * as styles from "./styles";

interface LoginFormComponentProps {
	handleLogin: () => void;
}

export function LoginFormComponent({
	handleLogin,
}: LoginFormComponentProps): JSX.Element {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	return (
		<Box sx={isMobile ? styles.mobileContainerBox : styles.containerBox}>
			<Box sx={isMobile ? styles.mobileText : styles.text}>
				<Text textToTranslate={strings.loginTitle} />
				<Box component="br" />
				<Text textToTranslate={strings.loginSubTitle} />
			</Box>

			<Box sx={styles.buttonsContainer}>
				<Button
					disableRipple
					sx={styles.loginButton}
					variant="outlined"
					color="primary"
					onClick={handleLogin}
				>
					<Text textToTranslate={strings.loginButtonText} />
				</Button>
				<Button
					disableRipple
					sx={styles.loginButton}
					variant="outlined"
					color="primary"
					onClick={handleLogin}
				>
					<Text textToTranslate={strings.signUpButtonText} />
				</Button>
			</Box>
		</Box>
	);
}
