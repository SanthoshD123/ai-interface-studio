from flask import Flask, render_template, request, jsonify
import os
import json
from datetime import datetime

app = Flask(__name__)

# Store chat history (in a real app, you'd use a database)
chat_history = []


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message', '')

    # Save user message
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    chat_history.append({
        "role": "user",
        "content": user_message,
        "timestamp": timestamp
    })

    # This is where you'd connect to an actual AI service
    # For now, we'll generate a placeholder response
    ai_response = f"I've received your message: '{user_message}'. In a production environment, this would be processed by a real AI model."

    # Save AI response
    chat_history.append({
        "role": "assistant",
        "content": ai_response,
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    })

    return jsonify({
        "response": ai_response,
        "history": chat_history
    })


@app.route('/api/clear', methods=['POST'])
def clear_history():
    global chat_history
    chat_history = []
    return jsonify({"status": "success"})


if __name__ == '__main__':
    app.run(debug=True)