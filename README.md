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

## Setting Up the Python Backend

1. Install Python 3.11.5+ if not already installed.
2. Navigate to the api directory:
   ```
   cd api
   ```
3. Create a virtual environment:
   ```
   python -m venv venv
   ```
4. Activate the virtual environment:
   - On Windows: `venv\Scripts\activate`
  
5. Install the required packages:
   ```
   pip install -r requirements.txt
   ```

6. Start the Flask API servers:
   - For clinical prediction:
     ```
     python predict_clinical.py
     ```
   - For ECG image prediction (in a separate terminal):
     ```
     python predict_image.py
     ```
   - For the GDM Chatbot (in a separate terminal):
     ```
     python chatbot.py
     ```

## Setting Up the React Frontend

1. Install Node.js 18+ if not already installed.
2. Navigate to the project root directory.
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm run dev
   ```
