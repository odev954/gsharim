import { useWindowSize } from "usehooks-ts";

export default function useAspectRatio(): number {
	const { width, height } = useWindowSize();
	return width / height;
}
