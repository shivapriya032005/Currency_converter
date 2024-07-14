document.addEventListener('DOMContentLoaded', () => {
    const currencyList = [
        "USD", "EUR", "JPY", "GBP", "AUD", "CAD", "CHF", "CNY", "SEK", "NZD", "AFN", "ALL", "DZD", "AOA", "ARS", "AMD", "AWG", "AZN", "BSD", "BHD", "BDT", "BBD", "BYN", "BZD", "BMD", "BTN", "BOB", "BAM", "BWP", "BRL", "BND", "BGN", "BIF", "CVE", "KHR", "XAF", "XOF", "XPF", "CLP", "COP", "KMF", "CDF", "CRC", "HRK", "CUP", "CZK", "DKK", "DJF", "DOP", "EGP", "ERN", "ETB", "FJD", "GMD", "GEL", "GHS", "GTQ", "GNF", "GYD", "HTG", "HNL", "HKD", "HUF", "ISK", "INR", "IDR", "IRR", "IQD", "ILS", "JMD", "JOD", "KZT", "KES", "KWD", "KGS", "LAK", "LBP", "LSL", "LRD", "LYD", "MOP", "MKD", "MGA", "MWK", "MYR", "MVR", "MRU", "MUR", "MXN", "MDL", "MNT", "MAD", "MZN", "MMK", "NAD", "NPR", "ANG", "NIO", "NGN", "NOK", "OMR", "PKR", "PAB", "PGK", "PYG", "PEN", "PHP", "PLN", "QAR", "RON", "RUB", "RWF", "SHP", "WST", "STN", "SAR", "RSD", "SCR", "SLL", "SGD", "SBD", "SOS", "ZAR", "KRW", "SSP", "LKR", "SDG", "SRD", "SZL", "SYP", "TWD", "TJS", "TZS", "THB", "TOP", "TTD", "TND", "TRY", "TMT", "UGX", "UAH", "AED", "UYU", "UZS", "VUV", "VES", "VND", "YER", "ZMW", "ZWL"
        // This list should contain all the currencies you need
    ];

    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');
    const amountInput = document.getElementById('amount');
    const resultDiv = document.getElementById('result');
    const form = document.getElementById('converter-form');

    function populateCurrencyOptions() {
        currencyList.forEach(currency => {
            const option = document.createElement('option');
            option.value = currency;
            option.textContent = currency;
            fromCurrency.appendChild(option);
            toCurrency.appendChild(option.cloneNode(true));
        });
    }

    async function convertCurrency(amount, from, to) {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
        const data = await response.json();
        const rate = data.rates[to];
        return (amount * rate).toFixed(2);
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const amount = amountInput.value;
        const from = fromCurrency.value;
        const to = toCurrency.value;
        const convertedAmount = await convertCurrency(amount, from, to);
        resultDiv.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
    });

    populateCurrencyOptions();
});
