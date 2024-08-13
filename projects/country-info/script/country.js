export default class Country {
  static tableColumns = [
    {
      label: "✪",
      name: "favorite",
      sort: true,
      getElement: country => {
        const btn = document.createElement("button");
        btn.innerText = country.favorite ? "★" : "☆";
        btn.addEventListener("click", () => country.toggleFavorite());
        return btn;
      }
    },
    { label: "Name", name: "name", sort: true },
    { label: "Code", name: "code", sort: true },
    { label: "Region", name: "region", sort: true },
    {
      label: "Population",
      name: "population",
      sort: true,
      getElement: country => country.population.toLocaleString()
    },
    { label: "Capital", name: "capitals" },
    { label: "Language", name: "languages" },
  ];
  static favorites = JSON.parse(localStorage.getItem("country-info-favorites")) || {};

  data;
  tr;

  get name() {
    return this.data.name.common;
  }

  get altNames() {
    return this.data.altSpellings || [];
  }

  get code() {
    return this.data.cca3;
  }

  get capitals() {
    return this.data.capital || [];
  }

  get region() {
    return this.data.region;
  }

  get languages() {
    return Object.values(this.data.languages || {});
  }

  get population() {
    return this.data.population;
  }

  get currencies() {
    return Object.keys(this.data.currencies || {}).map(id => ({ id, ...this.data.currencies[id] }))
  }

  get unMember() {
    return this.data.unMember;
  }

  get flag() {
    return {
      src: this.data.flags.png,
      alt: this.data.flags.alt
    };
  }

  get favorite() {
    return Boolean(Country.favorites[this.code]);
  }

  constructor(data) {
    this.data = data;
  }

  toggleFavorite() {
    Country.favorites[this.code] = !this.favorite;
    localStorage.setItem("country-info-favorites", JSON.stringify(Country.favorites));
    this.updateTableRow();
  }

  getHTML() {
    const capitalHTML = getDetailsHTML(this.capitals);
    const langHTML = getDetailsHTML(this.languages);
    const currHTML = getDetailsHTML(this.currencies.map(curr => `${curr.symbol} (${curr.name})`));

    return /* html */`
      <div>
        <h3><i>${this.favorite ? "★" : "☆"}</i>${this.name}</h3>
        <img src="${this.flag.src}" alt="${this.flag.alt}" />
        <ul>
          <li><b>Population:</b> ${this.population.toLocaleString()}</li>
          <li><b>Region:</b> ${this.region}</li>
          ${capitalHTML ? /* html */`<li><b>Capital:</b> ${capitalHTML}</li>` : ""}
          ${langHTML ? /* html */`<li><b>Language:</b> ${langHTML}</li>` : ""}
          ${currHTML ? /* html */`<li><b>Currency:</b> ${currHTML}</li>` : ""}
          <li><b>UN Membership:</b> ${this.unMember ? "✓" : "✗"}</li>
        </ul>
      </div>`;
  }

  createTableRow(onRowClick) {
    this.tr = document.createElement("tr");
    this.updateTableRow();

    if (onRowClick) {
      this.tr.addEventListener("click", () => onRowClick(this));
    }

    return this.tr;
  }

  updateTableRow() {
    this.tr.innerHTML = "";

    Country.tableColumns.forEach(col => {
      const td = document.createElement("td");

      if (col.getElement) {
        td.append(col.getElement(this));
      } else {
        const value = this[col.name];
        td.innerHTML = (Array.isArray(value) ? getDetailsHTML(value) : value) || "";
      }

      this.tr.append(td);

      if (col.click) {
        td.addEventListener("click", () => col.click(this));
      }
    });
  }
}

function getDetailsHTML(details) {
  return details.length > 1 ?
    /* html */`<ul>${details.map(detail => /* html */`<li>${detail}</li>`).join("")}</ul>` :
    details[0];
}