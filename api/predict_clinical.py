
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
import joblib
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the trained model
model = load_model('clinical_cnn_model.keras')
print("Loaded model 'clinical_cnn_model.keras'")

# Load the saved scaler
scaler = joblib.load('clinical_scaler.pkl')
print("Loaded scaler 'clinical_scaler.pkl'")

# Input feature names and their mapping to form fields
feature_names = [
    'Age', 'No of Pregnancy', 'Gestation in previous Pregnancy', 'BMI', 'HDL', 'Family History',
    'unexplained prenetal loss', 'Large Child or Birth Default', 'PCOS', 'Sys BP', 'Dia BP',
    'OGTT', 'Hemoglobin', 'Sedentary Lifestyle', 'Prediabetes'
]

form_to_feature_mapping = {
    'age': 'Age',
    'pregnancyCount': 'No of Pregnancy',
    'previousGestationPeriod': 'Gestation in previous Pregnancy',
    'bmi': 'BMI',
    'hdl': 'HDL',
    'familyHistory': 'Family History',  # yes=1, no=0
    'prenatalLoss': 'unexplained prenetal loss',  # yes=1, no=0
    'birthDefects': 'Large Child or Birth Default',  # yes=1, no=0
    'pcos': 'PCOS',  # yes=1, no=0
    'systolicBP': 'Sys BP',
    'diastolicBP': 'Dia BP',
    'glucoseLevels': 'OGTT',
    'hemoglobin': 'Hemoglobin',
    'physicalActivity': 'Sedentary Lifestyle',  # low=1, medium/high=0
    'prediabetes': 'Prediabetes'  # yes=1, no=0
}

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        print("Received data:", data)
        
        # Transform form data to model input format
        patient_data = []
        
        for feature in feature_names:
            feature_value = None
            
            # Find the corresponding form field
            for form_field, mapped_feature in form_to_feature_mapping.items():
                if mapped_feature == feature:
                    # Get value from request data
                    if form_field in data:
                        raw_value = data[form_field]
                        
                        # Convert string values to numeric
                        if form_field == 'familyHistory':
                            feature_value = 1 if raw_value == 'yes' else 0
                        elif form_field == 'physicalActivity':
                            feature_value = 1 if raw_value == 'low' else 0
                        elif form_field in ['prenatalLoss', 'birthDefects', 'pcos', 'prediabetes']:
                            feature_value = 1 if raw_value == 'yes' else 0
                        else:
                            # Convert numeric strings to float
                            feature_value = float(raw_value)
                    break
            
            if feature_value is None:
                # Use default values if not provided
                if feature == 'Family History':
                    feature_value = 0  # Default: no family history
                elif feature == 'unexplained prenetal loss':
                    feature_value = 0  # Default: no
                elif feature == 'Large Child or Birth Default':
                    feature_value = 0  # Default: no
                elif feature == 'PCOS':
                    feature_value = 0  # Default: no
                elif feature == 'Sedentary Lifestyle':
                    feature_value = 0  # Default: not sedentary
                elif feature == 'Prediabetes':
                    feature_value = 0  # Default: no
                else:
                    return jsonify({'error': f'Missing required feature: {feature}'}), 400
                    
            patient_data.append(feature_value)
        
        print("Processed patient data:", patient_data)
        
        # Reshape data for model input
        patient_data = np.array(patient_data).reshape(1, -1)
        
        # Preprocess patient data
        patient_scaled = scaler.transform(patient_data)
        
        # Prepare for CNN input
        num_features = patient_scaled.shape[1]
        image_size = int(np.ceil(np.sqrt(num_features)))
        if image_size < 8:
            image_size = 8
            
        padded = np.zeros((1, image_size**2))
        padded[:, :num_features] = patient_scaled
        
        patient_cnn_input = padded.reshape(-1, image_size, image_size, 1).astype(np.float32)
        
        # Predict
        prediction = model.predict(patient_cnn_input)
        
        prediction_value = float(prediction[0][0])
        is_diabetic = prediction_value < 0.5
        
        # Calculate risk level based on prediction
        risk_level = "high" if prediction_value < 0.3 else "moderate" if prediction_value < 0.7 else "low"
        confidence = round((1 - prediction_value) * 100 if is_diabetic else prediction_value * 100, 1)
        
        result = {
            'prediction': 'GDM' if is_diabetic else 'Non-GDM',
            'isDiabetic': is_diabetic,
            'confidence': confidence,
            'risk': risk_level,
            'rawPrediction': float(prediction[0][0])
        }
        
        print("Prediction result:", result)
        return jsonify(result), 200
        
    except Exception as e:
        print("Error during prediction:", str(e))
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
