import { Box, Paper } from "@mui/material";
import ErrorBoundary from "components/errorBoundary";
import useIsScrollComplete from "hooks/display/useIsScrollComplete";
import { useRef } from "react";
import { SectionType } from "@eco8200/data-models";
import { errorText, errorTextTitle } from "./strings";
import { paperWrapper, sectionContainer, sectionWrapper } from "./styles";
import SectionDoneHeaderComponent from "../sectionDoneHeader";
import Sections from "../sections";

interface SectionContainerProps {
	id: string;
	variant: SectionType;
	isDone: boolean;
	sectionProps: Record<string, unknown>;
}

export default function SectionContainer({
	id,
	variant,
	isDone,
	sectionProps,
}: SectionContainerProps): JSX.Element {
	const sectionRef = useRef(null);
	const { isScrollComplete } = useIsScrollComplete({ ref: sectionRef });
	const Section = Sections[variant];
	return (
		<Box sx={paperWrapper} key={`section-container-${id}`}>
			<Paper sx={sectionWrapper}>
				<Box sx={sectionContainer} ref={sectionRef}>
					<ErrorBoundary
						errorTextKey={errorText}
						errorTextTitleKey={errorTextTitle}
					>
						<SectionDoneHeaderComponent sectionDone={isDone} />
						<Section
							{...sectionProps}
							isScrollComplete={isScrollComplete}
							key={id}
						/>
					</ErrorBoundary>
				</Box>
			</Paper>
		</Box>
	);
}
