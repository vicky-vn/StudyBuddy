from llama_index.core.node_parser import SentenceSplitter
from llama_index.core import Document
from openai import OpenAI
import os
import json
import pandas as pd


def build_mcq_generator_prompt(context_info: str, language : str = 'English') -> str:
    prompt_template = f"""
We have provided context information below. 
------------------
{context_info}
\n------------------
You are a University Professor creating a test for students.
Questions and answer options should be in {language} language.
Given the context information, create 1 question that is specific to the context and 5 answer options to the question. Avoid creating generic or general questions.
The question should be clear that can be answered without even seeing the answer options. The length of the question should not exceed 300 characters.
All answers should be short and grammatically consistent with the main part of the question. The differences between the answer options must be accurate. 
Only 1 answer option should be correct and other 4 answer options should be incorrect. The answer options 'none of the above' or 'all answers are correct' should not be used. 
If the answer option is expressed in numbers, then the answer options should be from smaller to larger.
------------------
Provide the output in parsable JSON without using code blocks:
question: string
answers: [string, string, string, string, string]
correct_answer: string
""".strip()
    return prompt_template.format(context_info=context_info, language=language)


def generate_mcq(client: OpenAI, context_info: str, language : str = 'English') -> dict:
    prompt = build_mcq_generator_prompt(context_info=context_info, language=language)
    response = client.chat.completions.create(
        model='gpt-4o-mini',
        messages=[{"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content

def make_df_with_mcq(client: OpenAI, text: str, language: str = 'English') -> pd.DataFrame:
    """
    Generate multiple choice questions from text and return a DataFrame
    
    Parameters:
    client (OpenAI): OpenAI client
    text (str): Text to generate MCQs from
    language (str): Language of the MCQs
    
    Returns:
    pd.DataFrame: DataFrame with columns 'question', 'answers', 'correct_answer'
    """
    
    # Split the text into nodes
    document = Document(text=text)
    documents = [document]
    node_parser = SentenceSplitter(chunk_size=256, chunk_overlap=0)
    nodes = node_parser.get_nodes_from_documents(documents)

    df = pd.DataFrame(columns=['question', 'answers', 'correct_answer'])

    for context_info in nodes:
        mcq = generate_mcq(client=client, context_info=context_info, language=language)
        mcq = json.loads(mcq)
        df = pd.concat([df, pd.DataFrame([mcq])], ignore_index=True)
    return df

# the code below is only for testing purposes. to generate mcq you can use the function make_df_with_mcq
def read_txt(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        text = file.read()
    return text


if __name__ == '__main__':
    openai_api_key = os.getenv('OPENAI_API_KEY')
    client = OpenAI()
    text = read_txt('info.txt')

    df = make_df_with_mcq(client=client, text=text, language='English')
    df.to_csv('mcq.csv', index=False)

