# application.py

from flask import Flask
from predict_clinical import clinical_bp
from predict_image import image_bp
from chatbot import chatbot_bp

app = Flask(__name__)

# Register Blueprints
app.register_blueprint(clinical_bp)
app.register_blueprint(image_bp)
app.register_blueprint(chatbot_bp)

if __name__ == "__main__":
    app.run(debug=True)
