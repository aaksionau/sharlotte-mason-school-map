export class Message { 
    constructor(
        public homeSchoolId: string | undefined
    ) {
    }
    public name: string = '';
    public email: string = '';
    public body: string = '';
}