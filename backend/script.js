const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        authorization:
            "Apikey 12cf737238073ecf15c93205c7c6761ae97b48bc5891dce28d33d39d90b34278",
    },
};

function updateCurrencyList() {
    fetch("https://min-api.cryptocompare.com/data/all/coinlist", options)
        .then((response) => response.json())
        .then((data) => {
            const currencyList = Object.values(data.Data).map(
                (currency) => currency.Symbol
            );
            const fromCurrencyDataList =
                document.getElementById("from_currency");
            const toCurrencyDataList = document.getElementById("to_currency");

            fromCurrencyDataList.innerHTML = "";
            toCurrencyDataList.innerHTML = "";

            currencyList.forEach((currency) => {
                const option = document.createElement("option");
                option.value = currency;
                fromCurrencyDataList.appendChild(option.cloneNode(true));
                toCurrencyDataList.appendChild(option);
            });
        })
        .catch((error) => console.error("Ошибка при получении данных:", error));
}

function getPrice(amount, firstCurrency, secondCurrency) {
    fetch(
        `https://min-api.cryptocompare.com/data/price?fsym=${firstCurrency}&tsyms=${secondCurrency}`,
        options
    )
        .then((response) => response.json())
        .then((data) => {
            let result = amount * data[secondCurrency];
            document.querySelector(
                ".result"
            ).textContent = `Result is ${result}`;
        });
}

function convertValues() {
    let amount = document.getElementById("amount_i").value;
    let fromCurrency = document.getElementById("from_currency_i").value;
    let toCurrency = document.getElementById("to_currency_i").value;
    getPrice(amount, fromCurrency, toCurrency);
}

document
    .getElementById("convertButton")
    .addEventListener("click", convertValues);

updateCurrencyList();
setInterval(updateCurrencyList, 300000);
