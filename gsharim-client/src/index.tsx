import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "components/authProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CssBaseline } from "@mui/material";
import TagManager from "react-gtm-module";
import { tagManagerArgs } from "utils/googleAnalytics/tagManagerArgs";
import { HelmetProvider } from "react-helmet-async";
import Loader from "components/loading";
import LocalizedThemeProvider from "components/localizedThemeProvider";
import { theme } from "styles/themes/defaultTheme";
import reportWebVitals from "./reportWebVitals";
import App from "./app/App";
import "./utils/translation/i18n";
// send analytics only on production
if (import.meta.env.PROD) {
	TagManager.initialize(tagManagerArgs);
}

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: Infinity,
		},
	},
});

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

root.render(
	<React.StrictMode>
		<Suspense fallback={<Loader isPage />}>
			<HelmetProvider>
				<QueryClientProvider client={queryClient}>
					<LocalizedThemeProvider theme={theme}>
						<AuthProvider>
							<CssBaseline />
							<App />
						</AuthProvider>
					</LocalizedThemeProvider>
				</QueryClientProvider>
			</HelmetProvider>
		</Suspense>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
