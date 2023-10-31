import { Component, OnInit } from '@angular/core';
import { Food } from '../model/food.model';
import { FoodService } from '../services/food.service';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styles: [
  ]
})
export class RechercheParNomComponent implements OnInit {
nomFood!: string;
food!:Food[];
allFood!:Food[];
searchTerm!:string;
  constructor(private foodService : FoodService) { }

  ngOnInit(): void {
    this.foodService.listefood().subscribe(foods => {
      console.log(foods);
      this.food = foods;
      });
      
  }
rechercherfoods(){
  this.foodService.rechercherParNom(this.nomFood).subscribe(foods=>{
    console.log(foods),
    this.food=foods})
   
}
onKeyUp(filterText : string){
  //this.food = this.allFood.filter(item =>
  //item.nomFood.toLowerCase().includes(filterText));
  
}
}
