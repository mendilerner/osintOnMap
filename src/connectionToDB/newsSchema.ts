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
    },
    time: {
        type: String
    }, 
    keywords: {
        type: Array(String)
    },
    literalLocation: {
        type: Array(String)
    },
    coordinates: {
        type: [Number, Number]
    },
    matchTo:{
        type: String
    },
    rating: {
        type: Number,
        default: 0
    }
});
// rawNewsSchema.set('timestamps', true)
const RawNews = mongoose.model<rawNews>('news', rawNewsSchema);

export default RawNews;
