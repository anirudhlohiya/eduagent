from groq import Groq
import os
import json
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))
MODEL = "llama-3.1-8b-instant"

def clean_json(text: str) -> dict:
    text = text.strip().replace("```json", "").replace("```", "").strip()
    return json.loads(text)

def chat(prompt: str) -> str:
    response = client.chat.completions.create(
        model=MODEL,
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7,
    )
    return response.choices[0].message.content

def generate_study_plan(topic: str) -> dict:
    prompt = f"""
    You are EduAgent, an expert AI study companion for students.
    
    A student wants to learn about: "{topic}"
    
    Create a structured study plan with exactly 5 steps.
    For each step provide:
    - Step number
    - Title
    - A brief description (2-3 sentences)
    - Key concepts to focus on (as a list)
    
    Format your response as clean JSON like this:
    {{
      "topic": "{topic}",
      "steps": [
        {{
          "step": 1,
          "title": "...",
          "description": "...",
          "key_concepts": ["...", "...", "..."]
        }}
      ]
    }}
    
    Return ONLY the JSON, no extra text.
    """
    return clean_json(chat(prompt))


def generate_quiz(topic: str) -> dict:
    prompt = f"""
    You are EduAgent, an expert AI study companion.
    
    Generate 5 multiple choice questions about: "{topic}"
    
    Format as clean JSON:
    {{
      "topic": "{topic}",
      "questions": [
        {{
          "id": 1,
          "question": "...",
          "options": ["A) ...", "B) ...", "C) ...", "D) ..."],
          "correct": "A",
          "explanation": "..."
        }}
      ]
    }}
    
    Return ONLY the JSON, no extra text.
    """
    return clean_json(chat(prompt))


def evaluate_quiz(topic: str, score: int, total: int) -> dict:
    prompt = f"""
    A student just completed a quiz on "{topic}".
    They scored {score} out of {total}.
    
    Give a short encouraging performance summary and recommend 2 specific subtopics 
    they should study next based on this score.
    
    Format as clean JSON:
    {{
      "score": {score},
      "total": {total},
      "percentage": {round((score/total)*100)},
      "summary": "...",
      "next_topics": ["...", "..."]
    }}
    
    Return ONLY the JSON, no extra text.
    """
    return clean_json(chat(prompt))