import { useTranslation } from "react-i18next";

interface TextProps {
	textToTranslate: string;
}

function Text({ textToTranslate }: TextProps): JSX.Element {
	const { t } = useTranslation();

	return <>{t(textToTranslate)}</>;
}

export default Text;
