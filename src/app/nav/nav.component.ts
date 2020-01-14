import { Component, OnInit } from '@angular/core';
import { AuthService } from '../user/auth/auth.service';

// Firebase Imports
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';

import {NgForm} from '@angular/forms';
import { auth } from 'firebase/app';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  user = this.parseUser();

  constructor(
    public afAuth: AngularFireAuth,
    public authService: AuthService) {}
  // login() {
  //   this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  // }

  parseUser(){
    //   return JSON.parse(localStorage.getItem("currentUser"));
    let user = this.authService.currentUserSubject;
    return user;
   }

  // logout() {
  //   this.afAuth.auth.signOut();
  // }

  logout(){
    this.authService.logout();
    document.getElementById("logoutclick").click();
  }

  // navigate(){
  //   document.getElementById('btn_Menu').click();
  // }

  // loginWithEmail(){
  //   const email = "NicmeisteR@live.co.zaa";
  //   const password = "123456";
  //   this.afAuth.auth.signInWithEmailAndPassword(email, password)
  //   .catch(function(error) {

  //     // Handle Errors here.
  //     var errorCode = error.code;
  //     var errorMessage = error.message;
  //     if (errorCode === 'auth/wrong-password') {
  //       alert('Wrong password.');
  //     } else {
  //       alert(errorMessage);
  //     }
  //     console.log(error);
      
  //   });

  //   document.getElementById("closeLoginModal").click();
  // }

  // register(f: NgForm){

  //   console.log(f.value); 

  //   const promise = new Promise((resolve) => {
  //     this.afAuth.auth.createUserWithEmailAndPassword(f.value.inputEmail, f.value.inputPassword).then(function(user) {
  //       console.log(user);
  //       resolve(user);
  //     }).catch(function(error) {
  //       // Handle Errors here.
  //       var errorCode = error.code;
  //       var errorMessage = error.message;
  //       // ...
  //     })
  //   });

  //   promise.then((user) => {
  //     let file = (<HTMLInputElement>document.getElementById('fileItem')).files[0];
  //     let profilePic = "https://firebasestorage.googleapis.com/v0/b/team-marieth-1548664752327.appspot.com/o/test%2F1556618548061_Untitled-3.png?alt=media&token=0186234b-f23b-4fbe-adea-9e2e9581f2ca";
      
  //     const avatarUrl = "http://www.zimphysio.org.zw/wp-content/uploads/2018/01/default-avatar-2.jpg";
  //     this.addDetails( f.value.inputName, f.value.inputSurame, avatarUrl);
  //     // this.startUpload(file, user, f.value.inputName, f.value.inputSurame);
  //     // document.getElementById("closeLoginModal").click();
  //   });
  // }

  // addDetails(userName, userSurname, userPhotoUrl){
  //   var user = this.afAuth.auth.currentUser;

  //   const userDisplayName = userName + " " + userSurname;
    
  //   console.log(userPhotoUrl);

  //   user.updateProfile({
  //     displayName: userDisplayName,
  //     photoURL: userPhotoUrl
  //   }).then(function() {
  //     // Update successful.
  //   }).catch(function(error) {
  //     // An error happened.
  //   });
  // }

  // grabInfo(grabInfoTest){
  //   console.log(grabInfoTest.value);
  // }

  // update(){
  //   var user = this.afAuth.auth.currentUser;

  //   user.updateProfile({
  //     displayName: "Nicolaas Nel",
  //     photoURL: "https://lh3.googleusercontent.com/-RU-YGYnesZU/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rfn48Lv7kSM7zCWeJ85BdsvjwNbxg/mo/photo.jpg?sz=46"
  //   }).then(function() {
  //     // Update successful.
  //   }).catch(function(error) {
  //     // An error happened.
  //   });
  // }

  getUser(){
    console.log(this.afAuth.user);
  }

  ngOnInit() {
    this.user = this.parseUser();
  }
  

}