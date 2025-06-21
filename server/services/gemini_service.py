import google.generativeai as genai
import os
from dotenv import load_dotenv
import json
from typing import Dict, Any
import re

load_dotenv()

# Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def get_gemini_model():
    """Get the Gemini Flash model for faster responses"""
    return genai.GenerativeModel('gemini-1.5-flash')

def generate_course_syllabus(title: str, credits: str, ltp: str, audience: str) -> Dict[str, Any]:
    """Generate a complete course syllabus using Gemini"""
    
    # Check if API key is configured
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        return {
            "error": "GEMINI_API_KEY not configured. Please set the environment variable.",
            "details": "The API key is required to generate course content."
        }
    
    prompt = f"""
    You are an expert academic course designer. Create a detailed syllabus for this course:

    Course: {title}
    Credits: {credits}
    L:T:P: {ltp}
    Audience: {audience}

    Generate a JSON response with this exact structure (no additional text):
    {{
      "course_title": "{title}",
      "duration": "3-4 weeks",
      "target_audience": "{audience}",
      "course_goals": [
        "Understand fundamental concepts",
        "Apply practical skills",
        "Analyze real-world problems",
        "Evaluate different approaches",
        "Create meaningful solutions"
      ],
      "tools_and_technologies": {{
        "programming_language": "Python",
        "development_environment": "Jupyter Notebooks",
        "key_libraries": ["NumPy", "Pandas", "Matplotlib"]
      }},
      "weekly_breakdown": [
        {{
          "week": 1,
          "theme": "Introduction and Fundamentals",
          "learning_objectives": ["Understand basic concepts", "Set up development environment"],
          "daily_plan": [
            {{
              "day": 1,
              "topic": "Course Introduction",
              "description": "Overview of course objectives and structure",
              "lab": "Environment setup and basic exercises"
            }},
            {{
              "day": 2,
              "topic": "Core Concepts",
              "description": "Introduction to fundamental principles",
              "lab": "Hands-on practice with basic tools"
            }}
          ]
        }},
        {{
          "week": 2,
          "theme": "Practical Applications",
          "learning_objectives": ["Apply concepts in practice", "Develop practical skills"],
          "daily_plan": [
            {{
              "day": 1,
              "topic": "Advanced Topics",
              "description": "Deep dive into advanced concepts",
              "lab": "Complex problem-solving exercises"
            }},
            {{
              "day": 2,
              "topic": "Real-world Applications",
              "description": "Case studies and real-world examples",
              "lab": "Project-based learning activities"
            }}
          ]
        }}
      ],
      "assessment": {{
        "details": [
          {{
            "type": "Weekly Assignments",
            "weight": "40%"
          }},
          {{
            "type": "Final Project",
            "weight": "60%"
          }}
        ]
      }},
      "recommended_resources": {{
        "books": [
          {{
            "title": "Essential Textbook",
            "author": "Expert Author"
          }}
        ],
        "online_platforms": ["Coursera", "edX", "Kaggle"]
      }}
    }}
    """
    
    try:
        model = get_gemini_model()
        response = model.generate_content(prompt)
        
        # Parse the JSON response
        content = response.text.strip()
        
        # Debug: Print the raw response
        print("=== RAW AI RESPONSE ===")
        print(content[:1000])  # Print first 1000 chars
        print("=== END RAW RESPONSE ===")
        
        # Remove markdown code blocks if present
        if content.startswith("```json"):
            content = content[7:]
        elif content.startswith("```"):
            content = content[3:]
        if content.endswith("```"):
            content = content[:-3]
        
        # Try to extract JSON from the response if it's not pure JSON
        json_match = re.search(r'\{.*\}', content, re.DOTALL)
        if json_match:
            content = json_match.group(0)
        
        # Clean up any remaining non-JSON text
        content = content.strip()
        
        print("=== CLEANED CONTENT ===")
        print(content[:500])
        print("=== END CLEANED CONTENT ===")
        
        try:
            result = json.loads(content)
        except json.JSONDecodeError as json_error:
            print(f"JSON parsing error: {json_error}")
            print(f"Error at line {json_error.lineno}, column {json_error.colno}")
            
            # Try to fix common JSON issues
            # Remove any trailing commas
            content = re.sub(r',(\s*[}\]])', r'\1', content)
            # Fix unescaped quotes in strings
            content = re.sub(r'(?<!\\)"', r'\"', content)
            
            try:
                result = json.loads(content)
            except json.JSONDecodeError:
                print("Failed to parse JSON, using fallback response")
                # Return a structured fallback response
                result = {
                    "course_title": title,
                    "duration": "3-4 weeks",
                    "target_audience": audience,
                    "course_goals": [
                        f"Understand fundamental concepts of {title}",
                        f"Apply practical skills in {title}",
                        "Analyze real-world problems",
                        "Evaluate different approaches",
                        "Create meaningful solutions"
                    ],
                    "tools_and_technologies": {
                        "programming_language": "Python",
                        "development_environment": "Jupyter Notebooks",
                        "key_libraries": ["NumPy", "Pandas", "Matplotlib"]
                    },
                    "weekly_breakdown": [
                        {
                            "week": 1,
                            "theme": "Introduction and Fundamentals",
                            "learning_objectives": [
                                f"Understand basic concepts of {title}",
                                "Set up development environment"
                            ],
                            "daily_plan": [
                                {
                                    "day": 1,
                                    "topic": "Course Introduction",
                                    "description": f"Overview of {title} objectives and structure",
                                    "lab": "Environment setup and basic exercises"
                                },
                                {
                                    "day": 2,
                                    "topic": "Core Concepts",
                                    "description": "Introduction to fundamental principles",
                                    "lab": "Hands-on practice with basic tools"
                                }
                            ]
                        },
                        {
                            "week": 2,
                            "theme": "Practical Applications",
                            "learning_objectives": [
                                f"Apply {title} concepts in practice",
                                "Develop practical skills"
                            ],
                            "daily_plan": [
                                {
                                    "day": 1,
                                    "topic": "Advanced Topics",
                                    "description": "Deep dive into advanced concepts",
                                    "lab": "Complex problem-solving exercises"
                                },
                                {
                                    "day": 2,
                                    "topic": "Real-world Applications",
                                    "description": "Case studies and real-world examples",
                                    "lab": "Project-based learning activities"
                                }
                            ]
                        }
                    ],
                    "assessment": {
                        "details": [
                            {
                                "type": "Weekly Assignments",
                                "weight": "40%"
                            },
                            {
                                "type": "Final Project",
                                "weight": "60%"
                            }
                        ]
                    },
                    "recommended_resources": {
                        "books": [
                            {
                                "title": f"Essential {title} Textbook",
                                "author": "Expert Author"
                            }
                        ],
                        "online_platforms": ["Coursera", "edX", "Kaggle"]
                    }
                }
        
        return result
        
    except Exception as e:
        print(f"Error in generate_course_syllabus: {str(e)}")
        return {
            "error": f"Failed to generate course syllabus: {str(e)}",
            "details": "There was an error processing your request. Please try again."
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