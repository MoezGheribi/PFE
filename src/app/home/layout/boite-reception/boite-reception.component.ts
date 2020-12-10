import { Component, OnInit } from '@angular/core';
import {RestService} from "../../../services/rest.service";

@Component({
  selector: 'app-boite-reception',
  templateUrl: './boite-reception.component.html',
  styleUrls: ['./boite-reception.component.css']
})
export class BoiteReceptionComponent implements OnInit {
  Messages: any;
  args2: any;
  constructor(public rest: RestService) {
    this.getMessages();
  }

  ngOnInit() {
  }

  getMessages() {
    this.rest.getAllMessages().subscribe(res => {
      this.Messages = res;
    });
  }

  deleteMessages(_id) {
    this.rest.removeMessages(_id).subscribe(res => {
      console.log(res)
      this.getMessages();

    })
  }
}
