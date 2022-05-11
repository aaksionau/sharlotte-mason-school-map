export class Message { 
    constructor(
        public to: string | undefined,
        public toName: string | undefined
    ) {
    }
    public from: string = '';
    public subject: string = 'Message from MN Charlotte Mason Home Schools App';
    public message: string = '';
    public name: string = '';
    public html: string = this.getHtml();
    public getHtml(): string {
        return `<!DOCTYPE html><html><body>
                                <p>Hi, ${this.toName}</p>
                                <p>There is a message from MN Charlotte Mason Schools App:</p>
                                <p>${this.message}</p>
                                <p>by ${this.name} (${this.from})</p>
                                </body></html>`;
    }
}