import { IChild } from './IChild'

export interface IHomeSchool {
    id: string;
    firstName: string;
    familyName: string;
    cityName: string;
    email: string;
    phoneNumber: string;
    aboutGroup: string;
    aboutGroupUrl: string;
    state: string;
    children: IChild[];
    leadingGroupsText: string;
    added: Date;
    longitude: number;
    latitude: number,
    leadingCMBookStudy: string,
    leadingCoop: string,
    leadingNatureWalks: string,
    leadingMentoring: string,
    leadingOther: string,

    interestCMBookStudy: boolean,
    interestCoop: boolean,
    interestNatureWalks: boolean,
    interestFriends: boolean
}