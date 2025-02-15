import os
from openai import OpenAI
from autogen import ConversableAgent, UserProxyAgent, AssistantAgent, runtime_logging, Agent

difficulty_level = 'Intermediate'
with open("info.txt", "r", encoding="utf-8") as file:
    text = file.read()

language = 'English'

config_list = [
    {
        "model": "gpt-4o-mini",
        "api_key": "My_key"
    }
]

with open("summary.txt", "r", encoding="utf-8") as file:
        summary_message= file.read()

with open("summary.txt", "r", encoding="utf-8") as file:
        reviewer_message= file.read()

# Summary Agent
summary_agent = AssistantAgent(
    name="SummaryAgent",
    system_message= f"""You are an AI that summarizes text at different difficulty levels. 
                     You must adjust the complexity based on the user's request: 
                    'Beginner' (very simple), 'Intermediate' (easy to read), 'Professional' (formal & detailed).
                    User level is {difficulty_level}, User language is {language} 
                    You will also communicate with ReviseAgent who will prompt you with improvments to make in the summary, to which you must improve the summary taking all information into account""",
    llm_config={"config_list": config_list},
)


revise_agent = AssistantAgent(
    name="ReviseAgent",
    system_message=f"""You are an AI that revises the summarized text at different difficulty levels and communicates with SummaryAgent to improve its summary. "
                    You must better adjust the complexity based on the user's request: 
                    You must determine if the summary can be improved given the original message and chat history
                    'Beginner' (very simple), 'Intermediate' (easy to read), 'Professional' (formal & detailed).
                    You must prompt/provide suggestion in bulletpoint format to SummaryAgent who will take your input and improve the summary""",
    llm_config={"config_list": config_list},
    
)


response = revise_agent.initiate_chat(
    summary_agent,
    message=f"Summarize this text at a '{difficulty_level}' level:\n{text}",
    summary_method="reflection_with_llm",
    max_turns=2,
)

print(response)

