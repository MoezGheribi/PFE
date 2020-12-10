import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(public router: Router , public  rest:AuthService) { }

  ngOnInit() {
  }


  logout(){
    this.rest.logout().subscribe( res => {
      console.log(res)
      localStorage.setItem('token' , null )

    })

    this.router.navigate([""])
  }
}
