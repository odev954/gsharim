import { useTranslation } from "react-i18next";
import { createTheme, ThemeProvider } from "@mui/material";
import { languagesLocale } from "utils/translation/languagesLocale";
import { heIL } from "@mui/material/locale";
import { ThemeProviderProps } from "@mui/system";

export function LocalizedThemeProvider(
	themeProviderProps: ThemeProviderProps
): JSX.Element {
	const { i18n } = useTranslation();
	const localizedTheme = createTheme(
		{ ...themeProviderProps.theme, direction: i18n.dir(i18n.language) },
		languagesLocale[i18n.language] || heIL
	);

	return (
		<ThemeProvider {...themeProviderProps} theme={localizedTheme}>
			{themeProviderProps.children}
		</ThemeProvider>
	);
}
