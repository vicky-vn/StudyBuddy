# StudyBuddy 📚

> An AI Agent powered web application brought to you by Team Null Terminators @ WinHacks 2025

StudyBuddy is an intelligent document summarization tool that helps students efficiently process and understand their class notes by leveraging the power of OpenAI with collaborative AI agents.

## 🎯 Project Overview and Goal

StudyBuddy was designed to solve a common problem faced by students: information overload from lengthy documents and notes. Our application uses advanced AI agents to provide intelligent, contextual summaries tailored to different difficulty levels and languages, making learning more accessible and efficient.

**Main Goal**: Transform lengthy academic documents into concise, understandable summaries while maintaining key information and adapting to user preferences.

## ✨ Key Features

### 🤖 Multi-Agent AI System
- **Summary Agent**: Generates intelligent summaries at different complexity levels
- **Revise Agent**: Reviews and improves summaries through collaborative feedback
- **Collaborative Processing**: Agents work together to refine and enhance output quality

### 📄 Multiple Document Support
- **PDF Processing**: Extract and summarize content from PDF files
- **Word Documents**: Support for .doc and .docx files
- **Text Input**: Direct text input for quick summarization

### 🎚️ Adaptive Difficulty Levels
- **Beginner**: Very simple, easy-to-understand summaries
- **Intermediate**: Balanced complexity with clear explanations
- **Professional**: Formal and detailed summaries for advanced users

### 🌍 Multilingual Support
- Generate summaries in multiple languages
- Language-specific processing and output
- Localized content adaptation

### 📱 Modern Web Interface
- **Angular Frontend**: Responsive, modern user interface
- **RESTful API**: Clean backend architecture with Flask
- **Session Management**: Track and organize multiple document sessions
- **Real-time Processing**: Live feedback and status updates

## 🚀 Installation Instructions

### Prerequisites
- Python 3.8+
- Node.js 16+
- MongoDB
- OpenAI API key

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/vicky-vn/StudyBuddy.git
   cd StudyBuddy
   ```

2. **Create and activate virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   # Create .env file in root directory
   echo "OPENAI_API_KEY=your_openai_api_key_here" > .env
   ```

5. **Start MongoDB**
   ```bash
   # Make sure MongoDB is running on localhost:27017
   mongod
   ```

6. **Run the Flask backend**
   ```bash
   python app.py
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontEnd_dev
   ```

2. **Install Node.js dependencies**
   ```bash
   npm install
   ```

3. **Start the Angular development server**
   ```bash
   ng serve
   ```

4. **Access the application**
   - Open your browser and navigate to `http://localhost:4200`
   - Backend API runs on `http://localhost:5000`

## 💡 Usage Example

### Basic Document Summarization

1. **Upload a document** (PDF, DOC, DOCX) or paste text directly
2. **Select difficulty level** (Beginner, Intermediate, Professional)
3. **Choose language** for the summary output
4. **Create a session** with a descriptive name
5. **Generate summary** and review the AI-processed result


## 🛠️ Tech Stack

### Backend
- **Framework**: Flask (Python)
- **AI/ML**: OpenAI GPT-4, AutoGen (Multi-agent framework)
- **Database**: MongoDB with PyMongo
- **Document Processing**: PyMuPDF (PDF), python-docx (Word documents)
- **API**: RESTful architecture with Flask-CORS

### Frontend
- **Framework**: Angular 19
- **Language**: TypeScript
- **Build Tool**: Angular CLI
  
### Key Dependencies
- `autogen==0.7.4` - Multi-agent AI framework
- `openai==1.63.0` - OpenAI API integration
- `flask==3.1.0` - Web framework
- `pymongo==4.11.1` - MongoDB driver
- `PyMuPDF==1.25.3` - PDF processing
- `python-docx==1.1.2` - Word document processing

## 📁 Project Structure

```
StudyBuddy/
├── app.py                 # Main Flask application
├── agents.py              # AI agent definitions and logic
├── db.py                  # Database connection and utilities
├── requirements.txt       # Python dependencies
├── frontEnd_dev/          # Angular frontend
│   ├── src/              # Source code
│   ├── public/           # Static assets
│   └── package.json      # Node.js dependencies
├── .gitignore            # Git ignore rules
└── README.md             # Project documentation
```

## 📄 License

This project was created for WinHacks 2025. Please refer to the repository for licensing information.

---

**Built with ❤️ by Team Null Terminators**