import natural from 'natural'

 let TfIdf = natural.TfIdf;
// let tfidf = new TfIdf();

// tfidf.addDocument('Graphic Footage: IDF Jeep Runs Over A Wounded Man In West Bank He later died of sustained injuries, according to the Palestine-affiliated Quds News Network. Subscribe to RT');
// tfidf.addDocument('Ukrainian military enlistment officers stop public transit in Odessa to conscript male passengers, social media footage shows.');
// tfidf.addDocument('Former President of Russia Dmitry Medvedev comments on the ongoing farmer’s protests in Germany');
// tfidf.addDocument('During his first conference call of 2024, Shoigu said that Russian troops hold the strategic initiative along the entire contact line.');

// // console.log('IDF --------------------------------');
// // tfidf.tfidfs('IDF', function(i, measure) {
// //     console.log('document #' + i + ' is ' + measure);
// // });

// // console.log('military --------------------------------');
// // tfidf.tfidfs('military', function(i, measure) {
// //     console.log('document #' + i + ' is ' + measure);
// // });

// //console.log(natural.PorterStemmer.tokenizeAndStem("Graphic Footage: IDF Jeep Runs Over A Wounded Man In West Bank He later died of sustained injuries, according to the Palestine-affiliated Quds News Network. Subscribe to RT"))

// // const keyWordsList = natural.PorterStemmer.tokenizeAndStem("Graphic Footage: IDF Jeep Runs Over A Wounded Man In West Bank He later died of sustained injuries, according to the Palestine-affiliated Quds News Network. Subscribe to RT")
// // keyWordsList.forEach((word) => {
// //     console.log(`${word} --------------------------------`);
// //     tfidf.tfidfs(`${word}`, function(i, measure) {
// //         console.log(`document #` + i + ` is ` + measure);
// //     });
// // })


function extractKeywords(articleText) {
  // Initialize a TF-IDF instance
  const tfidf = new TfIdf();

  // Add the article text to the TF-IDF instance
  
  tfidf.addDocument(articleText);

  const keywords = {};
    //console.log(tfidf.listTerms(0));
  // Calculate TF-IDF scores for each term in the article
  tfidf.listTerms(0).forEach(term => {
    keywords[term.term] = term.tfidf;
  });
  console.log(keywords);
  // Sort keywords by TF-IDF score in descending order
  const sortedKeywords = Object.keys(keywords).sort((a, b) => keywords[b] - keywords[a]);
  //console.log(sortedKeywords);
  // Return the top keywords (adjust this number as needed)
  const topKeywords = sortedKeywords.slice(0, 8); // Change '5' to the desired number of keywords

  return topKeywords;
}

// Example article text
const article = `
A top Israeli actor, best known for his role as a special forces soldier in hit Netflix series “Fauda,” has been badly wounded in Gaza while fighting for Israel’s military against Hamas, according to his family and the hospital where he is being treated.

Idan Amedi, 35, is in critical condition in the ICU at Sheba Tel Hashomer Medical Center near Tel Aviv, a spokesperson for the hospital said.

However, the star’s father told Israeli website Walla!: “There is no danger to his life.”

Amedi, who is of Kurdish descent, shot to fame in the 2010s as a singer-songwriter before joining the cast of “Fauda” in 2017. He plays a member of an Israeli special forces unit in the series, which follows an Israeli agent who comes out of retirement to hunt for a Palestinian fighter he thought he’d killed, according to the show’s official Netflix page.

Amedi had volunteered to fight for the Israeli military in Gaza following Hamas’ October 7 attacks on Israel, according to “Fauda” co-creators Lior Raz and Avi Issacharaoff.

“Idan is a true hero and from the first day of the war he decided to put everything aside and go fight. First in the north and then in the south [of Gaza],” they told Walla!
`;
const article2 = `“Fauda” star, singer and IDF soldier, Idan Amedi has been injured while fighting in the Hamas and Gaza conflict.

Executive director of StandWithUs Israel Michael Dickson tweeted the news.

“Real-life hero: Singer and “Fauda” star Idan Amedi has been seriously injured while fighting in the counterterrorism operation against Hamas in Gaza,” Dickson reported Monday morning. “He was one of the first famous Israelis to enlist since Oct. 7. Pray for his full recovery – his Hebrew name is: Idan Ben Tova.”

Amedi’s father confirmed the injury to the Walla news site, according to The Times of Israel, but the actor and soldier’s wound is not life-threatening.

The singer sustained an injury fighting in Gaza and was airlifted to Sheba Medical Center at Tel Hashomer, where he is receiving treatment and under sedation.

A crew member for the show was killed in action in Gaza in November of last year. Matan Meir fought in the war as a reservist in Israel’s 551st Brigade’s 697th Battalion.

“Fauda” actor Lior Raz also joined an effort in October to extract two families from Sderot, a southern town in Israel and one of the sites under bombardment by Hamas forces. Raz posted a short clip to X, formerly known as Twitter, in which he and the show’s co-creator Avi Issacharoff take shelter as a mortar shell flies through the air above them.

“Acompanied by Yohanan Plesner and Avi Issacharoff, I headed down south to join hundreds of brave ‘brothers in arms’ volunteers who worked tirelessly to assist the population in the south of Israel. We were sent to the bombarded town of Sderot to extract 2 families,” the tweet reads.

Sound editor Lior Waitzman, who worked on “Fauda” as well as Apple TV+’s “Tehran” was killed in the initial Hamas terrorist attacks on Israel Oct. 7. Netflix CEO Ted Sarandos confirmed the news.

The post ‘Fauda’ Star and IDF Soldier Idan Amedi Injured Fighting in Gaza appeared first on TheWrap.`

const article3 = `Nine IDF soldiers were killed in three incidents in Gaza on Monday, with eight soldiers wounded.

Six of the killed soldiers and most of the wounded came from an incident with explosive material near the partially underground and partially above-ground Hamas rocket manufacturing factory uncovered by the IDF at al-Bureij in central Gaza.

Israeli fire on a Gaza utility pole caused the blast inside a terror tunnel that led to the death of six IDF fighters on Tuesday, as per new details published on Tuesday evening by Israeli media.

A truck was bringing explosive material to soldiers operating near the partially underground and partially above-ground Hamas rocket manufacturing factory uncovered by the IDF at al-Bureij in central Gaza.

Israeli forces were going to use it to explode and destroy aspects of the Hamas manufacturing facility.

The incident, in which six soldiers were killed and a number wounded, occurred after an Israeli tank fired at what it identified as a suspicious terrorist target during operations across the Strip.

The tank fired two shells, one hitting its target and the other landing on the utility pole, causing an explosion around thirty minutes before planned and killing the soldiers.

There was another incident in Khan Yunis in which two soldiers died and a third incident elsewhere in which another soldier died.`
const article4 = `Israel's ambassador to the UN, Gilad Erdan, celebrated the birthday of Kfir Bibas from the UN stage and placed a birthday cake on the podium to remind all ambassadors of their duty to fight for his return home, on Tuesday.

Kfir Bibas "celebrated" his first birthday in captivity in Gaza along with his parents and four-year-old brother.

Happy birthday wishes
"Kfir's kidnapping became a symbol of the most despicable cruelty known to humanity - the cruelty of Hamas," Erdan stated on the podium. "Kfir, I wish that next year you will celebrate your birthday with your loving family"; "Kfir, you are the reason Israel fights day and night, and you will not stop until we bring you home"


Additionally, ambassador Erdan appealed to the relatability and humanity of the rest of the ambassadors in the assembly.

"Many of you are here, parents or grandparents. Every milestone in your children's lives is a celebration. Their first step, their first word, their first smile and laugh. Babies are a source of light and hope - a symbol of life."

The other hostages haven't been forgotten
Ambassador Erdan also emphasized the suffering and harsh conditions of the hostages held by Hamas for nearly 100 days in his speech.

"Approximately 100 days have passed, and the General Assembly, like all UN bodies, did not even condemn the massacre."



He ended by addressing the president of the assembly, saying, "Mr. President, I ask that Kfir's birthday cake remain here on the podium as a painful memory so that everyone who comes up to speak here today will remember Kfir and our duty to bring him home. I will continue to remind you of your moral duty to fight for Kfir and his right to celebrate his birthday."

`
const article5 = `Over a ton of cocaine was seized at the St. Petersburg port.

The load was estimated at $121 million and was shipped from Nicaragua to Russia.

Subscribe to RT`
const a = natural.PorterStemmer.tokenizeAndStem(article)
//const ab = natural.
 console.log("A:",a);
const b = a.join(" ")
// console.log(b);
// Extract keywords from the article
const extractedKeywords = extractKeywords(article3);

console.log('Extracted Keywords:', extractedKeywords);

//  include the Keyword Extractor
import keyword_extractor from 'keyword-extractor'

//  Opening sentence to NY Times Article at
/*
http://www.nytimes.com/2013/09/10/world/middleeast/
surprise-russian-proposal-catches-obama-between-putin-and-house-republicans.html
*/
const sentence =
"President Obama woke up Monday facing a Congressional defeat that many in both parties believed could hobble his presidency."

//  Extract the keywords
const extraction_result =
keyword_extractor.extract(article,{
    language:"english",
    remove_digits: true,
    return_changed_case:true,
    remove_duplicates: true

});

function countCommonElements(arr1: string[], arr2: string[]): number {
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
  
    // Calculate the intersection (common elements) between the two sets
    const intersection = new Set([...set1].filter(elem => set2.has(elem)));
  
    return intersection.size;
  }
  
  function areArraysSimilar(arr1: string[], arr2: string[], threshold: number): boolean {
    const commonWordsCount = countCommonElements(arr1, arr2);
    return commonWordsCount >= threshold;
  }
  
  // Example arrays of words
  const array1: string[] = ['apple', 'banana', 'orange', 'grape', 'kiwi', 'melon', 'peach', 'pear', 'plum', 'mango'];
  const array2: string[] = ['apple', 'grape', 'orange', 'peach', 'plum', 'cherry', 'watermelon', 'kiwi', 'banana', 'mango'];
  
  // Set the threshold for similarity
  const similarityThreshold: number = 5;
  
  // Check if the arrays are similar
  const similar = areArraysSimilar(array1, array2, similarityThreshold);
  
  if (similar) {
    console.log('The arrays are similar.');
  } else {
    console.log('The arrays are not similar.');
  }
import nlp from 'compromise'

// Your text containing locations
const text = "I live in  New York and work in San Francisco. south Paris is a beautiful city.";

// Process the text with compromise
const doc = nlp(text);

// Get locations from the text
const locations = doc.places()//.data().map(location => location.text);

console.log('Locations found:', locations);
