#!/usr/bin/env python3
"""
Setup script for CourseWeaver environment variables
"""

import os
from pathlib import Path

def setup_environment():
    """Set up environment variables for CourseWeaver"""
    
    # Check if .env file exists
    env_file = Path(".env")
    
    if env_file.exists():
        print("✅ .env file already exists")
        return
    
    # Create .env file with template
    env_content = """# CourseWeaver Environment Variables

# Google Gemini API Key (Required)
# Get your API key from: https://makersuite.google.com/app/apikey
GEMINI_API_KEY=your_gemini_api_key_here

# Database Configuration (Optional - defaults to local MongoDB)
MONGODB_URI=mongodb://localhost:27017
DATABASE_NAME=courseweaver

# Server Configuration (Optional)
HOST=0.0.0.0
PORT=8000
DEBUG=True
"""
    
    try:
        with open(env_file, 'w') as f:
            f.write(env_content)
        print("✅ Created .env file with template")
        print("📝 Please edit .env file and add your Gemini API key")
        print("🔑 Get your API key from: https://makersuite.google.com/app/apikey")
    except Exception as e:
        print(f"❌ Failed to create .env file: {e}")

def check_environment():
    """Check if environment is properly configured"""
    
    print("🔍 Checking environment configuration...")
    
    # Check if .env file exists
    if not Path(".env").exists():
        print("❌ .env file not found")
        return False
    
    # Check if GEMINI_API_KEY is set
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key or api_key == "your_gemini_api_key_here":
        print("❌ GEMINI_API_KEY not configured")
        print("📝 Please edit .env file and add your Gemini API key")
        return False
    
    print("✅ Environment is properly configured")
    return True

if __name__ == "__main__":
    print("🚀 CourseWeaver Environment Setup")
    print("=" * 40)
    
    setup_environment()
    print()
    check_environment()
    
    print("\n📋 Next steps:")
    print("1. Edit .env file and add your Gemini API key")
    print("2. Install dependencies: pip install -r requirements.txt")
    print("3. Start the server: python main.py") 