import {Component, OnInit} from '@angular/core';
import {RestService} from "../../../services/rest.service";

@Component({
  selector: 'app-gestion-publication',
  templateUrl: './gestion-publication.component.html',
  styleUrls: ['./gestion-publication.component.css']
})
export class GestionPublicationComponent implements OnInit {
  publications: any;
  args1: any;

  constructor(public rest: RestService) {
    this.getPublications();
  }

  ngOnInit() {
  }
  getPublications() {
    this.rest.getAllPublications().subscribe(res => {
      this.publications = res;

    });
  }



  deletePublications(_id) {
    this.rest.removePublications(_id).subscribe(res => {
      console.log(res)
      this.getPublications();

    })


  }
}
