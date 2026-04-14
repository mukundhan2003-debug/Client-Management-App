from flask import Flask
from flask_cors import CORS
from extension import db

app = Flask(__name__)
CORS(app)

# Database config
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize DB
db.init_app(app)

# Home route
@app.route('/')
def home():
    return "Backend is running 🚀"

# Import routes
from routes.auth import auth_bp
app.register_blueprint(auth_bp)

from routes.dashboard import dashboard_bp
app.register_blueprint(dashboard_bp)

# Create tables automatically
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)