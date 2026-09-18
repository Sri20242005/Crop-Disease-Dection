from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io

from predictor import predict

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React/Vite
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Backend is running"}

@app.post("/predict")
async def predict_image(file: UploadFile = File(...)):
    image_bytes = await file.read()

    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

    result = predict(image)

    return result