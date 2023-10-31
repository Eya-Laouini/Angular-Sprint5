import { Component, OnInit } from '@angular/core';
import { Food } from '../model/food.model';
import { ActivatedRoute,Router } from '@angular/router';
import { FoodService } from '../services/food.service';
import { Choix } from '../model/choix.model';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-update-food',
  templateUrl: './update-food.component.html',
  styles: [
  ]
})
export class UpdateFoodComponent implements OnInit {
  currentfood = new Food();
  choix!: Choix[];
  updatedChoixId! : number;
  myImage! : string;
  uploadedImage!: File;
isImageUpdated: Boolean=false;

  constructor(private activatedRoute: ActivatedRoute,
    private router :Router,
    private foodService: FoodService) { }

    ngOnInit():void{
      this.foodService.listeChoix().subscribe(chx => {this.choix=chx;
      console.log(chx);});
    
    this.foodService.consulterfood(this.activatedRoute.snapshot.params['id']).
    subscribe(food =>{ this.currentfood =food;
      this.updatedChoixId=food.choix.idChoix;
    

  });
}


      updatefood() {
        this.currentfood.choix = this.choix.find(chx => chx.idChoix == 
          this.updatedChoixId)!; 
          this.foodService
          .updateFood(this.currentfood)
          
          .subscribe((food) => {
          this.router.navigate(['FOOD']);
          });
          }
          

        onImageUpload(event: any) {
          if(event.target.files && event.target.files.length) {
          this.uploadedImage = event.target.files[0];
          this.isImageUpdated =true;
          const reader = new FileReader();
          reader.readAsDataURL(this.uploadedImage);
          reader.onload = () => { this.myImage = reader.result as string; };
          }
          }

          onAddImageFood() {
            this.foodService
            .uploadImageFood(this.uploadedImage,
            this.uploadedImage.name,this.currentfood.idFood)
            .subscribe( (img : Image) => {
            this.currentfood.images.push(img);
            });
            }
         
      
            supprimerImage(img: Image){
              let conf = confirm("Etes-vous sûr ?");
              if (conf)
              this.foodService.supprimerImage(img.idImage).subscribe(() => {
              //supprimer image du tableau currentProduit.images
              const index = this.currentfood.images.indexOf(img, 0);
              if (index > -1) {
              this.currentfood.images.splice(index, 1);
              }
              });
              }
        
     
       }
     
   
       
  
