import { Component, OnInit } from '@angular/core';
import { Choix } from '../model/choix.model';
import { FoodService } from '../services/food.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liste-choix',
  templateUrl: './liste-choix.component.html',
  styles: [
  ]
})
export class ListeChoixComponent implements OnInit {
  choix!:Choix[];
  ajout:boolean=true;
  updatedChoix:Choix = {"idChoix": 0, "nomChoix":""};

  constructor(private foodService:FoodService, private router:Router) { }

  ngOnInit(): void {
    this.chargerChoix()
  }

chargerChoix(){
  this.foodService.listeChoix().
subscribe(chx => {this.choix = chx;

console.log(chx);
});

}
choixUpdated(choix:Choix){
  console.log("choix reçoit du composant UpdateChoix",choix);
this.foodService.ajouterChoix(choix)
.subscribe(()=>
  this.chargerChoix());
}

updateChoix(choix:Choix){
  this.updatedChoix=choix;
  this.ajout=false;

}


}
