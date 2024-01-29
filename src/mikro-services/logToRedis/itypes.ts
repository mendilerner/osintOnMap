export interface processedNews {
    _id: string; 
    source: string;
    link: string;
    snippet: string;
    body: string;
    keywords: string[]; // Array of strings
    time: string; // Assuming it's a string in the provided format
    rating?: number;
    matchTo: string;
    coordinates: number[]; // Array of 2 decimal numbers
  }