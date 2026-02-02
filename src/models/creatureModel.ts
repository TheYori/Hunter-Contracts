import {Schema, model} from 'mongoose';
import {Creature} from '../interfaces/creature';

const creatureSchema = new Schema<Creature>({
    name: {type: String, required: true, min: 3, max: 150},
    species: {type: String, required: true, min: 3, max: 150},
    status: {type: String, required: true, min: 3, max: 80},
    characteristics: {type: String, required: true, min: 50, max: 500}, 
    weakness: {type: String, required: true, min: 50, max: 500},
    located:{type: String, required: true, min: 5, max: 500},
    hunted: {type: Number, required: true},
    imageURL: {type: String, required: false},
    isUnique: {type: Boolean, required: true, default: false},
    isHidden: {type: Boolean, required: true, default: false},
    _createdBy: {type: String, ref: 'Hunter', required: true},
})

export const creatureModel = model<Creature>('Creature', creatureSchema);