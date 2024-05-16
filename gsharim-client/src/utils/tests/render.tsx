import { RenderResult, render } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";

export function routerRender(component: JSX.Element): RenderResult {
	return render(<Router>{component}</Router>);
}
