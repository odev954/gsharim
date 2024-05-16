import { ReactComponent as Waves } from "assets/footer/waveImage.svg";
import { backgroundSvg } from "utils/images";

export function generateWavesBackground(color: string, fill: string): string {
	return backgroundSvg(<Waves color={color} fill={fill} />);
}
