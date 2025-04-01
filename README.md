# Real-time Weather Dashboard 🌤️

An interactive weather dashboard that displays real-time weather information for any location on the map. Built with React, FastAPI, and OpenWeather API.

## 🌟 Features

- **Interactive Map Interface**: Click anywhere on the map to get weather data
- **Real-time Weather Data**: 
  - Temperature
  - Feels like temperature
  - Humidity
  - Wind speed
  - Pressure
  - Weather description
- **Modern UI/UX**: Clean and responsive design that works on all devices
- **Fast Backend**: Powered by FastAPI for quick and efficient data fetching

## 🛠️ Tech Stack

- **Frontend**:
  - React
  - Leaflet Maps
  - Material-UI
  - Vite
- **Backend**:
  - FastAPI
  - Python
  - OpenWeather API

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Python (v3.8 or higher)
- OpenWeather API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Neil-Cardoz/Weather-Dashboard.git
   cd Weather-Dashboard
   ```

2. Set up the backend:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```
   Create a `.env` file in the backend directory and add your OpenWeather API key:
   ```
   OPENWEATHER_API_KEY=your_api_key_here
   ```

3. Set up the frontend:
   ```bash
   cd ../my-app
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```bash
   cd backend
   uvicorn main:app --reload
   ```

2. Start the frontend development server:
   ```bash
   cd ../my-app
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## 📱 Usage

1. The application will load with a map interface
2. Click anywhere on the map to select a location
3. Weather information for the selected location will appear below the map
4. The data updates in real-time when you select a new location

## 🔒 Security Note

Make sure to never commit your `.env` file or expose your API keys. The `.gitignore` file is set up to prevent this, but always be careful when pushing changes.

## 🤝 Contributing

Feel free to fork this repository and submit pull requests. You can also open issues for bugs or feature requests.
