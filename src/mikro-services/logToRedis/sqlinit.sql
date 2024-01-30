CREATE SCHEMA news_schema;


CREATE TABLE news_schema.news (
    _id VARCHAR(255) PRIMARY KEY, -- Using SERIAL for an auto-incrementing primary key
    source VARCHAR(255), -- Adjust the size based on your needs
    link VARCHAR(255), -- Adjust the size based on your needs
    snippet VARCHAR(1023), -- Adjust the size based on your needs
    body VARCHAR(2047), -- Adjust the size based on your needs
    keywords TEXT[], -- Using TEXT[] for an array of strings
    time VARCHAR(255), -- Adjust the size based on your needs
    rating INT, 
    matchTo VARCHAR(255), -- Adjust the size based on your needs
    coordinates DECIMAL[] -- Using DECIMAL[] for an array of 2 decimal numbers
);

INSERT INTO news_schema.news (
   _id, source, link, snippet, body, keywords, time, rating, matchTo, coordinates
) VALUES (
    '65a6a9fcc69f20d4c0cef74f',
    'Example Source',
    'http://example.com',
    'Example Snippet',
    'MLK Jr. holiday celebrations include acts of service and parades, but some take a political turn\n\nATLANTA (AP) — Communities across the nation celebrated the Martin Luther King Jr. holiday on Monday with acts of service, prayer services and parades. But with the November presidential election as a backdrop, some events took on an overtly political turn.\n\nIn King’s hometown of Atlanta, several speakers at the 56th annual commemorative service at the historic Ebenezer Baptist Church, where King served as pastor, touched on the divisive partisan climate in the United States.\n\n...\n\n2024-01-16 05:20:11\n[Full Text]',
    ARRAY['keyword1', 'keyword2'],
    '2024-01-16T16:01:39.457Z',
    5,
    '65a6a69dc69f20d4c0cef74a',
    ARRAY[33.7489924,-84.3902644]
);

select * from news_schema.news;
