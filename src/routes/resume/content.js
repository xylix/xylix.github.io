const sideColumnContent = [
	{
		type: 'picture',
		label: 'photo of Kerkko Pelttari',
		details: '2022_picture.jpg'
	},
	{
		type: 'contact',
		label: 'Contact',
		details: [
			{
				subcategory: 'Details',
				contactDetails: [
					{
						isLink: true,
						type: 'email',
						text: 'kerk.pelt@gmail.com',
						icon: 'email'
					},
					{
						isLink: true,
						type: 'phone',
						text: '+358 45 848 5690',
						icon: 'phone'
					},
					{
						text: 'Helsinki, Finland',
						icon: 'location'
					}
				]
			},
			{
				subcategory: 'Online',
				contactDetails: [
					/*
						{
							isLink: true,
							type: 'web',
							url: 'xylix.fi',
							text: 'xylix.fi',
						},
                        */
					{
						isLink: true,
						type: 'web',
						url: 'https://github.com/xylix',
						text: 'github.com/xylix',
						icon: 'github'
					},
					{
						isLink: true,
						type: 'web',
						url: 'https://www.linkedin.com/in/kerkko-pelttari/',
						text: 'linkedin.com/in/kerkko-pelttari/',
						icon: 'linkedin'
					}
				]
			}
		]
	},
	{
		type: 'skills',
		label: 'Skills',
		details: [
			'JS',
			'TypeScript',
			'React',
			// "NodeJS,
			// "JavaScript",
			// "Express",
			'Git',
			'Python',
			'Robot Framework',
			'Java',
			// "Kotlin",
			// "Shell scripting",
			'Bash',
			'Maintaining Open-Source',
			'Shipping MVPs',
			'Working in self-directing teams'
		]
	},
	{
		type: 'skills',
		label: 'Hobbies',
		details: ['LARPing', 'Tabletop RPGs', 'Video games', 'Meditation', 'Reading']
	}
	/* TODO: implement big skills element
        Skills
            Javascript + Typescript: React webpages and schoolwork, backend for Robotframework Browser
            Python – Scripts, major work experience

            Robot Framework: Writing a big Browser automation library and the corresponding tests. Testing other python projects with Robot.
            Java – University courses, couple of own projects.
            Kotlin - Converted some projects from java to kotlin.
            Rust - Backend development for a medium sized open source project (aw-server-rust)

            Functional programming - University courses in Haskell and type theory.
            Algorithms - University course in 2019.
            Version control – I have used git in some free-time projects (see on Github), school and work.
            Web security - Some experience as a trainee
            Docker – Creation of dockerfiles for some projects, experience with using docker.
            Shell - Usually manage / run my projects with CLI tooling. Use fish for my own personal helper functions and configs, Makefiles and python for more complicated project tooling. Have had to work with bash as well.
            Open-source - Familiar with getting funding, managing and maintaining medium sized open-source projects.

            English language – Multiple years of work experience with primarily English speaking teams. Frequently read and speak in free time.


        */
];

const mainColumnContent = [
	/*{
        type: "full-details",
        label: "Association experience",
        details: [
            {
                dates: "2021-",
                title: "Association Active",
                subtitle: "EA Finland / Helsinki",
                location: "Helsinki",
                technologies: "Technical administration, participating in projects",
                description:
                    "I've been responsible for the little server infrastructure we have (mostly for lahjoittaminen.fi), and also participated in the project for a couple months. I have done some career coaching practice, and been career coached myself. I am responsible for the career club but it mostly runs by itself. I was responsible for preparing and holding the initial 2022 strategy meeting, but also got support from other volunteers for it. ",
            },
            {
                dates: "2018-2021",
                title: "Teaching Organizer, Teacher",
                subtitle: "Päivölän Opisto",
                location: "Valkeakoski",
                technologies:
                    "Organizing volunteers, teaching 15-year olds, reporting volunteer details to bureucrats",
                description:
                    "Teaching programming / computer science basics (hardware, command line, programming tools, programming languages), organizing volunteers and other teachers during summers, planning the curriculum",
            },
        ],
    },*/
	{
		type: 'full-details',
		label: 'Work Experience',
		details: [
			{
				dates: '9/2020 - 06/2023',
				title: 'Software Engineer',
				subtitle: 'Robocorp Oy',
				location: 'Helsinki',
				technologies: 'Robot Framework, Python, Typescript',
				description:
					'Developing Robot Framework libraries for RPA developing end users. Closed-source full-stack development along with some open-source Python and browser-extension development.'
			},
			{
				dates: '06/2020 - 02/2022',
				title: 'Chairman of the Board, entrepreneur',
				subtitle: 'Muisoft Oy',
				description: 'Selling and delivering consulting services for various small-scale projects'
			},
			{
				dates: '5/2020 - 8/2020',
				title: 'Junior Developer',
				technologies: 'Robot Framework, Python, Typescript',
				subtitle: 'Reaktor Oy',
				location: 'Helsinki',
				description:
					'Summer job, developing Browser automation library Robot Framework Browser at Reaktor for Robocorp Inc. Mostly worked with a 2-person team, with a larger open-source team governing the project. See https://github.com/MarketSquare/robotframework-browser#robotframework-browser'
			},
			{
				dates: '10/2017 - 10/2018',
				title: 'Linux Developer',
				technologies: 'Java, bash, Confluence, Jira',
				subtitle: 'Contribyte Oy',
				location: 'Helsinki',
				description:
					'Working with Confluence / Jira and VersionOne. Writing some plugins, scripts and doing customer support.'
			},
			/*
            {
                dates: "06/2017 – 09/2017",
                title: "Junior Fullstack Developer",
                subtitle: "APInf Oy",
                location: "Tampere",
                description: ""
                    "Summer job working on OpenAPI designer  and  OpenAPI space. Frontend development with Aurelia JS framework and backend with python. Small team, worked with Kanban",
            },
          */
			{
				dates: '08/2015– 06/2017',
				title: 'Trainee',
				subtitle: 'Päivölä Student Innovation Lab (PSIL) Oy',
				location: 'Valkeakoski',
				description:
					'High school studies included work internship, 12 hours every week. I did a little bit of everything, from deployment to full stack development to helping with programming classes for middle schoolers.'
			}

			/* {
					title: 'Contract Full Stack Developer',
					subtitle: 'The Wally Shop',
					dates: `4/2019 — ongoing`,
					location: 'Remote',
					description: 'Reusable packaging grocery delivery service',
					list: [
						'Update and add new features to customer-facing e-commerce app using React with MobX and Bootstrap.',
						'Implement NodeJS API endpoints using MongoDB queries.',
						'Execute miscellaneous technical projects such as auto-generating unique PDFs from a graphics file.',

						// 'Implement product rating system to handle both numerical reviews and comments',
						// Use React.js to add prompts and visual cues for shoppers to update product and inventory information.
						// Contracted to develop tech stack focused on MongoDB, Express.js, React, Node.js.
					],
				},
				{
					title: 'Front End Developer',
					subtitle: 'Sixcycle',
					dates: '4/2019 — 10/2019',
					location: 'Brooklyn, NY',
					description: 'Endurance coaching software used by Team in Training',
					list: [
						'Maintained primary ownership of the front end of a React / JavaScript SaaS web app used by thousands of coaches and athletes daily.',
						'Implemented new features from InVision prototypes, including message templates and public community groups.',
						'Improved stability through bug fixes and refactoring to reduce tech debt.',
					],
				},
				{
					title: 'Math Fellow, Americorps',
					subtitle: 'Denver Public Schools',
					dates: '2017 — 2018',
					location: 'Denver, CO',
					description: 'Middle school math intervention program',
					list: [
						'Improved academic outcomes for a diverse student population by creating and teaching lesson plans that included original worksheets and activities.',
						'Developed a positive motivation system to encourage on-task behavior, teamwork, and delaying of rewards.',
						'Launched and led HTML coding enrichment class with Galvanize students.',
						// • Taught small-group 6th grade math intervention, writing and delivering original lessons.
						// • Managed behavior and relationships with a positive motivation system, restorative conversations, and supplemental tutoring.
						// • Facilitated an elective with Galvanize where students learned HTML and built websites (deployed and hosted by Galvanize).
					],
				},
				{
					title: 'Technical Writer',
					subtitle: 'KBC Advanced Technologies',
					dates: '2014 — 2015',
					location: 'Denver, CO',
					description: 'Oil refinery operations manuals',
					list: [
						'Produced high quality training manuals that included written content and Visio drawings, synthesizing information from various sources.',
					],
				},
                */

			// Linkedin

			// 'Produced high quality training manuals for oil refinery operations to communicate how materials move through complex systems.',
			// 'Wrote clear, concise content with information compiled from client documents, photos, and detailed flow diagrams.'
			// 'Created Visio drawings of condensed stream and equipment information to assist with visual understanding.',

			// Honeybee Robotics, New York, NY
			// Operations Associate, 2012–2013
			// • Controlled project document streams and managed all incoming bills, serving as the main point of contact for vendors.
			// • Created a macro in Excel VBA to automate entry and processing of expense data.
			// • Updated and expanded company website and blog using Joomla!
		]
	},
	{
		type: 'full-details',
		label: 'Volunteering',
		details: [
			{
				dates: '4/2022 - 05/2023',
				title: 'Chair of the Board',
				subtitle: 'Effective Altruism Finland',
				location: 'Helsinki',
				// technologies: "Robot Framework, Python, Typescript",
				description:
					'Applying for funding, bureucratical tasks, decisionmaking and leading the board, managing and supporting our employees.'
			}
		]
	},
	{
		type: 'full-details',
		label: 'Education',
		details: [
			{
				title: 'Bachelor’s degree in Computer Science',
				subtitle: 'Helsinki University',
				dates: '09/2017-',
				location: 'Helsinki',
				description: ''
				/* TODO: implement courses / opintosuoritusote data here */
			},
			{
				title: 'High school',
				location: 'Valkeakoski',
				subtitle: 'Päivölän opisto / Valkeakosken Tietotien lukio',
				dates: '07/2015 - 06/2017'
			}
		]
	}
	/* FIXME: replace with my projects
        {
			type: 'simple-details',
			label: 'Projects',
			details: [
				{
					title: 'Hello Pizza Truck',
					url: 'http://bit.ly/2VXTVJ3',
					link: 'hellopizzatruck.com',
					description: 'Static site for selling food truck. Built with Gatsby, React hooks, and Slick carousel.',
				},
				{
					title: 'Newsmash',
					url: 'http://bit.ly/2Ix2sKW',
					link: 'newsmashed.herokuapp.com',
					description: 'Data visualization for the news. Integrated three external APIs with React/Redux app and PostgreSQL.',
				},
				{
					title: 'Svelte Resume',
					url: 'bit.ly/38E1FCO',
					link: 'bit.ly/svelte-resume',
					description: 'Flexible and customizable PDF resume template built with Svelte.',
				},
			],
		},
        */
];

const headerContent = {
	name: 'Kerkko Pelttari',
	summaryLines: ['Always solving problems.']
	// 'Curious and adaptable web developer with 10+ months of front end production experience. Especially skilled with React and currently learning more frameworks. Career history includes technical writing, education, and chemical engineering. Always thinking about the user experience. Always brainstorming app ideas.',

	// meaningful and impactful
	// supporting the underdog

	// I enjoy data, design, and clean code.

	// Enjoy the act of creation as well as refactoring.

	// I like to build things I like to use.

	// Try to be thoughtful always.}
};

export { sideColumnContent, mainColumnContent, headerContent };
