import os
from dotenv import load_dotenv
from autogen import AssistantAgent

load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if not OPENAI_API_KEY:
    raise ValueError("Missing OpenAI API key")

config_list = [
    {
        "model": "gpt-4o-mini",
        "api_key": OPENAI_API_KEY
    }
]

# Summary Agent
summary_agent = AssistantAgent(
    name="SummaryAgent",
    system_message="""You are an AI that summarizes text at different difficulty levels. 
                     Adjust complexity based on the user's request: 
                    'Beginner' (very simple), 'Intermediate' (easy to read), 'Professional' (formal & detailed).
                    You will also communicate with ReviseAgent, who will suggest improvements to refine the summary.""",
    llm_config={"config_list": config_list},
)

# Revise Agent
revise_agent = AssistantAgent(
    name="ReviseAgent",
    system_message="""You are an AI that revises summarized text and communicates with SummaryAgent to improve its summary. 
                    You must determine if the summary can be improved based on the original message and chat history.
                    Provide improvement suggestions in bullet-point format for SummaryAgent to refine the summary.""",
    llm_config={"config_list": config_list},
)

def generate_summary(input_text, difficulty_level):
    print(f"Generating summary for input_text='{input_text}' at difficulty='{difficulty_level}'")  # Debug log

    response = revise_agent.initiate_chat(
        summary_agent,
        message=f"Summarize this text at a '{difficulty_level}' level:\n{input_text}",
        max_turns=2,
    )

    print("Raw response:", response)  # Debug log

    if response and hasattr(response, "summary") and response.summary:
        print("Extracted Summary:", response.summary)  # Debug log
        return response.summary

    return "Error in summarization"
