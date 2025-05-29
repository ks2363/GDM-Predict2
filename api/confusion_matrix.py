import os
import matplotlib.pyplot as plt
import numpy as np
from sklearn.metrics import confusion_matrix, precision_score, recall_score, f1_score

# Create images folder if not exists
os.makedirs('images', exist_ok=True)

# Clinical Data
y_true_clinical = [0]*350 + [1]*355
y_pred_clinical = [0]*340 + [1]*10 + [0]*11 + [1]*344

# ECG Data
y_true_ecg = [0]*4 + [1]*4
y_pred_ecg = [0]*3 + [1]*1 + [1]*4

# Compute confusion matrices
cm_clinical = confusion_matrix(y_true_clinical, y_pred_clinical)
cm_ecg = confusion_matrix(y_true_ecg, y_pred_ecg)

# Function to plot confusion matrix
def plot_confusion_matrix(cm, title, filename, class_labels=["GDM", "Non-GDM"]):
    fig, ax = plt.subplots(figsize=(5,4))
    cax = ax.matshow(cm, cmap="Blues")
    plt.title(title, pad=20)
    fig.colorbar(cax)

    ax.set_xticklabels([''] + class_labels)
    ax.set_yticklabels([''] + class_labels)

    plt.xlabel('Predicted')
    plt.ylabel('True')

    # Display numbers inside boxes
    for (i, j), val in np.ndenumerate(cm):
        ax.text(j, i, f"{val}", ha='center', va='center', color='black', fontsize=12)

    plt.tight_layout()
    plt.savefig(filename, dpi=300)
    plt.close()

# Plot clinical confusion matrix
plot_confusion_matrix(cm_clinical, "Clinical Data Confusion Matrix", "images/clinical_confusion_matrix.png")

# Plot ECG confusion matrix
plot_confusion_matrix(cm_ecg, "ECG Data Confusion Matrix", "images/ecg_confusion_matrix.png")

# Calculate Precision, Recall, F1
clinical_precision = precision_score(y_true_clinical, y_pred_clinical)
clinical_recall = recall_score(y_true_clinical, y_pred_clinical)
clinical_f1 = f1_score(y_true_clinical, y_pred_clinical)

ecg_precision = precision_score(y_true_ecg, y_pred_ecg)
ecg_recall = recall_score(y_true_ecg, y_pred_ecg)
ecg_f1 = f1_score(y_true_ecg, y_pred_ecg)

print("=== Clinical Model Metrics ===")
print(f"Precision: {clinical_precision:.2f}")
print(f"Recall: {clinical_recall:.2f}")
print(f"F1-Score: {clinical_f1:.2f}")

print("\n=== ECG Model Metrics ===")
print(f"Precision: {ecg_precision:.2f}")
print(f"Recall: {ecg_recall:.2f}")
print(f"F1-Score: {ecg_f1:.2f}")
