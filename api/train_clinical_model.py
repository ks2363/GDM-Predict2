# train_clinical_model.py

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout, BatchNormalization, Input
import joblib

# 1. Load Dataset
file_path = "clinical_data/Gestational Diabetic Dataset.xlsx"
df = pd.read_excel(file_path)

# 2. Drop Unnecessary Columns
df_cleaned = df.drop(columns=["Case Number"])

# 3. Handle Missing Values
for col in df_cleaned.select_dtypes(include=['float64', 'int64']).columns:
    df_cleaned[col].fillna(df_cleaned[col].mean(), inplace=True)

# 4. Separate Features and Target
X = df_cleaned.drop(columns=["Class Label(GDM /Non GDM)"])
y = df_cleaned["Class Label(GDM /Non GDM)"]

# 5. Check target values
print("Unique target values:", y.unique())

# 6. Normalize Features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Save the fitted scaler for prediction use
joblib.dump(scaler, 'clinical_scaler.pkl')
print(" Scaler saved as 'clinical_scaler.pkl'")

# 7. Prepare CNN Inputs
num_features = X_scaled.shape[1]
image_size = int(np.ceil(np.sqrt(num_features)))
if image_size < 8:
    image_size = 8

X_padded = np.zeros((X_scaled.shape[0], image_size**2))
X_padded[:, :num_features] = X_scaled

X_cnn = X_padded.reshape(-1, image_size, image_size, 1).astype(np.float32)
print(f"Reshaped Data Shape for CNN: {X_cnn.shape}")

# 8. Train-Test Split
X_train, X_test, y_train, y_test = train_test_split(X_cnn, y, test_size=0.2, random_state=42)
print(f"Training samples: {X_train.shape[0]}, Testing samples: {X_test.shape[0]}")

# 9. Build CNN Model
input_shape = (image_size, image_size, 1)
model = Sequential([
    Input(shape=input_shape),

    Conv2D(32, (3,3), activation='relu', padding="same"),
    MaxPooling2D((2,2)),
    BatchNormalization(),

    Conv2D(64, (3,3), activation='relu', padding="same"),
    MaxPooling2D((2,2)),

    Flatten(),
    Dense(128, activation='relu'),
    Dropout(0.5),
    Dense(1, activation='sigmoid')
])

# 10. Compile Model
model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# 11. Train Model
history = model.fit(
    X_train, y_train,
    epochs=20,
    validation_data=(X_test, y_test),
    batch_size=32
)

# 12. Evaluate Model
test_loss, test_acc = model.evaluate(X_test, y_test)
print(f" Test Accuracy: {test_acc:.2f}")

# 13. Save Model
model.save('clinical_cnn_model.keras')
print(" Clinical CNN Model saved as 'clinical_cnn_model.keras'")

# 14. Plot Training History
plt.figure(figsize=(10,5))
plt.plot(history.history['accuracy'], label='Train Accuracy', marker='o')
plt.plot(history.history['val_accuracy'], label='Validation Accuracy', marker='o')
plt.title('Training vs Validation Accuracy')
plt.xlabel('Epoch')
plt.ylabel('Accuracy')
plt.legend()
plt.grid(True)
plt.tight_layout()
plt.show()
