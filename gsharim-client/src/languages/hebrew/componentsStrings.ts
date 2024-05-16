export const componentsStrings = {
	booksLoader: {
		loaderAlt: "טוען",
	},
	courseCatalog: {
		firstTitle: "הקורסים שלי",
		secondTitle: "קטלוג קורסים",
		inProgress: "בתהליך למידה",
		completed: "הושלמו",
		allCourses: "כל הקורסים",
		popularCourses: "פופולאריים",
		newCourses: "חדשים",
		recommendedCourses: "מומלצים",
		myCoursesNoItemsMessage: `אוי, נראה שאין קורס כרגע בלימוד 
ניתן להתחיל ללמוד מקטלוג קורסים המופיע מטה`,
		allCoursesNoItemsMessage: `אוי, נראה שאין קורסים זמינים כרגע`,
	},

	courseListItem: {
		errorTextTitle: "שגיאה",
		errorText: "טעינת קורס נכשלה",
		imageAlt: "תמונת הקורס",
		createdByPrefix: "נוצר על ידי: ",
		startLearning: "התחל קורס",
		continueLearning: "המשך למידה",
		difficulty: "רמה: ",
		includesCertificate: "כולל תעודה",
		studentsNumber: "תלמידים: ",
		hoursPostfix: "שעות",
		minutesPrefix: "ו-",
		minutesPostfix: "דקות",
		recommendedRibbonText: "מומלץ",
		newRibbonText: "חדש",
		courseDetails: {
			time: "משך הקורס",
			courseDescription: "מה נלמד?",
			skills: "כישורים שהקורס יקנה",
		},
	},
	finishCoursePopup: {
		backToCourseCatalog: "בחזרה לקטלוג הקורסים",
		wellDone: "מזל טוב, סיימת את הקורס!",
		text: `הפגנת התמדה, מחויבות וצמא לידע.
המשך בעבודה המצויינת`,
		modalLabel: "חלונית כל הכבוד",
	},
	footer: {
		rightsReserved: "כל הזכויות שמורות לגשרים 2023",
		contact: "יצירת קשר",
		info: "אודות",
		commonQuestions: "שאלות נפוצות",
		courseCatalog: "קטלוג קורסים",
		phoneNumber: "077-12345678",
		emailAddress: "gsharim@idf.il",
	},
	galleryDisplay: {
		errorTextTitle: "שגיאה",
		errorText: "טעינת הגלריה נכשלה",
	},
	gameDataDisplayBar: {
		clockText: "זמן משחק:",
		scoreText: "ניקוד:",
	},
	header: {
		envStatus: {
			production: {
				envText: "אתר בהרצה",
				tooltipText:
					"האתר בהרצה, לכן מידע מסוים עשוי להשתנות. במקרה של תקלה באתר, יש לפנות דרך המייל בתחתית הדף.",
			},
			development: {
				envText: "development",
				tooltipText: "סביבת פיתוח",
			},
			test: {
				envText: "test",
				tooltipText: "סביבת בדיקות",
			},
			staging: {
				envText: "staging",
				tooltipText: "סביבת הצגה",
			},
		},
		systemName: "גשרים",
	},
	iconMenuItem: {
		profileIconOptionAlt: "אייקון פרופיל לבחירה",
	},
	ide: {
		components: {
			apiHints: {
				ApiHintsHeader: "רמזים",
			},
			inputComponent: {
				submitButtonAlt: "כפתור שליחת קלט",
			},
			runControlButtons: {
				loadingText: "טוען",
				runningText: "עצור",
				readyText: "הרץ קוד",
			},
		},
	},
	languageMenu: {
		arrowAlt: "חץ",
		menuAlt: "תפריט שפות",
	},
	lessonBreadCrumbs: {
		breadCrumbsAria: "כותרת השיעור",
	},
	loginForm: {
		loginTitle: "ברוכים הבאים למערכת גשרים",
		loginSubTitle: "לכניסה לאזור הלמידה האישי נא להתחבר",
		loginButtonText: "להתחברות",
		signUpButtonText: "להרשמה",
		errorTextTitle: "שגיאה",
		errorText: "טעינת טופס ההתחברות נכשלה",
	},
	paragraph: {
		errorTextTitle: "שגיאה",
		errorText: "טעינת הפסקה נכשלה",
	},
	question: {
		error: {
			errorComponent: {
				errorText: "אוי, נראה שנתקלנו בשגיאה בטעינה",
				retry: "טעינה מחדש",
			},
			errorPopup: {
				errorText: "אוי, נראה שנתקלנו בשגיאה בשליחת התשובה",
				close: "סגור",
			},
		},
		question: {
			explanation: {
				answerText: "תשובה לא נכונה!",
			},
			buttonSubmit: "שלח תשובה",
		},
		questionLayouts: {
			trueFalseQuestion: {
				correctAnswer: "נכון",
				incorrectAnswer: "לא נכון",
			},
		},
		testQuestion: {
			buttonTestSubmit: "הגשת מבחן",
		},
		buttonNext: "לשאלה הבאה",
		buttonBack: "לשאלה הקודמת",
		questionText: "שאלה",
	},
	questionnaire: {
		questionnaireStart: {
			startQuiz: "התחל שאלון",
			startTest: "התחל מבחן",
		},
		quiz: {
			quizEnd: {
				victoryMessage: "כל הכבוד סיימת את השאלון!",
				buttonBack: "חזור לשאלה האחרונה",
			},
		},
		test: {
			testAnalytics: {
				questionCountText: "מספר שאלות: ",
				gradeText: "ציון: ",
			},
			testEndPopup: {
				title: "הגשה סופית של המבחן",
				submitionWarning:
					"שים לב,\nאתה עומד להגיש את המבחן, לאחר ההגשה לא תוכל לשנות את התשובות שלך.",
				submitAssuranceQuestion: "האם אתה בטוח שברצונך להגיש את המבחן?",
				buttonBack: "חזרה למבחן",
				submitTest: "הגשת מבחן",
			},
		},
	},
	roadmapGraph: {
		finalExerciseButtonTitle: "תרגיל מסכם",
	},
	seo: {
		helmetDefaultTitle: "גשרים | הזדמנויות לעתיד",
		helmetDefaultName: "גשרים | הזדמנויות לעתיד",
		helmetDefaultDescription: `גשרים" הוא פרויקט ייחודי ביחידה 8200 ובחיל החינוך והנוער, בתמיכה של ׳אקו 8200׳, בו עתידים לבנות מערכת חדשנית ללמידה עצמאית עבור תלמידים. קצינים וחיילים מהיחידה יגיעו לתגבר ולעזור לילדים בלימודי הטכנולוגיה בשעות אחר הצהריים, כדי להעצים את הקשר ביניהם לבין החברה, האקדמיה והתעשייה"`,
	},
	tabsGallery: {
		ariaLabel: "קטגוריות",
		errorTextTitle: "שגיאה",
		errorText: "טעינת הגלריה נכשלה",
	},
	taskFooter: {
		finishCourse: "סיים קורס",
		previousTask: "למשימה הקודמת",
		previousLesson: "לשיעור הקודם",
		previousChapter: "לפרק הקודם",
		nextTask: "למשימה הבאה",
		nextLesson: "לשיעור הבא",
		nextChapter: "לפרק הבא",
		coursePage: "לדף הקורס",
	},
	taskLayout: {
		sectionContainer: {
			errorTextTitle: "שגיאה",
			errorText: "טעינת הרכיב נכשלה",
		},
		sections: {
			basketsGameSection: {
				labelChangePopup: {
					popupTitle: "עליך לתפוס כעת",
				},
				welcomeMessage: {
					buttonText: "בואו נתחיל לשחק",
					titleText: "ברוכים הבאים ל״תפוס בסל״!",
					firstLineText:
						"המטרה היא לאסוף את הפריטים הנכונים על מנת לצבור נקודות. ",
					secondLineBoldText: "חשוב להיזהר",
					secondLineText:
						" ולא לאסוף פריטים שאינם מתאימים או לפספס פריטים נכונים. ",
					thirdLineText: "הזיזו את הסל ימינה ושמאלה באמצעות החיצים ",
					rightArrowText: "תזוזה ימינה",
					leftArrowText: "תזוזה שמאלה",
					rightArrowImageAlt: "חץ ימינה",
					leftArrowImageAlt: "חץ שמאלה",
				},
				labelHeader: "עליך לתפוס כעת",
				submitButtonText: "התחל מחדש",
			},
			farmGameSection: {
				hooks: {
					rightFunctionDocString: "זוז ימינה",
					leftFunctionDocString: "זוז שמאלה",
					downFunctionDocString: "זוז למטה",
					upFunctionDocString: "זוז למעלה",
					pickupDropDocString: "להרים ולהריד עצמים",
					interactDocString: "אינטרקציה",
					getCurrentPositionDocString: "מה המיקום הנוכחי בלוח",
					getClosestBucketDocString: "מה המיקום של הדלי הכי קרוב",
					getClosestShovelDocString: "מה המיקום של האת חפירה הקרוב ביותר",
					getClosestFountainDocString: "מה המיקום של הבאר הקרובה ביותר",
					getClosestSoilDocString: "מה המיקום של האדמה הכי קרובה",
					getClosestGrainDocString: "מה המיקום של הזרעים הקרובים ביותר",
				},
			},
			snakeGameSection: {
				submitButtonText: "המשך לשחק",
			},
		},
	},
	usericon: {
		profileIconAlt: "תמונת פרופיל",
	},
	userIconsMenu: {
		error: "שגיאה בהחלפת תמונת פרופיל",
	},
	userMenuPopper: {
		profile: "פרופיל",
		myAccount: "החשבון שלי",
		logout: "התנתק",
		ariaLabel: "תפריט משתמש",
	},
	userSettingsMenu: {
		loginButtonText: "התחבר",
		useOptionsAltText: "חץ תפריט",
	},
	welcomePageAuthoritiesList: {
		title: "רשויות בפרוייקט",
		authorityAlt: "רשות בארץ",
	},
	welcomePageCourseList: {
		title: "מאגר למידה",
		noItemsMessage: `אוי, נראה שאין קורסים זמינים כרגע`,
	},
	welcomePageMap: {
		title: "פריסה ארצית של גשרים",
		line1: "כ-850 קבוצות",
		line2: "מקרית שמונה",
		line3: "ועד",
		line4: "אילת",
		mapAlt: "מפה",
		errorTextTitle: "שגיאה",
		errorText: "טעינת המפה נכשלה",
	},
	welcomePageParagraphs: {
		firstTitle: "מה זו תוכנית גשרים ?",
		secondTitle: "למי התוכנית מיועדת?",
		thirdTitle: "החזון שלנו",
		firstText: `תוכנית גשרים היא תוכנית המכינה את תלמידי ישראל לאתגרי העולם המודרני הדיגיטלי.
  מתוך שימת דגש על הסתכלות רחבה והיכרות עם המרחב הדיגיטלי הגדל ומתעצם בימינו יוכלו
תלמידי ישראל להתפתח ולהצטרף למהפכה הדיגיטלית המתרחשת בימים אלו.
גשרים תכיר לתלמידים את השפה הטכנולוגית ותלמד אותם להשתמש בה באמצעות תרגול והתנסות.`,
		secondText: `גשרים מיועדת לתלמידי כיתות ז-ט מתוך הבנה כי בגילאים אלו כבר יכולים
מרבית התלמידים להבין ולהשתמש בכלים דיגיטליים על מנת לפתח את כישוריהם.`,
		thirdText: `חזון התוכנית הוא צמצום פערים בחברה הישראלית והגדלת החוסן הלאומי על ידי חינוך, 
   לימוד ורכישת יכולות למקצועות הדיגיטל לכלל תלמידי ישראל ללא הבדלי 
   רקע סוציו-אקונומי, מגדר ומגזר.
   `,
		firstImageAlt: "תמונה של ילד",
		secondImageAlt: "תמונה של סטודנט",
		thirdImageAlt: "תמונה של חללית",
		rectImageAlt: "ריבוע",
	},
};
