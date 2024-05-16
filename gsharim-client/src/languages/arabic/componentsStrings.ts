import { ComponentsTranslationTree } from "languages/types";

export const componentsStrings: ComponentsTranslationTree = {
	booksLoader: {
		loaderAlt: "التحميل جاري",
	},
	courseCatalog: {
		firstTitle: "دوراتي",
		secondTitle: "قائمة الدورات",
		inProgress: "دراسة",
		completed: "تم",
		allCourses: "جميع الدورات",
		popularCourses: "شائع",
		newCourses: "جديد",
		recommendedCourses: "اقتراحات",
		myCoursesNoItemsMessage: `للأسف لاتوجد دورات تعليمية قيد الدراسة الان 
		 يمكنك بدء الدراسة من قائمة الدورات الواردة أدناه`,
		allCoursesNoItemsMessage:
			"أوه , يبدو أنه لا توجد دورات تدريبية متاحة في الوقت الحالي",
	},

	courseListItem: {
		errorTextTitle: "خطأ",
		errorText: "فشل تحميل الدورة التدريبية",
		imageAlt: "صورة الدورة التدريبية",
		createdByPrefix: "تم الإنتاج من قبل: ",
		startLearning: "بدء الدورة التعليمية",
		continueLearning: "اكمل التعليم",
		difficulty: "مستوى: ",
		includesCertificate: "الحصول على شهادة تخرج",
		studentsNumber: "طلاب: ",
		hoursPostfix: "ساعات",
		minutesPrefix: "و-",
		minutesPostfix: "دقائق",
		recommendedRibbonText: "اقتراحات",
		newRibbonText: "جديد",
		courseDetails: {
			time: "مدة الدورة",
			courseDescription: "ماذا سنتعلم؟",
			skills: "المهارات التي ستكتسبها من خلال  الدورة",
		},
	},
	finishCoursePopup: {
		backToCourseCatalog: "الرجوع إلى كتالوج الدورة التدريبية",
		wellDone: "مبروك , لقد أكملت الدورة!",
		text: `إظهار المثابرة والالتزام والظمأ للعلم.
        استمر في العمل الممتاز`,
		modalLabel: "نافذة كل الاحترام ",
	},
	footer: {
		rightsReserved: "2023 جميع الحقوق محفوظة لشركة بريدجز",
		contact: "اتصال",
		info: "حول",
		commonQuestions: "الأسئلة الشائعة",
		courseCatalog: "كتالوج الدورة التدريبية",
		phoneNumber: "077-12345678",
		emailAddress: "gsharim@idf.il",
	},
	galleryDisplay: {
		errorTextTitle: "خطأ",
		errorText: "فشل تحميل المعرض",
	},
	gameDataDisplayBar: {
		clockText: "وقت اللعب:",
		scoreText: "نتيجة:",
	},
	header: {
		envStatus: {
			production: {
				envText: "production",
				tooltipText:
					"الموقع قيد الإنشاء , لذلك قد تتغير بعض المعلومات. في حالة حدوث عطل في الموقع , اتصل بالبريد الإلكتروني في أسفل الصفحة.",
			},
			development: {
				envText: "development",
				tooltipText: "بيئة التطوير",
			},
			test: {
				envText: "test",
				tooltipText: "بيئة الاختبار",
			},
			staging: {
				envText: "staging",
				tooltipText: "بيئة العرض",
			},
		},
		systemName: "الجسور",
	},
	iconMenuItem: {
		profileIconOptionAlt: "اختيار صورة للملف الشخصي",
	},
	ide: {
		components: {
			apiHints: {
				ApiHintsHeader: "تعليمات كتابة الكود",
			},
			inputComponent: {
				submitButtonAlt: "زر الإدخال",
			},
			runControlButtons: {
				loadingText: "جاري التحميل",
				runningText: "توقف",
				readyText: "تشغيل التعليمات البرمجية",
			},
		},
	},
	languageMenu: {
		arrowAlt: "سهم",
		menuAlt: "قائمة اللغات",
	},
	lessonBreadCrumbs: {
		breadCrumbsAria: "عنوان الدرس",
	},
	loginForm: {
		loginTitle: "مرحبًا بكم في نظام الجسور,",
		loginSubTitle: "للدخول إلى منطقة التعلم الشخصية , يرجى تسجيل الدخول",
		loginButtonText: "يتصل",
		signUpButtonText: "للتسجيل",
		errorTextTitle: "خطأ",
		errorText: "فشل تحميل نموذج تسجيل الدخول",
	},
	paragraph: {
		errorTextTitle: "خطأ",
		errorText: "فشل تحميل الفاصل",
	},
	question: {
		error: {
			errorComponent: {
				errorText: "عفوًا , يبدو أننا واجهنا خطأ في التحميل",
				retry: "إعادة تحميل",
			},
			errorPopup: {
				errorText: "عفوًا , يبدو أننا واجهنا خطأ أثناء إرسال الرد",
				close: "مغلق",
			},
		},
		question: {
			explanation: {
				answerText: "إجابة خاطئة!",
			},
			buttonSubmit: "إرسال رد",
		},
		questionLayouts: {
			trueFalseQuestion: {
				correctAnswer: "صحيح",
				incorrectAnswer: "غير صحيح",
			},
		},
		testQuestion: {
			buttonTestSubmit: "يخضع لإمتحان",
		},
		buttonNext: "للسؤال التالي",
		buttonBack: "على السؤال السابق",
		questionText: "سؤال",
	},
	questionnaire: {
		questionnaireStart: {
			startQuiz: "بدء مسح",
			startTest: "بدء الاختبار",
		},
		quiz: {
			quizEnd: {
				victoryMessage: "أحسنت , انتهيت من الاستبيان!",
				buttonBack: "ارجع إلى السؤال الأخير ,",
			},
		},
		test: {
			testAnalytics: {
				questionCountText: "بعض الأسئلة: ",
				gradeText: "درجة: ",
			},
			testEndPopup: {
				title: "التقديم النهائي للاختبار",
				submitionWarning:
					"ملاحظة ,  \n أنت على وشك إرسال الاختبار , بعد الإرسال لن تتمكن من تغيير إجاباتك.",
				submitAssuranceQuestion: "هل أنت متأكد أنك تريد إرسال الاختبار؟",
				buttonBack: "رجوع إلى الاختبار",
				submitTest: "يخضع لإمتحان",
			},
		},
	},
	roadmapGraph: {
		finalExerciseButtonTitle: "تمرين موجز",
	},
	seo: {
		helmetDefaultTitle: "الجسور | فرص المستقبل",
		helmetDefaultName: "الجسور | فرص المستقبل",
		helmetDefaultDescription: `الجسور هو مشروع فريد من نوعه في الوحدة 8200 وفيلق التعليم والشباب, بدعم من "Eco 8200"، حيث سيتم بناء نظام مبتكر للتعلم المستقل لـ طلاب. وسيأتي ضباط وجنود من الوحدة لتعزيز ومساعدة الأطفال في دراساتهم التكنولوجية في فترة ما بعد الظهر، من أجل تعزيز العلاقة بينهم وبين المجتمع والأوساط الأكاديمية والصناعة.`,
	},
	tabsGallery: {
		ariaLabel: "الفئات",
		errorTextTitle: "خطأ",
		errorText: "فشل تحميل المعرض",
	},
	taskFooter: {
		finishCourse: "إنهاء الدورة",
		previousTask: "إلى المهمة السابقة",
		previousLesson: "إلى الدرس السابق",
		previousChapter: "إلى الحلقة السابقة",
		nextTask: "للمهمة القادمة",
		nextLesson: "للدرس التالي",
		nextChapter: "إلى الفصل التالي",
		coursePage: "إلى صفحة الدورة",
	},
	taskLayout: {
		sectionContainer: {
			errorTextTitle: "خطأ",
			errorText: "فشل تحميل المكون",
		},
		sections: {
			basketsGameSection: {
				labelChangePopup: {
					popupTitle: "يجب أن تلتقط الآن ,",
				},
				welcomeMessage: {
					buttonText: "لنبدأ اللعب",
					titleText: '"مرحبًا بك في" خذها في السلة !',
					firstLineText: "الهدف هو جمع العناصر الصحيحة من أجل تسجيل النقاط.",
					secondLineBoldText: "من المهم توخي الحذر ,",
					secondLineText:
						"وعدم جمع العناصر التي لا تناسب العناصر الصحيحة أو تفقدها.",
					thirdLineText: "حرك السلة إلى اليسار واليمين باستخدام الأسهم",
					rightArrowText: "التحول إلى اليمين",
					leftArrowText: "تحرك يسارا",
					rightArrowImageAlt: "السهم الأيمن",
					leftArrowImageAlt: "السهم الايسر",
				},
				labelHeader: "يجب أن تلتقط الآن",
				submitButtonText: "ابدأ من جديد",
			},
			farmGameSection: {
				hooks: {
					rightFunctionDocString: "تحرك يمينا",
					leftFunctionDocString: "تحرك يسارا",
					downFunctionDocString: "تحرك لأسفل",
					upFunctionDocString: "تحرك",
					pickupDropDocString: "التقاط وإسقاط الأشياء",
					interactDocString: "تفاعل",
					getCurrentPositionDocString: "ما هو الوضع الحالي على السبورة",
					getClosestBucketDocString: "ما هو موقع أقرب دلو",
					getClosestShovelDocString: "ما هو موقع أقرب مجرفة",
					getClosestFountainDocString: "ما هو موقع أقرب بئر",
					getClosestSoilDocString: "ما هو موقع أقرب أرض",
					getClosestGrainDocString: "ما هو موقع أقرب البذور",
				},
			},
			snakeGameSection: {
				submitButtonText: "استمر في اللعب",
			},
		},
	},
	usericon: {
		profileIconAlt: "رمز الملف الشخصي",
	},
	userIconsMenu: {
		error: "خطأ في استبدال الصورة",
	},
	userMenuPopper: {
		profile: "حساب تعريفي",
		myAccount: "حسابي",
		logout: "انقطع الاتصال",
		ariaLabel: "قائمة المستخدم",
	},
	userSettingsMenu: {
		loginButtonText: "يتصل",
		useOptionsAltText: "سهم القائمة",
	},
	welcomePageAuthoritiesList: {
		title: "سلطات المشروع",
		authorityAlt: "السلطة في إسرائيل",
	},
	welcomePageCourseList: {
		title: "تجمع التعلم",
		noItemsMessage:
			"أوه , يبدو أنه لا توجد دورات تدريبية متاحة في الوقت الحالي",
	},
	welcomePageMap: {
		title: "نشر الجسور على الصعيد الوطني",
		line1: "حوالي 850 مجموعة",
		line2: "صدفة ثمانية",
		line3: "حتى",
		line4: "ايلات",
		mapAlt: "خريطة",
		errorTextTitle: "خطأ",
		errorText: "فشل تحميل الخريطة",
	},
	welcomePageParagraphs: {
		firstTitle: "ما هو برنامج الجسر؟",
		secondTitle: "من هو البرنامج؟",
		thirdTitle: "رؤيتنا",
		firstText: `برنامج الجسور هو برنامج يهيئ الطلاب الإسرائيليين لتحديات العالم الرقمي الحديث.
        مع التركيز على منظور واسع والإلمام بالفضاء الرقمي الذي ينمو ويكثف هذه الأيام , سيكونون قادرين على
         على الطلاب الإسرائيليين أن يطوروا وينضموا إلى الثورة الرقمية الجارية هذه الأيام , وسوف يتعرف البرنامج
         للطلاب اللغة التكنولوجية وتعميق الطريقة التي يتم بها تطبيق التكنولوجيا في عالمنا , من أجل هذا من خلال
         تعلم لغات البرمجة وتطوير المنتجات الرقمية وتطبيقات الكمبيوتر وفهم العالم السيبراني.
   `,
		secondText: `تم تصميم الجسور للطلاب في الصفوف من 7 إلى 9 على أساس أنه يمكنهم فعل ذلك بالفعل في هذه الأعمار
        يشارك معظم الطلاب في خطاب عالم التكنولوجيا العالية الإسرائيلي ويفهمونه ويستخدمونه
        بالأدوات الرقمية الموجودة من أجل تطوير وتعزيز الواقع الذي يعيشون فيه`,
		thirdText: `تتمثل رؤية البرنامج في تقليص الفجوات في المجتمع الإسرائيلي وزيادة المرونة الوطنية من خلال التعليم ,
        دراسة واكتساب مهارات المواد الرقمية لجميع الطلاب الإسرائيليين دون تمييز
        الخلفية الاجتماعية والاقتصادية والجنس والقطاع.
   `,
		firstImageAlt: "صورة صبي",
		secondImageAlt: "صورة الطالب",
		thirdImageAlt: "صورة سفينة الفضاء",
		rectImageAlt: "مربع",
	},
};
