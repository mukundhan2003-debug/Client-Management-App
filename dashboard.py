from flask import Blueprint, jsonify

dashboard_bp = Blueprint('dashboard', __name__)

@dashboard_bp.route('/projects', methods=['GET'])
def get_projects():
    data = [
        {
            "client": "Google",
            "project": "Search UI",
            "amount": 50000,
            "date": "2026-04-10"
        },
        {
            "client": "Amazon",
            "project": "E-commerce Backend",
            "amount": 75000,
            "date": "2026-04-11"
        },
        {
            "client": "Microsoft",
            "project": "Dashboard System",
            "amount": 60000,
            "date": "2026-04-12"
        }
    ]

    return jsonify(data)