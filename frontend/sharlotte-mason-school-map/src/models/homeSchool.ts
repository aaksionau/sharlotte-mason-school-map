import { IHomeSchool } from "src/interfaces/IHomeSchool";
import { Child } from "./child";

export class HomeSchool implements IHomeSchool {
    constructor() {
    }
    public id: string = '';
    public firstName: string = '';
    public familyName: string = '';
    public fullName: string = `${this.firstName} ${this.familyName}`;
    public cityName: string = '';
    public state: string = 'MN';
    public email: string = '';
    public children: Child[] = [];
    public interestedTopics: string = '';
    public longitude: number = 0;
    public latitude: number = 0;
    public added: Date = new Date();
    public interestCMBookStudy: string = '';
    public interestCoop: string = '';
    public interestNatureWalks: string = '';
    public interestMentoring: string = '';
    public interestFriendship: string = '';
    public interests: Array<string> = [];
    public addChild(yearOfBirth: number, gender: number): void {
        this.children.push(new Child(yearOfBirth, gender));
    }
    public childrenString: string = '';

    public mapSchool(val: IHomeSchool): HomeSchool
    {
        let homeschool = new HomeSchool();
        homeschool.firstName = val.firstName;
        homeschool.id = val.id;
        homeschool.familyName = val.familyName;
        homeschool.cityName = val.cityName;
        homeschool.state = val.state;
        homeschool.email = val.email;
        homeschool.longitude = val.longitude;
        homeschool.latitude = val.latitude;
        homeschool.added = val.added;
        homeschool.interests = [val.interestCMBookStudy, val.interestCoop, val.interestFriendship, val.interestMentoring, val.interestNatureWalks];

        homeschool.interests = homeschool.interests.filter(s => s);

        homeschool.interests.forEach(i => {
            homeschool.interestedTopics += `${i}, `;
        });
        homeschool.interestedTopics = homeschool.interestedTopics.slice(0, -2);
        homeschool.children = val.children.map(s=>new Child(s.yearOfBirth, s.gender));
        if (homeschool.children.length != 0) {
            homeschool.children = val.children.map(ch => new Child(ch.yearOfBirth, ch.gender));
        
            homeschool.children.forEach(ch => {
                homeschool.childrenString += `${ch.genderString} (${ch.age}), `
            });
            homeschool.childrenString = homeschool.childrenString.slice(0, -2);   
        }
        homeschool.interestCMBookStudy = val.interestCMBookStudy;
        homeschool.interestCoop = val.interestCoop;
        homeschool.interestFriendship = val.interestFriendship;
        homeschool.interestMentoring = val.interestMentoring;
        homeschool.interestNatureWalks = val.interestNatureWalks;

        return homeschool;
    }
}