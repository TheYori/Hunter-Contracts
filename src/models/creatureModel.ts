import {Schema, model} from 'mongoose';
import {Creature} from '../interfaces/creature';

const creatureSchema = new Schema<Creature>({
    name: {type: String, required: true, min: 3, max: 150},
    Species: {type: String, required: true, min: 3, max: 150},
    Status: {type: String, required: true, min: 3, max: 80},
    Characteristics: {type: String, required: true, min: 50, max: 500}, 
    weakness: {type: String, required: true, min: 50, max: 500},
    hunted: {type: Number, required: true},
    imageURL: {type: String, required: false},
    isUnique: {type: Boolean, required: true, default: false},
    isHidden: {type: Boolean, required: true, default: false},
    _createdBy: {type: String, ref: 'Hunter', required: true},
})

export const creatureModel = model<Creature>('Creature', creatureSchema);