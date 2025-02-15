import os
import fitz
from dotenv import load_dotenv
from openai import OpenAI
from autogen import ConversableAgent, UserProxyAgent, AssistantAgent, runtime_logging, Agent


def read_pdf(file_path):
    text = ""
    with fitz.open(file_path) as doc:
        for page in doc:
            text += page.get_text("text") + "\n"
    return text


difficulty_level = 'Intermediate'

# with open("info.txt", "r", encoding="utf-8") as file:
#     text = file.read()


text = read_pdf('text.pdf')

language = 'English'

config_list = [
    {
        "model": "gpt-4o-mini",
        "api_key": os.environ.get("OPENAI_API_KEY")
    }
]

# Summary Agent
summary_agent = AssistantAgent(
    name="SummaryAgent",
    system_message= f"""You are an AI that summarizes text at different difficulty levels. There are three levels: 'Beginner' (very simple), 'Intermediate' (easy to read), 'Professional' (formal & detailed).
You must make summary in {language} and adjust the complexity based on the user's request: {difficulty_level}
You will also communicate with ReviseAgent who will prompt you with improvments to make in the summary, to which you must improve the summary taking all information into account""".strip(),
    llm_config={"config_list": config_list},
)


revise_agent = AssistantAgent(
    name="ReviseAgent",
    system_message=f"""You are an AI that revises the summarized text at {difficulty_level} difficulty levels and communicates with SummaryAgent to improve its summary. "
You must better adjust the complexity based on the user's requested difficulty level: {difficulty_level}.
You must determine if the summary can be improved given the original message and chat history
You must prompt/provide suggestion in bulletpoint format to SummaryAgent who will take your input and improve the summary""",
    llm_config={"config_list": config_list},
    
)


response = revise_agent.initiate_chat(
    summary_agent,
    message=f"Summarize this text at a '{difficulty_level}' level:\n{text}",
    summary_method="reflection_with_llm",
    max_turns=2,
)

print(response.chat_history[-1].get('content'))

