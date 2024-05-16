import { ThemeProvider } from "@mui/material";
import { theme } from "styles/themes/defaultTheme";

export function ThemeWrapper(children: JSX.Element): JSX.Element {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
