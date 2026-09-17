// State
let allProvinces = [];
let filteredProvinces = [];

// DOM Elements
const provinceList = document.getElementById('provinceList');
const searchInput = document.getElementById('searchInput');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');
const noResults = document.getElementById('noResults');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadWeatherData();
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    searchInput.addEventListener('input', handleSearch);
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    });
}

// Load Weather Data from API
async function loadWeatherData() {
    try {
        loadingSpinner.style.display = 'flex';
        errorMessage.style.display = 'none';
        noResults.style.display = 'none';
        provinceList.innerHTML = '';

        const response = await fetch('/api/weather');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        allProvinces = await response.json();
        filteredProvinces = [...allProvinces];

        loadingSpinner.style.display = 'none';
        renderProvinces();
    } catch (error) {
        console.error('Errore nel caricamento dei dati:', error);
        loadingSpinner.style.display = 'none';
        errorMessage.style.display = 'block';
        provinceList.innerHTML = '';
    }
}

// Handle Search
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase().trim();

    if (searchTerm === '') {
        filteredProvinces = [...allProvinces];
    } else {
        filteredProvinces = allProvinces.filter(province => 
            province.name.toLowerCase().includes(searchTerm) ||
            province.region.toLowerCase().includes(searchTerm)
        );
    }

    renderProvinces();
}

// Render Provinces
function renderProvinces() {
    provinceList.innerHTML = '';
    noResults.style.display = 'none';

    if (filteredProvinces.length === 0) {
        noResults.style.display = 'block';
        return;
    }

    filteredProvinces.forEach((province, index) => {
        const card = createProvinceCard(province);
        card.style.animation = `slideUp 0.3s ease-out ${index * 0.05}s both`;
        provinceList.appendChild(card);
    });
}

// Create Province Card
function createProvinceCard(province) {
    const card = document.createElement('div');
    card.className = 'province-card';
    card.setAttribute('data-province', province.name);
    
    const tempDisplay = province.temperature !== 'N/A' 
        ? `${province.temperature}°C` 
        : 'N/A';

    card.innerHTML = `
        <div class="province-header">
            <div>
                <div class="province-name">${province.name}</div>
                <div class="province-region">${province.region}</div>
            </div>
            <div class="province-temp">${tempDisplay}</div>
        </div>
        <div class="province-body">
            <div class="weather-info">
                <div class="weather-description">${province.weatherDescription}</div>
            </div>
            <div class="weather-icon">${province.weatherIcon}</div>
        </div>
    `;

    // Add click handler for future detail page
    card.addEventListener('click', () => {
        handleProvinceClick(province);
    });

    // Add hover effect
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-4px)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });

    return card;
}

// Handle Province Click - naviga alla schermata di dettaglio
function handleProvinceClick(province) {
    window.location.href = `/detail.html?province=${encodeURIComponent(province.name)}`;
}

// Utility: Format Temperature
function formatTemperature(temp) {
    if (typeof temp === 'number') {
        return Math.round(temp);
    }
    return temp;
}

// Utility: Get Weather Icon by Code
function getWeatherIcon(code) {
    if (code === 0 || code === 1) return '☀️';
    if (code === 2) return '⛅';
    if (code === 3) return '☁️';
    if (code === 45 || code === 48) return '🌫️';
    if (code >= 51 && code <= 67) return '🌧️';
    if (code >= 71 && code <= 86) return '❄️';
    if (code >= 95 && code <= 99) return '⛈️';
    return '❓';
}

// Refresh Data (optional)
function refreshWeatherData() {
    loadWeatherData();
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        loadWeatherData,
        handleSearch,
        renderProvinces,
        createProvinceCard
    };
}
