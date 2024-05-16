import { Box } from "@mui/material";
import { render } from "@testing-library/react";
import React from "react";
import * as styles from "./testStyles";
import { calcItemFullWidth } from "./utils";

describe("calcItemFullWidth function check", () => {
	test("check item with no margin-right", () => {
		const itemRef = React.createRef<Element>();
		render(<Box sx={styles.noMarginRight} ref={itemRef} />);
		if (itemRef.current) {
			const calculatedItemFullWidth = calcItemFullWidth(itemRef?.current);
			expect(calculatedItemFullWidth).toEqual(34);
		}
	});

	test("check item with no margin-left", () => {
		const itemRef = React.createRef<Element>();
		render(<Box sx={styles.noMarginLeft} ref={itemRef} />);
		if (itemRef.current) {
			const calculatedItemFullWidth = calcItemFullWidth(itemRef?.current);
			expect(calculatedItemFullWidth).toEqual(34);
		}
	});

	test("check item with all properties", () => {
		const itemRef = React.createRef<Element>();
		render(<Box sx={styles.allProperties} ref={itemRef} />);
		if (itemRef.current) {
			const calculatedItemFullWidth = calcItemFullWidth(itemRef?.current);
			expect(calculatedItemFullWidth).toEqual(44);
		}
	});

	test("check item with all properties", () => {
		const itemRef = React.createRef<Element>();
		render(<Box sx={styles.stylesWithComma} ref={itemRef} />);
		if (itemRef.current) {
			const calculatedItemFullWidth = calcItemFullWidth(itemRef?.current);
			expect(calculatedItemFullWidth).toEqual(34.58);
		}
	});
});
