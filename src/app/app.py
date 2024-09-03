from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_mail import Mail, Message
from dotenv import load_dotenv
from datetime import datetime
import os

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)
CORS(app, origins=['http://localhost:4200'])  # Only allow requests from Angular running on localhost:4200

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:sandy123@localhost/leaveapp'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your_secret_key'

# Mail configuration
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = os.getenv('MAIL_USE_SSL') == 'True'

db = SQLAlchemy(app)
migrate = Migrate(app, db)
mail = Mail(app)

# Model for Leave Request
class LeaveRequest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    employee_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    leave_type = db.Column(db.String(50), nullable=False)
    reason = db.Column(db.Text, nullable=False)

# API routes
@app.route('/api/leaves', methods=['GET'])
def get_leaves():
    leaves = LeaveRequest.query.all()
    return jsonify([{
        'id': leave.id,
        'employee_name': leave.employee_name,
        'email': leave.email,
        'start_date': leave.start_date.strftime('%Y-%m-%d'),
        'end_date': leave.end_date.strftime('%Y-%m-%d'),
        'leave_type': leave.leave_type,
        'reason': leave.reason
    } for leave in leaves])

@app.route('/api/leaves/<int:id>', methods=['GET'])
def get_leave(id):
    leave = LeaveRequest.query.get_or_404(id)
    return jsonify({
        'id': leave.id,
        'employee_name': leave.employee_name,
        'email': leave.email,
        'start_date': leave.start_date.strftime('%Y-%m-%d'),
        'end_date': leave.end_date.strftime('%Y-%m-%d'),
        'leave_type': leave.leave_type,
        'reason': leave.reason
    })

@app.route('/api/leaves', methods=['POST'])
def create_leave():
    data = request.json
    new_leave = LeaveRequest(
        employee_name=data['employee_name'],
        email=data['email'],
        start_date=datetime.strptime(data['start_date'], '%Y-%m-%d').date(),    
        end_date=datetime.strptime(data['end_date'], '%Y-%m-%d').date(),
        leave_type=data['leave_type'],
        reason=data['reason']
    )
    db.session.add(new_leave)
    db.session.commit()
    return jsonify({'message': 'Leave request created successfully!'}), 201


@app.route('/api/leaves/<int:id>', methods=['PUT'])
def update_leave(id):
    leave = LeaveRequest.query.get_or_404(id)
    data = request.json
    leave.employee_name = data['employee_name']
    leave.email = data['email']
    leave.start_date = datetime.strptime(data['start_date'], '%Y-%m-%d').date()
    leave.end_date = datetime.strptime(data['end_date'], '%Y-%m-%d').date()
    leave.leave_type = data['leave_type']
    leave.reason = data['reason']
    
    db.session.commit()
    return jsonify({'message': 'Leave request updated successfully!'})

@app.route('/api/leaves/<int:id>', methods=['DELETE'])
def delete_leave(id):
    leave = LeaveRequest.query.get_or_404(id)
    db.session.delete(leave)
    db.session.commit()
    return jsonify({'message': 'Leave request deleted successfully!'})

@app.route('/api/leaves/<int:id>/send-email', methods=['POST'])
def send_leave_email(id):
    leave = LeaveRequest.query.get_or_404(id)
    recipient_email = request.json.get('recipient_email')
    
    send_email(recipient_email, leave)
    
    return jsonify({'message': 'Email sent successfully!'})

def send_email(to_email, leave_request):
    subject = 'Leave Request Details'
    body = f"""
    Employee Name: {leave_request.employee_name}
    Email: {leave_request.email}
    Start Date: {leave_request.start_date.strftime('%d-%m-%Y')}
    End Date: {leave_request.end_date.strftime('%d-%m-%Y')}
    Leave Type: {leave_request.leave_type}
    Reason: {leave_request.reason}
    """
    
    msg = Message(subject, sender=os.getenv('MAIL_USERNAME'), recipients=[to_email])
    msg.body = body
    
    try:
        mail.send(msg)
        print(f"Email sent successfully to {to_email}")
    except Exception as e:
        print(f'Error: {e}')

if __name__ == '__main__':
    app.run(debug=True, port=8080)
