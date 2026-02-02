import {Hunter} from './hunter'

export interface Creature extends Document 
{
    name: string;
    species: string;
    status: string;
    characteristics: string;
    weakness: string;
    located:string;
    hunted: number;
    imageURL: string;
    isUnique: boolean;
    isHidden: boolean;
    _createdBy: Hunter['id'];
}