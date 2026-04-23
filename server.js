<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Green IQ – Awareness Quiz</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<style>
body {
    margin: 0; 
    padding: 0;
    height: 100%;
    font-family: Arial, sans-serif;
    background: url("quiz.jpeg") no-repeat center center;
    background-size: cover; 
    color: white;
}

.quiz-box {
    background: rgba(0,0,0,0.4);
    padding: 30px;
    width: 90%;
    max-width: 500px;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.6);
}

h2 {
    text-align: center;
    margin-bottom: 10px;
}
.quiz-wrapper {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.question {
    margin-top: 20px;
    font-size: 18px;
}

.options label {
    display: block;
    margin-top: 10px;
    cursor: pointer;
}

button {
    width: 100%;
    padding: 12px;
    margin-top: 25px;
    background: #22c55e;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
}

button:hover {
    background: #16a34a;
}

.result {
    text-align: center;
    font-size: 18px;
    margin-top: 20px;
}
</style>
</head>

<body>

<div class="quiz-wrapper">
  <div class="quiz-box">
    <h2>🌱 Green Awareness Quiz</h2>
    <p style="text-align:center;font-size:14px;">
        Complete this quick quiz to enter GREEN IQ
    </p>

    <div id="quiz">
        <!-- Question loads here -->
    </div>

    <button onclick="nextQuestion()">Next</button>

    <div class="result" id="result"></div>
  </div>
</div>

<script>
/* BLOCK REOPENING */
if (localStorage.getItem("quizDone")) {
    location.href = "index.html";
}

const quizData = [
    {
        q: "Which gas is mainly responsible for global warming?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        answer: 1
    },
    {
        q: "Which of the following is a renewable energy source?",
        options: ["Coal", "Petrol", "Solar Energy", "Diesel"],
        answer: 2
    },
    {
        q: "What helps reduce plastic pollution?",
        options: ["Single-use plastics", "Burning plastic", "Recycling", "Throwing in rivers"],
        answer: 2
    },
    {
        q: "Which activity saves electricity?",
        options: ["Leaving lights ON", "Using LED bulbs", "Overusing AC", "Charging overnight"],
        answer: 1
    },
    {
        q: "Planting trees helps in?",
        options: ["Increasing pollution", "Reducing oxygen", "Absorbing CO₂", "Raising temperature"],
        answer: 2
    }
];

let current = 0;
let score = 0;

function loadQuestion() {
    const q = quizData[current];
    document.getElementById("quiz").innerHTML = `
        <div class="question">${current + 1}. ${q.q}</div>
        <div class="options">
            ${q.options.map((opt, i) => `
                <label>
                    <input type="radio" name="option" value="${i}"> ${opt}
                </label>
            `).join("")}
        </div>
    `;
}

function nextQuestion() {
    const selected = document.querySelector("input[name='option']:checked");
    if (!selected) {
        alert("Please select an option");
        return;
    }

    if (parseInt(selected.value) === quizData[current].answer) {
        score++;
    }

    current++;

    if (current < quizData.length) {// server.js 

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Sequelize, DataTypes, Op } = require("sequelize");

const app = express();

/* ================= CONFIG ================= */
const DB_NAME = "greeniq";
const DB_USER = "root";
const DB_PASS = "Priya@2006";
const DB_HOST = "127.0.0.1";
const PORT = 4000;
const JWT_SECRET = "SUPER_SECRET_KEY_CHANGE_THIS";

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());

/* ================= DB CONNECTION ================= */
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: "mysql",
  logging: false
});

/* ================= MODELS ================= */

/* USER → createdAt ONLY */
const User = sequelize.define("User", {
  name: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  passwordHash: DataTypes.STRING,
  country: DataTypes.STRING
}, {
  timestamps: true,
  createdAt: "createdAt",
  updatedAt: false
});

/* SCORE → updatedAt ONLY */
const Score = sequelize.define("Score", {
  score: { type: DataTypes.INTEGER, defaultValue: 0 }
}, {
  timestamps: true,
  createdAt: false,
  updatedAt: "updatedAt"
});

/* SCORE HISTORY → createdAt ONLY */
const ScoreHistory = sequelize.define("ScoreHistory", {
  score: DataTypes.INTEGER
}, {
  timestamps: true,
  createdAt: "createdAt",
  updatedAt: false
});

/* POLLUTION HISTORY → checkedAt ONLY */
const PollutionHistory = sequelize.define("PollutionHistory", {
  city: DataTypes.STRING,
  aqi: DataTypes.INTEGER,
  pm25: DataTypes.FLOAT,
  pm10: DataTypes.FLOAT,
  no2: DataTypes.FLOAT,
  o3: DataTypes.FLOAT,
  co: DataTypes.FLOAT
}, {
  timestamps: true,
  createdAt: "checkedAt",
  updatedAt: false
});

/* GAME TASKS (NO timestamps) */
const GameTask = sequelize.define("GameTask", {
  taskName: DataTypes.STRING,
  points: DataTypes.INTEGER,
  mode: DataTypes.ENUM("easy", "medium", "hard")
}, { timestamps: false });

/* ACHIEVEMENTS (NO timestamps) */
const Achievement = sequelize.define("Achievement", {
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  requiredPoints: DataTypes.INTEGER
}, { timestamps: false });

/* USER ACHIEVEMENTS (ua_id + NO timestamps) */
const UserAchievement = sequelize.define("UserAchievement", {
  ua_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  earnedDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, { timestamps: false });

/* ================= RELATIONS ================= */
User.hasOne(Score, { foreignKey: "userId", onDelete: "CASCADE" });
Score.belongsTo(User, { foreignKey: "userId" });

User.hasMany(ScoreHistory, { foreignKey: "userId", onDelete: "CASCADE" });
ScoreHistory.belongsTo(User, { foreignKey: "userId" });

User.hasMany(PollutionHistory, { foreignKey: "userId", onDelete: "CASCADE" });
PollutionHistory.belongsTo(User, { foreignKey: "userId" });

User.belongsToMany(Achievement, { through: UserAchievement, foreignKey: "userId" });
Achievement.belongsToMany(User, { through: UserAchievement, foreignKey: "achievementId" });

UserAchievement.belongsTo(User, { foreignKey: "userId" });
UserAchievement.belongsTo(Achievement, { foreignKey: "achievementId" });

/* ================= AUTH MIDDLEWARE ================= */
function auth(req, res, next) {
  const token = (req.headers.authorization || "").split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) return res.status(401).json({ message: "Invalid token" });
    req.userId = payload.userId;
    next();
  });
}

/* ================= AUTH ================= */
app.post("/api/auth/signup", async (req, res) => {
  try {
    const { name, email, password, country } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "Missing fields" });

    if (await User.findOne({ where: { email } }))
      return res.status(400).json({ message: "Email already exists" });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash, country });
    await Score.create({ userId: user.id });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    res.json({ token, user });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.passwordHash)))
    return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ userId: user.id }, JWT_SECRET);
  res.json({ token, user });
});

app.get("/api/auth/me", auth, async (req, res) => {
  res.json(await User.findByPk(req.userId));
});

/* ================= USER STATS ================= */
app.get("/api/user/stats", auth, async (req, res) => {
  const score = await Score.findOne({ where: { userId: req.userId } });
  const totalChecks = await PollutionHistory.count({ where: { userId: req.userId } });
  const lastCheck = await PollutionHistory.findOne({
    where: { userId: req.userId },
    order: [["checkedAt", "DESC"]]
  });

  res.json({
    bestScore: score ? score.score : 0,
    totalPollutionChecks: totalChecks,
    lastPollutionCheck: lastCheck ? lastCheck.checkedAt : null
  });
});

/* ================= SCORE ================= */
app.post("/api/score", auth, async (req, res) => {
  const { score } = req.body;
  const row = await Score.findOne({ where: { userId: req.userId } });

  if (score > row.score) {
    row.score = score;
    await row.save();
  }

  await ScoreHistory.create({ userId: req.userId, score });

  const achievements = await Achievement.findAll({
    where: { requiredPoints: { [Op.lte]: row.score } }
  });

  for (const a of achievements) {
    await UserAchievement.findOrCreate({
      where: { userId: req.userId, achievementId: a.id }
    });
  }

  res.json({ score: row.score });
});

/* ================= LEADERBOARD (FIXED) ================= */
app.get("/api/leaderboard", async (req, res) => {
  try {
    const scores = await Score.findAll({
      include: User,
      order: [["score", "DESC"]],
      limit: 10
    });

    res.json(
      scores.map((s, i) => ({
        rank: i + 1,
        name: s.User.name,
        country: s.User.country,
        score: s.score
      }))
    );
  } catch (err) {
    console.error("Leaderboard error:", err);
    res.status(500).json([]);
  }
});

/* ================= POLLUTION ================= */
app.post("/api/pollution/history", auth, async (req, res) => {
  await PollutionHistory.create({ userId: req.userId, ...req.body });
  res.json({ message: "Saved" });
});

app.get("/api/pollution/history", auth, async (req, res) => {
  res.json(await PollutionHistory.findAll({
    where: { userId: req.userId },
    order: [["checkedAt", "DESC"]]
  }));
});

/* ================= GAME TASKS ================= */
app.get("/api/gametasks", async (req, res) => {
  res.json(await GameTask.findAll({ order: [["points", "ASC"]] }));
});

/* ================= USER ACHIEVEMENTS ================= */
app.get("/api/user/achievements", auth, async (req, res) => {
  res.json(await UserAchievement.findAll({
    where: { userId: req.userId },
    include: Achievement
  }));
});

/* ================= STARTUP ================= */
(async () => {
  await sequelize.authenticate();
  await sequelize.sync();
  console.log("MySQL connected & synced");

  if (await GameTask.count() === 0) {
    const tasks = [
["Switch off unused lights", 5],
  ["Carry a reusable water bottle", 5],
  ["Use a cloth bag", 5],
  ["Segregate waste", 10],
  ["Save paper", 5],
  ["Close taps properly", 5],
  ["Use stairs instead of lift", 10],
  ["Plant care", 10],
  ["Watering Plants",10],

  ["Plant a sapling", 25],
  ["Compost kitchen waste", 30],
  ["Avoid plastic for 1 full day", 20],
  ["Use public transport / cycle", 25],
  ["Reuse old items creatively", 20],
  ["Participate in a cleanup", 30],
  ["Save electricity for a day", 20],
  ["Repair instead of replacing", 25],
  ["Share awareness", 15],

  ["Organize a cleanliness drive", 60],
  ["Plant & maintain 5+ trees", 70],
  ["Start compost system at home/society", 60],
  ["Conduct eco-awareness session", 50],
  ["Reduce electricity bill by 20%", 70],
  ["Create an eco campaign", 50],
  ["Implement waste segregation system", 60],
  ["Lead a sustainability project", 120],
  ["Build rainwater harvesting model", 150]
    ];

    await GameTask.bulkCreate(
      tasks.map(([taskName, points]) => ({
        taskName,
        points,
        mode: points >= 50 ? "hard" : points >= 15 ? "medium" : "easy"
      }))
    );
  }

  if (await Achievement.count() === 0) {
    await Achievement.bulkCreate([
{ title: "Green Starter", description: "Completed first eco task", requiredPoints: 50 },
  { title: "Eco Curious", description: "Explored multiple eco activities", requiredPoints: 100 },
  { title: "Planet Helper", description: "Showed consistent eco behavior", requiredPoints: 150 },
  { title: "Nature Friend", description: "Completed 10 eco tasks", requiredPoints: 200 },
  { title: "Energy Saver", description: "Regular waste segregation", requiredPoints: 250 },
  { title: "Eco Explorer", description: "Reduced electricity usage", requiredPoints: 300 },
  { title: "Green Habit Builder", description: "Practiced water conservation", requiredPoints: 400 },
  { title: "Sustainability Seeker", description: "Built daily eco habits", requiredPoints: 500 },
  { title: "Clean Earth Contributor", description: "Consistent medium-level actions", requiredPoints: 600 },
  { title: "Tree Guardian", description: "Participated in clean-up drives", requiredPoints: 700 },
  { title: "Low-Carbon Hero", description: "Planted & maintained trees", requiredPoints: 800 },
  { title: "Eco Advocate", description: "Reduced carbon footprint", requiredPoints: 900 },
  { title: "Resource Saver", description: "Reduced waste significantly", requiredPoints: 1000 },
  { title: "Green Lifestyle Adopter", description: "Promoted awareness to others", requiredPoints: 1100 },
  { title: "Climate Aware Citizen", description: "Saved water + electricity", requiredPoints: 1200 },
  { title: "Eco Role Model", description: "Lifestyle shift toward sustainability", requiredPoints: 1300 },
  { title: "Sustainability Champion", description: "Completed awareness-based missions", requiredPoints: 1400 },
  { title: "Green Ambassador", description: "Inspired others through actions", requiredPoints: 1500 },
  { title: "Clean Community Leader", description: "Represented eco causes publicly", requiredPoints: 1700 },
  { title: "Water Conservation Pro", description: "Led cleanup or group activity", requiredPoints: 2000 },
  { title: "Waste Reduction Expert", description: "Implemented structured waste system", requiredPoints: 2300 },
  { title: "Renewable Supporter", description: "Promoted solar / renewable usage", requiredPoints: 2600 },
  { title: "Eco Educator", description: "Conducted sessions/workshops", requiredPoints: 3000 },
  { title: "Environmental Planner", description: "Designed eco plans or models", requiredPoints: 3500 },
  { title: "Circular Economy Advocate", description: "Promoted reuse & recycling cycles", requiredPoints: 4000 },
  { title: "Eco Project Manager", description: "Managed full eco project lifecycle", requiredPoints: 4500 },
  { title: "Environmental Influencer", description: "Inspired large community impact", requiredPoints: 5000 },
  { title: "Earth Protector", description: "Sustained eco impact over time", requiredPoints: 5500 },
  { title: "Planet Guardian", description: "Protects natural resources actively", requiredPoints: 5600 },
  { title: "Green Visionary", description: "Introduced innovative green ideas", requiredPoints: 6000 },
  { title: "Sustainability Architect", description: "Built scalable eco systems", requiredPoints: 6500 },
  { title: "Climate Hero", description: "Exceptional climate leadership", requiredPoints: 7000 },
  { title: "Eco Change Maker", description: "Long-term transformation creator", requiredPoints: 8000 },
  { title: "Global Green Advocate", description: "Wide-scale awareness impact", requiredPoints: 9000 },
  { title: "Earth Steward", description: "Dedicated stewardship of nature", requiredPoints: 10000 },
  { title: "Planet Saver", description: "Outstanding lifetime contribution", requiredPoints: 15000 },
  { title: "Guardian of Earth", description: "Ultimate eco champion status", requiredPoints: 20000 }
    ]);
  }

  app.listen(PORT, () =>
    console.log(`Server running → http://localhost:${PORT}`)
  );
})();
        loadQuestion();
    } else {
        finishQuiz();
    }
}

function finishQuiz() {
    localStorage.setItem("quizDone", "true");

    document.getElementById("quiz").innerHTML = "";
    document.querySelector("button").style.display = "none";

    document.getElementById("result").innerHTML = `
        🎉 Quiz Completed! <br>
        Your Score: <b>${score} / ${quizData.length}</b><br><br>
        Redirecting to GREEN IQ...
    `;

    setTimeout(() => {
        location.href = "index.html";
    }, 2000);
}

loadQuestion();
</script>

</body>
</html>