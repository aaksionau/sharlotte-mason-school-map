import { IChild } from './IChild'

export interface IHomeSchool { 
    id: string;
    firstName: string;
    familyName: string;
    cityName: string;
    email: string;
    state: string;
    children: IChild[];
    interestedTopics: string;
    added: Date;
    longitude: number;
    latitude: number
}