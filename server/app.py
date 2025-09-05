import os
import json
import re
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()
app = Flask(__name__)
CORS(app)
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

@app.route('/api/generate', methods=['POST'])
def generate_career_advice():
    try:
        data = request.get_json()
        
        # Extract all fields from your detailed frontend form
        name = data.get('name', 'a student')
        education_level = data.get('educationLevel', 'Not specified')
        stream = data.get('stream', 'Not specified')
        interests = data.get('interests', 'Not specified')
        skills = data.get('skills', {})
        experience = data.get('experience', 'Not specified')
        career_goals = data.get('careerGoals', 'Not specified')
        work_preference = data.get('workPreference', 'Not specified')

        # --- ADVANCED PROMPT V4 - RESILIENT AND ROBUST ---
        prompt = f"""
        Act as an expert, data-driven career coach from a top Indian institution like an IIM or IIT.
        Your client is an Indian student with the following detailed profile:
        - Name: {name}
        - Education: {education_level}, {stream}
        - Professional Experience: {experience}
        - Passions & Interests: {interests}
        - Career Goals: {career_goals}
        - Preferred Work Environment: {work_preference}
        - Self-assessed Skills: {json.dumps(skills)}

        Your task is to generate three distinct and actionable career paths. You MUST return a valid JSON object and nothing else.
        The JSON response must follow this exact structure.
        
        IMPORTANT: If for any reason you cannot generate three distinct paths (e.g., due to content restrictions or an unusual profile), you MUST still provide at least one or two sensible suggestions. DO NOT RETURN AN EMPTY "careerPaths" LIST. Prioritize providing some guidance over no guidance.

        {{
          "careerPaths": [
            {{
              "id": 1,
              "title": "Career Path Title",
              "description": "A compelling, one-sentence summary of this career path.",
              "category": "A relevant category like 'Technology', 'Design', 'Analytics', 'Management', etc.",
              "matchScore": "An integer from 70-100, representing how strongly this path matches the user's complete profile.",
              "fitReason": "A detailed paragraph explaining WHY this is a great match, specifically referencing the user's interests, skills, and career goals.",
              "salaryRange": "A realistic entry-to-mid level salary range in Indian Rupees (e.g., '₹8-15 LPA').",
              "experienceLevel": "Typical experience needed (e.g., 'Entry to Mid-level').",
              "growth": "A projected year-over-year growth percentage for this role in India (e.g., '+15%').",
              "timeline": "An estimated timeline to become job-ready in months (e.g., '6-9M').",
              "jobRoles": ["Specific Job Role 1", "Specific Job Role 2", "Full Stack Developer", "Mobile App Developer"],
              "industryTrendsIndia": "Describe the current demand, key companies hiring, and future outlook for this career in the Indian market.",
              "topSkills": ["Primary Skill", "Second Skill", "Third Skill", "Fourth Skill"],
              "requiredSkills": {{
                "core": ["Fundamental Skill 1", "Fundamental Skill 2"],
                "specialized": ["Tech Skill A", "Software B", "Methodology C"],
                "emerging": ["Future Skill X", "Future Skill Y"]
              }},
              "learningResources": [
                {{ "title": "Specific Foundational Course Name", "platform": "Udemy/Coursera/NPTEL", "description": "A brief, one-sentence description of the course." }},
                {{ "title": "Practical Project Idea", "platform": "Portfolio Project", "description": "A hands-on project idea tailored to their interests." }},
                {{ "title": "Key Industry Certification", "platform": "e.g., Google, AWS, HubSpot", "description": "A recommended certification to boost their resume." }},
                {{ "title": "Helpful YouTube Channel or Community", "platform": "YouTube/freeCodeCamp", "description": "A resource for continuous learning." }}
              ],
              "jobReadiness": {{
                "resumeTips": ["Actionable resume tip 1, tailored to this role.", "Actionable resume tip 2."],
                "interviewQuestions": ["A common technical or behavioral question for this role.", "Another relevant interview question."]
              }}
            }}
          ]
        }}
        """

        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(prompt)
        
        cleaned_text = re.sub(r'^```json\s*|\s*```$', '', response.text.strip(), flags=re.MULTILINE)
        
        try:
            json_response = json.loads(cleaned_text)
            
            # --- NEW: BACKEND SANITY CHECK ---
            if not json_response.get("careerPaths"):
                print("Warning: AI returned an empty or malformed 'careerPaths' list. This could be due to a safety filter.")
                # To prevent a crash on the frontend, we ensure careerPaths is at least an empty list.
                json_response["careerPaths"] = []

            print("AI Response generated and parsed successfully.")
            return jsonify(json_response)
            
        except json.JSONDecodeError:
            print(f"Error: AI did not return valid JSON. Response text: {response.text}")
            return jsonify({"error": "The AI response was not in a valid format. Please try again."}), 500

    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return jsonify({"error": "An unexpected server error occurred. Please check logs."}), 500

if __name__ == '__main__':
    app.run(debug=True)