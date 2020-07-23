class Marquee {
  constructor(element) {
    this.element = element;
    this.sliceddata;
  }
  async getMarqueeData() {
    let marqueeURL = `https://financialmodelingprep.com/api/v3/stock/real-time-price?apikey=ed93f3e229380c530b7a0e7663f86b99`;
    let response = await fetch(marqueeURL);
    let data = await response.json();
    this.slicedData = data.stockList.slice(0, 50);
    this.populateMarquee();
  }
  populateMarquee() {
    let marqueeDiv = document.createElement("div");
    marqueeDiv.setAttribute("class", "marquee-div");
    marqueeDiv.setAttribute("id", "marqueeDiv");
    for (let i = 0; i < this.slicedData.length; i++) {
      let symbolBox = document.createElement("div");
      symbolBox.classList.add("pl-3", "pr-1", "symbol");
      let priceBox = document.createElement("div");
      priceBox.classList.add("price");
      symbolBox.innerText = this.slicedData[i].symbol;
      priceBox.innerText = this.slicedData[i].price;
      marqueeDiv.appendChild(symbolBox);
      marqueeDiv.appendChild(priceBox);
    }
    this.element.appendChild(marqueeDiv);
  }
}
