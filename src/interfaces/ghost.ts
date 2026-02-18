import {Hunter} from './hunter'

export interface Ghost extends Document 
{
    type: string;
    status: string;
    characteristics: string;
    abilities: string;
    weakness:string;
    note: string;
    hunted: number;
    imageURL: string;
    isHidden: boolean;
    _createdBy: Hunter['id'];
}