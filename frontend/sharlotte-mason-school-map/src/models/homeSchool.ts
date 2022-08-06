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
    public leadingGroupsText: string = '';
    public longitude: number = 0;
    public latitude: number = 0;
    public added: Date = new Date();
    public leadingCMBookStudy: string = '';
    public leadingCoop: string = '';
    public leadingNatureWalks: string = '';
    public leadingMentoring: string = '';
    public leadingOther: string = '';

    public interestCMBookStudy: boolean = false;
    public interestCoop: boolean = false;
    public interestNatureWalks: boolean = false;
    public interestFriends: boolean = false;

    public interests: string = '';

    public leadingGroups: Array<string> = [];
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
        homeschool.leadingGroups = [val.leadingCMBookStudy, val.leadingCoop, val.leadingOther, val.leadingMentoring, val.leadingNatureWalks];

        homeschool.leadingGroups = homeschool.leadingGroups.filter(s => s);

        homeschool.leadingGroups.forEach(i => {
            homeschool.leadingGroupsText += `${i}, `;
        });
        homeschool.leadingGroupsText = homeschool.leadingGroupsText.slice(0, -2);
        homeschool.children = val.children.map(s=>new Child(s.yearOfBirth, s.gender));
        if (homeschool.children.length != 0) {
            homeschool.children = val.children.map(ch => new Child(ch.yearOfBirth, ch.gender));
        
            homeschool.children.forEach(ch => {
                homeschool.childrenString += `${ch.genderString} (${ch.age}), `
            });
            homeschool.childrenString = homeschool.childrenString.slice(0, -2);   
        }
        homeschool.leadingCMBookStudy = val.leadingCMBookStudy;
        homeschool.leadingCoop = val.leadingCoop;
        homeschool.leadingOther = val.leadingOther;
        homeschool.leadingMentoring = val.leadingMentoring;
        homeschool.leadingNatureWalks = val.leadingNatureWalks;

        homeschool.interestCMBookStudy = val.interestCMBookStudy;
        homeschool.interestCoop = val.interestCoop;
        homeschool.interestFriends = val.interestFriends;
        homeschool.interestNatureWalks = val.interestNatureWalks;
        
        if(homeschool.interestCMBookStudy)
            homeschool.interests += 'Book Study';
        
        if (homeschool.interestCoop)
            homeschool.interests += ', CM Coop';

        if (homeschool.interestFriends)
            homeschool.interests += ', Friends';

        if (homeschool.interestNatureWalks)
            homeschool.interests += ', Nature Walks';
        
        homeschool.interests = homeschool.interests.replace(new RegExp("^,"),"");
        
        return homeschool;
    }
}