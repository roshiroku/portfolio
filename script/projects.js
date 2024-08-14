const projectData = {
  categories: ["scripted", "styled"],
  all: [
    {
      id: "discover-the-world",
      title: "Discover the World",
      titleHTML: /* html */`Discover <span class="gradient-text">the World</span>`,
      overview: "A stunning CSS Grid landing page with tiled images and a lead-generating contact form.",
      desc: "This project showcases a visually stunning landing page using CSS Grid to tile various images with content. It includes a contact form for lead generation and is built with HTML5, CSS, and SASS, demonstrating modern web development skills and design expertise.",
      tech: ["sass", "css", "html"],
      category: "styled"
    },
    {
      id: "free-consulting",
      title: "Free Consulting",
      titleHTML: /* html */`Free <span class="gradient-text">Consulting</span>`,
      overview: "A modern landing page for free consulting with engaging graphics and a lead-generating call to action.",
      desc: "This modern landing page offers free consulting services with engaging graphics and a strong lead-generating call to action. Built with HTML5, CSS, and SASS, it features a clean, contemporary layout designed to captivate visitors.",
      tech: ["sass", "css", "html"],
      category: "styled"
    },
    {
      id: "good-coffee",
      title: "Good Coffee",
      titleHTML: /* html */`Good <span class="gradient-text">Coffee</span>`,
      overview: "A sleek landing page offering free coffee coupons with an engaging cover image and subscription form.",
      desc: "This project features an inviting landing page with an engaging cover image and a form offering free coffee coupons to subscribers. Built with HTML5, CSS, and Bootstrap, it boasts a sleek, responsive design to attract coffee enthusiasts and drive subscriptions.",
      tech: ["bootstrap", "css", "html"],
      category: "styled"
    },
    {
      id: "here-now",
      title: "Here & Now",
      titleHTML: /* html */`Here & <span class="gradient-text">Now</span>`,
      overview: "A modern, colorful landing page with a lead-generating form.",
      desc: "This project showcases a modern, colorful landing page designed to captivate users and generate leads through a prominent form. Built with HTML5, CSS, and SASS, it highlights contemporary design aesthetics and effective user engagement strategies.",
      tech: ["sass", "css", "html"],
      category: "styled"
    },
    {
      id: "lead-forward-blue",
      title: "Lead Forward (Blue)",
      titleHTML: /* html */`Lead Forward <span class="gradient-text">(Blue)</span>`,
      overview: "A sleek landing page with engaging cover graphics and a lead-generating form.",
      desc: "This project features a modern landing page with engaging cover image graphics and a lead-generating form. Built with HTML5, CSS, and SASS, it showcases a sleek design aimed at capturing user interest and driving lead generation.",
      tech: ["sass", "css", "html"],
      category: "styled"
    },
    {
      id: "lead-forward-pink",
      title: "Lead Forward (Pink)",
      titleHTML: /* html */`Lead Forward <span class="gradient-text">(Pink)</span>`,
      overview: "A sleek landing page with engaging cover graphics and a floating lead-generating form.",
      desc: "This project features a modern landing page with engaging cover image graphics and a floating lead-generating form. Built with HTML5, CSS, and SASS, it showcases a sleek design aimed at capturing user interest and driving lead generation.",
      tech: ["sass", "css", "html"],
      category: "styled"
    },
    {
      id: "outside-the-box",
      title: "Outside the Box",
      titleHTML: /* html */`Outside <span class="gradient-text">the Box</span>`,
      overview: "A modern landing page with multiple sections, including a lead form and business location map.",
      desc: "This project features a modern landing page with a hero section, services section, lead-generating contact form, business location map, and social links. Built with HTML5, CSS, and Bootstrap, it provides a visually appealing and engaging design to enhance user conversion.",
      tech: ["bootstrap", "css", "html"],
      category: "styled"
    },
    {
      id: "country-info",
      title: "Country Info Lookup",
      titleHTML: /* html */`Country Info <span class="gradient-text">Lookup</span>`,
      overview: "A responsive table view of country information with filtering, sorting, and detailed views.",
      desc: "This project features a responsive, mobile-friendly table view listing country information retrieved from the REST Countries API, with locally cached favorite countries. The table supports filtering, sorting, and clicking individual rows to view detailed country information.",
      tech: ["css", "html", "js"],
      category: "scripted"
    },
    {
      id: "math-quiz",
      title: "Math Quiz",
      titleHTML: /* html */`Math <span class="gradient-text">Quiz</span>`,
      overview: "A customizable math quiz with progress tracking, fully responsive for mobile displays.",
      desc: "This project offers a customizable math quiz experience, allowing users to adjust terms, ranges, and operations. Progress can be tracked by viewing previous quizzes and results saved locally. It's fully responsive, supporting mobile displays for a seamless experience.",
      tech: ["sass", "css", "html", "js", "ts"],
      category: "scripted"
    },
    {
      id: "pokedex",
      title: "Pokedex",
      titleHTML: /* html */`Poke<span class="gradient-text">dex</span>`,
      overview: "A responsive Pokedex with filterable Pokémon data and locally cached information.",
      desc: "This project features a responsive, mobile-supported Pokedex that lists Pokémon and their detailed information retrieved from the PokeAPI. Users can filter the Pokémon data, and the information is locally cached for quick access and a seamless browsing experience.",
      tech: ["sass", "css", "html", "js", "ts"],
      category: "scripted"
    },
    {
      id: "snake",
      title: "Snake",
      titleHTML: /* html */`Snake <span class="gradient-text">Game</span>`,
      overview: "A customizable Snake game with options like disabling walls, edible mice, and adjustable speed.",
      desc: "This project offers a responsive, mobile-supported Snake game rendered on canvas. The game includes various customizations, such as disabling walls, spawning edible mice that slow the snake down, and adjusting the snake's speed for a tailored gameplay experience.",
      tech: ["sass", "css", "html", "js", "ts"],
      category: "scripted"
    },
    {
      id: "tic-tac-toe",
      title: "Tic-Tac-Toe",
      titleHTML: /* html */`Tic-Tac-<span class="gradient-text">Toe</span>`,
      overview: "A responsive Tic-Tac-Toe game with player vs player and AI modes.",
      desc: "This responsive, mobile-supported Tic-Tac-Toe game offers multiple play modes, including player vs player, play as X vs AI, and play as O vs AI. The game delivers a classic experience with modern flexibility, allowing users to enjoy it across different devices.",
      tech: ["sass", "css", "html", "js", "ts"],
      category: "scripted"
    },
    {
      id: "todo-list",
      title: "Todo List",
      titleHTML: /* html */`Todo <span class="gradient-text">List</span>`,
      overview: "A responsive Todo List with local storage, task filtering, and editing features.",
      desc: "This responsive, mobile-supported Todo List allows users to manage their tasks efficiently, with features to mark tasks as completed, edit, or remove them. The list is filterable by completion status, and all tasks are saved locally for easy access and organization.",
      tech: ["sass", "css", "html", "js", "ts"],
      category: "scripted"
    },
  ],
  ids: []
};

projectData.all.forEach(proj => {
  projectData.ids.push(proj.id);
  projectData[proj.id] = proj;
});

const techData = {
  all: [
    {
      id: "sass",
      title: "SASS",
      icon: "fa-brands fa-sass"
    },
    {
      id: "css",
      title: "CSS3",
      icon: "fa-brands fa-css3-alt"
    },
    {
      id: "html",
      title: "HTML5",
      icon: "fa-brands fa-html5"
    },
    {
      id: "js",
      title: "JS",
      icon: "fa-brands fa-js"
    },
    {
      id: "ts",
      title: "TS",
      image: "tech-icons/typescript.svg"
    },
    {
      id: "bootstrap",
      title: "Bootstrap",
      icon: "fa-brands fa-bootstrap"
    }
  ],
  ids: []
};

techData.all.forEach(tech => {
  techData.ids.push(tech.id);
  techData[tech.id] = tech;
});

export { projectData, techData };