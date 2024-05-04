document.addEventListener('DOMContentLoaded', function() {
    function fetchDataUsingThen() {
        fetch(' https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
        .then(response => response.json())
        .then(data => {
            renderTable(data);
        })
        .catch(error => console.error('Error', error));
    }

    async function fetchDataUsingAsyncAwait() {
        try {
            const response = await fetch(' https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
            const data = await response.json();
            renderTable(data);
        } catch (error) {
            console.error('async/await Error:', error);
        }
    }
     function renderTable(data) {
        const tableBody = document.getElementById('tableBody');
        tableBody.innerHTML = '';

        data.forEach(coin => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td><img src="${coin.image}" alt="${coin.name}" width="50"></td>
            <td>${coin.symbol}</td>
                <td>${coin.name}</td>
                <td>${coin.id}</td>
                <td>$${coin.current_price} %</td>
                <td>Mkt Cap : $ ${coin.total_volume}</td>
            `;
            tableBody.appendChild(row);
        });
    }

document.getElementById('searchInput').addEventListener('input', function() {
    const searchText = this.value.toLowerCase();
    const rows = document.querySelectorAll('#tableBody tr');

    rows.forEach(row => {
        const name = row.querySelector('td:first-child').textContent.toLowerCase();
        if (name.includes(searchText)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});

document.getElementById('sortMarketCapBtn').addEventListener('click', function() {
    const rows = Array.from(document.querySelectorAll('#tableBody tr'));
    rows.sort((a, b) => {
        const marketCapA = parseFloat(a.querySelector('td:nth-child(5)').textContent.replace(/[^0-9.-]+/g,""));
        const marketCapB = parseFloat(b.querySelector('td:nth-child(5)').textContent.replace(/[^0-9.-]+/g,""));
        return marketCapB - marketCapA;
    });
    const tableBody = document.getElementById('tableBody');
    rows.forEach(row => tableBody.appendChild(row));
});

document.getElementById('sortPercentageChangeBtn').addEventListener('click', function() {
    const rows = Array.from(document.querySelectorAll('#tableBody tr'));
    rows.sort((a, b) => {
        const percentageChangeA = parseFloat(a.querySelector('td:nth-child(6)').textContent);
        const percentageChangeB = parseFloat(b.querySelector('td:nth-child(6)').textContent);
        return percentageChangeB - percentageChangeA;
    });
    const tableBody = document.getElementById('tableBody');
    rows.forEach(row => tableBody.appendChild(row));
});

fetchDataUsingThen();
fetchDataUsingAsyncAwait();
});
