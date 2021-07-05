import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.modal';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

export interface AuthResponseData{
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean,
}

@Injectable({ providedIn: 'root' })
export class AuthService{
//we manage our users here "User"
//this is will inform all places in the application when our user changes
//the behavior Subject gives subscribers immediate access to the previously emitted  value
//Even if they haven't subscribed at the point of time that the value was emitted 
//means when we fetch data and we need that token at this poin of time, even if they logged in before that point of time
    user = new BehaviorSubject<User>(null);

    private tokenExpirationTimer: any;

    constructor(
        private http: HttpClient,
        private router: Router
    ){}
    //what firebase needs for you to set up your REST API for sign Up
    signUp(email: string, password: string){
// if we return in the service that  means we SUBSCRIBE in the component.ts
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBDoVBMSUlozoYg3tvC-X0yCf6LE6GN13A',  
            {
                email: email,
                password: password,
                returnSecureToken: true,
            }
        )
//tap is an operator that allows us to perform some action without changing the response
            .pipe
            (catchError(this.handleError),
            tap(resData => {
                this.handleAuthentication(
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    +resData.expiresIn
                );
            })
        );
    }
    login(email: string, password: string) {
        //return meaning we only preparig it here and we subscribe in our auth.component.ts
                return this.http.post<AuthResponseData>(
                    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBDoVBMSUlozoYg3tvC-X0yCf6LE6GN13A',
                    {
                        email: email,
                        password: password,
                        returnSecureToken: true,
                    }
                )
                    .pipe
                    (catchError(this.handleError),
                        tap(resData => {
                            this.handleAuthentication(
                                resData.email,
                                resData.localId,
                                resData.idToken,
                                +resData.expiresIn
                            );
                        })
                    );
        
            }
    logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }
    autoLogin(){
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string;    
        } =JSON.parse(localStorage.getItem('useData'));
        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
        );
        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expiresDuration =
                new Date(userData._tokenExpirationDate).getTime() -
                new Date().getTime();
            this.autoLogout(expiresDuration);
        }
    }
    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }
    //handle authentication
    private handleAuthentication(
        email: string,
        userId: string,
        token: string,
        expiresIn: number) {
//create a NEW date  object based on the expiresIn time we get back from Firebase
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(
            email,
            userId,
            token,
            expirationDate
        );
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }
    //handling different types of Errors to show the users 
    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
//being precise on what error is thrown 
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exist.';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'This password is not correct.';
                break;
        }
        return throwError(errorMessage);
    }
}