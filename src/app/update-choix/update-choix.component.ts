import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Choix } from '../model/choix.model';

@Component({
  selector: 'app-update-choix',
  templateUrl: './update-choix.component.html',
  styles: [
  ]
})
export class UpdateChoixComponent implements OnInit {

 @Input()
  choix!:Choix;

  @Input()
  ajout!:boolean;

  @Output() 
  choixUpdated = new EventEmitter<Choix>();


  constructor() { }

  ngOnInit(): void {
    console.log("ngOnInit du composant UpdateChoix ",this.choix);
  }
  saveChoix(){
    this.choixUpdated.emit(this.choix);

  }

}
