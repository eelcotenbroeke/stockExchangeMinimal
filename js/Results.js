class Results {
  constructor(element) {
    this.element = element;
    this.companies;
  }

  async fetchCompanyData(basicData) {
    this.deleteList();
    for (let i = 0; i < basicData.length; i++) {
      let enrichedURL = `https://financialmodelingprep.com/api/v3/profile/${basicData[i].symbol}?apikey=ed93f3e229380c530b7a0e7663f86b99`;
      let response = await fetch(enrichedURL);
      let data = await response.json();
      basicData[i].newData = data;
      this.buildListResult(data);
    }
    this.companies = basicData;
  }

  deleteList() {
    let legacyResults = this.element;
    while (legacyResults.hasChildNodes()) {
      legacyResults.removeChild(legacyResults.firstChild);
    }
    this.hideSpinner();
  }

  buildListResult(data) {
    let listItem = document.createElement("div");
    listItem.classList.add("list-item");

    let imageBox = document.createElement("img");
    let symbolBox = document.createElement("span");
    let changesBox = document.createElement("span");
    let anchorTag = document.createElement("a");
    let compareButton = document.createElement("button");

    let image = data.map((company) => company.image);
    let name = data.map((company) => company.companyName);
    let symbol = data.map((company) => company.symbol);
    let changes = data.map((company) => company.changes);

    listItem.setAttribute("id", this.symbol);
    imageBox.classList.add("logo");
    changesBox.setAttribute("id", this.symbol);
    changesBox.classList.add("changes");
    compareButton.classList.add(
      "btn",
      "btn-primary",
      "stock-compare-button",
      symbol
    );
    compareButton.setAttribute("type", "click");
    compareButton.addEventListener("click", () => {
      data.map((company) => {
        console.log(company);
      });
    });

    imageBox.src = image;
    symbolBox.innerHTML = symbol;
    changesBox.innerText = changes;
    compareButton.innerText = "compare";
    this.checkNegativePositive(changes, changesBox);
    anchorTag.href = `./company.html?symbol=${symbol}`;
    anchorTag.innerHTML = name;

    listItem.append(imageBox, anchorTag, symbolBox, changesBox, compareButton);

    this.element.appendChild(listItem);
    this.markText(name, symbol, symbolBox, anchorTag);
  }

  //add to compare lits is not finished yet//
  // addToCompareList() {
  //   let buttonGroup = document.createElement("div");
  //   buttonGroup.classList.add("btn-group");
  //   buttonGroup.setAttribute("id", "buttonGroup");
  //   buttonGroup.setAttribute("role", "group");

  //   let symbolButton = document.createElement("button");
  //   symbolButton.classList.add("btn", "btn-secondary", "symbolButton");
  //   symbolButton.setAttribute("id", "symbolButton");
  //   symbolButton.innerText = symbol;

  //   let removeButton = document.createElement("button");
  //   removeButton.classList.add("btn", "btn-secondary", "removeButton");
  //   removeButton.setAttribute("id", "removeButton");
  //   removeButton.innerText = "X";

  //   buttonGroup.append(symbolButton, removeButton);

  //   let inputfield = document.getElementById("stockSymbolInput");
  //   inputfield.append(this.buttonGroup);
  // }

  markText(name, symbol, symbolBox, anchorTag) {
    let stringToBeSearched = document.getElementById("stockSymbolInput").value;
    if (stringToBeSearched.length < 1) {
    } else {
      if (name[0] != null) {
        let newName = name.map((item) => item.length);
        if (newName.length < 1) {
        } else {
          let markedNameText = name[0].replace(
            new RegExp(stringToBeSearched, "gi"),
            `<mark>${stringToBeSearched}</mark>`
          );
          let markedSymbolText = symbol[0].replace(
            new RegExp(stringToBeSearched, "gi"),
            `<mark>${stringToBeSearched}</mark>`
          );
          symbolBox.innerHTML = markedSymbolText;
          anchorTag.innerHTML = markedNameText;
        }
      } else {
      }
    }
  }

  checkNegativePositive(changes, element) {
    if (changes < 0) {
      element.style.color = "red";
    } else element.style.color = "green";
  }

  hideSpinner() {
    let spinner = document.getElementById("spinnerHome");
    spinner.classList.add("d-none");
  }
}
