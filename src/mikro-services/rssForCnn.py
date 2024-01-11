import feedparser

def fetch_cnn_world_news_rss():
    rss_url = "http://rss.cnn.com/rss/edition_meast.rss"
    feed = feedparser.parse(rss_url)
    return feed.entries

def print_news(entries):
    for idx, entry in enumerate(entries, start=1):
        print(entry.summary)
        print(f"News #{idx}")
        print(f"Title: {entry.title}")
        #print(f"Value: {entry.value}")
        print(f"Link: {entry.link}")
        #print(f"Published: {entry.published}")
        print("\n")

if __name__ == "__main__":
    cnn_world_news_entries = fetch_cnn_world_news_rss()
    print_news(cnn_world_news_entries)
