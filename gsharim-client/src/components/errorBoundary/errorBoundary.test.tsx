import { screen } from "@testing-library/react";
import { Box, Avatar } from "@mui/material";
import { AccessAlarm } from "@mui/icons-material";
import { remoteLogger, consoleLogger } from "utils/logger";
import { renderWithTheme } from "utils/tests/renderWithTheme";
import { describe, vi, it, beforeAll, beforeEach, expect } from "vitest";
import { errorBoundaryWrapper } from "utils/errorBoundary";

function ThrowErrorComponent(): JSX.Element {
	const condition = true;
	if (condition) throw new Error("some very bad error");
	const childText = "this will never be shown tra la la la la ";
	return <div>{childText}</div>;
}

function NoErrorComponent(): JSX.Element {
	const childText1 = "This text should be rendered correctly";
	const childText2 = "this is the text that is rendered after the avatar";
	return (
		<Box data-testid="container">
			{childText1}
			<Avatar>
				<AccessAlarm />
			</Avatar>
			{childText2}
		</Box>
	);
}

describe("test the error boundary", () => {
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

	it("make sure that the exception is cought", () => {
		const ErrorBoundaryComponent = errorBoundaryWrapper(ThrowErrorComponent, {
			errorTextTitleKey: "some error text title",
			errorTextKey: "some error text",
		});
		renderWithTheme(<ErrorBoundaryComponent />);
		expect(remoteLogger.error).toBeCalledTimes(1);
		expect(consoleLogger.error).toBeCalledTimes(1);
	});

	it("make sure that the Title and texts are rendered", () => {
		const errorText = "this is the text";
		const errorTextTitle = "this is the title";
		const ErrorBoundaryComponent = errorBoundaryWrapper(ThrowErrorComponent, {
			errorTextTitleKey: errorTextTitle,
			errorTextKey: errorText,
		});

		renderWithTheme(<ErrorBoundaryComponent />);

		const textElement = screen.getByText(errorText);
		const titleElement = screen.getByText(errorTextTitle);

		expect(textElement).toBeInTheDocument();
		expect(titleElement).toBeInTheDocument();
	});

	it("make sure that if the component doesn't raise an error, then it is rendered correctly", () => {
		/*
		this test will compare the html of the component that is wrapped and the unwrapped and make sure that 
		they are the same.
		*/
		renderWithTheme(<NoErrorComponent />);
		const WrappedComponent = errorBoundaryWrapper(NoErrorComponent, {
			errorTextTitleKey: "some error text title",
			errorTextKey: "some error text",
		});
		renderWithTheme(<WrappedComponent />);
		const headNodeWrapped = screen.queryAllByTestId("container");
		const firstHtmlElement = headNodeWrapped[0].innerHTML;
		const seocndHtmlElement = headNodeWrapped[1].innerHTML;
		expect(firstHtmlElement).toEqual(seocndHtmlElement);
	});
});
