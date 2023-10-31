import { Component, OnInit } from '@angular/core';
import { Choix } from '../model/choix.model';
import { Food } from '../model/food.model';
import { FoodService } from '../services/food.service';

@Component({
  selector: 'app-recherche-par-choix',
  templateUrl: './recherche-par-choix.component.html',
  styles: [
  ]
})
export class RechercheParChoixComponent implements OnInit {
idChoix !: number;
food! :Food[];
choix!:Choix[];

  constructor(private foodService:FoodService) { }

  ngOnInit(): void {
    this.foodService.listeChoix().
subscribe(chx => { this.choix = chx;

console.log(chx);
});
  }
onChange()
{
  this.foodService.rechercherParChoix(this.idChoix).
  subscribe(foods =>{this.food=foods});
}

}
