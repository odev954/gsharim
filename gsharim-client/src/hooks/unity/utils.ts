import { UnityConfig } from "react-unity-webgl";

export function getRandomQueryId(): number {
	const randomNumbersArray = new Uint16Array(1);
	const queryId = crypto.getRandomValues(randomNumbersArray);

	return queryId[0];
}

export function generateUnityContext(
	gameUrl: string,
	gameName: string
): UnityConfig {
	return {
		loaderUrl: `${gameUrl}/${gameName}.loader.js`,
		dataUrl: `${gameUrl}/${gameName}.data`,
		frameworkUrl: `${gameUrl}/${gameName}.framework.js`,
		codeUrl: `${gameUrl}/${gameName}.wasm`,
	};
}
