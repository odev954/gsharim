import { MouseEventHandler, useCallback, useEffect, useRef } from "react";
import { Box, Menu, MenuItem, Button, Typography } from "@mui/material";
import UserOptionsArrow from "assets/header/userOptionsArrow.svg";
import Language from "assets/header/language.svg";
import { useTranslation } from "react-i18next";
import { useToggle } from "usehooks-ts";
import { map } from "lodash-es";
import moment from "moment";
import * as styles from "./styles";
import { languages } from "./consts";
import { arrowAlt, menuAlt } from "./strings";

export function LanguageMenu(): JSX.Element {
	const { t: translate, i18n } = useTranslation();
	const lngDisplayText = languages[i18n.language] || languages.he;

	const menuPosRef = useRef<HTMLButtonElement>(null);
	const [open, toggleOpen, setOpen] = useToggle();

	const chooseLanguage = useCallback<MouseEventHandler<HTMLLIElement>>(
		(event) => {
			const { lang } = event.currentTarget.dataset;
			i18n.changeLanguage(lang);
			setOpen(false);
		},
		[i18n, setOpen]
	);

	const handleLanguageChanged = useCallback(() => {
		moment.locale(i18n.language);
	}, [i18n]);

	useEffect(() => {
		i18n.on("languageChanged", handleLanguageChanged);
		return () => {
			i18n.off("languageChanged", handleLanguageChanged);
		};
	}, [handleLanguageChanged, i18n]);

	return (
		<Box sx={styles.container}>
			<Box sx={styles.wrapper}>
				<Box
					ref={menuPosRef}
					component={Button}
					sx={styles.languageInformation}
					aria-expanded={open}
					onClick={toggleOpen}
					disableRipple
					endIcon={
						<Box
							component="img"
							src={UserOptionsArrow}
							alt={translate(arrowAlt)}
							sx={styles.leftIcon}
						/>
					}
					startIcon={
						<Box
							component="img"
							src={Language}
							alt={translate(arrowAlt)}
							sx={styles.startIcon}
						/>
					}
				>
					<Typography sx={styles.langName}>{lngDisplayText}</Typography>
				</Box>
				<Menu
					open={open}
					anchorEl={menuPosRef.current}
					variant="menu"
					aria-labelledby={translate(menuAlt)}
					anchorOrigin={styles.anchorOrigin}
					transformOrigin={styles.transformOrigin}
					sx={styles.menuStyles}
					onChange={toggleOpen}
					onClose={toggleOpen}
				>
					{map(languages, (languageDisplayText, langKey) => {
						return (
							<MenuItem
								onClick={chooseLanguage}
								data-lang={langKey}
								key={langKey}
								sx={
									i18n.language === langKey ? styles.selectedItem : styles.item
								}
							>
								{languageDisplayText}
							</MenuItem>
						);
					})}
				</Menu>
			</Box>
		</Box>
	);
}
