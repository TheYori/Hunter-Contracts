import {Schema, model} from 'mongoose';
import {Hunter} from '../interfaces/hunter';

const hunterSchema = new Schema<Hunter>({
    name: { type: String, required: true, min: 3, max: 150 },
    email: {type: String, required: true, min: 6, max: 150, unique: true },
    password: {type: String, required: true, min: 8, max: 150 },
    experienceYears: {type: Number, required: true, min: 0, max: 99},
    registerDate: {type: Date, required: true, default: Date.now},
    country: {type: String, required: false},
    huntingArea: {type: String, required: false}
});

export const hunterModel = model<Hunter>('Hunter', hunterSchema);