# models/clinical_model_definitions.py

import tensorflow as tf
from tensorflow.keras import layers, models

def build_clinical_cnn_model(input_shape, num_classes=2):
    model = models.Sequential([
        layers.Conv1D(64, 3, activation='relu', input_shape=input_shape),
        layers.MaxPooling1D(2),
        
        layers.Conv1D(128, 3, activation='relu'),
        layers.MaxPooling1D(2),
        
        layers.Flatten(),
        layers.Dense(128, activation='relu'),
        layers.Dropout(0.5),
        layers.Dense(num_classes, activation='softmax')
    ])
    
    return model
