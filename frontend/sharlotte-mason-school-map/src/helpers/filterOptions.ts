export class FilterOptions { 
    public interestCMBookStudy: boolean = false;
    public interestCoop: boolean = false;
    public interestNatureWalks: boolean = false;
    public interestFriends: boolean = false;

    public reset(): void { 
        this.interestCMBookStudy = false;
        this.interestCoop = false;
        this.interestNatureWalks = false;
        this.interestFriends = false;
    }
}