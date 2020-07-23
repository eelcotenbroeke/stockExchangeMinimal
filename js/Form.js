class Form {
  constructor(element) {
    this.element = element;
    this.build = this.buildForm();
  }

  buildForm() {
    const form = this.element;
    let inputfield = document.createElement("input");
    let button = document.createElement("button");

    form.classList.add("input-form", "d-flex", "form-group", "stock-form");
    inputfield.classList.add("form-control", "stockInput");
    button.classList.add("btn", "btn-primary", "stock-search-button");

    inputfield.setAttribute("id", "stockSymbolInput");
    inputfield.setAttribute("type", "text");

    button.setAttribute("id", "searchButton");
    button.setAttribute("type", "submit");

    button.innerText = "Search";

    form.append(inputfield, button);
  }

  fetchData(callback) {
    console.log("fetchdata");
    let searchButton = document.getElementById("searchButton");
    searchButton.addEventListener("click", async () => {
      this.showSpinner();
      let value = document.getElementById("stockSymbolInput").value;
      const searchValueURL = `https://financialmodelingprep.com/api/v3/search?query=${value}&limit=10&exchange=NASDAQ&apikey=ed93f3e229380c530b7a0e7663f86b99`;
      let searchResultsJson = await fetch(searchValueURL);
      let searchResults = await searchResultsJson.json();
      callback(searchResults);
    });
  }

  showSpinner() {
    let spinner = document.getElementById("spinnerHome");
    spinner.classList.remove("d-none");
  }
}
