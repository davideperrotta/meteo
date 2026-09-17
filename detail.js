// DOM Elements
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');
const detailContent = document.getElementById('detailContent');
const backBtn = document.getElementById('backBtn');

document.addEventListener('DOMContentLoaded', () => {
    backBtn.addEventListener('click', () => {
        window.location.href = '/index.html';
    });
    loadCityDetail();
});

// Get province name from query string
function getProvinceName() {
    const params = new URLSearchParams(window.location.search);
    return params.get('province');
}

async function loadCityDetail() {
    const provinceName = getProvinceName();

    if (!provinceName) {
        window.location.href = '/index.html';
        return;
    }

    try {
        loadingSpinner.style.display = 'flex';
        errorMessage.style.display = 'none';
        detailContent.style.display = 'none';

        // Su schermi desktop mostriamo una fascia oraria più lunga
        const hours = window.innerWidth >= 900 ? 24 : 6;

        const data = await fetchProvinceDetail(provinceName, hours);

        loadingSpinner.style.display = 'none';
        renderDetail(data);
    } catch (error) {
        console.error('Errore nel caricamento del dettaglio:', error);
        loadingSpinner.style.display = 'none';
        errorMessage.style.display = 'block';
    }
}

function renderDetail(data) {
    document.getElementById('cityName').textContent = data.name;
    document.getElementById('cityRegion').textContent = data.region;

    document.getElementById('currentTemp').textContent = `${data.temperature}°C`;
    document.getElementById('currentIcon').textContent = data.weatherIcon;
    document.getElementById('currentDescription').textContent = data.weatherDescription;
    document.getElementById('currentMinMax').textContent =
        `Max: ${data.today.max}° / Min: ${data.today.min}°`;

    // Hourly forecast
    const hourlyContainer = document.getElementById('hourlyForecast');
    hourlyContainer.innerHTML = '';
    data.hourly.forEach(hour => {
        const item = document.createElement('div');
        item.className = 'hourly-item';
        item.innerHTML = `
            <div class="hourly-time">${hour.time}</div>
            <div class="hourly-icon">${hour.icon}</div>
            <div class="hourly-temp">${hour.temperature}°C</div>
        `;
        hourlyContainer.appendChild(item);
    });

    // 7-day forecast
    const dailyContainer = document.getElementById('dailyForecast');
    dailyContainer.innerHTML = '';
    data.daily.forEach(day => {
        const item = document.createElement('div');
        item.className = 'daily-item';
        item.innerHTML = `
            <div class="daily-day">${day.day}</div>
            <div class="daily-icon">${day.icon}</div>
            <div class="daily-minmax">${day.max}°/${day.min}°</div>
        `;
        dailyContainer.appendChild(item);
    });

    // Additional details
    const detailsList = document.getElementById('detailsList');
    const rows = [
        ['Umidità:', `${data.humidity}%`],
        ['Vento:', `${data.windSpeed} km/h ${data.windDirection}`],
        ['Probabilità Precipitazioni:', `${data.precipitationProbability}%`],
        ['Pressione:', `${data.pressure} hPa`],
        ['Indice UV:', `${data.uvIndex} ${data.uvLevel}`],
        ['Alba/Tramonto:', `${data.sunrise} / ${data.sunset}`]
    ];

    // Qualità dell'aria: mostrata solo se il dato è disponibile
    if (data.airQuality) {
        rows.push(['Qualità dell\'Aria (IQA):', `${data.airQuality.aqi} - ${data.airQuality.level}`]);
        if (data.airQuality.pm25 != null) {
            rows.push(['PM2.5:', `${data.airQuality.pm25} µg/m³`]);
        }
        if (data.airQuality.pm10 != null) {
            rows.push(['PM10:', `${data.airQuality.pm10} µg/m³`]);
        }
    }

    detailsList.innerHTML = rows.map(([label, value]) => `
        <div class="details-row">
            <span class="details-label">${label}</span>
            <span class="details-value">${value}</span>
        </div>
    `).join('');

    detailContent.style.display = 'block';
}
