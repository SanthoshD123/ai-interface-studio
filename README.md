# AI Interface Studio

A sophisticated, modern web-based AI chat interface that developers can easily integrate into their projects. This elegant, feature-rich interface provides a complete frontend and backend solution for AI-powered applications.

![Screenshot 2025-04-09 155224](https://github.com/user-attachments/assets/ce5a6342-9513-4670-87f2-fdafba7924f4)

---

## ✨ Features

- **Sleek, Modern UI** - Responsive design with intuitive controls and animations  
- **Dark/Light Mode** - Toggle between themes with a single click for comfortable viewing  
- **Real-time Stats** - Track response times and token usage with built-in metrics  
- **Customizable Parameters** - Adjust temperature, max tokens and other AI variables  
- **Developer-Friendly** - Simple API endpoints for easy integration with any AI backend  
- **Responsive Design** - Works flawlessly on desktop, tablet, and mobile devices  
- **Three-Panel Layout** - Sidebar for options, main chat interface, and information panel  

---

## 🚀 Getting Started

### Prerequisites

- Python 3.6+  
- pip package manager  

### Installation

**Clone this repository**
```bash
git clone https://github.com/yourusername/ai-interface-studio.git
cd ai-interface-studio
```

**Create and activate a virtual environment**
```bash
python -m venv venv
# Windows
venv\Scripts\activate
# Mac/Linux
source venv/bin/activate
```

**Install dependencies**
```bash
pip install -r requirements.txt
```

**Run the application**
```bash
python app.py
```

Open your browser and visit: `http://127.0.0.1:5000/`

---

## 🔌 Integration Guide

To connect the interface to your own AI service:

Modify the `/api/chat` endpoint in `app.py`:

```python
@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message', '')
    
    # Replace this with your AI service connection
    # Example with OpenAI:
    # response = openai.Completion.create(
    #     engine="davinci",
    #     prompt=user_message,
    #     max_tokens=data.get('max_tokens', 1000),
    #     temperature=data.get('temperature', 0.7)
    # )
    # ai_response = response.choices[0].text.strip()
    
    # Placeholder response
    ai_response = "Your AI response here"
    
    return jsonify({
        "response": ai_response,
        "history": chat_history
    })
```

Add your AI service's API credentials to a `.env` file.

---

## 🛠️ Customization

### Changing Colors and Theme

Edit the CSS variables in `static/css/style.css`:

```css
:root {
    --primary-color: #4f46e5;
    --secondary-color: #7c3aed;
    /* Additional variables */
}
```

### Adding More Features

The modular code structure makes it easy to add new features:

- Add new settings to the sidebar  
- Extend the info panel with additional metrics  
- Implement chat history persistence  

---

## 📚 Project Structure

```
ai-interface-studio/
├── app.py                # Flask backend and API endpoints
├── requirements.txt      # Python dependencies
├── static/               # Static assets
│   ├── css/
│   │   └── style.css     # Main stylesheet
│   ├── js/
│   │   └── main.js       # Frontend functionality
│   └── images/           # Image assets
└── templates/
    └── index.html        # Main interface template
```

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgements

- Font Awesome for icons  
- Google Fonts for the Poppins typeface  

---

**Made with ❤️ by Santhosh D**
