// DOM Elements
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');
const detailContent = document.getElementById('detailContent');
const backBtn = document.getElementById('backBtn');
const comuneSearchInput = document.getElementById('comuneSearchInput');
const comuneSearchResults = document.getElementById('comuneSearchResults');

document.addEventListener('DOMContentLoaded', () => {
    backBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
    setupComuneSearch();
    loadCityDetail();
});

// Legge la località da mostrare dalla query string.
// Supporta sia il vecchio formato (?province=Nome) sia lat/lon diretti (?name=&region=&lat=&lon=),
// usati per i comuni trovati tramite la ricerca.
function getLocationFromQuery() {
    const params = new URLSearchParams(window.location.search);
    const lat = parseFloat(params.get('lat'));
    const lon = parseFloat(params.get('lon'));

    if (!Number.isNaN(lat) && !Number.isNaN(lon) && params.get('name')) {
        return {
            name: params.get('name'),
            region: params.get('region') || '',
            lat,
            lon
        };
    }

    const provinceName = params.get('province');
    return provinceName ? { province: provinceName } : null;
}

async function loadCityDetail() {
    const location = getLocationFromQuery();

    if (!location) {
        window.location.href = 'index.html';
        return;
    }

    try {
        loadingSpinner.style.display = 'flex';
        errorMessage.style.display = 'none';
        detailContent.style.display = 'none';

        // Su schermi desktop mostriamo una fascia oraria più lunga
        const hours = window.innerWidth >= 900 ? 24 : 6;

        const data = location.province
            ? await fetchProvinceDetail(location.province, hours)
            : await fetchLocationDetail(location, hours);

        loadingSpinner.style.display = 'none';
        renderDetail(data);
    } catch (error) {
        console.error('Errore nel caricamento del dettaglio:', error);
        loadingSpinner.style.display = 'none';
        errorMessage.style.display = 'block';
    }
}

// Configura la barra di ricerca dei comuni, con debounce sulle chiamate alla geocoding API
function setupComuneSearch() {
    let debounceTimer = null;
    let requestId = 0;

    comuneSearchInput.addEventListener('input', (e) => {
        const term = e.target.value;
        clearTimeout(debounceTimer);

        if (term.trim().length < 2) {
            hideComuneResults();
            return;
        }

        debounceTimer = setTimeout(async () => {
            const currentRequestId = ++requestId;
            try {
                const results = await searchComuni(term);
                // Ignora risposte arrivate in ritardo rispetto a una ricerca più recente
                if (currentRequestId !== requestId) return;
                renderComuneResults(results);
            } catch (error) {
                console.error('Errore nella ricerca comuni:', error);
                if (currentRequestId === requestId) hideComuneResults();
            }
        }, 350);
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.comune-search-container')) {
            hideComuneResults();
        }
    });
}

function hideComuneResults() {
    comuneSearchResults.style.display = 'none';
    comuneSearchResults.innerHTML = '';
}

function renderComuneResults(results) {
    comuneSearchResults.innerHTML = '';

    if (results.length === 0) {
        comuneSearchResults.innerHTML = '<div class="comune-search-message">Nessun comune trovato.</div>';
        comuneSearchResults.style.display = 'block';
        return;
    }

    results.forEach((result) => {
        const item = document.createElement('div');
        item.className = 'comune-result-item';
        const subtitle = [result.province, result.region].filter(Boolean).join(' · ');
        item.innerHTML = `
            <div class="comune-result-name">${result.name}</div>
            <div class="comune-result-region">${subtitle}</div>
        `;
        item.addEventListener('click', () => selectComune(result));
        comuneSearchResults.appendChild(item);
    });

    comuneSearchResults.style.display = 'block';
}

// Naviga verso il dettaglio del comune selezionato aggiornando la query string
function selectComune(result) {
    const params = new URLSearchParams({
        name: result.name,
        region: result.region || result.province || '',
        lat: result.lat,
        lon: result.lon
    });

    window.location.href = `detail.html?${params.toString()}`;
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
