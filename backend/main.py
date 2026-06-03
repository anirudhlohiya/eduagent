from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from agent import generate_study_plan, generate_quiz, evaluate_quiz

app = FastAPI()

# CORS - must be before everything else
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request Models
class TopicRequest(BaseModel):
    topic: str

class EvaluateRequest(BaseModel):
    topic: str
    score: int
    total: int

# Routes
@app.get("/api")
def api_root():
    return {"message": "EduAgent API is running!"}

@app.options("/{rest_of_path:path}")
async def preflight_handler(rest_of_path: str):
    return JSONResponse(
        content={},
        headers={
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
            "Access-Control-Allow-Headers": "*",
        }
    )

@app.post("/study-plan")
def study_plan(request: TopicRequest):
    try:
        result = generate_study_plan(request.topic)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/quiz")
def quiz(request: TopicRequest):
    try:
        result = generate_quiz(request.topic)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/evaluate")
def evaluate(request: EvaluateRequest):
    try:
        result = evaluate_quiz(request.topic, request.score, request.total)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

app.mount("/", StaticFiles(directory="frontend/dist", html=True), name="frontend")