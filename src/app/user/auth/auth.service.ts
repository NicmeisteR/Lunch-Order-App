import { Injectable } from '@angular/core';

// Class imports
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of} from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginStatus: boolean; 

  // was private
  public currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private http: HttpClient,
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
   }

   public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string){
    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('client_id', 'ifscloudapp')
      .set('username', username)
      .set('password', password)
      .set('requestor', '0');
      const headers = {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        )
      };
      return this.http
        .post<User>(`https://uat-api.infoslipscloud.com/oauth`, body.toString(), headers)
        // .subscribe(user => {
        //   if (user && user.access_token) {
        //     localStorage.setItem('currentUser', JSON.stringify(user));
        //     this.currentUserSubject.next(user);
        //   }
        //   console.log(user);
        //   return user;
        // });
        .pipe(
          map(user => {
            if (user && user.access_token) {
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.currentUserSubject.next(user);
              this.loginStatus = true;
              document.getElementById("homeclick").click();
            }
            else{
              alert("User not found, please make sure that you are using your UAT username and password.");
            }

            return user;
        })
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.loginStatus = false;
  }
}
