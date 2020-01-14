import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// Import Angular Fire
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(
    public afAuth: AngularFireAuth,
    private db: AngularFirestore,
  ) {}


  login(loginForm: NgForm) {
    this.afAuth.auth.signInWithEmailAndPassword(loginForm.value.loginEmail, loginForm.value.loginPassword).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  }
  logout() {
    this.afAuth.auth.signOut();
  }

  addPlayer(regGamertag, regName, regSurname){
    this.db.collection('players').doc(regGamertag).set({
      gamertag: regGamertag,
      name: regName,
      surname: regSurname,
      social: {
        Discord: "none",
        Facebook: "none",
        Instagram: "none",
        Mixer: "none",
        Twitch: "none",
        Twitter: "none",
        YouTube: "none"
      }
    })
  }

  register(regForm: NgForm){
    const promise = new Promise((resolve) => {
      this.afAuth.auth.createUserWithEmailAndPassword(regForm.value.regEmail, regForm.value.regPassword)
      .then(function(user) {
        console.log(user);
        resolve(user);
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        alert("What de fok")
      })
    });
    promise.then((user) => {
      this.addPlayer(regForm.value.regGamertag.trim(), regForm.value.regName, regForm.value.regSurname);
      const avatarUrl = "http://www.zimphysio.org.zw/wp-content/uploads/2018/01/default-avatar-2.jpg";
      this.addDetails( regForm.value.regGamertag, avatarUrl);
      document.getElementById("closeLoginModal").click();
    });
    // this.afAuth.auth.createUserWithEmailAndPassword(regForm.value.regGamertag, regForm.value.regPassword)
    // .catch(function(error) {
    //   // Handle Errors here.
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    // })
    // .then(success => {
    //   console.log(regForm.value);  // { first: '', last: '' }
    //   this.addPlayer(regForm.value.regGamertag, regForm.value.regName, regForm.value.regSurname);
    //   document.getElementById("closeLoginModal").click();
    // });
  }

  addDetails(regGamertag, userPhotoUrl){
    var user = this.afAuth.auth.currentUser;
    console.log(userPhotoUrl);

    user.updateProfile({
      displayName: regGamertag,
      photoURL: userPhotoUrl
    }).then(function() {
      // Update successful.
    }).catch(function(error) {
      // An error happened.
    });
  }

  navigate(){
    document.getElementById('btn_Menu').click();
  }

  ngOnInit() {
  }

}
