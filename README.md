# Real-time Weather Dashboard

An interactive weather dashboard that displays weather parameters for selected locations on a map.

## Features
- Interactive map interface
- Real-time weather data display
- Location-based weather parameters
- Responsive design

## Setup
1. Create a `.env` file in the backend directory and add your OpenWeatherMap API key:
   ```
   OPENWEATHER_API_KEY=your_api_key_here
   ```
2. Install backend dependencies:
   ```
   cd backend
   pip install -r requirements.txt
   ```
3. Install frontend dependencies:
   ```
   cd frontend
   npm install
   ```

## Running the Application
1. Start the backend server:
   ```
   cd backend
   uvicorn main:app --reload
   ```
2. Start the frontend development server:
   ```
   cd frontend
   npm start
   ```
