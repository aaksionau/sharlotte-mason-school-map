export class FilterOptions { 
    public cityName: string = '';
    public interestCMBookStudy: boolean = false;
    public interestCoop: boolean = false;
    public interestNatureWalks: boolean = false;
    public interestFriends: boolean = false;

    public reset(): void { 
        this.cityName = '';
        this.interestCMBookStudy = false;
        this.interestCoop = false;
        this.interestNatureWalks = false;
        this.interestFriends = false;
    }
}