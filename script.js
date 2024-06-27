const options = {
    method: 'GET',
    headers: {accept: 'application/json', authorization: 'Apikey 12cf737238073ecf15c93205c7c6761ae97b48bc5891dce28d33d39d90b34278'}
}

function updateCurrencyList() {
    fetch('https://min-api.cryptocompare.com/data/blockchain/list', options)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const currencyList = Object.values(data.Data).map(currency => currency.symbol);
            const fromCurrencyDataList = document.getElementById('from_currency')
            const toCurrencyDataList = document.getElementById('to_currency')

            fromCurrencyDataList.innerHTML = '';
            toCurrencyDataList.innerHTML = '';

            currencyList.forEach(currency => {
                const option = document.createElement('option');
                option.value = currency;
                fromCurrencyDataList.appendChild(option.cloneNode(true));
                toCurrencyDataList.appendChild(option);
            });
        })
        .catch(error => console.error("Ошибка при получении данных:", error));

    }
    
updateCurrencyList();
setInterval(updateCurrencyList, 300000);