import os
import json
import re
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from google.cloud import secretmanager

app = Flask(__name__)
# Use a permissive CORS policy for robust connectivity
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

# --- LAZY INITIALIZATION for the Gemini Model ---
model = None

def initialize_gemini():
    """Initializes the Gemini model on the first request."""
    global model
    if model is None:
        try:
            client = secretmanager.SecretManagerServiceClient()
            project_id = os.environ.get("GCP_PROJECT_ID")
            secret_name = "AI_COACH_API_KEY"
            name = f"projects/{project_id}/secrets/{secret_name}/versions/latest"
            response = client.access_secret_version(request={"name": name})
            api_key = response.payload.data.decode("UTF-8")
            
            genai.configure(api_key=api_key)
            model = genai.GenerativeModel("gemini-1.5-flash")
            print("✅ Gemini AI initialized and model loaded: gemini-1.5-flash")
        except Exception as e:
            print(f"❌ FATAL: Could not initialize Gemini AI. Error: {e}")
            raise

@app.route('/api/generate', methods=['POST'])
def generate_career_advice():
    try:
        # This will initialize the model only on the first request.
        initialize_gemini()
    except Exception as e:
        return jsonify({"error": "Server failed to initialize the AI model. Check logs."}), 500

    try:
        profile_data = request.get_json()
        
        prompt = f"""
        Analyze this user profile: {json.dumps(profile_data)}.
        Your task is to generate three career path recommendations.
        CRITICAL RULE: Your response must be ONLY a valid JSON object that starts with `{{` and ends with `}}`. Do not add any other text or formatting.
        The matchScore must be an integer between 70 and 100.
        Use this exact JSON structure:
        {{
          "careerPaths": [
            {{
              "id": 1, "title": "...", "description": "...", "category": "...", "matchScore": "...", "fitReason": "...",
              "salaryRange": "...", "experienceLevel": "...", "growth": "...", "timeline": "...",
              "jobRoles": ["...", "..."], "industryTrendsIndia": "...", "topSkills": ["...", "..."],
              "requiredSkills": {{"core": ["..."], "specialized": ["..."], "emerging": ["..."]}},
              "learningResources": [{{ "title": "...", "platform": "...", "description": "..." }}],
              "jobReadiness": {{"resumeTips": ["..."], "interviewQuestions": ["..."]}}
            }}
          ]
        }}
        """
        
        safety_settings = [
            {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_NONE"},
            {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_NONE"},
            {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_NONE"},
            {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_NONE"},
        ]

        response = model.generate_content(prompt, safety_settings=safety_settings)
        
        if not response.text:
            raise ValueError("AI returned an empty response, likely due to safety filters.")
        
        cleaned_text = re.sub(r'^```json\s*|\s*```$', '', response.text.strip(), flags=re.MULTILINE)
        ai_response = json.loads(cleaned_text)

        print("Successfully generated AI response.")
        return jsonify(ai_response)
        
    except Exception as e:
        print(f"🚨 An error occurred in /api/generate: {e}")
        return jsonify({"error": "An unexpected server error occurred."}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))