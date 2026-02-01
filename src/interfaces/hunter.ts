export interface Hunter extends Document 
{
    id: string;
    name: string;
    email: string;
    password: string;
    experienceYears: number;
    registerDate: Date;
    country: string;
    huntingArea: string;
}