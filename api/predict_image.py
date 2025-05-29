
import os
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import io
import logging
import time

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger('ecg-predictor')

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Constants
IMG_HEIGHT = 224
IMG_WIDTH = 224
MODEL_PATH = 'diabetes_cnn_model.keras'

# Load model once at startup
logger.info("Loading ECG prediction model...")
try:
    model = load_model(MODEL_PATH)
    logger.info(f"Model loaded successfully from {MODEL_PATH}")
except Exception as e:
    logger.error(f"Error loading model: {str(e)}")
    model = None

@app.route('/health', methods=['GET'])
def health_check():
    """Endpoint to check if the service is running"""
    if model is None:
        return jsonify({
            'status': 'error',
            'message': 'Model not loaded'
        }), 503
    
    return jsonify({
        'status': 'healthy',
        'model_loaded': True,
        'model_path': MODEL_PATH
    })

@app.route('/predict-ecg', methods=['POST'])
def predict_ecg():
    """Endpoint to predict diabetes from ECG image"""
    start_time = time.time()
    
    if model is None:
        logger.error("Prediction attempted but model is not loaded")
        return jsonify({'error': 'Model not loaded'}), 503
        
    if 'image' not in request.json:
        logger.warning("Prediction request missing image data")
        return jsonify({'error': 'No image data provided'}), 400
        
    try:
        # Get the base64 string from the request
        image_b64 = request.json['image']
        
        # Remove the header if it exists (e.g., "data:image/jpeg;base64,")
        if ',' in image_b64:
            image_b64 = image_b64.split(',')[1]
            
        # Decode the base64 string
        image_data = base64.b64decode(image_b64)
        
        # Load and preprocess the image
        try:
            img = image.load_img(io.BytesIO(image_data), target_size=(IMG_HEIGHT, IMG_WIDTH))
        except Exception as e:
            logger.error(f"Error loading image: {str(e)}")
            return jsonify({'error': 'Invalid image format'}), 400
            
        # Preprocess the image
        img_array = image.img_to_array(img)
        img_array = img_array / 255.0
        img_array = np.expand_dims(img_array, axis=0)
        
        # Make prediction
        prediction = model.predict(img_array)
        
        # Get prediction results
        predicted_class = int(np.argmax(prediction[0]))  # Convert numpy int to Python int
        confidence = float(prediction[0][predicted_class])  # Convert numpy float to Python float
        is_diabetic = bool(predicted_class == 0)  # Convert to Python bool
        
        # Determine risk level
        if is_diabetic:
            if confidence > 0.85:
                risk = 'high'
            elif confidence > 0.7:
                risk = 'moderate'
            else:
                risk = 'moderate'
        else:
            risk = 'low'
        
        # Create response - ensuring all values are JSON serializable
        result = {
            'prediction': 'Diabetic' if is_diabetic else 'Non-Diabetic',
            'isDiabetic': is_diabetic,
            'confidence': round(confidence * 100, 2),
            'risk': risk,
            'rawPrediction': float(prediction[0][0])  # Convert numpy float to Python float
        }
        
        processing_time = time.time() - start_time
        logger.info(f"Prediction completed in {processing_time:.2f}s: {result['prediction']} with {result['confidence']}% confidence")
        
        return jsonify(result)
        
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}", exc_info=True)
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    logger.info("Starting ECG prediction service on port 5001")
    app.run(host='0.0.0.0', port=5001, debug=True)
