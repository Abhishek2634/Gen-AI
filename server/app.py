import os
import json
import re
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from google.cloud import secretmanager

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "https://ai-coach-final.web.app"}})

# --- Load API Key from Secret Manager (This part is working) ---
API_KEY = None
try:
    client = secretmanager.SecretManagerServiceClient()
    project_id = os.environ.get("GCP_PROJECT_ID")
    secret_name = "AI_COACH_API_KEY"
    name = f"projects/{project_id}/secrets/{secret_name}/versions/latest"
    response = client.access_secret_version(request={"name": name})
    API_KEY = response.payload.data.decode("UTF-8")
    genai.configure(api_key=API_KEY)
    print("✅ Successfully loaded API Key from Secret Manager.")
except Exception as e:
    print(f"❌ FATAL: Could not load API Key from Secret Manager. Error: {e}")

@app.route('/api/generate', methods=['POST'])
def generate_career_advice():
    try:
        if not API_KEY:
             return jsonify({"error": "API Key is not configured on the server."}), 500

        profile_data = request.get_json()
        
        # --- FINAL, MOST ROBUST PROMPT (V5) ---
        prompt = f"""
        Your task is to act as an expert career coach. Based on the user profile below, generate three distinct career paths.
        USER PROFILE: {json.dumps(profile_data)}

        CRITICAL INSTRUCTION: Your entire response MUST be a single, valid JSON object. Do not include any text, explanation, or markdown formatting like ```json before or after the JSON object. Your response must start with `{{` and end with `}}`.

        Use this exact JSON structure:
        {{
          "careerPaths": [
            {{
              "id": 1,
              "title": "...",
              "description": "...",
              "category": "...",
              "matchScore": "...",
              "fitReason": "...",
              "salaryRange": "...",
              "experienceLevel": "...",
              "growth": "...",
              "timeline": "...",
              "jobRoles": ["...", "..."],
              "industryTrendsIndia": "...",
              "topSkills": ["...", "..."],
              "requiredSkills": {{"core": ["..."], "specialized": ["..."], "emerging": ["..."]}},
              "learningResources": [{{ "title": "...", "platform": "...", "description": "..." }}],
              "jobReadiness": {{"resumeTips": ["..."], "interviewQuestions": ["..."]}}
            }}
          ]
        }}
        """

        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(prompt)
        
        # --- NEW, BULLETPROOF ERROR HANDLING ---
        # 1. Clean the response text aggressively.
        cleaned_text = re.sub(r'^```json\s*|\s*```$', '', response.text.strip(), flags=re.MULTILINE)

        # 2. Try to parse the cleaned text.
        json_response = json.loads(cleaned_text)
        
        if not json_response.get("careerPaths"):
            print("AI returned a valid JSON but with an empty 'careerPaths' list.")
            json_response["careerPaths"] = []

        print("✅ AI Response generated and successfully parsed.")
        return jsonify(json_response)
        
    except json.JSONDecodeError as json_err:
        # This block will now catch the error you were seeing!
        print(f"🚨 CRITICAL: AI response was NOT valid JSON. Error: {json_err}")
        print(f"--- AI Raw Response Text ---")
        print(response.text)
        print(f"--- End of AI Raw Response ---")
        return jsonify({"error": "The AI returned data in an unexpected format. Please try rephrasing your input."}), 500
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return jsonify({"error": "An unexpected server error occurred."}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))