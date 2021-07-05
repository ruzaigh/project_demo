import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
    constructor(
        private authService: AuthService,
    ){}

    intercept(req: HttpRequest<any>, next: HttpHandler){
        return this.authService.user.pipe(
            take(1), 
//exhaustMap it waits for the first obserable,for the user observable to compare which will happen 
//after we took the latest user. ThereAfter, it  gives us that user
            exhaustMap(user =>{
                if(!user){
                    return next.handle(req);
                }
                const modifiedReq = req.clone({
                    params: new HttpParams().set('auth', user.token)
                });
               return next.handle(modifiedReq); 
            })
        );
    }
}