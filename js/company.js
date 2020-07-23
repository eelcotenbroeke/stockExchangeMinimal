var urlParams = new URLSearchParams(window.location.search);
let param = urlParams.get("symbol");
let globalCompanyData = onScreenLoad();

async function onScreenLoad() {
  let companyURL = `https://financialmodelingprep.com/api/v3/profile/${param}?apikey=ed93f3e229380c530b7a0e7663f86b99`;
  let stockPriceHistoryURL = `https://financialmodelingprep.com/api/v3/historical-price-full/${param}?serietype=line&apikey=ed93f3e229380c530b7a0e7663f86b99`;
  let responseCompany = await fetch(companyURL);
  let dataCompany = await responseCompany.json();
  let responseHistory = await fetch(stockPriceHistoryURL);
  let dataHistory = await responseHistory.json();
  displayCompanyProfile(dataCompany);
  displayStockPriceHistory(dataHistory);
}

function displayCompanyProfile(companyProfile) {
  for (let i = 0; i < companyProfile.length; i++) {
    let companyDataPoints = companyProfile[i];
    const companyLogo = document.getElementById("companyLogo");
    let cLogo = companyDataPoints.image;
    const cLogoBox = document.createElement("img");
    cLogoBox.src = cLogo;
    cLogoBox.classList.add("logo");
    companyLogo.appendChild(cLogoBox);

    cName = companyDataPoints.companyName;
    const cNameBox = document.getElementById("companyName");
    cNameBox.innerText = cName;

    let cDescription = companyDataPoints.description;
    const cDescriptionBox = document.getElementById("companyDescription");
    cDescriptionBox.innerText = cDescription;

    let cPrice = companyDataPoints.price;
    const cPriceBox = document.getElementById("companyPrice");
    cPriceBox.innerText = cPrice;

    let cChanges = companyDataPoints.changes;
    const cChangesBox = document.getElementById("companyChanges");
    cChangesBox.innerText = cChanges;
    checkNegativePositive(cChanges);
  }
}

function checkNegativePositive(inputToCheck) {
  let percent = document.getElementById("companyChanges");
  if (inputToCheck < 0) {
    percent.style.color = "red";
  } else {
    percent.style.color = "green";
  }
}

function displayStockPriceHistory(historicData) {
  let historyData = historicData.historical;
  let dateHistory = [];
  let priceHistory = [];
  for (let i = 0; i < historyData.length; i++) {
    dateHistory.push(historyData[i].date);
    priceHistory.push(historyData[i].close);
  }
  makeHistoryObjectsGlobal(historyData);
}

let historyObjects = [];
let historyObjectsReversed = [];

function renameKeys(objects) {
  for (let i = 0; i < objects.length; i++) {
    objects[i].label = objects[i].date;
    objects[i].y = objects[i].close;
    delete objects[i].date;
    delete objects[i].close;
  }
  sortData(objects);
}

function sortData(objects) {
  let newArray = objects.sort((a, b) => {
    if (a.label < b.label) {
      return -1;
    } else {
      return 1;
    }
  });
  return newArray;
}

function makeHistoryObjectsGlobal(historyObject) {
  for (let i = 0; i < historyObject.length; i++) {
    historyObjects.push(historyObject[i]);
  }
  renameKeys(historyObjects);
  renderChart(historyObjects);
}

function renderChart(dataPoints) {
  var chart = new CanvasJS.Chart("chartContainer", {
    title: {
      fontSize: 24,
      fontFamily: "arial",
      text: "Stock price history",
    },
    data: [
      {
        type: "line",
        dataPoints: dataPoints,
      },
    ],
  });
  chart.render();
}
