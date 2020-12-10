import { Component, OnInit } from '@angular/core';
import {RestService} from "../../../services/rest.service";

@Component({
  selector: 'app-gestion-conducteur',
  templateUrl: './gestion-conducteur.component.html',
  styleUrls: ['./gestion-conducteur.component.css']
})
export class GestionConducteurComponent implements OnInit {
  conducteurs:any;
args : any ;
  constructor(public rest: RestService) {
    this.getConducteurs();
  }

  ngOnInit() {
  }

  getConducteurs() {
    this.rest.getAllConducteurs().subscribe(res => {

      this.conducteurs = res;
    });
  }




  deleteConducteurs(_id){

    console.log(_id)
    this.rest.removeConducteurs(_id).subscribe(res => {
      console.log(res)
      this.getConducteurs();
    })
  }

}
