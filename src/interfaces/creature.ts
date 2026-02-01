import {Hunter} from './hunter'

export interface Creature extends Document 
{
    name: string;
    Species: string;
    Status: string;
    Characteristics: string;
    weakness: string;
    hunted: number;
    imageURL: string;
    isUnique: boolean;
    isHidden: boolean;
    _createdBy: Hunter['id'];
}