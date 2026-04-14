import bcrypt
from flask import Blueprint, request, jsonify
from extension import db
from models import User

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.json

    # 🔐 hash password
    hashed_password = bcrypt.hashpw(
        data['password'].encode('utf-8'),
        bcrypt.gensalt()
    )

    user = User(
        username=data['username'],
        password=hashed_password.decode('utf-8')
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User created successfully"})

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json

    user = User.query.filter_by(username=data['username']).first()

    if user and bcrypt.checkpw(
        data['password'].encode('utf-8'),
        user.password.encode('utf-8')
    ):
        return jsonify({"message": "Login successful"})

    return jsonify({"message": "Invalid credentials"}), 401