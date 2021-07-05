import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/auth/auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,OnDestroy{
  private userSub:  Subscription;
  isAuthenticated = false;
  constructor(
    private authService: AuthService
  ){}

  ngOnInit(){
//if user is logged in or not
    this.userSub = this.authService.user.subscribe(user =>{
      this.isAuthenticated = !!user;
    });
  }
  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
