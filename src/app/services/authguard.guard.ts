import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from "./auth.service";

@Injectable()
export class AuthguardGuard implements CanActivate,CanActivateChild {



  constructor(public router: Router,public authservice: AuthService){

  }
  canActivate() {


      return true;

  }

  canActivateChild(){

     console.log("etat : ",this.authservice.getStateUser())

    if (this.authservice.getStateUser()===null){
      this.router.navigate([''])
      return false;

    }
    return true;
  }



}
