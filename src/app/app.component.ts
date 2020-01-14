import { Component } from '@angular/core';
import * as $ from 'jquery';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
// import { TestService } from './test.service';
// import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'InfoSlips Internal';

  constructor(public afAuth: AngularFireAuth) {}
  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }

  public ngOnInit()
  {}
}