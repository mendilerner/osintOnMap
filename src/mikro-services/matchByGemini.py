

import google.generativeai as genai
import os
from dotenv import load_dotenv


# def to_markdown(text):
#   text = text.replace('•', '  *')
#   return Markdown(textwrap.indent(text, '> ', predicate=lambda _: True))

load_dotenv()


GOOGLE_API_KEY = os.getenv('GEMINI_API_KEY')
genai.configure(api_key=GOOGLE_API_KEY)

model = genai.GenerativeModel('gemini-pro')

main_text = '''SEOUL, Jan 15 (Reuters) - Russia will develop ties with North Korea in all areas building on agreements between their leaders in September, the Kremlin said on Monday, as their foreign ministers were set to meet in Moscow.

North Korean Foreign Minister Choe Son Hui arrived on Sunday on a rare visit to Moscow for talks with her counterpart Sergei Lavrov as the two countries deepen economic, political, and military ties, the North's state news agency KCNA said.
'''

array_text = [
   
    '''North Korean foreign minister visits Moscow for talks as concern grows over an alleged arms deal

MOSCOW (AP) — North Korea’s foreign minister is visiting Russia on Monday for three days of talks, as international concern grows over an alleged arms cooperation deal between the two countries.

A delegation led by Foreign Minister Choe Son Hui arrived in Moscow on Sunday, according to North Korea’s official Korean Central News Agency. She is to meet her Russian counterpart, Sergey Lavrov, on Tuesday, Russian Foreign Ministry spokesperson Maria Zakharova said.

Choe is visiting at Lavrov’s invitation, the ministry said.

...

2024-01-15 08:38:27
[Full Text]'''
,
 '''❗️Over 60,000 AFU Soldiers Trained in Britain Since 2014 - UK Defense Minister Grant Shapps 

About ten countries helped London in training Kiev's troops, he added.

Subscribe to RT'''
,
'''Elon Musk Wants 25% Tesla Voting Control

The billionaire is chasing "enough [voting power] to be influential, but not so much that I can't be overturned" at the automaker if he is to drive the company to be a leader in AI and robotics.

That would mean almost doubling his current stake to 25% after he sold off billions in stock to fund his purchase of Twitter. Still, he has been told it won’t be possible to do so via a dual-class share structure following Tesla’s initial public offering.

Subscribe to RT'''
]

main_prompt = '''
this is new news report: {}
and this array of older news reports: {}
please determine if the new news report matches (repeates on the same news event) any of the texts in the array
note:
1. metching news report does not have to be exactly the same, but it reports to the same news event, even if in a different way.
2. i want the format of your response will be thus: for every news item  in the older news array if it the same event of the new news report put 2, if not match put 0, if it doubt put 1(but not use it a lot), exactly thus: [<2 if very matching, 0 if not matching ,1 if it doubt>,<2 if very matching, 0 if not matching ,1 if it doubt>,<2 if very matching, 0 if not matching ,1 if it doubt>]'''.format(main_text, array_text)

def getGeminiDetection(new_news_report, olders_news_array):
    main_prompt = '''
    this is new news report: {}
    and this array of 3 older news reports: {}
    please determine if the new news report matches (repeates on the same news event) any of the texts in the array
    note:
    1. metching news report does not have to be exactly the same, but it reports to the same news event, even if in a different way.
    2. i want the format of your response will be thus: for every news item  in the older news array if it talk about the same news story , of the new news report put 2, if not match put 0, if it doubt put 1(but not use it a lot), EXACTLY IN THIS FORMAT!!!: [<2 if very matching, 0 if not matching ,1 if it doubt>,<2 if very matching, 0 if not matching ,1 if it doubt>,<2 if very matching, 0 if not matching ,1 if it doubt>]'''.format(new_news_report, olders_news_array)
    print(main_prompt)
    response = model.generate_content(main_prompt)
    try:
        result_list = eval(response.text)
        return result_list
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return [0,0,0]

#print(getGeminiDetection(main_prompt, array_text)[0]) 
"""2. i want the format of your response will be thus: for every news item  in the older news array if it match to the new news report put 2, if not match put 0, if you don't know to determine put 1, exactly thus: [<2 if matching, 0 if not matching ,1 if it doubt>,<2 if very matching, 0 if not matching ,1 if it doubt>,<2 if very matching, 0 if not matching ,1 if it doubt>]"""
"""i want your response will be the index number of the text that the most matching to the new news report (number between 0 to 2) (If there is no matching text, the response will be '-1')"""


# from datetime import datetime, timedelta
# from pymongo import MongoClient
# from bson import ObjectId
# client = MongoClient("mongodb+srv://orders_db:finalProjectTeam4@cluster0.xymtjg3.mongodb.net/rawNews?retryWrites=true&w=majority")
# db = client.rawNews
# rawNews_collection = db.news
# # Assuming HoursAgo and currentDate are datetime objects

# def get_time_in_as_string(_hoursAgo=0):
#     delay = 2
#     date = datetime.now() - timedelta(hours=delay +_hoursAgo) 
#     date_str = date.strftime("%Y-%m-%dT%H:%M:%S.%fZ")
#     print(date_str)
#     return date_str


# delay = 2
# HoursAgo = datetime.now() - timedelta(hours=2 + 2)  # Adjust your_hours accordingly
# currentDate = datetime.now() - timedelta(hours=delay)
# hours_ago_str = HoursAgo.strftime("%Y-%m-%dT%H:%M:%S.%fZ")
# current_date_str = currentDate.strftime("%Y-%m-%dT%H:%M:%S.%fZ")

# query = {
#     "time": {
#         "$gte": get_time_in_as_string(24),
#         "$lt": get_time_in_as_string()
#     }
# }

# fields_to_retrieve = {'time': 1} 
# raw_news_ripo = list(rawNews_collection.find(query,projection=fields_to_retrieve))
# print(raw_news_ripo)
# print(len(raw_news_ripo))
# print('houers ago: ', HoursAgo)
# print('currentDate: ', currentDate)
# # Construct the query

