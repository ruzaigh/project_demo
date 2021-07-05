//THIS model stores all the core data that makes up ap user 
//EVENS helps us with validating whether that token is still valid
//Token expires after an hour
//THEREFORE also finds out not only if a token exists but if it is still valid 
export class User{
    constructor(
        public email: string,
        public id: string,
        private _token: string,
        private _tokenExpirationData: Date
    ){}

    get token(){
//check wether the token has expired or not 
        if(!this._tokenExpirationData || new Date() > this._tokenExpirationData){
            return null;
        }
        return this._token;
    }
}