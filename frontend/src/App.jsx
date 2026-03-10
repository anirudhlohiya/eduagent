import { useState } from "react";

// const API = "https://fantastic-guacamole-9xq65w757jr29rg5-8000.app.github.dev";

const API = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");

function apiUrl(path) {
  return `${API}${path}`;
}

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0a0a0f;
    --surface: #13131a;
    --surface2: #1c1c26;
    --border: #2a2a3a;
    --accent: #7c6aff;
    --accent2: #ff6a9a;
    --accent3: #6affd4;
    --text: #f0efff;
    --muted: #7a7a9a;
    --success: #4ade80;
    --error: #ff6b6b;
  }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
    overflow-x: hidden;
  }

  .app {
    min-height: 100vh;
    position: relative;
  }

  /* Background orbs */
  .orb {
    position: fixed;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.12;
    pointer-events: none;
    z-index: 0;
  }
  .orb-1 { width: 500px; height: 500px; background: var(--accent); top: -100px; left: -100px; }
  .orb-2 { width: 400px; height: 400px; background: var(--accent2); bottom: -100px; right: -100px; }
  .orb-3 { width: 300px; height: 300px; background: var(--accent3); top: 50%; left: 50%; transform: translate(-50%, -50%); }

  .content { position: relative; z-index: 1; }

  /* NAV */
  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 40px;
    border-bottom: 1px solid var(--border);
    backdrop-filter: blur(20px);
    background: rgba(10,10,15,0.8);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .logo {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 1.4rem;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -0.5px;
  }

  .logo span { color: var(--accent3); -webkit-text-fill-color: var(--accent3); }

  .nav-badge {
    background: var(--surface2);
    border: 1px solid var(--border);
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 0.75rem;
    color: var(--muted);
    font-family: 'DM Sans', sans-serif;
  }

  /* HERO */
  .hero {
    max-width: 760px;
    margin: 0 auto;
    padding: 80px 24px 60px;
    text-align: center;
  }

  .hero-tag {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(124,106,255,0.1);
    border: 1px solid rgba(124,106,255,0.3);
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 0.8rem;
    color: var(--accent);
    margin-bottom: 32px;
    font-family: 'DM Sans', sans-serif;
    letter-spacing: 0.5px;
  }

  .hero-tag::before {
    content: '';
    width: 6px;
    height: 6px;
    background: var(--accent);
    border-radius: 50%;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.3); }
  }

  h1 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2.4rem, 6vw, 4rem);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -1.5px;
    margin-bottom: 20px;
  }

  h1 .gradient {
    background: linear-gradient(135deg, var(--accent) 0%, var(--accent2) 50%, var(--accent3) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .hero-sub {
    color: var(--muted);
    font-size: 1.1rem;
    line-height: 1.7;
    max-width: 520px;
    margin: 0 auto 48px;
    font-weight: 300;
  }

  /* INPUT CARD */
  .input-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 32px;
    max-width: 600px;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
  }

  .input-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--accent), var(--accent2), var(--accent3));
  }

  .input-label {
    font-family: 'Syne', sans-serif;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 12px;
    display: block;
  }

  .input-row {
    display: flex;
    gap: 12px;
  }

  input[type="text"] {
    flex: 1;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 14px 18px;
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  input[type="text"]:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(124,106,255,0.15);
  }

  input[type="text"]::placeholder { color: var(--muted); }

  .btn-primary {
    background: linear-gradient(135deg, var(--accent), #9b6aff);
    color: white;
    border: none;
    border-radius: 12px;
    padding: 14px 24px;
    font-family: 'Syne', sans-serif;
    font-size: 0.95rem;
    font-weight: 700;
    cursor: pointer;
    white-space: nowrap;
    transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
    letter-spacing: 0.3px;
  }

  .btn-primary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(124,106,255,0.4);
  }

  .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

  .suggestions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 16px;
  }

  .suggestion-chip {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 6px 14px;
    font-size: 0.8rem;
    color: var(--muted);
    cursor: pointer;
    transition: all 0.2s;
    font-family: 'DM Sans', sans-serif;
  }

  .suggestion-chip:hover {
    border-color: var(--accent);
    color: var(--accent);
    background: rgba(124,106,255,0.08);
  }

  /* LOADER */
  .loader-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 60px 24px;
  }

  .spinner {
    width: 48px;
    height: 48px;
    border: 3px solid var(--border);
    border-top-color: var(--accent);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  .loader-text {
    color: var(--muted);
    font-size: 0.95rem;
    animation: fadePulse 1.5s ease-in-out infinite;
  }

  @keyframes fadePulse {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
  }

  /* STUDY PLAN */
  .plan-wrap {
    max-width: 800px;
    margin: 0 auto;
    padding: 40px 24px;
  }

  .section-header {
    margin-bottom: 32px;
  }

  .section-tag {
    font-family: 'Syne', sans-serif;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: var(--accent);
    margin-bottom: 8px;
    display: block;
  }

  .section-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.8rem;
    font-weight: 800;
    letter-spacing: -0.5px;
  }

  .section-title span { color: var(--accent2); }

  .steps-grid {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 40px;
  }

  .step-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 24px;
    display: grid;
    grid-template-columns: 48px 1fr;
    gap: 20px;
    align-items: start;
    transition: border-color 0.2s, transform 0.2s;
    animation: slideUp 0.4s ease both;
  }

  .step-card:nth-child(1) { animation-delay: 0.05s; }
  .step-card:nth-child(2) { animation-delay: 0.1s; }
  .step-card:nth-child(3) { animation-delay: 0.15s; }
  .step-card:nth-child(4) { animation-delay: 0.2s; }
  .step-card:nth-child(5) { animation-delay: 0.25s; }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .step-card:hover {
    border-color: var(--accent);
    transform: translateX(4px);
  }

  .step-num {
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, var(--accent), #9b6aff);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 1.1rem;
    flex-shrink: 0;
  }

  .step-title {
    font-family: 'Syne', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 8px;
    letter-spacing: -0.3px;
  }

  .step-desc {
    color: var(--muted);
    font-size: 0.9rem;
    line-height: 1.6;
    margin-bottom: 12px;
    font-weight: 300;
  }

  .concepts {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .concept-tag {
    background: rgba(124,106,255,0.1);
    border: 1px solid rgba(124,106,255,0.2);
    color: var(--accent);
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 500;
  }

  .action-row {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  .btn-secondary {
    background: var(--surface2);
    border: 1px solid var(--border);
    color: var(--text);
    border-radius: 12px;
    padding: 12px 20px;
    font-family: 'Syne', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-secondary:hover {
    border-color: var(--accent);
    color: var(--accent);
  }

  /* QUIZ */
  .quiz-wrap {
    max-width: 720px;
    margin: 0 auto;
    padding: 40px 24px;
  }

  .progress-bar-wrap {
    background: var(--surface2);
    border-radius: 99px;
    height: 6px;
    margin-bottom: 32px;
    overflow: hidden;
  }

  .progress-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--accent), var(--accent2));
    border-radius: 99px;
    transition: width 0.4s ease;
  }

  .q-count {
    font-family: 'Syne', sans-serif;
    font-size: 0.8rem;
    font-weight: 700;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin-bottom: 12px;
    display: block;
  }

  .q-text {
    font-family: 'Syne', sans-serif;
    font-size: 1.3rem;
    font-weight: 700;
    line-height: 1.4;
    margin-bottom: 28px;
    letter-spacing: -0.3px;
  }

  .options {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 28px;
  }

  .option-btn {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 14px 18px;
    text-align: left;
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .option-btn:hover:not(:disabled) {
    border-color: var(--accent);
    background: rgba(124,106,255,0.08);
  }

  .option-btn.correct {
    border-color: var(--success);
    background: rgba(74,222,128,0.08);
    color: var(--success);
  }

  .option-btn.wrong {
    border-color: var(--error);
    background: rgba(255,107,107,0.08);
    color: var(--error);
  }

  .option-btn:disabled { cursor: default; }

  .option-letter {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    background: var(--surface2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Syne', sans-serif;
    font-size: 0.8rem;
    font-weight: 700;
    flex-shrink: 0;
  }

  .explanation-box {
    background: var(--surface2);
    border-left: 3px solid var(--accent3);
    border-radius: 0 12px 12px 0;
    padding: 14px 18px;
    margin-bottom: 20px;
    font-size: 0.9rem;
    color: var(--muted);
    line-height: 1.6;
    animation: slideUp 0.3s ease;
  }

  /* RESULTS */
  .results-wrap {
    max-width: 640px;
    margin: 0 auto;
    padding: 40px 24px;
    text-align: center;
  }

  .score-ring {
    width: 140px;
    height: 140px;
    margin: 0 auto 32px;
    position: relative;
  }

  .score-ring svg { transform: rotate(-90deg); }

  .score-center {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }

  .score-num {
    font-family: 'Syne', sans-serif;
    font-size: 2rem;
    font-weight: 800;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: block;
  }

  .score-label {
    font-size: 0.75rem;
    color: var(--muted);
    font-weight: 300;
  }

  .result-summary {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 24px;
    text-align: left;
  }

  .result-summary p {
    color: var(--muted);
    line-height: 1.7;
    font-weight: 300;
  }

  .next-topics {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 16px;
  }

  .next-topic-item {
    display: flex;
    align-items: center;
    gap: 12px;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 12px 16px;
    font-size: 0.9rem;
  }

  .next-topic-item::before {
    content: '→';
    color: var(--accent3);
    font-weight: 700;
  }

  /* FOOTER */
  footer {
    text-align: center;
    padding: 32px;
    color: var(--muted);
    font-size: 0.8rem;
    border-top: 1px solid var(--border);
    margin-top: 60px;
  }

  @media (max-width: 600px) {
    nav { padding: 16px 20px; }
    .hero { padding: 48px 16px 40px; }
    .input-row { flex-direction: column; }
    .step-card { grid-template-columns: 1fr; }
  }
`;

const SUGGESTIONS = [
  "Photosynthesis", "Newton's Laws", "World War II",
  "Quadratic Equations", "Indian Constitution", "Python Basics"
];

// ─── Loader ───────────────────────────────────────────────────────────────────
function Loader({ text }) {
  return (
    <div className="loader-wrap">
      <div className="spinner" />
      <p className="loader-text">{text}</p>
    </div>
  );
}

// ─── Home Screen ──────────────────────────────────────────────────────────────
function HomeScreen({ onStart }) {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setError("");
    try {
      if (!API) throw new Error("VITE_API_URL is missing");

      const res = await fetch(apiUrl("/study-plan"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topic.trim() }),
      });
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data = await res.json();
      onStart(topic.trim(), data);
    } catch (err) {
      setError(`Something went wrong: ${err.message}. Check frontend .env and API URL.`);
    }
    setLoading(false);
  };

  return (
    <div className="hero">
      <div className="hero-tag">AI-Powered Study Companion</div>
      <h1>
        Learn anything,<br />
        <span className="gradient">smarter & faster.</span>
      </h1>
      <p className="hero-sub">
        Enter any topic and EduAgent will build you a personalized study plan,
        then test your knowledge with an adaptive quiz.
      </p>

      <div className="input-card">
        <label className="input-label">What do you want to learn?</label>
        <div className="input-row">
          <input
            type="text"
            placeholder="e.g. Photosynthesis, Gravity, World War II..."
            value={topic}
            onChange={e => setTopic(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSubmit()}
          />
          <button className="btn-primary" onClick={handleSubmit} disabled={loading || !topic.trim()}>
            {loading ? "..." : "Generate →"}
          </button>
        </div>

        {error && <p style={{ color: "var(--error)", marginTop: 12, fontSize: "0.85rem" }}>{error}</p>}

        <div className="suggestions">
          {SUGGESTIONS.map(s => (
            <button key={s} className="suggestion-chip" onClick={() => setTopic(s)}>{s}</button>
          ))}
        </div>
      </div>

      {loading && <Loader text="Building your study plan..." />}
    </div>
  );
}

// ─── Study Plan Screen ────────────────────────────────────────────────────────
function StudyPlanScreen({ topic, plan, onStartQuiz, onBack }) {
  const [loadingQuiz, setLoadingQuiz] = useState(false);

  const handleQuiz = async () => {
    setLoadingQuiz(true);
    try {
      const res = await fetch(apiUrl("/quiz"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      if (!res.ok) throw new Error(`Quiz API error: ${res.status}`);
      const data = await res.json();
      onStartQuiz(data);
    } catch {
      alert("Error loading quiz. Try again!");
    }
    setLoadingQuiz(false);
  };

  if (loadingQuiz) return <Loader text="Generating your quiz..." />;

  return (
    <div className="plan-wrap">
      <div className="section-header">
        <span className="section-tag">Study Plan</span>
        <h2 className="section-title">Your roadmap for <span>{topic}</span></h2>
      </div>

      <div className="steps-grid">
        {plan.steps.map(step => (
          <div className="step-card" key={step.step}>
            <div className="step-num">{step.step}</div>
            <div>
              <div className="step-title">{step.title}</div>
              <p className="step-desc">{step.description}</p>
              <div className="concepts">
                {step.key_concepts.map(c => (
                  <span className="concept-tag" key={c}>{c}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="action-row">
        <button className="btn-primary" onClick={handleQuiz}>Take the Quiz →</button>
        <button className="btn-secondary" onClick={onBack}>← New Topic</button>
      </div>
    </div>
  );
}

// ─── Quiz Screen ──────────────────────────────────────────────────────────────
function QuizScreen({ topic, quiz, onFinish, onBack }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState([]);

  const q = quiz.questions[current];
  const total = quiz.questions.length;
  const progress = ((current) / total) * 100;

  const handleSelect = (opt) => {
    if (selected) return;
    const letter = opt[0];
    setSelected(letter);
    const isCorrect = letter === q.correct;
    if (isCorrect) setScore(s => s + 1);
    setShowExplanation(true);
    setAnswers(prev => [...prev, { correct: isCorrect }]);
  };

  const handleNext = async () => {
  const finalScore = answers.filter(a => a.correct).length + (selected === q.correct ? 1 : 0);
  
  if (current + 1 >= total) {
    try {
      const res = await fetch(apiUrl("/evaluate"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, score: finalScore, total }),
      });
      if (!res.ok) throw new Error(`Evaluate API error: ${res.status}`);
      const data = await res.json();
      onFinish({ ...data, score: finalScore });
    } catch {
      onFinish({ score: finalScore, total, percentage: Math.round((finalScore / total) * 100), summary: "Great effort!", next_topics: [] });
    }
  } else {
    setCurrent(c => c + 1);
    setSelected(null);
    setShowExplanation(false);
  }
};

  return (
    <div className="quiz-wrap">
      <div className="progress-bar-wrap">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
      </div>

      <span className="q-count">Question {current + 1} of {total}</span>
      <p className="q-text">{q.question}</p>

      <div className="options">
        {q.options.map(opt => {
          const letter = opt[0];
          let cls = "option-btn";
          if (selected) {
            if (letter === q.correct) cls += " correct";
            else if (letter === selected) cls += " wrong";
          }
          return (
            <button key={opt} className={cls} onClick={() => handleSelect(opt)} disabled={!!selected}>
              <span className="option-letter">{letter}</span>
              {opt.slice(3)}
            </button>
          );
        })}
      </div>

      {showExplanation && (
        <div className="explanation-box">💡 {q.explanation}</div>
      )}

      {selected && (
        <div className="action-row">
          <button className="btn-primary" onClick={handleNext}>
            {current + 1 >= total ? "See Results →" : "Next Question →"}
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Results Screen ───────────────────────────────────────────────────────────
function ResultsScreen({ result, topic, onRestart }) {
  const pct = result.percentage ?? Math.round((result.score / result.total) * 100);
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (pct / 100) * circumference;

  const emoji = pct >= 80 ? "🎉" : pct >= 50 ? "👍" : "📚";

  return (
    <div className="results-wrap">
      <span className="section-tag" style={{ display: "block", marginBottom: 24 }}>Quiz Complete</span>

      <div className="score-ring">
        <svg width="140" height="140" viewBox="0 0 140 140">
          <circle cx="70" cy="70" r="54" fill="none" stroke="var(--surface2)" strokeWidth="10" />
          <circle
            cx="70" cy="70" r="54" fill="none"
            stroke="url(#grad)" strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1s ease" }}
          />
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--accent)" />
              <stop offset="100%" stopColor="var(--accent2)" />
            </linearGradient>
          </defs>
        </svg>
        <div className="score-center">
          <span className="score-num">{pct}%</span>
          <span className="score-label">{result.score}/{result.total}</span>
        </div>
      </div>

      <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.6rem", fontWeight: 800, marginBottom: 8 }}>
        {emoji} {pct >= 80 ? "Excellent work!" : pct >= 50 ? "Good effort!" : "Keep studying!"}
      </h2>
      <p style={{ color: "var(--muted)", marginBottom: 28, fontWeight: 300 }}>You scored {result.score} out of {result.total} on <strong style={{ color: "var(--text)" }}>{topic}</strong></p>

      <div className="result-summary">
        <p>{result.summary}</p>
        {result.next_topics?.length > 0 && (
          <>
            <p style={{ marginTop: 16, marginBottom: 8, fontFamily: "'Syne', sans-serif", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: "var(--accent3)" }}>Study next:</p>
            <div className="next-topics">
              {result.next_topics.map(t => (
                <div className="next-topic-item" key={t}>{t}</div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="action-row" style={{ justifyContent: "center" }}>
        <button className="btn-primary" onClick={onRestart}>← Try Another Topic</button>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("home");
  const [topic, setTopic] = useState("");
  const [plan, setPlan] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [result, setResult] = useState(null);

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        <div className="content">
          <nav>
            <div className="logo">Edu<span>Agent</span></div>
            <div className="nav-badge">Powered by Groq · LLaMA 3.1</div>
          </nav>

          {screen === "home" && (
            <HomeScreen onStart={(t, p) => { setTopic(t); setPlan(p); setScreen("plan"); }} />
          )}
          {screen === "plan" && plan && (
            <StudyPlanScreen
              topic={topic} plan={plan}
              onStartQuiz={(q) => { setQuiz(q); setScreen("quiz"); }}
              onBack={() => setScreen("home")}
            />
          )}
          {screen === "quiz" && quiz && (
            <QuizScreen
              topic={topic} quiz={quiz}
              onFinish={(r) => { setResult(r); setScreen("results"); }}
              onBack={() => setScreen("plan")}
            />
          )}
          {screen === "results" && result && (
            <ResultsScreen
              result={result} topic={topic}
              onRestart={() => { setTopic(""); setPlan(null); setQuiz(null); setResult(null); setScreen("home"); }}
            />
          )}

          <footer>EduAgent · Built for AgentathonX 2026 · Powered by Groq & LLaMA 3.1</footer>
        </div>
      </div>
    </>
  );
}