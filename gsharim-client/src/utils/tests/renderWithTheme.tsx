import { RenderResult, render } from "@testing-library/react";
import { ThemeWrapper } from "./themeWrapper";
import { routerRender } from "./render";

export function renderWithTheme(component: JSX.Element): RenderResult {
	const ThemeWrapperInstance = ThemeWrapper(component);

	return render(ThemeWrapperInstance);
}

export function routerRenderWithTheme(component: JSX.Element): RenderResult {
	const ThemeWrapperInstance = ThemeWrapper(component);
	return routerRender(ThemeWrapperInstance);
}
