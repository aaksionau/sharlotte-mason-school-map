import { IChild } from "src/interfaces/IChild";

export class Child implements IChild {
    constructor(
        public yearOfBirth: number,
        public monthOfBirth: number,
        public gender: number
    ) { }
    public id: string = '';
    public age: number = this.getAge();
    public genderString: string = this.gender == 0 ? 'boy' : 'girl';

    public getAge(): number {
        var today = new Date();
        var birthDate = new Date(`${this.yearOfBirth}/${this.monthOfBirth + 1}/1`);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
}