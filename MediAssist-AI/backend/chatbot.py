import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1"
)


def ask_ai(message: str, medical_report=False):

    if medical_report:

        system_prompt = """
You are MediAssist AI, a healthcare information assistant.

The user has provided text extracted from a medical report.

Your job is to explain the report in simple, understandable language.

Important safety rules:
- Do not diagnose diseases.
- Do not prescribe medicines.
- Do not recommend changing medication.
- Do not claim that a value definitely means a disease.
- Explain medical terms and reported values carefully.
- Clearly distinguish normal-looking and abnormal-looking values
  when the report provides reference ranges.
- If something appears potentially concerning, recommend discussing
  it with a qualified healthcare professional.
- If the extracted text looks corrupted or unreliable, say so.
- Never invent missing values.
"""

    else:

        system_prompt = """
You are MediAssist AI, a healthcare information assistant.

Provide general health information in simple language.

Do not diagnose diseases.
Do not prescribe medicines.
Do not replace a healthcare professional.

If a situation may be urgent, advise the user to seek
appropriate professional medical care.
"""

    response = client.chat.completions.create(
        model="inclusionai/ling-3.0-flash-sante:free",
        messages=[
            {
                "role": "system",
                "content": system_prompt
            },
            {
                "role": "user",
                "content": message
            }
        ]
    )

    return response.choices[0].message.content