import google.generativeai as genai
import os
from dotenv import load_dotenv
import json
from typing import Dict, Any

load_dotenv()

# Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def get_gemini_model():
    """Get the Gemini Flash model for faster responses"""
    return genai.GenerativeModel('gemini-1.5-flash')

def generate_course_syllabus(title: str, credits: str, ltp: str, audience: str) -> Dict[str, Any]:
    """Generate a complete course syllabus using Gemini"""
    
    prompt = f"""
    You are an academic course designer. Design a university-level 5-module course with labs, outcomes, and textbook references.

    Input:
    - Title: {title}
    - Credits: {credits}
    - L:T:P = {ltp}
    - Audience: {audience}

    Output a JSON object with the following structure:
    {{
        "modules": [
            {{
                "title": "Module Title",
                "hours": 8,
                "description": "Detailed description of the module content"
            }}
        ],
        "outcomes": [
            {{
                "text": "Measurable learning outcome",
                "bloom_level": "Remember|Understand|Apply|Analyze|Evaluate|Create",
                "description": "Explanation of the outcome"
            }}
        ],
        "labs": [
            {{
                "title": "Lab Title",
                "module": "Module number (1-5)",
                "description": "Lab description",
                "duration": "2 hours"
            }}
        ],
        "textbooks": [
            {{
                "title": "Book Title",
                "author": "Author Name",
                "year": "2023",
                "isbn": "ISBN number if available"
            }}
        ],
        "references": [
            {{
                "title": "Online Resource Title",
                "url": "https://example.com",
                "description": "Brief description"
            }}
        ]
    }}

    Ensure:
    - Exactly 5 modules with realistic hours distribution
    - 4 measurable outcomes with proper Bloom's taxonomy levels
    - 5-6 labs mapped to specific modules
    - 3 textbooks and 3 online references
    - All content is appropriate for {audience}
    """
    
    try:
        model = get_gemini_model()
        response = model.generate_content(prompt)
        
        # Parse the JSON response
        content = response.text.strip()
        # Remove markdown code blocks if present
        if content.startswith("```json"):
            content = content[7:]
        if content.endswith("```"):
            content = content[:-3]
        
        result = json.loads(content)
        return result
    except Exception as e:
        print(f"Error generating course: {e}")
        return {
            "error": "Failed to generate course syllabus",
            "details": str(e)
        }

def check_outcome_quality(outcome_text: str) -> Dict[str, Any]:
    """Check the quality of a learning outcome and suggest improvements"""
    
    prompt = f"""
    Analyze this learning outcome for quality and alignment with Bloom's Taxonomy:

    Outcome: "{outcome_text}"

    Provide a JSON response with:
    {{
        "current_bloom_level": "Remember|Understand|Apply|Analyze|Evaluate|Create",
        "quality_score": 1-10,
        "strengths": ["List of strengths"],
        "weaknesses": ["List of weaknesses"],
        "suggested_improvements": ["List of specific improvements"],
        "improved_outcome": "The improved version of the outcome"
    }}
    """
    
    try:
        model = get_gemini_model()
        response = model.generate_content(prompt)
        
        content = response.text.strip()
        if content.startswith("```json"):
            content = content[7:]
        if content.endswith("```"):
            content = content[:-3]
        
        result = json.loads(content)
        return result
    except Exception as e:
        print(f"Error checking outcome: {e}")
        return {
            "error": "Failed to analyze outcome",
            "details": str(e)
        }

def analyze_syllabus_content(content: str) -> Dict[str, Any]:
    """Analyze uploaded syllabus content for quality and completeness"""
    
    prompt = f"""
    Analyze this course syllabus for quality, completeness, and alignment with educational best practices:

    Syllabus Content:
    {content}

    Provide a JSON response with:
    {{
        "overall_score": 1-10,
        "completeness_score": 1-10,
        "bloom_alignment": 1-10,
        "strengths": ["List of strengths"],
        "weaknesses": ["List of weaknesses"],
        "missing_elements": ["List of missing elements"],
        "recommendations": ["List of specific recommendations"],
        "outcome_analysis": [
            {{
                "outcome": "Outcome text",
                "bloom_level": "Detected level",
                "quality": "Good|Fair|Poor",
                "suggestion": "Improvement suggestion"
            }}
        ]
    }}
    """
    
    try:
        model = get_gemini_model()
        response = model.generate_content(prompt)
        
        content = response.text.strip()
        if content.startswith("```json"):
            content = content[7:]
        if content.endswith("```"):
            content = content[:-3]
        
        result = json.loads(content)
        return result
    except Exception as e:
        print(f"Error analyzing syllabus: {e}")
        return {
            "error": "Failed to analyze syllabus",
            "details": str(e)
        }

def recommend_textbooks(subject: str, audience: str) -> Dict[str, Any]:
    """Recommend textbooks based on subject and audience"""
    
    prompt = f"""
    Recommend textbooks and online resources for this course:

    Subject: {subject}
    Audience: {audience}

    Provide a JSON response with:
    {{
        "textbooks": [
            {{
                "title": "Book Title",
                "author": "Author Name",
                "year": "2023",
                "isbn": "ISBN if available",
                "description": "Brief description",
                "suitability": "Why this book is suitable"
            }}
        ],
        "online_resources": [
            {{
                "title": "Resource Title",
                "url": "https://example.com",
                "description": "Brief description",
                "type": "Video|Article|Tutorial|Other"
            }}
        ]
    }}
    """
    
    try:
        model = get_gemini_model()
        response = model.generate_content(prompt)
        
        content = response.text.strip()
        if content.startswith("```json"):
            content = content[7:]
        if content.endswith("```"):
            content = content[:-3]
        
        result = json.loads(content)
        return result
    except Exception as e:
        print(f"Error recommending books: {e}")
        return {
            "error": "Failed to recommend textbooks",
            "details": str(e)
        } 