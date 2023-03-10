import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

// Import Angular Fire
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, BehaviorSubject, of} from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../user/auth/auth.service';
import { User } from '../user/auth/user';


// Interface for players from Firestore
interface Order {
  name: string,
  place: string,
  lunch: string,
}

interface OrderOption {
  name: string,
  option: boolean,
  menu: string
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  ordersCollection: AngularFirestoreCollection<Order>;
  orders: Observable<Order[]>;

  ordersOptionsCollection: AngularFirestoreCollection<OrderOption>;
  ordersOptions: Observable<OrderOption[]>;

  users;

  constructor(private db: AngularFirestore, private authService: AuthService) {
    this.ordersCollection = this.db.collection('orders', ref => {
      return ref.orderBy('place');
     });
    this.orders = this.ordersCollection.valueChanges();

    this.ordersOptionsCollection = this.db.collection('orderOptions', ref => {
      return ref.orderBy('name');
     });
    this.ordersOptions = this.ordersOptionsCollection.valueChanges();

    let users = [];
    this.db.collection("orders", ref => ref.orderBy("name")).get().toPromise().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        users.push(doc.data().name);
      });
    });
    this.users = users;
  }

  user = this.parseUser();
  adminUser = false;

  parseUser(){
    //   return JSON.parse(localStorage.getItem("currentUser"));
    let user = this.authService.currentUserSubject;
    return user;
   }

  addOrder(order : string, infoName, infoPlace, infoOrder){
    // if (order && order.trim().length){
    //   this.ordersCollection.add({
    //     name: this.user.value.displayName,
    //     place: infoPlace,
    //     lunch: infoOrder
    //   })
    // }

    this.db.collection('orders').doc(infoName).set({
      name: infoName,
      place: infoPlace,
      lunch: infoOrder
    })
  }

  steersOrder(item){
    this.db.collection('orders').doc(this.user.value.displayName).set({
      name: this.user.value.displayName,
      place: "Steers",
      lunch: item
    })

    document.getElementById("closeSteers").click();
  }

  addOrderOption(BeanVal : boolean, KfcVal : boolean, NibblesVal : boolean, SteersVal : boolean, BraaiVal : boolean, FishAways : boolean, McDonalds : boolean, TasteOfIndia : boolean, BurgerKing : boolean, DieFishNChipsPlek : boolean){
    this.db.collection('orderOptions').doc("Bean").set({
      name: "Bean @21",
      option: BeanVal,
      menu: "assets/bean.pdf"
    })

    this.db.collection('orderOptions').doc("KFC").set({
      name: "KFC",
      option: KfcVal,
      menu: "https://order.kfc.co.za/menu/just-for-me"
    })

    this.db.collection('orderOptions').doc("Nibbles").set({
      name: "Nibbles",
      option: NibblesVal,
      menu: "assets/nibbles.docx"
    })

    this.db.collection('orderOptions').doc("Steers").set({
      name: "Steers",
      option: SteersVal,
      menu: "https://steers.co.za/"
    })

    this.db.collection('orderOptions').doc("Braai").set({
      name: "Braai",
      option: BraaiVal,
    })

    this.db.collection('orderOptions').doc("FishAways").set({
      name: "Fish Aways",
      option: FishAways,
      menu: "https://www.fishaways.co.za/"
    })

    this.db.collection('orderOptions').doc("McDonalds").set({
      name: "Mc Donalds",
      option: McDonalds,
      menu: "https://www.mcdonalds.co.za/menu"
    })

    this.db.collection('orderOptions').doc("TasteOfIndia").set({
      name: "Taste of India",
      option: TasteOfIndia,
      menu: "https://www.elardus-park.co.za/taste-of-india"
    })

    this.db.collection('orderOptions').doc("BurgerKing").set({
      name: "Burger King",
      option: BurgerKing,
      menu: "assets/burgerking.pdf"
    })

    this.db.collection('orderOptions').doc("DieFishNChipsPlek").set({
      name: "Die Fish N Chips Plek",
      option: DieFishNChipsPlek,
      menu: "assets/diefishnchipsplek.pdf"
    })
  }

  delete(){
    this.db.collection('orders').doc(this.user.value.displayName).delete().then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
  }

  deleteAll(){
    this.users.forEach(user => {
      this.db.collection('orders').doc(user).delete().then(function() {
        console.log(user +"'s Document successfully deleted!");
      }).catch(function(error) {
          console.error("Error removing document: ", error);
      });
    });
  }

  ngOnInit() {
    this.ordersCollection = this.db.collection('orders', ref => {
      return ref.orderBy('place');
     });
    this.orders = this.ordersCollection.valueChanges();

    this.ordersOptionsCollection = this.db.collection('orderOptions', ref => {
      return ref.orderBy('name');
     });
    this.ordersOptions = this.ordersOptionsCollection.valueChanges();

    this.authService.loginStatus = true;

    if(this.user.value.displayName === "Nico"){
      this.adminUser = true;
      console.log(this.adminUser);
    }
    else if(this.user.value.displayName === "Nicky Henderson"){
      this.adminUser = true;
    }
    else{
      let adminTest = this.user.value.displayName;
      if(adminTest.toLowerCase().includes("elize")){
        this.adminUser = true;
      }
      else if(adminTest.toLowerCase().includes("karin")){
        this.adminUser = true;
      }
      else{
        this.adminUser = false;
      }
    }
  }

  onSubmit(f: NgForm) {
    console.log(f.value);  // { first: '', last: '' }
    this.addOrder("test", f.value.nameForm, f.value.placeForm, f.value.orderForm);
  }

  onOptionSubmit(orderOptionForm: NgForm) {
    console.log(orderOptionForm.value);  // { first: '', last: '' }
    if(orderOptionForm.value.Bean === ''){
      orderOptionForm.value.Bean = false;
    }

    if(orderOptionForm.value.KFC === ''){
      orderOptionForm.value.KFC = false;
    }

    if(orderOptionForm.value.Nibbles === ''){
      orderOptionForm.value.Nibbles = false;
    }

    if(orderOptionForm.value.Steers === ''){
      orderOptionForm.value.Steers = false;
    }

    if(orderOptionForm.value.Braai === ''){
      orderOptionForm.value.Braai = false;
    }

    if(orderOptionForm.value.FishAways === ''){
      orderOptionForm.value.FishAways = false;
    }

    if(orderOptionForm.value.McDonalds === ''){
      orderOptionForm.value.McDonalds = false;
    }

    if(orderOptionForm.value.TasteOfIndia === ''){
      orderOptionForm.value.TasteOfIndia = false;
    }

    if(orderOptionForm.value.BurgerKing === ''){
      orderOptionForm.value.BurgerKing = false;
    }

    if(orderOptionForm.value.DieFishNChipsPlek === ''){
      orderOptionForm.value.DieFishNChipsPlek = false;
    }

    this.addOrderOption(orderOptionForm.value.Bean, orderOptionForm.value.KFC, orderOptionForm.value.Nibbles, orderOptionForm.value.Steers, orderOptionForm.value.Braai, orderOptionForm.value.FishAways, orderOptionForm.value.McDonalds, orderOptionForm.value.TasteOfIndia, orderOptionForm.value.BurgerKing, orderOptionForm.value.DieFishNChipsPlek);
  }

  steers_KingSteers = [
    {
      "product_id": "ks_original",
      "product_title": "Original King Steer",
      "product_img": "/images/menu/burgers/King_Steer_Burger_Original.png",
      "product_heading": "ORIGINAL KING STEER",
      "product_type_headings": [
        "BURGER ONLY",
        "MEAL",
        "COMBO"
      ],
      "product_description": "Meals come with med chips. Combos come with med chips & a sugar free buddy.",
      "product_only_price": "64.90",
      "product_only_img": "/images/menu/burgers/King-Steer-Burger.png",
      "product_meal_price": "77.90",
      "product_meal_img": "/images/menu/chips/Med_Chips.png",
      "product_combo_price": "89.90",
      "product_combo_img": "/images/menu/upsize-your-combo/Upsize_MedChips-Buddy.png",
      "product_addons_panel_1": [
        "panel1",
        "noclick"
      ],
      "product_addons_panel_2": [
        "panel1",
        "noclick"
      ],
      "product_addons_panel_3": [
        "panel1",
        "click"
      ],
      "product_addons": [
        {},
        {},
        {
          "product_addons_panel": "panel1",
          "option_id": "ks_original_3",
          "heading": "Upsize Your Combo",
          "product": "LRG Chips & Buddy",
          "price": "15.00",
          "swop": "SWOP YOUR BUDDY FOR A POWERADE/WATER",
          "img": "/images/menu/upsize-your-combo/Upsize_LrgChips_Buddy.png",
          "swop_img": "/images/menu/upsize-your-combo/Powerade.png"
        }
      ]
    },
    {
      "product_id": "ks_mighty",
      "product_title": "Mighty King Steer",
      "product_img": "/images/menu/burgers/King_Steer_Burger_Mighty.png",
      "product_heading": "MIGHTY KING STEER",
      "product_type_headings": [
        "BURGER ONLY",
        "MEAL",
        "COMBO"
      ],
      "product_description": "Meals come with med chips. Combos come with med chips & a sugar free buddy.",
      "product_only_price": "89.90",
      "product_only_img": "/images/steers-white-flame.svg",
      "product_meal_price": "102.90",
      "product_meal_img": "/images/menu/chips/Med_Chips.png",
      "product_combo_price": "114.90",
      "product_combo_img": "/images/menu/upsize-your-combo/Upsize_MedChips-Buddy.png",
      "product_addons_panel_1": [
        "panel1",
        "noclick"
      ],
      "product_addons_panel_2": [
        "panel1",
        "noclick"
      ],
      "product_addons_panel_3": [
        "panel1",
        "click"
      ],
      "product_addons": [
        {},
        {},
        {
          "product_addons_panel": "panel1",
          "option_id": "ks_mighty_3",
          "heading": "Upsize Your Combo",
          "product": "LRG Chips & Buddy",
          "price": "15.00",
          "swop": "SWOP YOUR BUDDY FOR A POWERADE/WATER",
          "img": "/images/menu/upsize-your-combo/Upsize_LrgChips_Buddy.png",
          "swop_img": "/images/menu/upsize-your-combo/Powerade.png"
        }
      ]
    },
    {
      "product_id": "ks_bigbcon",
      "product_title": "Big Bacon King Steer",
      "product_img": "/images/menu/burgers/King_Steer_Burger_BigBacon.png",
      "product_heading": "BIG BACON KING STEER",
      "product_type_headings": [
        "BURGER ONLY",
        "MEAL",
        "COMBO"
      ],
      "product_description": "Meals come with med chips. Combos come with med chips & a sugar free buddy.",
      "product_only_price": "74.90",
      "product_only_img": "/images/menu/burgers/Big-Bacon-Steers-Burger.png",
      "product_meal_price": "87.90",
      "product_meal_img": "/images/menu/chips/Med_Chips.png",
      "product_combo_price": "99.90",
      "product_combo_img": "/images/menu/upsize-your-combo/Upsize_MedChips-Buddy.png",
      "product_addons_panel_1": [
        "panel1",
        "noclick"
      ],
      "product_addons_panel_2": [
        "panel1",
        "noclick"
      ],
      "product_addons_panel_3": [
        "panel1",
        "click"
      ],
      "product_addons": [
        {},
        {},
        {
          "product_addons_panel": "panel1",
          "option_id": "ks_bigbcon_3",
          "heading": "Upsize Your Combo",
          "product": "LRG Chips & Buddy",
          "price": "15.00",
          "swop": "SWOP YOUR BUDDY FOR A POWERADE/WATER",
          "img": "/images/menu/upsize-your-combo/Upsize_LrgChips_Buddy.png",
          "swop_img": "/images/menu/upsize-your-combo/Powerade.png"
        }
      ]
    }
  ]

  steersmenu = 
    [
      {
        "product_id": "beef_rave",
        "product_title": "Rave Beef Burger",
        "product_img": "/images/menu/burgers/Beef_Burger_Rave.png",
        "product_heading": "Rave Burger",
        "product_type_headings": [
          "BURGER ONLY",
          "MEAL",
          "COMBO"
        ],
        "product_description": "Meals come with sml chips. Combos come with sml chips & a sugar free can.",
        "product_only_price": "29.90",
        "product_only_img": "/images/menu/burgers/King-Steer-Burger.png",
        "product_meal_price": "41.90",
        "product_meal_img": "/images/menu/meal-and-combo/Meal_SmlChips.png",
        "product_combo_price": "53.90",
        "product_combo_img": "/images/menu/meal-and-combo/Combo_SmlChips-Can.png",
        "product_addons_panel_1": [
          "panel1",
          "noclick"
        ],
        "product_addons_panel_2": [
          "panel1",
          "noclick"
        ],
        "product_addons_panel_3": [
          "panel2",
          "click"
        ],
        "product_addons": [
          {
            "product_addons_panel": "panel2",
            "option_id": "beef_rave_3",
            "heading": "UPSIZE YOUR COMBO",
            "product1_50": "MED Chips & Buddy",
            "price1_50": "7.00",
            "product2_50": "LRG Chips & Buddy",
            "price2_50": "15.00",
            "img1_50": "/images/menu/upsize-your-combo/Upsize_MedChips-Buddy.png",
            "img2_50": "/images/menu/upsize-your-combo/Upsize_LrgChips_Buddy.png"
          }
        ]
      },
      {
        "product_id": "beef_original",
        "product_title": "Original Steers<sup>&reg;</sup> Beef Burger",
        "product_img": "/images/menu/burgers/Beef_Burger_OriginalSteers.png",
        "product_heading": "Original Steers Burger",
        "product_type_headings": [
          "BURGER ONLY",
          "MEAL",
          "COMBO"
        ],
        "product_description": "Meals come with sml chips. Combos come with sml chips & a sugar free can.",
        "product_only_price": "35.90",
        "product_only_img": "/images/steers-white-flame.svg",
        "product_meal_price": "47.90",
        "product_meal_img": "/images/menu/meal-and-combo/Meal_SmlChips.png",
        "product_combo_price": "59.90",
        "product_combo_img": "/images/menu/meal-and-combo/Combo_SmlChips-Can.png",
        "product_addons_panel_1": [
          "panel1",
          "noclick"
        ],
        "product_addons_panel_2": [
          "panel1",
          "noclick"
        ],
        "product_addons_panel_3": [
          "panel2",
          "click"
        ],
        "product_addons": [
          {
            "product_addons_panel": "panel2",
            "option_id": "beef_original_3",
            "heading": "UPSIZE YOUR COMBO",
            "product1_50": "MED Chips & Buddy",
            "price1_50": "7.00",
            "product2_50": "LRG Chips & Buddy",
            "price2_50": "15.00",
            "img1_50": "/images/menu/upsize-your-combo/Upsize_MedChips-Buddy.png",
            "img2_50": "/images/menu/upsize-your-combo/Upsize_LrgChips_Buddy.png"
          }
        ]
      },
      {
        "product_id": "beef_classic",
        "product_title": "Classic Beef Burger",
        "product_img": "/images/menu/burgers/Beef_Burger_Classic.png",
        "product_heading": "Classic Steers Burger",
        "product_type_headings": [
          "BURGER ONLY",
          "MEAL",
          "COMBO"
        ],
        "product_description": "Meals come with sml chips. Combos come with sml chips & a sugar free can.",
        "product_only_price": "49.90",
        "product_only_img": "/images/menu/burgers/Big-Bacon-Steers-Burger.png",
        "product_meal_price": "56.90",
        "product_meal_img": "/images/menu/meal-and-combo/Meal_SmlChips.png",
        "product_combo_price": "68.90",
        "product_combo_img": "/images/menu/meal-and-combo/Combo_SmlChips-Can.png",
        "product_addons_panel_1": [
          "panel1",
          "noclick"
        ],
        "product_addons_panel_2": [
          "panel1",
          "noclick"
        ],
        "product_addons_panel_3": [
          "panel2",
          "click"
        ],
        "product_addons": [
          {
            "product_addons_panel": "panel2",
            "option_id": "beef_classic_3",
            "heading": "UPSIZE YOUR COMBO",
            "product1_50": "MED Chips & Buddy",
            "price1_50": "7.00",
            "product2_50": "LRG Chips & Buddy",
            "price2_50": "15.00",
            "img1_50": "/images/menu/upsize-your-combo/Upsize_MedChips-Buddy.png",
            "img2_50": "/images/menu/upsize-your-combo/Upsize_LrgChips_Buddy.png"
          }
        ]
      }
    ]
  
    steersmenu1 = [
      {
        "product_id": "cheese_original",
        "product_title": "Original Cheese Burger",
        "product_img": "/images/menu/burgers/Cheeseburger_Original.png",
        "product_heading": "Original Cheese Burger",
        "product_type_headings": [
          "BURGER ONLY",
          "MEAL",
          "COMBO"
        ],
        "product_description": "Meals come with sml chips. Combos come with sml chips & a sugar free can.",
        "product_only_price": "40.90",
        "product_only_img": "/images/menu/burgers/King-Steer-Burger.png",
        "product_meal_price": "52.90",
        "product_meal_img": "/images/menu/meal-and-combo/Meal_SmlChips.png",
        "product_combo_price": "64.90",
        "product_combo_img": "/images/menu/meal-and-combo/Combo_SmlChips-Can.png",
        "product_addons_panel_1": [
          "panel1",
          "noclick"
        ],
        "product_addons_panel_2": [
          "panel1",
          "noclick"
        ],
        "product_addons_panel_3": [
          "panel2",
          "click"
        ],
        "product_addons": [
          {
            "product_addons_panel": "panel2",
            "option_id": "cheese_original_3",
            "heading": "UPSIZE YOUR COMBO",
            "product1_50": "MED Chips & Buddy",
            "price1_50": "7.00",
            "product2_50": "LRG Chips & Buddy",
            "price2_50": "15.00",
            "img1_50": "/images/menu/upsize-your-combo/Upsize_MedChips-Buddy.png",
            "img2_50": "/images/menu/upsize-your-combo/Upsize_LrgChips_Buddy.png"
          }
        ]
      },
      {
        "product_id": "cheese_jalepeno_mayo",
        "product_title": "Jalapeño Mayo Cheese Burger",
        "product_img": "/images/menu/burgers/Cheeseburger_JalepenoMayo.png",
        "product_heading": "Jalapeño Mayo",
        "product_type_headings": [
          "BURGER ONLY",
          "MEAL",
          "COMBO"
        ],
        "product_description": "Meals come with sml chips. Combos come with sml chips & a sugar free can.",
        "product_only_price": "44.90",
        "product_only_img": "/images/menu/burgers/Cheeseburger_JalepenoMayo.png",
        "product_meal_price": "56.90",
        "product_meal_img": "/images/menu/meal-and-combo/Meal_SmlChips.png",
        "product_combo_price": "68.90",
        "product_combo_img": "/images/menu/meal-and-combo/Combo_SmlChips-Can.png",
        "product_addons_panel_1": [
          "panel1",
          "noclick"
        ],
        "product_addons_panel_2": [
          "panel1",
          "noclick"
        ],
        "product_addons_panel_3": [
          "panel2",
          "click"
        ],
        "product_addons": [
          {
            "product_addons_panel": "panel2",
            "option_id": "cheese_jalepeno_mayo_3",
            "heading": "UPSIZE YOUR COMBO",
            "product1_50": "MED Chips & Buddy",
            "price1_50": "7.00",
            "product2_50": "LRG Chips & Buddy",
            "price2_50": "15.00",
            "img1_50": "/images/menu/upsize-your-combo/Upsize_MedChips-Buddy.png",
            "img2_50": "/images/menu/upsize-your-combo/Upsize_LrgChips_Buddy.png"
          }
        ]
      },
      {
        "product_id": "cheese_prince",
        "product_title": "Prince<sup>&reg;</sup>&nbsp;Cheese Burger",
        "product_img": "/images/menu/burgers/Cheeseburger_Prince.png",
        "product_type_headings": [
          "BURGER ONLY",
          "MEAL",
          "COMBO"
        ],
        "product_description": "Meals come with sml chips. Combos come with sml chips & a sugar free can.",
        "product_only_price": "49.90",
        "product_only_img": "/images/menu/burgers/Big-Bacon-Steers-Burger.png",
        "product_meal_price": "61.90",
        "product_meal_img": "/images/menu/meal-and-combo/Meal_SmlChips.png",
        "product_combo_price": "73.90",
        "product_combo_img": "/images/menu/meal-and-combo/Combo_SmlChips-Can.png",
        "product_addons_panel_1": [
          "panel1",
          "noclick"
        ],
        "product_addons_panel_2": [
          "panel1",
          "noclick"
        ],
        "product_addons_panel_3": [
          "panel2",
          "click"
        ],
        "product_addons": [
          {
            "product_addons_panel": "panel2",
            "option_id": "cheese_prince_3",
            "heading": "UPSIZE YOUR COMBO",
            "product1_50": "MED Chips & Buddy",
            "price1_50": "7.00",
            "product2_50": "LRG Chips & Buddy",
            "price2_50": "15.00",
            "img1_50": "/images/menu/upsize-your-combo/Upsize_MedChips-Buddy.png",
            "img2_50": "/images/menu/upsize-your-combo/Upsize_LrgChips_Buddy.png"
          }
        ]
      },
      {
        "product_id": "cheese_bacon",
        "product_title": "Bacon Cheese Burger",
        "product_img": "/images/menu/burgers/Cheeseburger_Bacon.png",
        "product_heading": "Bacon Burger",
        "product_type_headings": [
          "BURGER ONLY",
          "MEAL",
          "COMBO"
        ],
        "product_description": "Meals come with sml chips. Combos come with sml chips & a sugar free can.",
        "product_only_price": "51.90",
        "product_only_img": "/images/steers-white-flame.svg",
        "product_meal_price": "63.90",
        "product_meal_img": "/images/menu/meal-and-combo/Meal_SmlChips.png",
        "product_combo_price": "76.90",
        "product_combo_img": "/images/menu/meal-and-combo/Combo_SmlChips-Can.png",
        "product_addons_panel_1": [
          "panel1",
          "noclick"
        ],
        "product_addons_panel_2": [
          "panel1",
          "noclick"
        ],
        "product_addons_panel_3": [
          "panel2",
          "click"
        ],
        "product_addons": [
          {
            "product_addons_panel": "panel2",
            "option_id": "cheese_bacon_3",
            "heading": "UPSIZE YOUR COMBO",
            "product1_50": "MED Chips & Buddy",
            "price1_50": "7.00",
            "product2_50": "LRG Chips & Buddy",
            "price2_50": "15.00",
            "img1_50": "/images/menu/upsize-your-combo/Upsize_MedChips-Buddy.png",
            "img2_50": "/images/menu/upsize-your-combo/Upsize_LrgChips_Buddy.png"
          }
        ]
      },
      {
        "product_id": "cheese_crispy_onion_bacon",
        "product_title": "Crispy Onion Bacon Cheese Burger",
        "product_img": "/images/menu/burgers/Cheeseburger_CrispyOnionBacon.png",
        "product_heading": "Crispy Onion Bacon",
        "product_type_headings": [
          "BURGER ONLY",
          "MEAL",
          "COMBO"
        ],
        "product_description": "Meals come with sml chips. Combos come with sml chips & a sugar free can.",
        "product_only_price": "54.90",
        "product_only_img": "/images/steers-white-flame.svg",
        "product_meal_price": "66.90",
        "product_meal_img": "/images/menu/meal-and-combo/Meal_SmlChips.png",
        "product_combo_price": "78.90",
        "product_combo_img": "/images/menu/meal-and-combo/Combo_SmlChips-Can.png",
        "product_addons_panel_1": [
          "panel1",
          "noclick"
        ],
        "product_addons_panel_2": [
          "panel1",
          "noclick"
        ],
        "product_addons_panel_3": [
          "panel2",
          "click"
        ],
        "product_addons": [
          {
            "product_addons_panel": "panel2",
            "option_id": "cheese_crispy_onion_bacon_3",
            "heading": "UPSIZE YOUR COMBO",
            "product1_50": "MED Chips & Buddy",
            "price1_50": "7.00",
            "product2_50": "LRG Chips & Buddy",
            "price2_50": "15.00",
            "img1_50": "/images/menu/upsize-your-combo/Upsize_MedChips-Buddy.png",
            "img2_50": "/images/menu/upsize-your-combo/Upsize_LrgChips_Buddy.png"
          }
        ]
      }
    ]
}