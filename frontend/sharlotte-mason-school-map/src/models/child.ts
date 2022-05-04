import { IChild } from "src/interfaces/IChild";

export class Child implements IChild{ 
    constructor(
        public yearOfBirth: number,
        public gender: number
    ) { }
    public id: string = '';
    public age: number = new Date().getFullYear() - this.yearOfBirth;
    public genderString: string = this.gender == 0 ? 'boy' : 'girl';
}