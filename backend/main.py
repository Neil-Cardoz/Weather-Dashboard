from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")
if not OPENWEATHER_API_KEY:
    raise ValueError("OpenWeather API key not found in environment variables")

class WeatherResponse(BaseModel):
    temperature: float
    humidity: int
    wind_speed: float
    description: str
    pressure: int
    feels_like: float

@app.get("/api/weather/{lat}/{lon}", response_model=WeatherResponse)
async def get_weather(lat: float, lon: float):
    if not (-90 <= lat <= 90) or not (-180 <= lon <= 180):
        raise HTTPException(status_code=400, detail="Invalid coordinates")
    
    url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={OPENWEATHER_API_KEY}&units=metric"
    
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail="Weather API error")
        
        data = response.json()
        return WeatherResponse(
            temperature=data["main"]["temp"],
            humidity=data["main"]["humidity"],
            wind_speed=data["wind"]["speed"],
            description=data["weather"][0]["description"],
            pressure=data["main"]["pressure"],
            feels_like=data["main"]["feels_like"]
        )
