import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {until} from "selenium-webdriver";
import elementIsSelected = until.elementIsSelected;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
Email : any ;
Password : any ;
test : boolean;
  constructor(public router: Router , public rest:AuthService) {
    this.test=true ;
  }


  go(){
    this.test=false ;
  }
  goback(){
    this.test=true ;
  }
  ngOnInit() {
  }
  login(Email,Password){

    this.rest.login(Email , Password).subscribe( res => {

      console.log(res)
      if (res.auth){

        this.router.navigate(["home"])
         localStorage.setItem("token" , res.token)

        this.rest.setIsConnected();


      }
      else {
        this.router.navigate([""])

      }




    })


  }




  }



