// fetch('locations.json')
//   .then((response) => response.json()) // Convert to JSON format
//   .then((data) => {
//     // Example: Inject JSON data into an HTML element
//     // document.getElementById('dynamicContent').innerText = data.title;
//   })
//   .catch((error) => console.error('Error fetching JSON:', error));

// fake JSON call
function getJSONMarkers() {
  const markers = [
    {
      name: 'Temple of Castor and Pollux',
      location: [41.891839019328394, 12.485632953042316], // Changed from position to location
    },
    {
      name: 'Brooklyn Bridge',
      location: [40.706378692221584, -73.99685331798591],
    },
    {
      name: 'Fontana del tritone',
      location: [41.90384017851981, 12.488479072291657],
    },
    {
      name: 'Roman colosseum',
      location: [41.89036192065039, 12.492263083095729],
    },
    {
      name: 'Rialto Bridge',
      location: [45.438187358030156, 12.335919436462422],
    },
  ];
  return markers;
}

function loadMap() {
  // Initialize Google Maps
  const mapOptions = {
    center: new google.maps.LatLng(25.2048, 55.2708),
    zoom: 11,
  };
  const map = new google.maps.Map(document.getElementById('map'), mapOptions);

  // Load JSON Data
  const jojoPlaces = getJSONMarkers();

  // Initialize Google Markers
  for (place of jojoPlaces) {
    let marker = new google.maps.Marker({
      map: map,
      position: new google.maps.LatLng(place.location[0], place.location[1]),
      title: place.name,
    });
  }
}

// Location data
const locations = [
  {
    name: 'Temple of Castor and Pollux',
    location: [41.891839019328394, 12.485632953042316],
    part: 'Part 5: Golden Wind',
    description: 'Featured in the fight against Ghiaccio',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Temple_of_Castor_and_Pollux_Forum_Romanum_Rome.jpg/1280px-Temple_of_Castor_and_Pollux_Forum_Romanum_Rome.jpg',
  },
  {
    name: 'Roman Colosseum',
    location: [41.89036192065039, 12.492263083095729],
    part: 'Part 5: Golden Wind',
    description: 'Iconic landmark featured in several scenes',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Colosseo_2020.jpg/1280px-Colosseo_2020.jpg',
  },
  {
    name: 'Rialto Bridge',
    location: [45.438187358030156, 12.335919436462422],
    part: 'Part 5: Golden Wind',
    description: 'Venice location where Giorno meets Bruno',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Rialto_Bridge_Venice_Italy.jpg/1280px-Rialto_Bridge_Venice_Italy.jpg',
  },
  {
    name: 'Fontana del Tritone',
    location: [41.90384017851981, 12.488479072291657],
    part: 'Part 5: Golden Wind',
    description: 'Famous fountain featured in Rome scenes',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Fontana_del_Tritone_Roma.jpg/1280px-Fontana_del_Tritone_Roma.jpg',
  },
];

class LocationMap {
  constructor() {
    this.map = null;
    this.markers = [];
    this.locations = [];
  }

  async init() {
    try {
      // Wait for a moment to ensure DOM is ready
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Check if map container exists
      const mapContainer = document.getElementById('map');
      if (!mapContainer) {
        throw new Error('Map container not found');
      }

      // Clean up existing map if it exists
      if (this.map) {
        this.map.remove();
        this.map = null;
      }

      // Fetch locations data
      const response = await fetch('locations.json');
      if (!response.ok) {
        throw new Error('Failed to fetch locations data');
      }
      const data = await response.json();
      this.locations = data.locations;

      // Initialize map centered on Italy
      this.map = L.map('map', {
        center: [41.9028, 12.4964],
        zoom: 6,
        minZoom: 3,
        maxZoom: 18,
      });

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors',
      }).addTo(this.map);

      // Force a map resize after initialization
      setTimeout(() => {
        if (this.map) {
          this.map.invalidateSize();
        }
      }, 100);

      await this.addMarkers();
      this.populateLocationsList();
    } catch (error) {
      console.error('Error initializing map:', error);
      const mapContainer = document.getElementById('map');
      if (mapContainer) {
        mapContainer.innerHTML = `
          <div style="text-align: center; padding: 20px;">
            <h3>Error loading map</h3>
            <p>${error.message}</p>
          </div>
        `;
      }
      throw error;
    }
  }

  cleanup() {
    // Remove all markers
    this.markers.forEach((marker) => {
      if (marker && marker.remove) {
        marker.remove();
      }
    });
    this.markers = [];

    // Remove the map
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  }

  async addMarkers() {
    // Clear existing markers
    this.markers.forEach((marker) => {
      if (marker && marker.remove) {
        marker.remove();
      }
    });
    this.markers = [];

    this.locations.forEach((place) => {
      try {
        // Create custom popup content
        const popupContent = `
          <div class="info-window">
            <h3>${place.name}</h3>
            <img src="${place.image}" alt="${place.name}" style="width: 200px; height: 150px; object-fit: cover;">
            <p><strong>${place.part}</strong></p>
            <p>${place.description}</p>
          </div>
        `;

        // Create marker and popup
        const marker = L.marker([place.location[0], place.location[1]], {
          title: place.name,
        })
          .bindPopup(popupContent, {
            maxWidth: 300,
            minWidth: 250,
          })
          .addTo(this.map);

        this.markers.push(marker);
      } catch (error) {
        console.error(`Error adding marker for ${place.name}:`, error);
      }
    });
  }

  populateLocationsList() {
    const locationsList = document.getElementById('locations');
    if (!locationsList) return;

    locationsList.innerHTML = ''; // Clear existing locations

    this.locations.forEach((place, index) => {
      const locationElement = document.createElement('div');
      locationElement.className = 'location-item';
      locationElement.innerHTML = `
        <h3>${place.name}</h3>
        <p>${place.part}</p>
        <p>${place.description}</p>
      `;

      locationElement.addEventListener('click', () => {
        if (!this.map) return;

        // Center map on location
        this.map.setView([place.location[0], place.location[1]], 16, {
          animate: true,
          duration: 1,
        });

        // Open the popup for this marker
        if (this.markers[index]) {
          this.markers[index].openPopup();
        }
      });

      locationsList.appendChild(locationElement);
    });
  }
}

// Create a single instance of the map
const locationMap = new LocationMap();

// Initialize the map when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  locationMap.init().catch((error) => {
    console.error('Failed to initialize map:', error);
  });
});
