import {UserService} from "../../shared/user/user.service";
import {User} from "../../shared/user/user";
import {Component, OnInit} from "@angular/core";
import {HTTP_PROVIDERS} from "@angular/http";
import {Router} from "@angular/router-deprecated";
import {Page} from "ui/page";

@Component({
  selector: "my-app",
  providers: [UserService, HTTP_PROVIDERS],       // all services that are required
  templateUrl: "pages/login/login.html",          // html page that defines the layout
  styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
})
export class LoginPage implements OnInit {
  user: User;
  isLoggingIn = true;
  
  constructor(private _router: Router, private _userService: UserService, private page: Page){
    this.user = new User();
    this.user.email = "piet@gmail.com";
    this.user.password = "test";
  }
  
  ngOnInit(){
    this.page.actionBarHidden = true;
    this.page.backgroundImage = this.page.ios ? "res://bg_login.jpg" : "res://bg_login";
  }
  
  submit() {
    console.log(this.user.email);
    if (this.isLoggingIn){
      this.login();
    } else {
      this.signUp();
    }
  }
  
  login(){
    console.log("Login");
    this._userService.login(this.user)
      .subscribe(
        () => this._router.navigate(["List"]),
        (error) => alert("Login failure")
      );
  }
  
  signUp(){
    this._userService.register(this.user)
      .subscribe(
        () => {
          alert("Your account was successfully created.");
          this.toggleDisplay();
        },
        () => alert("Unfortunately we were unable to create your account.")
      );
  }
  
  toggleDisplay(){
    this.isLoggingIn = !this.isLoggingIn;
  }
}

/*
  Selector: can be used by another component as template <my-app></my-app>
  Take care: multi line blocks are between ` to avoid string concats
  Take care: do not use self closing elements -> Bug in angular2 
  Label is rendered as UILabel (iOS) or android.widget.TextView (Android)
  Layout containers: AbsoluteLayout, DockLayout, GridLayout, StackLayout, WrapLayout
  () event binding
  [] attribute binding - oneway
  [(ngModel)]="email" is shorthand for [text]="email" (emailChange)="email=$event"
*/