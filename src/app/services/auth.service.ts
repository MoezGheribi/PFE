import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class AuthService {

  etat : boolean;

  constructor(public http : HttpClient) { }

  setIsConnected(){

     localStorage.setItem("etat","")
  }
  getStateUser(){

    return localStorage.getItem("etat");
  }


  login(Email , Password): Observable<any> {


    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-type', 'application/json');



    return this.http.post("http://localhost:3000/admin/authenticate?Email="+Email+"&Password="+Password, {});


  }


logout(){
    return this.http.get("http://localhost:3000/admin/logout")
}







}
