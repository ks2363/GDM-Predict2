# GDM-Predict

This project integrates machine learning models for diabetes prediction with a React frontend, including both clinical data-based and ECG image-based prediction, as well as an AI-powered GDM chatbot.

## Project Structure

```
/DiabNetProject
│
├── api/                           # Python Flask API
│   ├── predict_clinical.py        # API endpoint for clinical predictions
│   ├── predict_image.py           # API endpoint for ECG image predictions
│   ├── chatbot.py                 # API endpoint for GDM chatbot
│   ├── requirements.txt           # Python dependencies
│   ├── clinical_cnn_model.keras   # Trained CNN model for clinical data
│   ├── clinical_scaler.pkl        # Scaler for normalizing clinical input data
│   └── diabetes_cnn_model.keras   # Trained CNN model for ECG images
│
├── clinical_data/                 # Clinical data used for training
│   └── Gestational Diabetic Dataset.xlsx
│
├── public/                        # Public assets for the React app
│   ├── favicon.ico
│   └── ...
│
├── src/                           # React frontend source code
│   ├── components/                # React components
│   ├── pages/                     # Page components
│   ├── services/                  # Service layer for API communication
│   └── ...
│
├── package.json                   # Frontend dependencies
└── ...
```
