class UserData{
    private rub : number = 10000;
    private eur : number = 0;
    private usd : number = 0;

    get Rub() : number{
        return this.rub;
    }
    get Eur() : number{
        return this.eur;
    }
    get Usd() : number{
        return this.usd;
    }
}

export { UserData };