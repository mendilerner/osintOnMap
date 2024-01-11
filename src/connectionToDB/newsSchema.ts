import mongoose, { Document, Schema } from 'mongoose';
import { rawNews } from '../interfaces';


const rawNewsSchema: Schema<rawNews> = new Schema({
    body: {
        type: String
    },
    source: {
        type: String,
        required: true
    },
    location: {
        type: String
    }
    
});

const RawNews = mongoose.model<rawNews>('news', rawNewsSchema);

export default RawNews;
