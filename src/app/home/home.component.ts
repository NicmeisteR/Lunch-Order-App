import { Component, OnInit } from '@angular/core';
import { AuthService } from '../user/auth/auth.service';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, BehaviorSubject, of} from 'rxjs';

interface OrderOption {
  name: string,
  option: boolean,
  menu: string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ordersOptionsCollection: AngularFirestoreCollection<OrderOption>;
  ordersOptions: Observable<OrderOption[]>;

  constructor(private db: AngularFirestore, private authService: AuthService) {
    this.ordersOptionsCollection = this.db.collection('orderOptions', ref => {
      return ref.orderBy('name');
     });
    this.ordersOptions = this.ordersOptionsCollection.valueChanges();
  }

  ngOnInit() {
    this.authService.loginStatus = true;
  }

}
