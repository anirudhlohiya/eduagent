from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from agent import generate_study_plan, generate_quiz, evaluate_quiz

app = FastAPI()

# Allow React frontend to talk to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Request Models ---
class TopicRequest(BaseModel):
    topic: str

class EvaluateRequest(BaseModel):
    topic: str
    score: int
    total: int

# --- Routes ---
@app.get("/")
def root():
    return {"message": "EduAgent API is running!"}

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