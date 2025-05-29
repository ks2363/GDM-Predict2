
import os
import json
import logging
import openai
import requests
from bs4 import BeautifulSoup
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger('gdm-chatbot')

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure OpenAI
openai.api_key = os.getenv("OPENAI_API_KEY")

# GDM Knowledge Base - Quick answers for common questions
gdm_knowledge_base = {
    "what is gdm": "Gestational Diabetes Mellitus (GDM) is a type of diabetes that develops during pregnancy in women who didn't have diabetes before becoming pregnant. It causes high blood sugar that can affect your pregnancy and your baby's health.",
    "gestational diabetes symptoms": "Many women with gestational diabetes don't have any symptoms. Some may experience increased thirst, frequent urination, fatigue, nausea, blurred vision, or recurring infections.",
    "gdm risk factors": "Risk factors for GDM include obesity, age over 25, personal history of prediabetes, family history of diabetes, previous GDM, certain ethnicities (Hispanic, African American, Native American, Asian), and polycystic ovary syndrome.",
    "how is gdm diagnosed": "GDM is typically diagnosed with a glucose challenge test followed by a glucose tolerance test, usually between weeks 24-28 of pregnancy.",
    "gdm treatment": "GDM is managed through regular blood sugar monitoring, healthy eating, physical activity, and sometimes insulin or other medications if diet and exercise aren't enough.",
    "gdm diet": "A GDM diet typically includes controlling carbohydrate intake, choosing complex carbs over simple ones, eating smaller frequent meals, including protein with each meal, and avoiding sugary foods and drinks.",
    "gdm complications": "Untreated GDM can lead to complications such as excessive birth weight, preterm birth, respiratory distress in the baby, low blood sugar in the baby, and increased risk of type 2 diabetes for the mother later in life.",
    "prevent gdm": "You can reduce your risk of GDM by maintaining a healthy weight before pregnancy, eating a balanced diet, staying physically active, and starting pregnancy at a healthy weight."
}

def web_scrape_for_gdm_info(query):
    """
    Scrape web information related to GDM when OpenAI API is unavailable
    """
    try:
        # First check if we have a direct answer in our knowledge base
        # Convert query to lowercase and remove punctuation for matching
        cleaned_query = query.lower().replace('?', '').replace('.', '').strip()
        
        # Check for matches in knowledge base
        for key, value in gdm_knowledge_base.items():
            if key in cleaned_query or cleaned_query in key:
                return value
                
        # Format query for search
        search_query = f"gestational diabetes {query}"
        search_url = f"https://www.google.com/search?q={search_query.replace(' ', '+')}"
        
        # Send request with headers to avoid being blocked
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(search_url, headers=headers)
        
        if response.status_code != 200:
            return "I'm sorry, I couldn't find information on that topic right now."
        
        # Parse HTML content
        soup = BeautifulSoup(response.text, 'lxml')
        
        # Extract search results - focusing on snippets and descriptions
        search_results = soup.find_all('div', class_=['BNeawe s3v9rd AP7Wnd', 'BNeawe vvjwJb AP7Wnd'])
        
        # Combine results into a coherent response
        if search_results:
            extracted_texts = [result.get_text() for result in search_results[:5]]
            combined_text = " ".join(extracted_texts)
            
            # Keep response concise (max 500 characters)
            if len(combined_text) > 500:
                combined_text = combined_text[:497] + "..."
            
            return f"Based on web information: {combined_text}\n\nNote: This information is from web sources and not medically verified. Please consult healthcare professionals for medical advice."
        else:
            # If no specific results found, provide a general answer
            return "Gestational Diabetes Mellitus (GDM) is a type of diabetes that develops during pregnancy. It affects how your cells use sugar (glucose) and can cause high blood sugar, which can affect your pregnancy and your baby's health. Please consult your healthcare provider for specific information about your condition."
    
    except Exception as e:
        logger.error(f"Web scraping error: {str(e)}", exc_info=True)
        return "Gestational Diabetes Mellitus (GDM) is a form of diabetes that occurs during pregnancy. If you have specific questions, please try asking in a different way or consult your healthcare provider."

@app.route('/health', methods=['GET'])
def health_check():
    """Endpoint to check if the service is running"""
    api_status = "available" if openai.api_key else "unavailable"
    
    return jsonify({
        'status': 'healthy',
        'message': 'GDM Chatbot service is running',
        'api_status': api_status
    })

@app.route('/chat', methods=['POST'])
def chat():
    """Endpoint to handle chat requests"""
    try:
        data = request.json
        
        if 'message' not in data:
            logger.warning("Chat request missing message")
            return jsonify({'error': 'No message provided'}), 400
            
        user_message = data['message']
        logger.info(f"Received chat request: {user_message[:50]}...")
        
        # Check if OpenAI API is available
        if openai.api_key:
            try:
                # Prepare the messages with system instructions
                messages = [
                    {
                        "role": "system", 
                        "content": """You are a helpful and empathetic assistant specialized in Gestational Diabetes Mellitus (GDM).
                        Provide accurate, evidence-based information to pregnant women or those planning pregnancy
                        regarding GDM prevention, diagnosis, management, and complications.
                        When appropriate, cite credible medical sources.
                        Avoid providing specific medical advice that should come from healthcare providers.
                        Be compassionate but professional, and emphasize the importance of regular medical care."""
                    },
                    {"role": "user", "content": user_message}
                ]
                
                # Call OpenAI API
                response = openai.chat.completions.create(
                    model="gpt-4o",
                    messages=messages,
                    temperature=0.7,
                    max_tokens=1000
                )
                
                # Extract and return the assistant's response
                assistant_response = response.choices[0].message.content
                logger.info(f"Generated response: {assistant_response[:50]}...")
                
                return jsonify({
                    'response': assistant_response,
                    'source': 'api'
                })
            except Exception as e:
                logger.warning(f"OpenAI API error, falling back to web scraping: {str(e)}")
                # Fall back to web scraping if OpenAI API fails
                scraped_response = web_scrape_for_gdm_info(user_message)
                return jsonify({
                    'response': scraped_response,
                    'source': 'web'
                })
        else:
            # If API key is not configured, use web scraping
            logger.info("API key not found, using web scraping fallback")
            scraped_response = web_scrape_for_gdm_info(user_message)
            return jsonify({
                'response': scraped_response,
                'source': 'web'
            })
        
    except Exception as e:
        logger.error(f"Chat error: {str(e)}", exc_info=True)
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    logger.info("Starting GDM Chatbot service on port 5002")
    app.run(host='0.0.0.0', port=5002, debug=True)
