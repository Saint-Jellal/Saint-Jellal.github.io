
// const WEB_APP_URL = 'https://cors-anywhere.herokuapp.com/script.google.com/macros/s/AKfycbz5aLZ5OIXAekH6MMmLxyuk2obM5Gm5e5gyMloR9B-9cwou3T4McZnZUTglpmzIYsEI/exec';
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbz5aLZ5OIXAekH6MMmLxyuk2obM5Gm5e5gyMloR9B-9cwou3T4McZnZUTglpmzIYsEI/exec';
let lastUpdateTime = 0;

// Check for updates every 5 seconds
setInterval(fetchData, 5000);
fetchData(); // Initial load

async function fetchData() {
    document.getElementById('status').className = 'loading';
    
    try {
    const response = await fetch(`${WEB_APP_URL}?cachebuster=${Date.now()}`);
    const result = await response.json();
    
    if (result.lastUpdated > lastUpdateTime) {
        lastUpdateTime = result.lastUpdated;
        updateTable(result.data);
    }
    } catch (error) {
    console.error('Error:', error);
    } finally {
    document.getElementById('status').className = '';
    }
}

function updateTable(data) {
    const container = document.getElementById('tableContainer');
    let html = '<table><tr>';
    
    // Create headers
    if (data.length > 0) {
    data[0].forEach(header => {
        html += `<th>${header}</th>`;
    });
    html += '</tr>';
    
    // Create rows (skip header if present)
    const startRow = data.length > 1 && Array.isArray(data[0]) ? 1 : 0;
    for (let i = startRow; i < data.length; i++) {
        html += '<tr>';
        data[i].forEach(cell => {
        html += `<td>${cell || ''}</td>`;
        });
        html += '</tr>';
    }
    }
    
    html += '</table>';
    container.innerHTML = html;
    document.getElementById('status').textContent = `Last updated: ${new Date().toLocaleTimeString()}`;
    
    console.log(response.data);
}

function loadData() {
    const script = document.createElement('script');
    script.src = `${WEB_APP_URL}?callback=updateTable`;
    document.body.appendChild(script);
}