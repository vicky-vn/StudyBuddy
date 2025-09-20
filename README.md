# StudyBuddy 📚

> An AI Agent powered web application brought to you by Team Null Terminators @ WinHacks 2025

StudyBuddy is an intelligent document summarization tool that helps students efficiently process and understand their class notes by leveraging the power of OpenAI with collaborative AI agents.

## 🎯 Project Overview and Objectives

StudyBuddy was designed to solve a common problem faced by students: information overload from lengthy documents and notes. Our application uses advanced AI agents to provide intelligent, contextual summaries tailored to different difficulty levels and languages, making learning more accessible and efficient.

**Main Objectives:**
- Transform lengthy academic documents into concise, understandable summaries
- Maintain key information while adapting to user preferences
- Support multiple document formats and languages
- Provide an intuitive, modern web interface
- Utilize cutting-edge AI technology for enhanced learning

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

## 🛠️ Technology Stack

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
- **Testing**: Karma, Jasmine

### Key Dependencies
- `autogen==0.7.4` - Multi-agent AI framework
- `openai==1.63.0` - OpenAI API integration
- `flask==3.1.0` - Web framework
- `pymongo==4.11.1` - MongoDB driver
- `PyMuPDF==1.25.3` - PDF processing
- `python-docx==1.1.2` - Word document processing

## 🚀 Detailed Installation Instructions

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

## 💡 Usage Examples

### Basic Document Summarization

1. **Upload a document** (PDF, DOC, DOCX) or paste text directly
2. **Select difficulty level** (Beginner, Intermediate, Professional)
3. **Choose language** for the summary output
4. **Create a session** with a descriptive name
5. **Generate summary** and review the AI-processed result

### API Usage Examples

```python
# Example API calls

# Upload document and create session
POST /post_user_input
{
    "session_name": "Biology Chapter 5",
    "input_text": "Your document content...",
    "language": "English"
}

# Generate summary
POST /summarize
{
    "id": "document_id",
    "difficulty_level": "Intermediate",
    "language": "English"
}

# Retrieve all sessions
GET /get_user_input
```

### Command Line Usage

```bash
# Start the application
python app.py

# In another terminal, start frontend
cd frontEnd_dev
ng serve

# Access via browser
open http://localhost:4200
```

## 📁 Project Structure

```
StudyBuddy/
├── app.py                 # Main Flask application
├── agents.py              # AI agent definitions and logic
├── db.py                  # Database connection and utilities
├── requirements.txt       # Python dependencies
├── frontEnd_dev/          # Angular frontend
│   ├── src/              # Source code
│   │   ├── app/          # Angular components
│   │   └── assets/       # Static assets
│   ├── public/           # Public files
│   └── package.json      # Node.js dependencies
├── .cache/               # Build cache
├── dist/                 # Distribution files
├── .gitignore           # Git ignore rules
└── README.md            # Project documentation
```

## 🤝 Contribution Guidelines

We welcome contributions from the community! Here's how you can help:

### Getting Started
1. **Fork the repository** and create your feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```

2. **Set up development environment** following the installation instructions

3. **Make your changes** and ensure they follow our coding standards

### Code Standards
- **Python**: Follow PEP 8 guidelines
- **TypeScript/Angular**: Follow Angular style guide
- **Documentation**: Update README and add inline comments for complex logic
- **Testing**: Add tests for new features

### Submission Process
1. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```

2. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```

3. **Open a Pull Request** with:
   - Clear description of changes
   - Screenshots for UI changes
   - Test results

### Areas for Contribution
- 🐛 **Bug fixes** and performance improvements
- 🌟 **New features** like additional file format support
- 🌍 **Internationalization** and language support
- 📚 **Documentation** improvements
- 🧪 **Testing** coverage expansion
- 🎨 **UI/UX** enhancements

### Development Guidelines
- Write clear commit messages
- Keep PRs focused and atomic
- Update documentation for new features
- Test thoroughly before submitting
- Respect existing code style and architecture

## 📄 License

This project was created for WinHacks 2025. The codebase is available for educational and non-commercial use. Please refer to the repository for specific licensing terms.

### Contributors
- **[Vignesh Natarajan](https://github.com/vicky-vn)** - Project Lead & Backend Development
- **[Stanislav Nehretskyi](https://github.com/snehretskyi)** - Frontend Development

### Acknowledgments
- OpenAI for providing the GPT API
- AutoGen framework for multi-agent capabilities
- WinHacks 2025 for the hackathon opportunity

---

**Built with ❤️ by Team Null Terminators**

*For support, questions, or feature requests, please [open an issue](https://github.com/vicky-vn/StudyBuddy/issues) on GitHub.*
