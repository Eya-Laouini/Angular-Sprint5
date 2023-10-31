import { Component, OnInit } from '@angular/core';
import { Food } from '../model/food.model';
import { FoodService } from '../services/food.service';
import { Choix } from '../model/choix.model';
import { Router } from '@angular/router';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-aad-food',
  templateUrl: './aad-food.component.html',
})
export class AadFoodComponent implements OnInit {

  newfood = new Food();
  newIdChoix!: number;
  newChoix!: Choix;
  choix!: Choix[];
  uploadedImage!: File;
  imagePath: any;

  constructor(private foodService: FoodService, private router: Router) { }

  ngOnInit(): void {
    this.foodService.listeChoix().
      subscribe(chx => {
        this.choix = chx;
        console.log(chx)


      });

  }
  addFood(){
    this.newfood.choix = this.choix.find(chx => chx.idChoix == this.newIdChoix)!;
    this.foodService.ajouterfood(this.newfood).subscribe((food) => {
    this.foodService.uploadImageFood(this.uploadedImage,
            this.uploadedImage.name, food.idFood)
          .subscribe((response: any) => { }
          );
        this.router.navigate(['FOOD']);
      });
  }

  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => { this.imagePath = reader.result; }
    }
}
