import { Component, OnInit } from '@angular/core';
import {RestService} from "../../../services/rest.service";

@Component({
  selector: 'app-gestion-voyageur',
  templateUrl: './gestion-voyageur.component.html',
  styleUrls: ['./gestion-voyageur.component.css']
})
export class GestionVoyageurComponent implements OnInit {
  voyageurs:any;
  args: any;

  constructor(public rest: RestService) {
    this.getVoyageurs();
  }

  ngOnInit() {
  }

  getVoyageurs() {
    this.rest.getAllVoyageurs().subscribe(res => {

      this.voyageurs= res;
    });
  }




  deleteVoyageurs(_id){
    this.rest.removeVoyageurs(_id).subscribe(res => {
      console.log(res)
      this.getVoyageurs();
    })
  }

}

