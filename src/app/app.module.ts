import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { AuthComponent } from 'src/auth/auth/auth.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    // AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // AuthComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
