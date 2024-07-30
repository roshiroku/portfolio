const projectData = {
  all: [
    {
      id: "discover-the-world",
      title: "Discover the World",
      titleHTML: /* html */`Discover <span class="gradient-text">the World</span>`,
      overview: "A stunning CSS Grid landing page with tiled images and a lead-generating contact form.",
      desc: "This project showcases a visually stunning landing page using CSS Grid to tile various images with content. It includes a contact form for lead generation and is built with HTML5, CSS, and SASS, demonstrating modern web development skills and design expertise.",
      tech: ["sass", "css", "html"]
    },
    {
      id: "free-consulting",
      title: "Free Consulting",
      titleHTML: /* html */`Free <span class="gradient-text">Consulting</span>`,
      overview: "A modern landing page for free consulting with engaging graphics and a lead-generating call to action.",
      desc: "This modern landing page offers free consulting services with engaging graphics and a strong lead-generating call to action. Built with HTML5, CSS, and SASS, it features a clean, contemporary layout designed to captivate visitors.",
      tech: ["sass", "css", "html"]
    },
    {
      id: "good-coffee",
      title: "Good Coffee",
      titleHTML: /* html */`Good <span class="gradient-text">Coffee</span>`,
      overview: "A sleek landing page offering free coffee coupons with an engaging cover image and subscription form.",
      desc: "This project features an inviting landing page with an engaging cover image and a form offering free coffee coupons to subscribers. Built with HTML5, CSS, and Bootstrap, it boasts a sleek, responsive design to attract coffee enthusiasts and drive subscriptions.",
      tech: ["bootstrap", "css", "html"]
    },
    {
      id: "here-now",
      title: "Here & Now",
      titleHTML: /* html */`Here & <span class="gradient-text">Now</span>`,
      overview: "A modern, colorful landing page with a lead-generating form.",
      desc: "This project showcases a modern, colorful landing page designed to captivate users and generate leads through a prominent form. Built with HTML5, CSS, and SASS, it highlights contemporary design aesthetics and effective user engagement strategies.",
      tech: ["sass", "css", "html"]
    },
    {
      id: "lead-forward-blue",
      title: "Lead Forward (Blue)",
      titleHTML: /* html */`Lead Forward <span class="gradient-text">(Blue)</span>`,
      overview: "A sleek landing page with engaging cover graphics and a lead-generating form.",
      desc: "This project features a modern landing page with engaging cover image graphics and a lead-generating form. Built with HTML5, CSS, and SASS, it showcases a sleek design aimed at capturing user interest and driving lead generation.",
      tech: ["sass", "css", "html"]
    },
    {
      id: "lead-forward-pink",
      title: "Lead Forward (Pink)",
      titleHTML: /* html */`Lead Forward <span class="gradient-text">(Pink)</span>`,
      overview: "A sleek landing page with engaging cover graphics and a floating lead-generating form.",
      desc: "This project features a modern landing page with engaging cover image graphics and a floating lead-generating form. Built with HTML5, CSS, and SASS, it showcases a sleek design aimed at capturing user interest and driving lead generation.",
      tech: ["sass", "css", "html"]
    },
    {
      id: "outside-the-box",
      title: "Outside the Box",
      titleHTML: /* html */`Outside <span class="gradient-text">the Box</span>`,
      overview: "A modern landing page with multiple sections, including a lead form and business location map.",
      desc: "This project features a modern landing page with a hero section, services section, lead-generating contact form, business location map, and social links. Built with HTML5, CSS, and Bootstrap, it provides a visually appealing and engaging design to enhance user conversion.",
      tech: ["bootstrap", "css", "html"]
    }
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