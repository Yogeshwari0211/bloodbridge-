from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

# Sample data (to simulate a database)
donors = []
requests = []

@app.route('/')
def home():
    return jsonify({'message': 'Welcome to BloodBridge API'})

@app.route('/register-donor', methods=['POST'])
def register_donor():
    data = request.json
    donors.append(data)
    return jsonify({'message': 'Donor registered successfully!', 'donors': donors})

@app.route('/request-blood', methods=['POST'])
def request_blood():
    data = request.json
    requests.append(data)
    return jsonify({'message': 'Blood request submitted successfully!', 'requests': requests})

@app.route('/search-donors', methods=['GET'])
def search_donors():
    blood_group = request.args.get('blood_group')
    matching_donors = [donor for donor in donors if donor['blood_group'] == blood_group]
    return jsonify({'matching_donors': matching_donors})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
