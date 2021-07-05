import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent{
  isLoginMode = true;
  isLoading = false;
  error: string = null
  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  //this is where we call the interface data from 
  onSubmit(form: NgForm){
    //to prevent users from changing the btn to enable in the front-end
    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    
    let authObs: Observable<AuthResponseData>
    // when spinner is showing
    this.isLoading = true;
    if(this.isLoginMode){
      //login
      authObs = this.authService.login(email,password)
    }else{
//signingUp
//send data to the authService and we subscibe here in the auth.component
authObs = this.authService.signUp(email,password)
    }

//authObs is handling the subscribe function
    authObs.subscribe(
      resData =>{

        console.log(resData);
//when it leaves
        this.isLoading = false;
//navigate to the page of your choice
        this.router.navigate(['/home-page']);
      },
      errorMessage => {
        console.log(errorMessage);

        this.error = errorMessage;
        this.isLoading = false;
      }
    );
    form.reset();
  }
  onSwitchMode( ){
    this.isLoginMode = !this.isLoginMode;
  }
  onHandleError(){
    this.error = null; 
  }
}
