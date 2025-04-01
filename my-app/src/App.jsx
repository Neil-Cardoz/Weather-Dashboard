import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { Paper, Typography, Grid, Box } from '@mui/material';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function LocationMarker({ onLocationSelect }) {
  const map = useMapEvents({
    click(e) {
      onLocationSelect(e.latlng);
    },
  });
  return null;
}

function WeatherInfo({ data }) {
  if (!data) return null;
  
  return (
    <Paper elevation={3} sx={{ p: 2, m: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Weather Information</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Temperature: {data.temperature}°C</Typography>
          <Typography>Feels Like: {data.feels_like}°C</Typography>
          <Typography>Humidity: {data.humidity}%</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Wind Speed: {data.wind_speed} m/s</Typography>
          <Typography>Pressure: {data.pressure} hPa</Typography>
          <Typography>Description: {data.description}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

function App() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    if (selectedLocation) {
      fetchWeatherData();
    }
  }, [selectedLocation]);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/weather/${selectedLocation.lat}/${selectedLocation.lng}`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleLocationSelect = (latlng) => {
    setSelectedLocation(latlng);
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4" sx={{ p: 2, textAlign: 'center' }}>
        Real-time Weather Dashboard
      </Typography>
      <Box sx={{ flex: 1, position: 'relative' }}>
        <MapContainer
          center={[20, 77]}
          zoom={4}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <LocationMarker onLocationSelect={handleLocationSelect} />
          {selectedLocation && (
            <Marker position={[selectedLocation.lat, selectedLocation.lng]}>
              <Popup>
                Selected Location
                <br />
                Lat: {selectedLocation.lat.toFixed(4)}
                <br />
                Lng: {selectedLocation.lng.toFixed(4)}
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </Box>
      <WeatherInfo data={weatherData} />
    </Box>
  );
}

export default App;
