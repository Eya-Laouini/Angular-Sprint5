import { Component, OnInit } from '@angular/core';
import { Food } from '../model/food.model';
import { AuthService } from '../services/auth.service';
import { FoodService } from '../services/food.service';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class foodComponent implements OnInit {
  food !: Food[];
  apiURL: string = 'http://localhost:8010/Food/api';

  constructor(private foodService : FoodService, public authService:AuthService) {
    //this.food = foodService.listefood();
  }

  ngOnInit(): void {
    this.chargerFood();
  }

  chargerFood(){
      this.foodService.listefood().subscribe(food => {
      this.food = food;
      this.food.forEach((food) => {
        food.imageStr = 'data:' + food.images[0].type + ';base64,' + 
        food.images[0].image;
        }); 
        });
        
      }
      
  supprimerfood( f: Food)
{
let conf = confirm("Etes-vous sûr ?");
  if (conf)
    this.foodService.supprimerfood(f.idFood).subscribe(() => {
    console.log("food supprimé");
    this.chargerFood();
 
});
} 
}
