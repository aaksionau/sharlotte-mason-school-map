import { Child } from './child'

export interface HomeSchool { 
    id: string;
    firstName: string;
    familyName: string;
    cityName: string;
    email: string;
    state: string;
    children: Child[];
    interestedTopics: string;
    added: Date;
    longitude: number;
    latitude: number
}