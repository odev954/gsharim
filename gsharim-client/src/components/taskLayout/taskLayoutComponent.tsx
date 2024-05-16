import { Box } from "@mui/material";
import { ILayout } from "@eco8200/data-models";
import * as styles from "./styles";
import { LayoutProps } from "./layouts/types";

type TaskLayoutComponentProps = {
	LayoutComponent: React.FC<LayoutProps>;
	layout: ILayout;
	children: JSX.Element[];
};

export default function TaskLayoutComponent({
	children,
	layout,
	LayoutComponent,
}: TaskLayoutComponentProps): JSX.Element {
	return (
		<Box sx={styles.layoutContainer}>
			<LayoutComponent layout={layout}>{children}</LayoutComponent>
		</Box>
	);
}
