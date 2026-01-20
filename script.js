// Global variables
let map;
let userLocation = null;
let userMarker = null;
let selectedStation = null;
let selectedSlot = null;
let navigationActive = false;
let myBookings = [];

// Extended list of dummy charging stations (20+ stations across Pune)
const stations = [
  // Pune City Center Stations
  {id: 1, name: "Gridflow Hub", lat: 18.5204, lng: 73.8567, type: "CCS", speed: "Ultra Fast", price: "₹18/kWh", address: "FC Road, Pune", available: 4, total: 6, status: "available", operator: "Gridflow"},
  {id: 2, name: "Urban EV Point", lat: 18.5314, lng: 73.8446, type: "Type-2", speed: "Fast", price: "₹15/kWh", address: "JM Road, Pune", available: 1, total: 4, status: "limited", operator: "Urban EV"},
  {id: 3, name: "Express Charge", lat: 18.5074, lng: 73.8077, type: "CHAdeMO", speed: "Ultra Fast", price: "₹20/kWh", address: "Kothrud, Pune", available: 6, total: 8, status: "available", operator: "Express Charge"},
  {id: 4, name: "City Power Station", lat: 18.5523, lng: 73.9021, type: "CCS", speed: "Fast", price: "₹16/kWh", address: "Shivajinagar, Pune", available: 0, total: 4, status: "busy", operator: "City Power"},
  {id: 5, name: "Green Energy Charger", lat: 18.4887, lng: 73.8234, type: "Type-2", speed: "Normal", price: "₹12/kWh", address: "Bavdhan, Pune", available: 3, total: 4, status: "available", operator: "Green Energy"},
  
  // Pune Suburban Stations
  {id: 6, name: "Supercharge Pro", lat: 18.5401, lng: 73.8912, type: "Supercharger", speed: "Ultra Fast", price: "₹22/kWh", address: "Hinjewadi, Pune", available: 5, total: 10, status: "available", operator: "Tesla"},
  {id: 7, name: "Eco Charging Zone", lat: 18.5678, lng: 73.7723, type: "CCS", speed: "Fast", price: "₹15/kWh", address: "Wakad, Pune", available: 2, total: 4, status: "limited", operator: "Eco Charge"},
  {id: 8, name: "Metro EV Station", lat: 18.5022, lng: 73.8556, type: "Type-2", speed: "Normal", price: "₹14/kWh", address: "Deccan Gymkhana, Pune", available: 4, total: 6, status: "available", operator: "Metro EV"},
  {id: 9, name: "Power Up Center", lat: 18.5790, lng: 73.7412, type: "Bharat DC001", speed: "Fast", price: "₹10/kWh", address: "Pimple Saudagar, Pune", available: 3, total: 4, status: "available", operator: "Power Up"},
  {id: 10, name: "EV Charging Point", lat: 18.4589, lng: 73.8556, type: "Bharat AC001", speed: "Slow", price: "₹8/kWh", address: "Katraj, Pune", available: 6, total: 8, status: "available", operator: "EV Point"},
  
  // More Stations in Pune
  {id: 11, name: "Quick Charge Hub", lat: 18.5989, lng: 73.8045, type: "CCS", speed: "Ultra Fast", price: "₹19/kWh", address: "Chinchwad, Pune", available: 2, total: 4, status: "limited", operator: "Quick Charge"},
  {id: 12, name: "Solar EV Station", lat: 18.5155, lng: 73.9291, type: "Type-2", speed: "Normal", price: "₹13/kWh", address: "Viman Nagar, Pune", available: 4, total: 6, status: "available", operator: "Solar EV"},
  {id: 13, name: "Highway Charger", lat: 18.4529, lng: 73.8618, type: "CHAdeMO", speed: "Fast", price: "₹17/kWh", address: "Satara Road, Pune", available: 5, total: 8, status: "available", operator: "Highway Charge"},
  {id: 14, name: "Mall Charging Point", lat: 18.5632, lng: 73.9118, type: "Type-2", speed: "Normal", price: "₹14/kWh", address: "Phoenix Mall, Pune", available: 0, total: 4, status: "busy", operator: "Mall Charge"},
  {id: 15, name: "Tech Park Charger", lat: 18.5923, lng: 73.7336, type: "Supercharger", speed: "Ultra Fast", price: "₹21/kWh", address: "IT Park, Pune", available: 3, total: 6, status: "available", operator: "Tech Park"},
  
  // Additional Stations
  {id: 16, name: "Residential Charger", lat: 18.4837, lng: 73.8045, type: "Type-2", speed: "Slow", price: "₹9/kWh", address: "Baner, Pune", available: 4, total: 4, status: "available", operator: "Residential EV"},
  {id: 17, name: "Airport Charging", lat: 18.5822, lng: 73.9197, type: "CCS", speed: "Fast", price: "₹18/kWh", address: "Pune Airport", available: 2, total: 4, status: "limited", operator: "Airport EV"},
  {id: 18, name: "University Charger", lat: 18.5529, lng: 73.8264, type: "Type-2", speed: "Normal", price: "₹11/kWh", address: "University Road", available: 3, total: 4, status: "available", operator: "University EV"},
  {id: 19, name: "Hospital Charging", lat: 18.5079, lng: 73.8776, type: "CCS", speed: "Fast", price: "₹16/kWh", address: "Ruby Hall, Pune", available: 1, total: 3, status: "limited", operator: "Hospital EV"},
  {id: 20, name: "Hotel Charging Point", lat: 18.5296, lng: 73.8749, type: "Type-2", speed: "Normal", price: "₹15/kWh", address: "Koregaon Park, Pune", available: 5, total: 8, status: "available", operator: "Hotel EV"},
  
  // More Stations
  {id: 21, name: "Metro Station Charger", lat: 18.4987, lng: 73.8476, type: "Bharat DC001", speed: "Fast", price: "₹12/kWh", address: "Swargate, Pune", available: 4, total: 6, status: "available", operator: "Metro EV"},
  {id: 22, name: "Shopping Center EV", lat: 18.5178, lng: 73.8476, type: "Type-2", speed: "Normal", price: "₹13/kWh", address: "Camp, Pune", available: 2, total: 4, status: "limited", operator: "Shopping EV"},
  {id: 23, name: "Expressway Charger", lat: 18.4207, lng: 73.9161, type: "Supercharger", speed: "Ultra Fast", price: "₹23/kWh", address: "Mumbai-Pune Expressway", available: 6, total: 8, status: "available", operator: "Expressway EV"},
  {id: 24, name: "Corporate Park EV", lat: 18.5674, lng: 73.7558, type: "CCS", speed: "Fast", price: "₹17/kWh", address: "Corporate Park, Pune", available: 3, total: 6, status: "available", operator: "Corporate EV"}
];
    
  
// Time slots for booking
const timeSlots = [
  {time: "08:00 AM", price: "₹180"},
  {time: "09:00 AM", price: "₹190"},
  {time: "10:00 AM", price: "₹200"},
  {time: "11:00 AM", price: "₹210"},
  {time: "12:00 PM", price: "₹220"},
  {time: "01:00 PM", price: "₹210"},
  {time: "02:00 PM", price: "₹200"},
  {time: "03:00 PM", price: "₹190"},
  {time: "04:00 PM", price: "₹200"},
  {time: "05:00 PM", price: "₹220"},
  {time: "06:00 PM", price: "₹240"},
  {time: "07:00 PM", price: "₹230"}
];

// Sample bookings data
myBookings = [
  {
    id: 1,
    stationId: 1,
    stationName: "Gridflow Hub",
    date: "2024-01-15",
    time: "02:00 PM",
    duration: "1 hour",
    cost: "₹200",
    status: "upcoming",
    address: "FC Road, Pune"
  },
  {
    id: 2,
    stationId: 6,
    stationName: "Supercharge Pro",
    date: "2024-01-10",
    time: "11:00 AM",
    duration: "45 mins",
    cost: "₹210",
    status: "completed",
    address: "Hinjewadi, Pune"
  },
  {
    id: 3,
    stationId: 3,
    stationName: "Express Charge",
    date: "2024-01-05",
    time: "04:00 PM",
    duration: "1.5 hours",
    cost: "₹300",
    status: "cancelled",
    address: "Kothrud, Pune"
  }
];

// Initialize the application
function initApp() {
  // Set up event listeners
  document.getElementById('bookButton').disabled = true;
  
  // Try to get user location on startup
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      },
      (error) => {
        console.log("Geolocation error:", error);
        // Default to Pune if location not available
        userLocation = { lat: 18.5204, lng: 73.8567 };
      }
    );
  } else {
    userLocation = { lat: 18.5204, lng: 73.8567 };
  }
  
  // Load bookings
  renderBookings();
}

// Open configuration panel
function openConfig() {
  document.getElementById('landing').style.display = "none";
  document.getElementById('config').style.display = "block";
}

// Go back to landing page
function goBackToLanding() {
  document.getElementById('landing').style.display = "flex";
  document.getElementById('config').style.display = "none";
  document.getElementById('mapView').style.display = "none";
  document.getElementById('stationDetails').classList.remove('active');
  document.getElementById('navigationPanel').classList.remove('active');
  document.getElementById('myBookings').classList.remove('active');
  document.getElementById('howItWorks').classList.add('hidden');
}

// Go back to config from map
function goBackToConfig() {
  document.getElementById('config').style.display = "block";
  document.getElementById('mapView').style.display = "none";
}

// Open the map with stations
function openMap() {
  document.getElementById('config').style.display = "none";
  document.getElementById('mapView').style.display = "block";
  
  // Initialize map if not already done
  if (!map) {
    map = L.map('map').setView([18.5204, 73.8567], 12);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '© GRIDFLOW'
    }).addTo(map);
  } else {
    map.setView([18.5204, 73.8567], 12);
  }
  
  // Clear existing markers
  map.eachLayer((layer) => {
    if (layer instanceof L.Marker || layer instanceof L.CircleMarker) {
      map.removeLayer(layer);
    }
  });
  
  // Add user location if available
  if (userLocation) {
    if (userMarker) {
      map.removeLayer(userMarker);
    }
    userMarker = L.marker([userLocation.lat, userLocation.lng], {
      icon: L.divIcon({
        className: 'user-location-marker',
        iconSize: [20, 20]
      })
    }).addTo(map)
      .bindPopup('<b>Your Location</b>')
      .openPopup();
    
    // Center map on user location
    map.setView([userLocation.lat, userLocation.lng], 13);
  }
  
  // Add station markers
  stations.forEach(station => {
    // Determine marker color based on availability
    let markerColor = '#facc15'; // Default yellow
    if (station.status === 'limited') markerColor = '#f59e0b';
    if (station.status === 'busy') markerColor = '#ef4444';
    if (station.status === 'available') markerColor = '#10b981';
    
    // Create custom icon
    const marker = L.circleMarker([station.lat, station.lng], {
      radius: 10,
      color: markerColor,
      fillColor: markerColor,
      fillOpacity: 1,
      weight: 2
    }).addTo(map);
    
    // Add click event to show station details
    marker.on('click', () => {
      showStationDetails(station);
    });
    
    // Bind popup with station info
    const popupContent = `
      <div style="font-weight:600;margin-bottom:5px;color:${markerColor}">${station.name}</div>
      <div style="margin-bottom:3px"><i class="fas fa-plug"></i> ${station.type} • ${station.speed}</div>
      <div style="margin-bottom:3px"><i class="fas fa-rupee-sign"></i> ${station.price}</div>
      <div style="margin-bottom:8px">${station.available}/${station.total} slots available</div>
      <button onclick="event.stopPropagation(); showStationDetails(${station.id})" 
        style="background:#facc15;color:black;border:none;padding:6px 12px;border-radius:5px;margin-top:5px;cursor:pointer;width:100%;font-weight:600">
        <i class="fas fa-info-circle"></i> View Details
      </button>
    `;
    
    marker.bindPopup(popupContent);
  });
  
  // Update map title
  document.getElementById('mapTitle').textContent = `Found ${stations.length} Charging Stations`;
}

// Show station details panel
function showStationDetails(stationId) {
  // If stationId is an object (from direct call), use it
  // If it's a number (from popup button), find the station
  let station;
  if (typeof stationId === 'object') {
    station = stationId;
  } else {
    station = stations.find(s => s.id === stationId);
  }
  
  if (!station) return;
  
  selectedStation = station;
  selectedSlot = null;
  
  // Update station details
  document.getElementById('stationName').textContent = station.name;
  document.getElementById('stationAddress').textContent = station.address;
  document.getElementById('stationType').textContent = `Type: ${station.type}`;
  document.getElementById('stationSpeed').textContent = `Speed: ${station.speed}`;
  document.getElementById('stationPrice').textContent = `Price: ${station.price}`;
  document.getElementById('stationHours').textContent = "Open 24/7";
  
  // Update availability
  const statusElement = document.getElementById('availabilityStatus');
  const statusText = station.status === 'available' ? 'Available' : 
                     station.status === 'limited' ? 'Limited' : 'Busy';
  statusElement.textContent = statusText;
  statusElement.className = `availability-status ${station.status}`;
  
  document.getElementById('availableSlots').textContent = 
    `${station.available} out of ${station.total} slots available`;
  
  // Reset selected time
  document.getElementById('selectedTime').textContent = "Not selected";
  
  // Generate time slots
  const slotsContainer = document.getElementById('timeSlots');
  slotsContainer.innerHTML = '';
  
  timeSlots.forEach((slot, index) => {
    const slotElement = document.createElement('div');
    slotElement.className = 'slot';
    
    // Randomly mark some slots as booked for demo
    const isBooked = Math.random() > 0.7 && index > 2 && index < 10;
    
    if (isBooked) {
      slotElement.classList.add('booked');
    }
    
    slotElement.innerHTML = `
      <div class="slot-time">${slot.time}</div>
      <div class="slot-price">${slot.price}</div>
    `;
    
    // Add click event
    if (!isBooked) {
      slotElement.addEventListener('click', () => {
        // Deselect all slots
        document.querySelectorAll('.slot').forEach(s => {
          s.classList.remove('selected');
        });
        
        // Select this slot
        slotElement.classList.add('selected');
        selectedSlot = slot;
        document.getElementById('bookButton').disabled = false;
        document.getElementById('selectedTime').textContent = `${slot.time} (${slot.price})`;
      });
    }
    
    slotsContainer.appendChild(slotElement);
  });
  
  // Show the details panel
  document.getElementById('stationDetails').classList.add('active');
  document.getElementById('bookButton').disabled = true;
  
  // Pan map to the station
  map.setView([station.lat, station.lng], 15);
}

// Close station details panel
function closeStationDetails() {
  document.getElementById('stationDetails').classList.remove('active');
  selectedStation = null;
  selectedSlot = null;
  document.getElementById('bookButton').disabled = true;
}

// Book a time slot
function bookSlot() {
  if (!selectedStation || !selectedSlot) return;
  
  // Generate booking ID
  const bookingId = Date.now();
  
  // Create new booking
  const newBooking = {
    id: bookingId,
    stationId: selectedStation.id,
    stationName: selectedStation.name,
    date: new Date().toISOString().split('T')[0],
    time: selectedSlot.time,
    duration: "1 hour",
    cost: selectedSlot.price,
    status: "upcoming",
    address: selectedStation.address
  };
  
  // Add to bookings
  myBookings.unshift(newBooking);
  
  // Update station availability
  selectedStation.available--;
  if (selectedStation.available < 1) {
    selectedStation.status = 'busy';
  } else if (selectedStation.available < 3) {
    selectedStation.status = 'limited';
  }
  
  // Update UI
  renderBookings();
  
  // Show confirmation
  const modalContent = `
    <div style="text-align:center;padding:2rem">
      <div style="font-size:3rem;color:#10b981;margin-bottom:1rem">✓</div>
      <h3 style="color:var(--yellow);margin-bottom:1rem">Booking Confirmed!</h3>
      <p style="margin-bottom:0.5rem"><strong>Station:</strong> ${selectedStation.name}</p>
      <p style="margin-bottom:0.5rem"><strong>Time:</strong> ${selectedSlot.time}</p>
      <p style="margin-bottom:0.5rem"><strong>Cost:</strong> ${selectedSlot.price}</p>
      <p style="margin-bottom:1.5rem"><strong>Booking ID:</strong> GRID${bookingId.toString().slice(-6)}</p>
      <button onclick="this.parentElement.parentElement.style.display='none'; closeStationDetails();" 
        style="background:var(--yellow);color:black;border:none;padding:0.8rem 2rem;border-radius:999px;font-weight:600;cursor:pointer">
        Done
      </button>
    </div>
  `;
  
  // Create and show modal
  const modal = document.createElement('div');
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100%';
  modal.style.height = '100%';
  modal.style.backgroundColor = 'rgba(0,0,0,0.9)';
  modal.style.zIndex = '9999';
  modal.style.display = 'flex';
  modal.style.alignItems = 'center';
  modal.style.justifyContent = 'center';
  modal.innerHTML = modalContent;
  document.body.appendChild(modal);
  
  // Close modal and details after 5 seconds
  setTimeout(() => {
    if (modal.parentElement) {
      modal.parentElement.removeChild(modal);
    }
    closeStationDetails();
  }, 5000);
}

// Render bookings in My Bookings panel
function renderBookings() {
  const container = document.getElementById('bookingsContainer');
  
  if (myBookings.length === 0) {
    container.innerHTML = `
      <div class="no-bookings">
        <i class="fas fa-calendar-times"></i>
        <h3>No Bookings Yet</h3>
        <p>You haven't made any bookings yet. Find and book a charging station to get started!</p>
      </div>
    `;
    return;
  }
  
  let html = '<div class="bookings-list">';
  
  myBookings.forEach(booking => {
    const statusClass = `status-${booking.status}`;
    const cardClass = `booking-card ${booking.status}`;
    
    html += `
      <div class="${cardClass}">
        <div class="booking-header">
          <div class="booking-station">${booking.stationName}</div>
          <div class="booking-status ${statusClass}">
            ${booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </div>
        </div>
        <div class="booking-details">
          <p><i class="fas fa-calendar"></i> ${booking.date} at ${booking.time}</p>
          <p><i class="fas fa-clock"></i> Duration: ${booking.duration}</p>
          <p><i class="fas fa-rupee-sign"></i> Cost: ${booking.cost}</p>
          <p><i class="fas fa-map-marker-alt"></i> ${booking.address}</p>
        </div>
        <div class="booking-actions">
          ${booking.status === 'upcoming' ? `
            <button class="booking-btn cancel" onclick="cancelBooking(${booking.id})">
              <i class="fas fa-times"></i> Cancel
            </button>
            <button class="booking-btn navigate" onclick="navigateToBooking(${booking.stationId})">
              <i class="fas fa-route"></i> Navigate
            </button>
          ` : ''}
          ${booking.status === 'completed' ? `
            <button class="booking-btn" style="background:rgba(16,185,129,0.1);color:var(--green);border:1px solid var(--green);width:100%" onclick="rebookStation(${booking.stationId})">
              <i class="fas fa-redo"></i> Rebook
            </button>
          ` : ''}
        </div>
      </div>
    `;
  });
  
  html += '</div>';
  container.innerHTML = html;
}

// Cancel a booking
function cancelBooking(bookingId) {
  if (confirm("Are you sure you want to cancel this booking?")) {
    const booking = myBookings.find(b => b.id === bookingId);
    if (booking) {
      booking.status = 'cancelled';
      
      // Find the station and increase availability
      const station = stations.find(s => s.id === booking.stationId);
      if (station) {
        station.available++;
        if (station.status === 'busy' && station.available > 0) {
          station.status = station.available < 3 ? 'limited' : 'available';
        }
      }
      
      renderBookings();
      alert("Booking cancelled successfully!");
    }
  }
}

// Navigate to a booked station
function navigateToBooking(stationId) {
  const station = stations.find(s => s.id === stationId);
  if (station) {
    closeMyBookings();
    openMap();
    setTimeout(() => {
      showStationDetails(station);
      startNavigation();
    }, 500);
  }
}

// Rebook a previously used station
function rebookStation(stationId) {
  const station = stations.find(s => s.id === stationId);
  if (station) {
    closeMyBookings();
    openMap();
    setTimeout(() => {
      showStationDetails(station);
    }, 500);
  }
}

// Open My Bookings panel
function openMyBookings() {
  document.getElementById('myBookings').classList.add('active');
  document.getElementById('landing').style.display = "none";
}

// Close My Bookings panel
function closeMyBookings() {
  document.getElementById('myBookings').classList.remove('active');
  document.getElementById('landing').style.display = "flex";
}

// Start navigation to selected station
function startNavigation() {
  if (!selectedStation) return;
  
  // Calculate distance and ETA (simulated)
  let distance = 0;
  let eta = 0;
  let batteryAfter = 0;
  
  if (userLocation) {
    distance = calculateDistance(
      userLocation.lat, userLocation.lng,
      selectedStation.lat, selectedStation.lng
    );
    eta = Math.round(distance * 3); // Simulated ETA calculation (3 min per km)
    batteryAfter = Math.max(15, Math.round(85 - distance * 5)); // Simulated battery calculation
  } else {
    distance = 5.2; // Default distance
    eta = 16; // Default ETA
    batteryAfter = 60; // Default battery
  }
  
  // Update navigation panel
  document.getElementById('navToStation').textContent = `To: ${selectedStation.name}`;
  document.getElementById('navDistance').textContent = `${distance.toFixed(1)} km • ${eta} min ETA`;
  document.getElementById('navDistanceVal').textContent = `${distance.toFixed(1)} km`;
  document.getElementById('navETA').textContent = `${eta} min`;
  document.getElementById('navBattery').textContent = `${batteryAfter}%`;
  
  // Show navigation panel
  document.getElementById('navigationPanel').classList.add('active');
  navigationActive = true;
  
  // Draw route on map (simulated with a polyline)
  if (userLocation) {
    // Remove existing route if any
    map.eachLayer((layer) => {
      if (layer instanceof L.Polyline) {
        map.removeLayer(layer);
      }
    });
    
    const routeCoordinates = [
      [userLocation.lat, userLocation.lng],
      [selectedStation.lat, selectedStation.lng]
    ];
    
    L.polyline(routeCoordinates, {
      color: '#3b82f6',
      weight: 5,
      opacity: 0.8,
      dashArray: '10, 10'
    }).addTo(map);
  }
}

// Close navigation panel
function closeNavigation() {
  document.getElementById('navigationPanel').classList.remove('active');
  navigationActive = false;
  
  // Remove route from map
  map.eachLayer((layer) => {
    if (layer instanceof L.Polyline) {
      map.removeLayer(layer);
    }
  });
}

// Stop navigation
function stopNavigation() {
  closeNavigation();
  alert('Navigation stopped.');
}

// Open in external maps app
function openInMaps() {
  if (!selectedStation) return;
  
  const url = `https://www.google.com/maps/dir/?api=1&destination=${selectedStation.lat},${selectedStation.lng}`;
  window.open(url, '_blank');
}

// Locate user on map
function locateUser() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        
        // Update or add user marker
        if (userMarker) {
          map.removeLayer(userMarker);
        }
        
        userMarker = L.marker([userLocation.lat, userLocation.lng], {
          icon: L.divIcon({
            className: 'user-location-marker',
            iconSize: [20, 20]
          })
        }).addTo(map)
          .bindPopup('<b>Your Location</b>')
          .openPopup();
        
        // Center map on user
        map.setView([userLocation.lat, userLocation.lng], 14);
        
        alert('Location updated!');
      },
      (error) => {
        alert('Unable to get your location. Please enable location services.');
      }
    );
  } else {
    alert('Geolocation is not supported by your browser.');
  }
}

// Share station
function shareStation() {
  if (!selectedStation) return;
  
  const shareText = `Check out ${selectedStation.name} EV charging station on GRIDFLOW! ${selectedStation.address} - ${selectedStation.price}`;
  
  if (navigator.share) {
    navigator.share({
      title: 'GRIDFLOW Charging Station',
      text: shareText,
      url: window.location.href
    });
  } else {
    // Fallback to clipboard
    navigator.clipboard.writeText(shareText);
    alert('Station details copied to clipboard!');
  }
}

// Calculate distance between two coordinates (simplified)
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// How it works functions
function openHowItWorks() {
  document.getElementById('howItWorks').classList.remove('hidden');
}

function closeHowItWorks() {
  document.getElementById('howItWorks').classList.add('hidden');
}

// Initialize the app when page loads
window.addEventListener('DOMContentLoaded', initApp);

