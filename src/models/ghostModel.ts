import {Schema, model} from 'mongoose';
import {Ghost} from '../interfaces/ghost';

const ghostSchema = new Schema<Ghost>({
    type: {type: String, required: true, min: 3, max: 150},
    status: {type: String, required: true, min: 3, max: 80},
    characteristics: {type: String, required: true, min: 50, max: 500}, 
    abilities: {type: String, required: true, min: 50, max: 500},
    weakness: {type: String, required: true, min: 50, max: 500},
    note:{type: String, required: true, min: 5, max: 500},
    hunted: {type: Number, required: true},
    imageURL: {type: String, required: false},
    isHidden: {type: Boolean, required: true, default: false},
    _createdBy: {type: String, ref: 'Hunter', required: true},
})

export const ghostModel = model<Ghost>('Ghost', ghostSchema);