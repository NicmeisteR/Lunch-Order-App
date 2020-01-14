// import { Injectable } from '@angular/core';

// // Class imports
// import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
// import { map } from 'rxjs/operators';


// @Injectable({
//   providedIn: 'root'
// })

// export class GithubService {

//   constructor(
//     private http: HttpClient,
//   ) { }

//   getRepos() {
//     return this.http
//       .get(`https://api.github.com/repos/nicmeister/Lunch-Order-App/commits`)
//       .pipe(
//         map(data => {
//           return data;
//         })
//       );
//   }
// }