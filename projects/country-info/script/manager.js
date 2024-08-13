import Country from "./country.js"

export default class CountryManager {
  countries;
  table;
  filter = "";
  sort = { name: "name", asc: true };

  async load() {
    const result = await fetch("https://restcountries.com/v3.1/all");
    const all = await result.json();
    this.countries = all.map(data => new Country(data));
  }

  createTable(onRowClick) {
    this.table = document.createElement("table");
    this.countries.forEach(country => country.createTableRow(onRowClick));
    this.updateTable();
    return this.table;
  }

  updateTable() {
    const thead = this.getTHead();
    const tbody = this.getTBody();
    this.table.innerHTML = "";
    this.table.append(thead, tbody);
  }

  getTHead() {
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");

    Country.tableColumns.forEach(col => {
      const th = document.createElement("th");
      tr.append(th);

      if (col.sort) {
        const btn = document.createElement("button");
        btn.innerText = col.label;
        th.append(btn);

        if (this.sort.name == col.name) {
          btn.innerHTML += /* html */`<i>${this.sort.asc ? "↑" : "↓"}</i>`;
        }

        btn.addEventListener("click", () => {
          const sortAsc = this.sort.name != col.name || !this.sort.asc;
          this.sort = { name: col.name, asc: sortAsc };
          this.updateTable();
        });
      } else {
        th.innerText = col.label;
      }
    });

    thead.append(tr);

    return thead;
  }

  getTBody() {
    let countries = this.countries;
    const tbody = document.createElement("tbody");

    if (this.filter) {
      countries = countries.filter(country =>
        country.name.toLowerCase().includes(this.filter) ||
        country.code.toLowerCase().includes(this.filter)
      );
    }

    countries.sort((a, b) => {
      let asc = false;
      a = a[this.sort.name];
      b = b[this.sort.name];

      if (typeof a == "number") {
        asc = a - b;
      } else if (typeof a == "string") {
        asc = a.localeCompare(b);
      } else if (typeof a == "boolean") {
        asc = Number(a) - Number(b);
      }

      return this.sort.asc ? asc : -asc;
    });

    tbody.append(...countries.map(country => country.tr));

    return tbody;
  }
}