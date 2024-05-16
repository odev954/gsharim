import { ComponentsTranslationTree } from "languages/types";

export const componentsStrings: ComponentsTranslationTree = {
	booksLoader: {
		loaderAlt: "Loading",
	},
	courseCatalog: {
		firstTitle: "My courses",
		secondTitle: "Course Catalog",
		inProgress: "Learning",
		completed: "Completed",
		allCourses: "All courses",
		popularCourses: "Popular",
		newCourses: "New",
		recommendedCourses: "Recommended",
		myCoursesNoItemsMessage: `Oh, it looks like there is no course currently being studied
		You can start learning from the course catalog below`,
		allCoursesNoItemsMessage: `Oops, it looks like there are no courses available at the moment`,
	},

	courseListItem: {
		errorTextTitle: "Error",
		errorText: "Failed to load course",
		imageAlt: "course image",
		createdByPrefix: "Created by: ",
		startLearning: "Start Course",
		continueLearning: "Continue Learning",
		difficulty: "Level: ",
		includesCertificate: "includes certificate",
		studentsNumber: "Students: ",
		hoursPostfix: "h",
		minutesPrefix: "",
		minutesPostfix: "m",
		recommendedRibbonText: "Recommended",
		newRibbonText: "New",
		courseDetails: {
			time: "course duration",
			courseDescription: "What will we learn?",
			skills: "Skills the course will teach",
		},
	},
	finishCoursePopup: {
		backToCourseCatalog: "back to course catalog",
		wellDone: "Congratulations, you've completed the course!",
		text: `You've Demonstrated perseverance, commitment and a thirst for knowledge.
		Keep up the excellent work`,
		modalLabel: "Well done panel",
	},
	footer: {
		rightsReserved: "All rights reserved for Gsharim 2023",
		contact: "Contact us",
		info: "About",
		commonQuestions: "Common questions",
		courseCatalog: "Course catalog",
		phoneNumber: "077-12345678",
		emailAddress: "gsharim@idf.il",
	},
	galleryDisplay: {
		errorTextTitle: "Error",
		errorText: "Failed to load gallery",
	},
	gameDataDisplayBar: {
		clockText: "Game Time:",
		scoreText: "Score:",
	},
	header: {
		envStatus: {
			production: {
				envText: "beta version",
				tooltipText:
					"The site is under development, therefore some information may change. In case of a site malfunction, contact us through the email at the bottom of the page.",
			},
			development: {
				envText: "development",
				tooltipText: "Development environment",
			},
			test: {
				envText: "test",
				tooltipText: "testing environment",
			},
			staging: {
				envText: "staging",
				tooltipText: "Display Environment",
			},
		},
		systemName: "Gsharim",
	},
	iconMenuItem: {
		profileIconOptionAlt: "Selectable profile icon",
	},
	ide: {
		components: {
			apiHints: {
				ApiHintsHeader: "Hints",
			},
			inputComponent: {
				submitButtonAlt: "Input submit button",
			},
			runControlButtons: {
				loadingText: "Loading",
				runningText: "Stop",
				readyText: "Run Code",
			},
		},
	},
	languageMenu: {
		arrowAlt: "arrow",
		menuAlt: "Language Menu",
	},
	lessonBreadCrumbs: {
		breadCrumbsAria: "Lesson Title",
	},
	loginForm: {
		loginTitle: "Welcome to Gsharim",
		loginSubTitle: `To access the personal learning area
						please log in`,
		loginButtonText: "Login",
		signUpButtonText: "Sign up",
		errorTextTitle: "Error",
		errorText: "Failed to load login form",
	},
	paragraph: {
		errorTextTitle: "Error",
		errorText: "Failed to load paragraph",
	},
	question: {
		error: {
			errorComponent: {
				errorText: "Oops, looks like we encountered an error loading",
				retry: "reload",
			},
			errorPopup: {
				errorText: "Oops, looks like we encountered an error sending the reply",
				close: "closed",
			},
		},
		question: {
			explanation: {
				answerText: "Wrong answer!",
			},
			buttonSubmit: "Submit Reply",
		},
		questionLayouts: {
			trueFalseQuestion: {
				correctAnswer: "correct",
				incorrectAnswer: "Incorrect",
			},
		},
		testQuestion: {
			buttonTestSubmit: "Test submission",
		},
		buttonNext: "For the next question",
		buttonBack: "to the previous question",
		questionText: "Question",
	},
	questionnaire: {
		questionnaireStart: {
			startQuiz: "start quiz",
			startTest: "Start Test",
		},
		quiz: {
			quizEnd: {
				victoryMessage: "Well done you finished the questionnaire!",
				buttonBack: "Return to the last question",
			},
		},
		test: {
			testAnalytics: {
				questionCountText: "Number of questions: ",
				gradeText: "Grade: ",
			},
			testEndPopup: {
				title: "Final submission of the test",
				submitionWarning:
					"Note,\nYou are about to submit the test, after submission you will not be able to change your answers.",
				submitAssuranceQuestion: "Are you sure you want to submit the test?",
				buttonBack: "Back to the test",
				submitTest: "Test Submission",
			},
		},
	},
	roadmapGraph: {
		finalExerciseButtonTitle: "Final Exercise",
	},
	seo: {
		helmetDefaultTitle: "Gsharim | opportunities for the future",
		helmetDefaultName: "Gsharim | opportunities for the future",
		helmetDefaultDescription: `"Gsharim" is a unique project in Unit 8200 and the Education and Youth Corps, with the support of 'Eco 8200', in which they will build an innovative system for independent learning for students. Officers and soldiers from the unit will come to step up and help the children with their technology studies in the afternoons, to strengthen the relationship between them and society, Academia and industry`,
	},
	tabsGallery: {
		ariaLabel: "categories",
		errorTextTitle: "Error",
		errorText: "Failed to load gallery",
	},
	taskFooter: {
		finishCourse: "Finish Course",
		previousTask: "Previous Task",
		previousLesson: "Previous Lesson",
		previousChapter: "Previous Chapter",
		nextTask: "Next Task",
		nextLesson: "Next Lesson",
		nextChapter: "Next Chapter",
		coursePage: "To Course Page",
	},
	taskLayout: {
		sectionContainer: {
			errorTextTitle: "Error",
			errorText: "Failed to load component",
		},
		sections: {
			basketsGameSection: {
				labelChangePopup: {
					popupTitle: "You must catch now",
				},
				welcomeMessage: {
					buttonText: "Let's start playing",
					titleText: "Welcome To ״Catch In The Basket״!",
					firstLineText:
						"The goal is to collect the right items in order to score points.",
					secondLineBoldText: "It's important to be careful",
					secondLineText:
						"And not to collect items that do not fit or miss correct items.",
					thirdLineText: "Move the basket left and right using the arrow keys",
					rightArrowText: "Move right",
					leftArrowText: "Move left",
					rightArrowImageAlt: "right arrow",
					leftArrowImageAlt: "left arrow",
				},
				labelHeader: "You must catch now",
				submitButtonText: "Restart",
			},
			farmGameSection: {
				hooks: {
					rightFunctionDocString: "Move right",
					leftFunctionDocString: "Move left",
					downFunctionDocString: "Move down",
					upFunctionDocString: "Move up",
					pickupDropDocString: "pick up and drop objects",
					interactDocString: "interaction",
					getCurrentPositionDocString:
						"What is the current position on the board",
					getClosestBucketDocString:
						"What is the location of the closest bucket",
					getClosestShovelDocString:
						"What is the location of the closest shovel",
					getClosestFountainDocString:
						"What is the location of the closest fountain",
					getClosestSoilDocString: "What is the location of the closest soil",
					getClosestGrainDocString: "What is the closest grain location",
				},
			},
			snakeGameSection: {
				submitButtonText: "Continue playing",
			},
		},
	},
	usericon: {
		profileIconAlt: "Profile picture",
	},
	userIconsMenu: {
		error: "Error replacing profile picture",
	},
	userMenuPopper: {
		profile: "Profile",
		myAccount: "My Account",
		logout: "Log out",
		ariaLabel: "User menu",
	},
	userSettingsMenu: {
		loginButtonText: "Login",
		useOptionsAltText: "Menu arrow",
	},
	welcomePageAuthoritiesList: {
		title: "Project Participants",
		authorityAlt: "Authority in Israel",
	},
	welcomePageCourseList: {
		title: "Course catalogue",
		noItemsMessage: `Oops, it looks like there are no courses available at the moment`,
	},
	welcomePageMap: {
		title: `Nationwide Deployment
		 of Gsharim`,
		line1: "around 850 groups from",
		line2: "Kiryat Shmona",
		line3: "to",
		line4: "Eilat",
		mapAlt: "map",
		errorTextTitle: "Error",
		errorText: "Failed to load map",
	},
	welcomePageParagraphs: {
		firstTitle: "What is Gsharim program?",
		secondTitle: "Who is the program for?",
		thirdTitle: "Our vision",
		firstText: `The Gsharim program is a program that prepares israeli students for the challenges of the modern
					digital world. With an emphasis on a broad perspective and familiarity with the digital space
					that is growing and intensifying these days, they will be able to develop and join the digital 
					revolution taking place these days. Gsharim will introduce students to the technological 
					language and teach them how to use it through exercise and practice.`,
		secondText: `Gsharim is meant for 7th-9th grade students with the understanding that at these ages most
		 students can already understand and use digital tools to develop their skills.`,
		thirdText: `The vision of the program is to reduce gaps in Israeli society and increase national resilience through education,
				studying and acquiring skills for digital subjects for all israeli students without distinction,
				socio-economic background, gender and sector.
				`,
		firstImageAlt: "Image of a child",
		secondImageAlt: "Student image",
		thirdImageAlt: "Image of spaceship",
		rectImageAlt: "square",
	},
};
