# CourseWeaver : AI-Powered Course Design Assistant

🧠 **Overview**
CourseWeaver is an AI-powered tool that helps educators design high-quality courses aligned with Bloom's Taxonomy. It leverages Google's Gemini LLM to:

- **Generate complete course syllabi** with modules, outcomes, labs, and textbooks
- **Evaluate existing course documents** for quality and completeness
- **Check learning outcomes** for Bloom's taxonomy alignment
- **Recommend textbooks and resources** based on subject and audience

Built with a modern full-stack architecture: React frontend, FastAPI backend, and MongoDB database.

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React.js + Tailwind CSS |
| **Backend** | Python FastAPI |
| **Database** | MongoDB (PyMongo) |
| **AI Engine** | Google Gemini Flash API |
| **File Upload** | Python-docx + PyPDF2 |
| **Styling** | Tailwind CSS |

## 🚀 Features

### 📚 **Course Builder**
Auto-generates complete course syllabi including:
- 5 detailed modules with hours and descriptions
- 4 measurable learning outcomes with Bloom's taxonomy levels
- 5-6 lab/tutorial activities mapped to modules
- 3 recommended textbooks and 3 online references

### 🔍 **Course Evaluator**
Upload and analyze existing course documents:
- Supports .docx and .pdf file formats
- Comprehensive quality analysis with scoring
- Identifies strengths, weaknesses, and missing elements
- Provides specific improvement recommendations

### 🎯 **Outcome Quality Checker**
Analyze individual learning outcomes:
- Bloom's taxonomy level detection
- Quality scoring (1-10 scale)
- Strengths and weaknesses analysis
- Suggested improvements with enhanced versions

### 📖 **Book Recommender**
Get tailored resource recommendations:
- Subject and audience-based suggestions
- Textbooks with authors, years, and suitability notes
- Online resources with descriptions and types

## 📦 Project Structure

```
courseweaver/
│
├── client/                  # React frontend
│   ├── src/
│   │   ├── pages/          # React components
│   │   │   ├── CourseBuilder.js
│   │   │   ├── CourseEvaluator.js
│   │   │   ├── BookRecommender.js
│   │   │   └── CourseOutcomeChecker.js
│   │   ├── App.js
│   │   └── index.css
│   ├── package.json
│   └── tailwind.config.js
│
├── server/                  # FastAPI backend
│   ├── routes/             # API endpoints
│   │   ├── course_routes.py
│   │   ├── syllabus_routes.py
│   │   ├── outcome_routes.py
│   │   └── book_routes.py
│   ├── services/           # AI services
│   │   └── gemini_service.py
│   ├── controllers/        # Business logic
│   ├── main.py            # FastAPI app
│   ├── database.py        # MongoDB connection
│   └── requirements.txt
│
├── uploads/                # Syllabus file uploads
├── package.json           # Root package.json
└── README.md
```

## 🔧 Environment Setup

### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/courseweaver
GEMINI_API_KEY=your_gemini_api_key
DATABASE_NAME=courseweaver
```

## 🚀 Quick Start

### 1. Clone and Install
```bash
git clone <repository-url>
cd courseweaver
npm run install-all
```

### 2. Backend Setup
```bash
cd server
# Create virtual environment
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your MongoDB URI and Gemini API key

# Start FastAPI server
uvicorn main:app --reload
```

### 3. Frontend Setup
```bash
cd client
npm install
npm start
```

### 4. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

## 🔁 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/generate-course` | POST | Generate complete course syllabus |
| `/api/check-outcome` | POST | Analyze learning outcome quality |
| `/api/upload-syllabus` | POST | Upload and evaluate course document |
| `/api/get-books` | POST | Recommend textbooks and resources |

## 📋 Example Usage

### Course Builder Input
```json
{
  "title": "Mobile Application Development",
  "credits": "3",
  "ltp": "2:0:2",
  "audience": "B.Tech Computer Science students"
}
```

### Course Evaluator Input
Upload a .docx or .pdf file (like CS3330.docx) and get:
- Overall quality score (1-10)
- Completeness analysis
- Bloom's taxonomy alignment
- Specific improvement recommendations

## 🧠 AI Integration

The application uses Google Gemini Flash API for:
- **Course Generation**: Creates structured syllabi with educational best practices
- **Outcome Analysis**: Evaluates learning outcomes against Bloom's taxonomy
- **Document Analysis**: Comprehensive syllabus evaluation and improvement suggestions
- **Resource Recommendation**: Context-aware textbook and online resource suggestions

## 🔮 Future Features

- [ ] User authentication and course saving
- [ ] Export to PDF/Word formats
- [ ] Integration with Moodle/Google Classroom
- [ ] Multi-language support
- [ ] Advanced analytics and reporting
- [ ] Collaborative course design features

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

For feature requests or bug reports, please open an issue.

## 📜 License

MIT License © 2025 CourseWeaver Team

---

**Built with ❤️ for educators worldwide**

