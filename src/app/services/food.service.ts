import { Injectable } from '@angular/core';
import {Food} from '../model/food.model';
import { Choix } from '../model/choix.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Image } from '../model/image.model';



const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};

@Injectable({
  providedIn: 'root'
})

export class FoodService {
  apiURL: string = 'http://localhost:8010/Food/api';
  apiURLChoix : string='http://localhost:8010/Food/choix';
  foods! :Food;
  food! : Food[];
  constructor(private http:HttpClient,private authService : AuthService ) {
    // this.choix=[
    //   {idChoix:1,nomChoix:"healthyFood"},
    //   {idChoix:2,nomChoix:"junkFood"},

    // ]
   //this.food = [
      //{idfood : 1, nomfood : "pizza", prixfood : 12000, datePreparation: new Date("01/14/2011"),choix : {idChoix : 1, nomChoix : "healthyFood"}},
      //{idfood : 2, nomfood : "kosksi", prixfood : 50000, datePreparation : new Date("12/17/2010"),choix : {idChoix : 2, nomChoix : "healthyFood"}},
      //{idfood : 3, nomfood :"gâteau", prixfood : 65000, datePreparation : new Date(" 01/01/2022"),choix : {idChoix : 1, nomChoix : "junkFood"}},
   // ];

  }
   listefood(): Observable<Food[]>{ 
  return this.http.get<Food[]>(this.apiURL+"/all");
   }

  ajouterfood(food: Food):Observable<Food>{
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt})
         return this.http.post<Food>(this.apiURL+"/addfood", food,{headers:httpHeaders});
      }
      

  supprimerfood(id : number) {
        const url = `${this.apiURL}/delfood/${id}`;
        let jwt = this.authService.getToken();
        jwt = "Bearer "+jwt;
        let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
      return this.http.delete(url,{headers:httpHeaders})
  } 
  consulterfood(id: number): Observable<Food> {
      const url = `${this.apiURL}/getbyid/${id}`;
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
      return this.http.get<Food>(url,{headers:httpHeaders});
            }
  updateFood(food :Food) : Observable<Food>
      {
        let jwt = this.authService.getToken();
        jwt = "Bearer "+jwt;
        let httpHeaders = new HttpHeaders({"Authorization":jwt})
        return this.http.put<Food>(this.apiURL+"/updatefood",food);
        }      
  trierfood(){
        this.food = this.food.sort((n1,n2) => {
        if (n1.idFood!>n2.idFood!){
            return 1;
        }
        if (n1.idFood! < n2.idFood!) {
            return -1;
        }
      return 0;
        }
        );}


  listeChoix():Observable<Choix[]>{
    
  return this.http.get<Choix[]>(this.apiURL+"/choix");
        }
    
  rechercherParChoix(id: number):Observable< Food[]> {
      const url = `${this.apiURL}/foodschx/${id}`;
      return this.http.get<Food[]>(url);
      }

  rechercherParNom(nom: string):Observable< Food[]> {
        const url = `${this.apiURL}/foodsByName/${nom}`;
        return this.http.get<Food[]>(url);
        }
  ajouterChoix(choix: Choix):Observable<Choix>{
          return this.http.post<Choix>(this.apiURLChoix, choix, httpOptions);
          }  

          updateChoix(chx :Choix) : Observable<Food>
          {
            return this.http.put<Food>(this.apiURL+'/choix', chx);
          }   
 

      

          uploadImage(file: File, filename: string): Observable<Image>{
            const imageFormData = new FormData();
            imageFormData.append('image', file, filename);
            const url = `${this.apiURL + '/image/upload'}`;
            return this.http.post<Image>(url, imageFormData);
            }
            loadImage(id: number): Observable<Image> {
              const url = `${this.apiURL + '/image/get/info'}/${id}`;
              return this.http.get<Image>(url);
              }
        uploadImageFood(file: File, filename: string, idFood:number): Observable<any>{
          const imageFormData = new FormData();
          imageFormData.append('image', file, filename);
          const url = `${this.apiURL + '/image/uplaodImageFood'}/${idFood}`;
          return this.http.post(url, imageFormData);
          }
          supprimerImage(id : number) {
            const url = `${this.apiURL}/image/delete/${id}`;
            return this.http.delete(url, httpOptions);
            }

            
}