# CourseWeaver : AI-Powered Course Design Assistant

🧠 Overview
Curriculate is an AI-powered tool that helps educators design high-quality courses aligned with Bloom’s Taxonomy. It leverages Google’s Gemini LLM to:

Sanity-check learning outcomes.

Generate syllabi based on course parameters.

Suggest practical lab work.

Evaluate course documents and recommend textbooks.

Built with a MERN stack frontend, Gemini handles the intelligent back-end processing.

🛠️ Tech Stack
Layer	Technology
Frontend	React.js (MERN)
Backend	Node.js + Express
Database	MongoDB (Mongoose)
AI Engine	Gemini (Google PaLM API)
File Upload	Multer (for PDF/docx)
Styling	Tailwind / Bootstrap

🚀 Features
🔍 Outcome Sanity Checker — Tags learning outcomes using Bloom’s levels and suggests improvements.

🧱 Course Builder — Auto-generates weekly course plans, outcomes, and labs.

🧪 Lab Designer — Practical activities aligned to the course content.

📄 Syllabus Evaluator — Analyzes uploaded syllabi for quality and completeness.

📚 Textbook Recommender — Suggests references based on course and audience.

📦 Project Structure
bash
Copy
Edit
curriculate/
│
├── client/                  # React frontend
│   └── src/
│       ├── components/
│       ├── pages/
│       └── App.js
│
├── server/                  # Node.js backend
│   ├── routes/
│   ├── controllers/
│   └── services/
│       └── geminiService.js
│
├── uploads/                 # Syllabus uploads
├── .env
├── package.json
└── README.md
📄 .env (example)
env
Copy
Edit
PORT=5000
MONGODB_URI=mongodb://localhost:27017/curriculate
GEMINI_API_KEY=your_gemini_api_key
🧪 Run Locally
1. Clone the repository
bash
Copy
Edit
git clone https://github.com/yourusername/curriculate.git
cd curriculate
2. Start the Backend
bash
Copy
Edit
cd server
npm install
npm run dev
3. Start the Frontend
bash
Copy
Edit
cd client
npm install
npm start
App runs on http://localhost:3000

🔁 API Endpoints
Endpoint	Method	Description
/api/check-outcome	POST	Checks learning outcome quality
/api/generate-course	POST	Creates syllabus from user input
/api/upload-syllabus	POST	Upload and evaluate syllabus
/api/get-books	POST	Recommends textbooks

📋 Example Input (Course Builder)
json
Copy
Edit
{
  "title": "Data Analytics",
  "credits": "3",
  "ltp": "2:0:2",
  "audience": "B.Sc Statistics"
}
🔮 Future Features
User login / saved courses

Export to PDF/Word

Multi-language support

Integration with Google Classroom / Moodle

🙌 Contributing
Contributions are welcome! Please fork the repo and make a pull request. For feature requests or bug reports, open an issue.

📜 License
MIT License © 2025 Curriculate Team

