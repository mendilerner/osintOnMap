

import json
import re
import google.generativeai as genai
import os
from dotenv import load_dotenv




load_dotenv()


GOOGLE_API_KEY = os.getenv('GEMINI_API_KEY')
genai.configure(api_key=GOOGLE_API_KEY)

model = genai.GenerativeModel('gemini-pro')

main_text = '''Thousands rally across Slovakia to condemn changes to penal code proposed by populist prime minister
'''

array_text = [
    '''Slovakian president sharply criticizes changes to penal code proposed by populist prime minister

BRATISLAVA, Slovakia (AP) — Slovakia’s president voiced her strong opposition on Thursday to a plan by the new government of populist Prime Minister Robert Fico to overhaul the country’s penal code.

In an address to Parliament, President Zuzana Čaputová said the proposed changes could jeopardize the rule of law and cause “unpredictable” damage to society.

“It’s unprecedented for such serious changes in the penal code to take place without a proper legislative process,” Čaputová said.

...

2024-01-18 14:14:53
[Full Text]'''
,
   
    '''Ron DeSantis on Saturday tried to frame his White House campaign as the one that can top GOP front-runner Donald Trump and Nikki Haley in pivotal South Carolina, but some who came out to see him in this coastal tourist mecca said they felt the state was likely to go the former president’s way in next month’s primary.

It was some of the same sentiment as well in DeSantis’ stop at a diner in Florence, where the former Navy officer leaned heavily into his experience as the “only veteran running for president.”'''
,
 
'''A Swedish-Iranian man in his 60 arrested last year in Iran, Sweden says

COPENHAGEN, Denmark (AP) — Iran last year arbitrarily detained a Swedish citizen in his 60s, authorities in Stockholm said Thursday, calling for the man’s immediate release.

The government did not identify the man, but said he holds both Swedish and Iranian citizenship and was detained at the end of November “without a clear reason.”

The Foreign Ministry in Stockholm on Wednesday summoned Iran’s chargé d’affaires and demanded the release of all Swedish citizens “who are arbitrarily detained in Iran.”

...

2024-01-18 13:30:02
[Full Text]'''
]


def getGeminiDetection(new_news_report=None, olders_news_array=None):
    if not new_news_report or not olders_news_array:
        print('texts to exemine not sapllied !!!')
        return [0,0,0]
    main_prompt = '''
    this is new news report: {}
    and this is an array of 3 older news reports: {}
    Please examine these texts and determine whether the new news report already appears in one of the news items in the array of 3 old news items.
    notes:
    1. for determine metching, news report does not have to be exactly the same words, but it reports about the same news event, even if in a different way.
    2. please find the most match text i.e. if you find more then one match, please select only the most match text and not bring me more then one match.
    3. i want the format of your response will be thus: for every news item  in the older news array if the new news report does appear in this news item put 2, if not put 0, EXACTLY IN THIS FORMAT!!!: [<2 if it the most matching, 0 if not>,<2 if it the most matching, 0 if not>,<2 if it the most matching, 0 if not>]

    '''.format(new_news_report, olders_news_array)
    safety_settings=[
        {
            "category": "HARM_CATEGORY_HARASSMENT",
            "threshold": "BLOCK_NONE",
        },
        {
            "category": "HARM_CATEGORY_HATE_SPEECH",
            "threshold": "BLOCK_NONE",
        },{
            "category":"HARM_CATEGORY_DANGEROUS",
            "threshold": "BLOCK_NONE",
        },{
            "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
             "threshold": "BLOCK_NONE",
        }
    ]
    print(main_prompt)
    try:
        response = model.generate_content(main_prompt,safety_settings=safety_settings)
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return [0,0,0]
    try:
        result_list = eval(response.text)
        print('results: ',response.text)
        return result_list
    except Exception as e:
        print(response.prompt_feedback)
        print(f"An unexpected error occurred: {e}")
        return [0,0,0]






def getGeminiAnswer(new_news_report=None, olders_news_array=None):
    if not new_news_report or not olders_news_array:
        print('texts to exemine not sapllied !!!')
        return [0,0,0]
    main_prompt = '''
    this is new news report: """{}"""
    and this is an array of 3 older news reports: ["""{}""","""{}""","""{}"""]
    Please examine these texts and determine whether the new news report already appears in one of the news items in the array of 3 old news items.
    note:
    1. for determine metching, news report does not have to be exactly the same words, but it reports about the same news event, even if in a different way.
    2. please find the most match text i.e. if you find more then one match, please select only the most match text and not bring me more then one match.
    3. pleae end your response with this array for every item in older news array : [<2 if it the most matching, 0 if not>,<2 if it the most matching, 0 if not>,<2 if it the most matching, 0 if not>]
    '''.format(new_news_report, olders_news_array[0],olders_news_array[1], olders_news_array[2])
    safety_settings=[
        {
            "category": "HARM_CATEGORY_HARASSMENT",
            "threshold": "BLOCK_NONE",
        },
        {
            "category": "HARM_CATEGORY_HATE_SPEECH",
            "threshold": "BLOCK_NONE",
        },{
            "category":"HARM_CATEGORY_DANGEROUS",
            "threshold": "BLOCK_NONE",
        },{
            "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
             "threshold": "BLOCK_NONE",
        }
    ]
    print(main_prompt)
    try:
        response = model.generate_content(main_prompt,safety_settings=safety_settings)
        print('--------')
        print(response.text)
        print('--------')
        matches = re.findall(r'\[(^]*)\]', response.text)
        # result_list = json.loads(matches[0])
        # # If there are matches, print them
        if matches:
            print(matches)
            try:
                result_list = eval(matches)
                return result_list
            except Exception as e:
                print(response.prompt_feedback)
                print(f"An unexpected error occurred: {e}")
                return [0,0,0]
        else:
            return [0,0,0]
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return [0,0,0]
        
