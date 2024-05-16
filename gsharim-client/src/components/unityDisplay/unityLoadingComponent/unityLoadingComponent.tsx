import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import UnityWatermark from "assets/unity/unityWatermark.avif";
import { container } from "./styles";

interface UnityLoadingComponent {
	loadingProgression: number;
}

export default function UnityLoadingComponent({
	loadingProgression,
}: UnityLoadingComponent): JSX.Element {
	const loadingProgressPercentage = Math.round(loadingProgression * 100);
	return (
		<Box sx={container}>
			<CircularProgress color="secondary" value={loadingProgressPercentage} />
			<Typography
				pt={1}
				variant="caption"
				color="text.secondary"
			>{`${loadingProgressPercentage}%`}</Typography>
			<Box
				position="absolute"
				bottom={0}
				right={4}
				component="img"
				height={64}
				src={UnityWatermark}
			/>
		</Box>
	);
}
