// Modulo client-side per il recupero dei dati meteo direttamente da Open-Meteo.
// Usato sia da app.js (lista province) sia da detail.js (dettaglio città),
// permette all'app di funzionare come sito statico (es. GitHub Pages) senza backend.

const provinces = [
  { name: 'Agrigento', region: 'Sicilia', lat: 37.3089, lon: 13.5856 },
  { name: 'Alessandria', region: 'Piemonte', lat: 44.9139, lon: 8.6283 },
  { name: 'Ancona', region: 'Marche', lat: 43.6158, lon: 13.5007 },
  { name: 'Aosta', region: 'Valle d\'Aosta', lat: 45.7345, lon: 7.3154 },
  { name: 'Ascoli Piceno', region: 'Marche', lat: 42.8561, lon: 13.5762 },
  { name: 'Asti', region: 'Piemonte', lat: 44.8971, lon: 8.2119 },
  { name: 'Avellino', region: 'Campania', lat: 40.9158, lon: 14.7928 },
  { name: 'Bari', region: 'Puglia', lat: 41.1239, lon: 16.8704 },
  { name: 'Barletta-Andria-Trani', region: 'Puglia', lat: 41.3275, lon: 16.2902 },
  { name: 'Belluno', region: 'Veneto', lat: 46.1408, lon: 12.2160 },
  { name: 'Benevento', region: 'Campania', lat: 41.1393, lon: 14.7681 },
  { name: 'Bergamo', region: 'Lombardia', lat: 45.6983, lon: 9.6722 },
  { name: 'Biella', region: 'Piemonte', lat: 45.5609, lon: 8.0531 },
  { name: 'Biellese', region: 'Piemonte', lat: 45.5609, lon: 8.0531 },
  { name: 'Bolzano', region: 'Trentino-Alto Adige', lat: 46.4983, lon: 11.3548 },
  { name: 'Bologna', region: 'Emilia-Romagna', lat: 44.4949, lon: 11.3426 },
  { name: 'Bolzano/Bozen', region: 'Trentino-Alto Adige', lat: 46.4983, lon: 11.3548 },
  { name: 'Brescia', region: 'Lombardia', lat: 45.5384, lon: 10.2116 },
  { name: 'Brindisi', region: 'Puglia', lat: 40.6267, lon: 17.9536 },
  { name: 'Cagliari', region: 'Sardegna', lat: 39.2238, lon: 9.1217 },
  { name: 'Caltanissetta', region: 'Sicilia', lat: 37.4869, lon: 14.0440 },
  { name: 'Campobasso', region: 'Molise', lat: 41.5628, lon: 14.6597 },
  { name: 'Carbonia-Iglesias', region: 'Sardegna', lat: 39.1625, lon: 8.5138 },
  { name: 'Caserta', region: 'Campania', lat: 41.2938, lon: 14.3334 },
  { name: 'Catania', region: 'Sicilia', lat: 37.4979, lon: 15.0873 },
  { name: 'Catanzaro', region: 'Calabria', lat: 38.8901, lon: 16.5987 },
  { name: 'Chieti', region: 'Abruzzo', lat: 42.3540, lon: 14.1673 },
  { name: 'Como', region: 'Lombardia', lat: 45.8086, lon: 9.0850 },
  { name: 'Cosenza', region: 'Calabria', lat: 39.2919, lon: 16.2510 },
  { name: 'Cremona', region: 'Lombardia', lat: 45.1357, lon: 10.0261 },
  { name: 'Crotone', region: 'Calabria', lat: 39.0800, lon: 17.1199 },
  { name: 'Cuneo', region: 'Piemonte', lat: 44.3881, lon: 7.5412 },
  { name: 'Enna', region: 'Sicilia', lat: 37.5670, lon: 14.2764 },
  { name: 'Ferrara', region: 'Emilia-Romagna', lat: 44.8381, lon: 11.6256 },
  { name: 'Fermo', region: 'Marche', lat: 43.1753, lon: 13.7272 },
  { name: 'Firenze', region: 'Toscana', lat: 43.7696, lon: 11.2558 },
  { name: 'Foggia', region: 'Puglia', lat: 41.4625, lon: 15.5448 },
  { name: 'Forlì-Cesena', region: 'Emilia-Romagna', lat: 44.2167, lon: 12.0500 },
  { name: 'Frosinone', region: 'Lazio', lat: 41.6041, lon: 13.3436 },
  { name: 'Genova', region: 'Liguria', lat: 44.4056, lon: 8.9463 },
  { name: 'Gorizia', region: 'Friuli-Venezia Giulia', lat: 45.9579, lon: 13.6203 },
  { name: 'Grosseto', region: 'Toscana', lat: 42.7614, lon: 11.1181 },
  { name: 'Imperia', region: 'Liguria', lat: 43.8871, lon: 8.0300 },
  { name: 'Isernia', region: 'Molise', lat: 41.5889, lon: 14.2269 },
  { name: 'L\'Aquila', region: 'Abruzzo', lat: 42.3515, lon: 13.3995 },
  { name: 'La Spezia', region: 'Liguria', lat: 43.9159, lon: 9.8200 },
  { name: 'Latina', region: 'Lazio', lat: 41.4654, lon: 12.8687 },
  { name: 'Lecce', region: 'Puglia', lat: 40.3569, lon: 18.1739 },
  { name: 'Lecco', region: 'Lombardia', lat: 45.8575, lon: 9.3957 },
  { name: 'Livorno', region: 'Toscana', lat: 43.5520, lon: 10.3078 },
  { name: 'Lodi', region: 'Lombardia', lat: 45.3130, lon: 9.5030 },
  { name: 'Lucca', region: 'Toscana', lat: 43.8429, lon: 10.5028 },
  { name: 'Macerata', region: 'Marche', lat: 43.3009, lon: 13.4519 },
  { name: 'Mantova', region: 'Lombardia', lat: 45.1564, lon: 10.7974 },
  { name: 'Massa-Carrara', region: 'Toscana', lat: 44.0310, lon: 10.1367 },
  { name: 'Matera', region: 'Basilicata', lat: 40.6656, lon: 16.6021 },
  { name: 'Medio Campidano', region: 'Sardegna', lat: 39.6500, lon: 8.6500 },
  { name: 'Messina', region: 'Sicilia', lat: 38.1938, lon: 15.5540 },
  { name: 'Milano', region: 'Lombardia', lat: 45.4642, lon: 9.1900 },
  { name: 'Modena', region: 'Emilia-Romagna', lat: 44.6471, lon: 10.9252 },
  { name: 'Monza e Brianza', region: 'Lombardia', lat: 45.5800, lon: 9.2700 },
  { name: 'Napoli', region: 'Campania', lat: 40.8518, lon: 14.2681 },
  { name: 'Novara', region: 'Piemonte', lat: 45.4454, lon: 8.6236 },
  { name: 'Nuoro', region: 'Sardegna', lat: 40.3182, lon: 9.3304 },
  { name: 'Ogliastra', region: 'Sardegna', lat: 40.0000, lon: 9.5000 },
  { name: 'Olbia-Tempio', region: 'Sardegna', lat: 40.9181, lon: 9.5144 },
  { name: 'Oristano', region: 'Sardegna', lat: 39.9034, lon: 8.5874 },
  { name: 'Orzinuovi', region: 'Lombardia', lat: 45.3000, lon: 10.1500 },
  { name: 'Padova', region: 'Veneto', lat: 45.4154, lon: 11.8768 },
  { name: 'Palermo', region: 'Sicilia', lat: 38.1157, lon: 13.3615 },
  { name: 'Parma', region: 'Emilia-Romagna', lat: 44.8015, lon: 10.3279 },
  { name: 'Pavia', region: 'Lombardia', lat: 45.1852, lon: 9.1581 },
  { name: 'Perugia', region: 'Umbria', lat: 43.1122, lon: 12.3888 },
  { name: 'Pesaro e Urbino', region: 'Marche', lat: 43.8987, lon: 12.9167 },
  { name: 'Pescara', region: 'Abruzzo', lat: 42.4584, lon: 14.2081 },
  { name: 'Piacenza', region: 'Emilia-Romagna', lat: 45.0527, lon: 9.6996 },
  { name: 'Pisa', region: 'Toscana', lat: 43.7228, lon: 10.3969 },
  { name: 'Pistoia', region: 'Toscana', lat: 43.9354, lon: 10.9167 },
  { name: 'Potenza', region: 'Basilicata', lat: 40.6021, lon: 15.7958 },
  { name: 'Prato', region: 'Toscana', lat: 43.8781, lon: 11.0965 },
  { name: 'Ragusa', region: 'Sicilia', lat: 36.9239, lon: 14.7282 },
  { name: 'Ravenna', region: 'Emilia-Romagna', lat: 44.4149, lon: 12.1971 },
  { name: 'Reggio Calabria', region: 'Calabria', lat: 38.1156, lon: 15.6915 },
  { name: 'Reggio Emilia', region: 'Emilia-Romagna', lat: 44.6989, lon: 10.6324 },
  { name: 'Rieti', region: 'Lazio', lat: 42.4081, lon: 12.8660 },
  { name: 'Rimini', region: 'Emilia-Romagna', lat: 44.0571, lon: 12.5674 },
  { name: 'Roma', region: 'Lazio', lat: 41.9028, lon: 12.4964 },
  { name: 'Rovigo', region: 'Veneto', lat: 45.0705, lon: 11.7842 },
  { name: 'Salerno', region: 'Campania', lat: 40.6819, lon: 14.7671 },
  { name: 'Salto-Cicolano', region: 'Lazio', lat: 42.4000, lon: 12.8000 },
  { name: 'Sassari', region: 'Sardegna', lat: 40.7272, lon: 8.5597 },
  { name: 'Savona', region: 'Liguria', lat: 44.3106, lon: 8.4806 },
  { name: 'Siena', region: 'Toscana', lat: 43.3186, lon: 11.3305 },
  { name: 'Siracusa', region: 'Sicilia', lat: 37.0752, lon: 15.2842 },
  { name: 'Sondrio', region: 'Lombardia', lat: 46.1699, lon: 10.1117 },
  { name: 'Taranto', region: 'Puglia', lat: 40.4724, lon: 17.0064 },
  { name: 'Teramo', region: 'Abruzzo', lat: 42.6589, lon: 13.7042 },
  { name: 'Terni', region: 'Umbria', lat: 42.5615, lon: 12.6447 },
  { name: 'Terracina', region: 'Lazio', lat: 41.2833, lon: 13.2333 },
  { name: 'Tivoli', region: 'Lazio', lat: 41.9603, lon: 12.7995 },
  { name: 'Torino', region: 'Piemonte', lat: 45.0705, lon: 7.6868 },
  { name: 'Trapani', region: 'Sicilia', lat: 37.9188, lon: 12.5964 },
  { name: 'Trentino-Alto Adige', region: 'Trentino-Alto Adige', lat: 46.0000, lon: 11.0000 },
  { name: 'Trento', region: 'Trentino-Alto Adige', lat: 46.0748, lon: 11.1217 },
  { name: 'Treviso', region: 'Veneto', lat: 45.6671, lon: 12.2414 },
  { name: 'Trieste', region: 'Friuli-Venezia Giulia', lat: 45.6500, lon: 13.7800 },
  { name: 'Udine', region: 'Friuli-Venezia Giulia', lat: 46.0629, lon: 13.2345 },
  { name: 'Urbino', region: 'Marche', lat: 43.7272, lon: 12.6379 },
  { name: 'Varese', region: 'Lombardia', lat: 45.8168, lon: 8.6554 },
  { name: 'Vasto', region: 'Abruzzo', lat: 42.1633, lon: 14.7117 },
  { name: 'Venezia', region: 'Veneto', lat: 45.4408, lon: 12.3155 },
  { name: 'Verbania', region: 'Piemonte', lat: 45.9333, lon: 8.5500 },
  { name: 'Vercelli', region: 'Piemonte', lat: 45.3209, lon: 8.4211 },
  { name: 'Verona', region: 'Veneto', lat: 45.4386, lon: 10.9916 },
  { name: 'Vibo Valentia', region: 'Calabria', lat: 38.6670, lon: 16.1000 },
  { name: 'Vicenza', region: 'Veneto', lat: 45.5545, lon: 11.5418 },
  { name: 'Viterbo', region: 'Lazio', lat: 42.4204, lon: 12.1097 }
];

// Cache in memoria (dura finché la pagina resta aperta) per ridurre le chiamate ripetute
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minuti
let weatherListCache = { data: null, timestamp: 0 };
const weatherDetailCache = new Map();

// Funzione per ottenere la descrizione del meteo dal codice WMO
function getWeatherDescription(code) {
    const weatherCodes = {
        0: 'Sereno',
        1: 'Sereno',
        2: 'Parzialmente Nuvoloso',
        3: 'Nuvoloso',
        45: 'Nebbioso',
        48: 'Nebbioso',
        51: 'Pioggia Leggera',
        53: 'Pioggia Leggera',
        55: 'Pioggia Leggera',
        61: 'Pioggia',
        63: 'Pioggia',
        65: 'Pioggia Forte',
        71: 'Neve Leggera',
        73: 'Neve',
        75: 'Neve Forte',
        77: 'Neve',
        80: 'Pioggia Leggera',
        81: 'Pioggia',
        82: 'Pioggia Forte',
        85: 'Neve Leggera',
        86: 'Neve Forte',
        95: 'Temporale',
        96: 'Temporale con Grandine',
        99: 'Temporale con Grandine'
    };
    return weatherCodes[code] || 'Sconosciuto';
}

// Funzione per ottenere l'icona del meteo dal codice WMO
function getWeatherIcon(code) {
    if (code === 0 || code === 1) return '☀️';
    if (code === 2) return '⛅';
    if (code === 3) return '☁️';
    if (code === 45 || code === 48) return '🌫️';
    if (code >= 51 && code <= 67) return '🌧️';
    if (code === 71 || code === 73 || code === 75 || code === 77 || code === 85 || code === 86) return '❄️';
    if (code >= 80 && code <= 82) return '🌧️';
    if (code >= 95 && code <= 99) return '⛈️';
    return '❓';
}

// Funzione per ottenere il punto cardinale dalla direzione del vento in gradi
function getWindDirection(degrees) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
}

// Funzione per ottenere il livello dell'indice UV
function getUvLevel(uv) {
    if (uv < 3) return 'Basso';
    if (uv < 6) return 'Moderato';
    if (uv < 8) return 'Alto';
    if (uv < 11) return 'Molto Alto';
    return 'Estremo';
}

// Funzione per ottenere il livello descrittivo dell'indice europeo di qualità dell'aria (EAQI)
function getAqiLevel(aqi) {
    if (aqi <= 20) return 'Buona';
    if (aqi <= 40) return 'Discreta';
    if (aqi <= 60) return 'Moderata';
    if (aqi <= 80) return 'Scarsa';
    if (aqi <= 100) return 'Molto Scarsa';
    return 'Estrema';
}

// Funzione per formattare l'etichetta del giorno (es. "Ven 12")
function formatDayLabel(dateStr) {
    const date = new Date(`${dateStr}T12:00:00`);
    const dayNames = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];
    return `${dayNames[date.getDay()]} ${date.getDate()}`;
}

// Recupera i dati meteo correnti per tutte le province in un'unica chiamata batch
// (Open-Meteo supporta coordinate multiple separate da virgola, evitando 100+ richieste parallele)
async function fetchProvinceList() {
    const now = Date.now();
    if (weatherListCache.data && now - weatherListCache.timestamp < CACHE_TTL_MS) {
        return weatherListCache.data;
    }

    const latitude = provinces.map((p) => p.lat).join(',');
    const longitude = provinces.map((p) => p.lon).join(',');

    const url = new URL('https://api.open-meteo.com/v1/forecast');
    url.searchParams.set('latitude', latitude);
    url.searchParams.set('longitude', longitude);
    url.searchParams.set('current', 'temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m,pressure_msl');
    url.searchParams.set('timezone', 'Europe/Rome');

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const results = await response.json();
    const resultsArray = Array.isArray(results) ? results : [results];

    const weatherData = provinces.map((province, index) => {
        const current = resultsArray[index]?.current;

        if (!current) {
            return {
                name: province.name,
                region: province.region,
                temperature: 'N/A',
                weatherDescription: 'Dati non disponibili',
                weatherIcon: '❓',
                humidity: 'N/A',
                windSpeed: 'N/A',
                pressure: 'N/A'
            };
        }

        return {
            name: province.name,
            region: province.region,
            temperature: Math.round(current.temperature_2m),
            weatherDescription: getWeatherDescription(current.weather_code),
            weatherIcon: getWeatherIcon(current.weather_code),
            humidity: current.relative_humidity_2m,
            windSpeed: Math.round(current.wind_speed_10m),
            pressure: current.pressure_msl
        };
    });

    weatherData.sort((a, b) => a.name.localeCompare(b.name, 'it'));

    weatherListCache = { data: weatherData, timestamp: now };
    return weatherData;
}

// Recupera i dati sulla qualità dell'aria (best-effort: se il servizio non è disponibile, torna null)
async function fetchAirQuality(province) {
    try {
        const url = new URL('https://air-quality-api.open-meteo.com/v1/air-quality');
        url.searchParams.set('latitude', province.lat);
        url.searchParams.set('longitude', province.lon);
        url.searchParams.set('current', 'european_aqi,pm10,pm2_5');
        url.searchParams.set('timezone', 'Europe/Rome');

        const response = await fetch(url);
        if (!response.ok) return null;

        const data = await response.json();
        const current = data?.current;
        if (!current || current.european_aqi == null) return null;

        return {
            aqi: Math.round(current.european_aqi),
            level: getAqiLevel(current.european_aqi),
            pm10: current.pm10,
            pm25: current.pm2_5
        };
    } catch (error) {
        console.error(`Errore nel recupero qualità dell'aria per ${province.name}:`, error.message);
        return null;
    }
}

// Recupera il dettaglio meteo completo (corrente, orario, giornaliero, qualità dell'aria)
// per una qualsiasi località (provincia o comune) identificata da nome/regione/lat/lon.
async function fetchLocationDetail(location, hours = 6) {
    if (!location || typeof location.lat !== 'number' || typeof location.lon !== 'number') {
        throw new Error('Località non valida');
    }

    const MAX_HOURLY = 48;
    const hoursToShow = Math.min(Math.max(parseInt(hours, 10) || 6, 1), MAX_HOURLY);

    const cacheKey = `${location.lat.toFixed(4)},${location.lon.toFixed(4)}`;
    const cached = weatherDetailCache.get(cacheKey);
    let baseData;

    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
        baseData = cached.data;
    } else {
        const weatherUrl = new URL('https://api.open-meteo.com/v1/forecast');
        weatherUrl.searchParams.set('latitude', location.lat);
        weatherUrl.searchParams.set('longitude', location.lon);
        weatherUrl.searchParams.set('current', 'temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m,wind_direction_10m,pressure_msl');
        weatherUrl.searchParams.set('hourly', 'temperature_2m,weather_code,precipitation_probability');
        weatherUrl.searchParams.set('daily', 'weather_code,temperature_2m_max,temperature_2m_min,uv_index_max,sunrise,sunset');
        weatherUrl.searchParams.set('timezone', 'Europe/Rome');
        weatherUrl.searchParams.set('forecast_days', '7');

        const [weatherResponse, airQuality] = await Promise.all([
            fetch(weatherUrl).then((r) => {
                if (!r.ok) throw new Error(`HTTP error! status: ${r.status}`);
                return r.json();
            }),
            fetchAirQuality(location)
        ]);

        const { current, hourly, daily } = weatherResponse;
        const nowIso = current.time;
        const currentHourIndex = hourly.time.indexOf(nowIso) !== -1
            ? hourly.time.indexOf(nowIso)
            : hourly.time.findIndex((t) => t >= nowIso);
        const startIndex = currentHourIndex === -1 ? 0 : currentHourIndex;

        const hourlyFull = hourly.time
            .slice(startIndex, startIndex + MAX_HOURLY)
            .map((time, i) => {
                const idx = startIndex + i;
                return {
                    time: time.slice(11, 16),
                    temperature: Math.round(hourly.temperature_2m[idx]),
                    icon: getWeatherIcon(hourly.weather_code[idx])
                };
            });

        const dailyForecast = daily.time.map((date, idx) => ({
            day: formatDayLabel(date),
            max: Math.round(daily.temperature_2m_max[idx]),
            min: Math.round(daily.temperature_2m_min[idx]),
            icon: getWeatherIcon(daily.weather_code[idx])
        }));

        const precipitationProbability = hourly.precipitation_probability[startIndex] ?? 0;

        baseData = {
            name: location.name,
            region: location.region,
            temperature: Math.round(current.temperature_2m),
            weatherDescription: getWeatherDescription(current.weather_code),
            weatherIcon: getWeatherIcon(current.weather_code),
            humidity: current.relative_humidity_2m,
            windSpeed: Math.round(current.wind_speed_10m),
            windDirection: getWindDirection(current.wind_direction_10m),
            pressure: Math.round(current.pressure_msl),
            precipitationProbability,
            uvIndex: Math.round(daily.uv_index_max[0]),
            uvLevel: getUvLevel(daily.uv_index_max[0]),
            sunrise: daily.sunrise[0].slice(11, 16),
            sunset: daily.sunset[0].slice(11, 16),
            today: {
                max: Math.round(daily.temperature_2m_max[0]),
                min: Math.round(daily.temperature_2m_min[0])
            },
            hourlyFull,
            daily: dailyForecast,
            airQuality
        };

        weatherDetailCache.set(cacheKey, { data: baseData, timestamp: Date.now() });
    }

    const { hourlyFull, ...rest } = baseData;
    return { ...rest, hourly: hourlyFull.slice(0, hoursToShow) };
}

// Wrapper retro-compatibile: recupera il dettaglio di una provincia dal nome (usato da index.html/app.js)
async function fetchProvinceDetail(provinceName, hours = 6) {
    const province = provinces.find(
        (p) => p.name.toLowerCase() === provinceName.toLowerCase()
    );

    if (!province) {
        throw new Error('Provincia non trovata');
    }

    return fetchLocationDetail(province, hours);
}

// Cerca comuni italiani per nome usando la Geocoding API di Open-Meteo
const comuneSearchCache = new Map();

async function searchComuni(query) {
    const term = (query || '').trim();
    if (term.length < 2) return [];

    const cacheKey = term.toLowerCase();
    if (comuneSearchCache.has(cacheKey)) {
        return comuneSearchCache.get(cacheKey);
    }

    const url = new URL('https://geocoding-api.open-meteo.com/v1/search');
    url.searchParams.set('name', term);
    url.searchParams.set('count', '8');
    url.searchParams.set('language', 'it');
    url.searchParams.set('countryCode', 'IT');

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const results = (data.results || []).map((r) => ({
        name: r.name,
        region: r.admin1 || '',
        province: r.admin2 || '',
        lat: r.latitude,
        lon: r.longitude
    }));

    comuneSearchCache.set(cacheKey, results);
    return results;
}
