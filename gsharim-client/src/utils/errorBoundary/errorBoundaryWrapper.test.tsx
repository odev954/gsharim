import { render, screen } from "@testing-library/react";
import { Box, Avatar } from "@mui/material";
import { remoteLogger, consoleLogger } from "utils/logger";
import { AccessAlarm } from "@mui/icons-material";
import { renderWithTheme } from "utils/tests/renderWithTheme";
import { vi } from "vitest";
import { errorBoundaryWrapper } from ".";

function ThrowErrorComponent(): JSX.Element {
	const condition = true;
	if (condition) throw new Error("some very bad error");
	const stringToRender = "this will never be shown tra la la la la ";
	return <div>{stringToRender}</div>;
}

function NoErrorComponent(): JSX.Element {
	const testString1 = "This text should be rendered correctly";
	const testString2 = "this is the text that is rendered after the avatar";
	return (
		<Box data-testid="container">
			{testString1}
			<Avatar>
				<AccessAlarm />
			</Avatar>
			{testString2}
		</Box>
	);
}

describe("test the error boundary wrapper", () => {
	const mockedRemoteError = vi.fn();
	const mockedConsoleError = vi.fn();

	beforeAll(() => {
		vi.spyOn(console, "error").mockImplementation(vi.fn<[string]>());
		remoteLogger.error = mockedRemoteError;
		consoleLogger.error = mockedConsoleError;
	});

	beforeEach(() => {
		mockedRemoteError.mockReset();
		mockedConsoleError.mockReset();
	});

	test("make sure that the exception is cought", () => {
		const ErrorBoundaryComponent = errorBoundaryWrapper(ThrowErrorComponent, {
			errorTextTitleKey: "some error text title",
			errorTextKey: "some error text",
		});
		renderWithTheme(<ErrorBoundaryComponent />);
		expect(remoteLogger.error).toBeCalledTimes(1);
		expect(consoleLogger.error).toBeCalledTimes(1);
	});

	test("make sure that the Title and texts are rendered", () => {
		const errorText = "this is the text";
		const errorTextTitle = "this is the title";
		const ErrorBoundaryComponent = errorBoundaryWrapper(ThrowErrorComponent, {
			errorTextTitleKey: errorTextTitle,
			errorTextKey: errorText,
		});

		render(<ErrorBoundaryComponent />);

		const textElement = screen.getByText(errorText);
		const titleElement = screen.getByText(errorTextTitle);

		expect(textElement).toBeInTheDocument();
		expect(titleElement).toBeInTheDocument();
	});

	test("make sure that if the component doesn't raise an error, then it is rendered correctly", () => {
		/*
		this test will compare the html of the component that is wrapped and the unwrapped and make sure that 
		they are the same.
		*/
		render(<NoErrorComponent />);
		const WrappedComponent = errorBoundaryWrapper(NoErrorComponent, {
			errorTextTitleKey: "some error text title",
			errorTextKey: "some error text",
		});
		render(<WrappedComponent />);
		const headNodeWrapped = screen.queryAllByTestId("container");
		const firstHtmlElement = headNodeWrapped[0].innerHTML;
		const seocndHtmlElement = headNodeWrapped[1].innerHTML;
		expect(firstHtmlElement).toEqual(seocndHtmlElement);
	});
});
