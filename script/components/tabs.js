export function initializeTabs() {
  document.querySelectorAll(".tab-links").forEach(tabLinks => {
    const tabs = [];
    
    tabLinks = [...tabLinks.children];

    tabLinks.forEach(tabLink => {
      const tabId = tabLink.getAttribute("for");
      const tab = document.getElementById(tabId);

      tabs.push(tab);

      tabLink.addEventListener("click", () => {
        tabs.forEach(el => el.classList.toggle("active", el == tab));
        tabLinks.forEach(el => el.classList.toggle("active", el == tabLink));
      });
    });
  });
}