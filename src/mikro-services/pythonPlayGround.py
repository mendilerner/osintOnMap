# import spacy

# nlp = spacy.load("en_core_web_lg")  # make sure to use larger package!
article1 = """Fauda” star, singer and IDF soldier, Idan Amedi has been injured while fighting in the Hamas and Gaza conflict.
Executive director of StandWithUs Israel Michael Dickson tweeted the news.
“Real-life hero: Singer and “Fauda” star Idan Amedi has been seriously injured while fighting in the counterterrorism operation against Hamas in Gaza,” Dickson reported Monday morning. “He was one of the first famous Israelis to enlist since Oct. 7. Pray for his full recovery – his Hebrew name is: Idan Ben Tova.”
Amedi’s father confirmed the injury to the Walla news site, according to The Times of Israel, but the actor and soldier’s wound is not life-threatening.
The singer sustained an injury fighting in Gaza and was airlifted to Sheba Medical Center at Tel Hashomer, where he is receiving treatment and under sedation.
A crew member for the show was killed in action in Gaza in November of last year. Matan Meir fought in the war as a reservist in Israel’s 551st Brigade’s 697th Battalion.
“Fauda” actor Lior Raz also joined an effort in October to extract two families from Sderot, a southern town in Israel and one of the sites under bombardment by Hamas forces. Raz posted a short clip to X, formerly known as Twitter, in which he and the show’s co-creator Avi Issacharoff take shelter as a mortar shell flies through the air above them.
“Acompanied by Yohanan Plesner and Avi Issacharoff, I headed down south to join hundreds of brave ‘brothers in arms’ volunteers who worked tirelessly to assist the population in the south of Israel. We were sent to the bombarded town of Sderot to extract 2 families,” the tweet reads.
Sound editor Lior Waitzman, who worked on “Fauda” as well as Apple TV+’s “Tehran” was killed in the initial Hamas terrorist attacks on Israel Oct. 7. Netflix CEO Ted Sarandos confirmed the news.
The post ‘Fauda’ Star and IDF Soldier Idan Amedi Injured Fighting in Gaza appeared first on TheWrap."""

article2 = """A top Israeli actor, best known for his role as a special forces soldier in hit Netflix series “Fauda,” has been badly wounded in Gaza while fighting for Israel’s military against Hamas, according to his family and the hospital where he is being treated.
Idan Amedi, 35, is in critical condition in the ICU at Sheba Tel Hashomer Medical Center near Tel Aviv, a spokesperson for the hospital said.
However, the star’s father told Israeli website Walla!: “There is no danger to his life.”
Amedi, who is of Kurdish descent, shot to fame in the 2010s as a singer-songwriter before joining the cast of “Fauda” in 2017. He plays a member of an Israeli special forces unit in the series, which follows an Israeli agent who comes out of retirement to hunt for a Palestinian fighter he thought he’d killed, according to the show’s official Netflix page.
Amedi had volunteered to fight for the Israeli military in Gaza following Hamas’ October 7 attacks on Israel, according to “Fauda” co-creators Lior Raz and Avi Issacharaoff.
“Idan is a true hero and from the first day of the war he decided to put everything aside and go fight. First in the north and then in the south [of Gaza],” they told Walla!
"""
# article3 = """Nine IDF soldiers were killed in three incidents in Gaza on Monday, with eight soldiers wounded.
# Six of the killed soldiers and most of the wounded came from an incident with explosive material near the partially underground and partially above-ground Hamas rocket manufacturing factory uncovered by the IDF at al-Bureij in central Gaza.
# Israeli fire on a Gaza utility pole caused the blast inside a terror tunnel that led to the death of six IDF fighters on Tuesday, as per new details published on Tuesday evening by Israeli media.
# A truck was bringing explosive material to soldiers operating near the partially underground and partially above-ground Hamas rocket manufacturing factory uncovered by the IDF at al-Bureij in central Gaza.
# Israeli forces were going to use it to explode and destroy aspects of the Hamas manufacturing facility
# The incident, in which six soldiers were killed and a number wounded, occurred after an Israeli tank fired at what it identified as a suspicious terrorist target during operations across the Strip.
# The tank fired two shells, one hitting its target and the other landing on the utility pole, causing an explosion around thirty minutes before planned and killing the soldiers.
# There was another incident in Khan Yunis in which two soldiers died and a third incident elsewhere in which another soldier died."""

# article4 = """A live broadcast by Ecuadorean television station TC was interrupted on Tuesday by armed people, with gunshots and yelling heard on a live feed, as President Daniel Noboa issued a decree declaring 22 gangs as terrorist organizations.
# The people, wearing balaclavas and mostly dressed in black, were seen wielding guns and accosting huddled staffers before the feed cut out.
# Some of the invaders gestured at the camera and someone could be heard yelling "no police."
# The national police said on social media it was evacuating the public channel's studio in Guayaquil, verifying the condition of staff there and "reestablishing order."
# Police in Guayaquil confirmed 13 arrests, and police social media posts showed photos of young men lying on the floor with their hands zip-tied behind their backs.
# The incident followed the kidnappings of at least seven police officers and a series of explosions, a day after Noboa declared a state of emergency.
# TC, which broadcasts nationally, shares a site with another public broadcaster, Gamavision, and several radio stations."""
article5 = """
NYT: Yemen Bombing Reduced the Fighting Potential of the Houthis by only 30%

The US-led Western coalition's strikes on the facilities of the Ansar Allah rebels in Yemen have reduced their offensive potential by no more than 30 per cent. This was reported on Saturday by The New York Times, citing US administration officials.

As the publication points out, even "after strikes on more than 60 targets [in the form of storage and launch facilities] missiles and drones using more than 150 precision munitions have damaged or destroyed only 20% to 30% of the offensive potential of the Houthis." It is noted that most of their weapons "are based on mobile platforms and can be easily moved or hidden".

"""
amedi1 = """Singer and 'Fauda' star Idan Amedi seriously injured in Gaza fighting"""
amedi2 = """Star of ‘Fauda’ Netflix series badly injured during combat in Gaza"""
# gaza= """Israel to withdraw some troops from Gaza but expects fighting will continue through 2024"""
# iran3 = """Iran develops new high tech attack drone for Russia"""
# ecuador4 = """Ecuador TV studio taken over live on air by masked people brandishing guns"""
# SaudiArabia5 = """Saudi Arabia interested in Israel normalisation deal after war"""
# # doc1 = nlp(headline4)
# # doc2 = nlp(headline5)

# # Similarity of two documents
# # print( doc1.similarity(doc2))
# # Similarity of tokens and spans
# # french_fries = doc1[2:4]
# # burgers = doc1[5]
# # print(french_fries, "<->", burgers, french_fries.similarity(burgers))
# def compare(headlineA, headlineB):
#     doc1 = nlp(headlineA)
#     doc2 = nlp(headlineB)
#     similarity_score = doc1.similarity(doc2)
#     print("Similarity between the texts:", similarity_score)

# # compare(amedi1, amedi2)
# # compare(amedi1, SaudiArabia5)
# # compare(amedi1, gaza)
# # compare(amedi2, gaza)
# # compare(iran3, gaza)
# # compare(ecuador4, SaudiArabia5)
    
# a = nlp(article1)
# print(a.ents)

#import spacy

# Load the spaCy model
#nlp = spacy.load('en_core_web_lg')  # Assuming you've already downloaded the 'en_core_web_lg' model

# def extract_keywords(news_headline):
#     doc = nlp(news_headline)
#     keywords = []
#     print(doc.ents)
#     # Extracting named entities (entities other than 'DATE', 'TIME', 'PERCENT', 'MONEY', etc.)
#     # for ent in doc.ents:
#     #     if ent.label_ not in ['DATE', 'TIME', 'PERCENT', 'MONEY', 'QUANTITY', 'ORDINAL', 'CARDINAL']:
#     #         keywords.append(ent.text)
    
#     return doc.ents

# # Example news headline
# headline = "Researchers discover breakthrough in cancer treatment"

# # Extract keywords from the news headline
# extracted_keywords = extract_keywords(article1)

# print("Keywords extracted from the headline:", extracted_keywords)


# doc = nlp("This is a sample text for keyword extraction.") 

# # Use the noun_chunks property of the document to identify the noun phrases in the text 
# noun_phrases = [chunk.text for chunk in doc.noun_chunks] 

# # Use term frequency-inverse document frequency (TF-IDF) analysis to rank the noun phrases 
# from sklearn.feature_extraction.text import TfidfVectorizer 
# vectorizer = TfidfVectorizer() 
# tfidf = vectorizer.fit_transform([doc.text]) 

# # Get the top 3 most important noun phrases 
# top_phrases = sorted(vectorizer.vocabulary_, key=lambda x: tfidf[0, vectorizer.vocabulary_[x]], reverse=True)[:3] 

# # Print the top 3 keywords 
# print(top_phrases)
# import nltk
# nltk.download('stopwords')
# nltk.download('punkt')
# from rake_nltk import Rake
# rake_nltk_var = Rake()
# text = """spaCy is an open-source software library for advanced natural language processing,
# written in the programming languages Python and Cython. The library is published under the MIT license
# and its main developers are Matthew Honnibal and Ines Montani, the founders of the software company Explosion."""
# rake_nltk_var.extract_keywords_from_text('“ fauda ” actor lior raz also joined')
# keyword_extracted = rake_nltk_var.get_ranked_phrases()
# print(keyword_extracted)



# from nltk.tokenize import sent_tokenize
# import re , string
# import stopwords
preface = """Jamaica probes police killings of four people in 24 hours, including a teenage boy

SAN JUAN, Puerto Rico (AP) — A government agency in Jamaica says it is investigating four fatal shootings by police officers in the span of 24 hours, including that of a 14-year-old boy.

The Independent Commission of Investigations says police killed three people on Tuesday and another on Wednesday, with authorities alleging all four victims opened fire on the officers under investigation for the shootings.

Two of the killings happened in the capital of Kingston, including that of a high school student and another of an unknown victim the commission is trying to identify, according to a statement the commission released Wednesday."""
# preface_tokens = sent_tokenize(preface)

# print(preface_tokens)

# def clean_text(s):
#         s = s.lower()
#         s = s.split()
#         s = " ".join(s)
#         s = re.sub(f'[{re.escape(string.punctuation)}]', '', s)
# print([clean_text(t) for t in preface_tokens])
# def remove_stop_words(s):
#         stop_words = set(stopwords.words('english'))
#         s = s.split()
#         s = [w for w in s if not w.lower() in stop_words]
#         s = " ".join(s)
#         return s

import json
from keybert import KeyBERT
from kafka import KafkaConsumer

kw_model = KeyBERT(model='all-MiniLM-L6-v2')

from pymongo import MongoClient
client = MongoClient("mongodb+srv://orders_db:finalProjectTeam4@cluster0.xymtjg3.mongodb.net/rawNews?retryWrites=true&w=majority")
db = client.rawNews
rawNews_collection = db.news

# To consume latest messages and auto-commit offsets
consumer = KafkaConsumer('raw-news',
                         value_deserializer=lambda m: json.loads(m.decode('utf-8')),
                         group_id='raw-news-group',
                         bootstrap_servers=['localhost:9092'])
for message in consumer:
    # message value and key are raw bytes -- decode if necessary!
    # e.g., for unicode: `message.value.decode('utf-8')`
    if len(message.value['rawNews']) > 10:
        
      keywords = kw_model.extract_keywords(message.value['rawNews'], keyphrase_ngram_range=(1, 1), stop_words='english', top_n=5) 
      extracted_keywords = [item[0] for item in keywords]
      raw_news = {"source": message.value['source'],
                "body": message.value['rawNews'],
                "time": message.value['time'],
                "keywords": extracted_keywords}
      post_id = rawNews_collection.insert_one(raw_news).inserted_id
      print(extracted_keywords)
    print ("%s:%d:%d: key=%s value=%s" % (message.topic, message.partition,
                                          message.offset, message.key,
                                          message.value))

