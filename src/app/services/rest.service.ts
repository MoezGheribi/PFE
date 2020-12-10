import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class RestService {

  constructor(public http: HttpClient) {

  }



  getAllPublications() {
    const headers =new HttpHeaders({'x-access-token' : localStorage.getItem('token')})
    return this.http.get("http://localhost:3000/publications/all" , {headers : headers})
  }

  getAllMessages() {
    const headers =new HttpHeaders({'x-access-token' : localStorage.getItem('token')})
    return this.http.get("http://localhost:3000/Messages/all" , {headers : headers})
  }

  getAllVoyageurs() {
    const headers =new HttpHeaders({'x-access-token' : localStorage.getItem('token')})
    return this.http.get("http://localhost:3000/Voyageurs/all" , {headers : headers})
  }

  getAllConducteurs() {
    const headers =new HttpHeaders({'x-access-token' : localStorage.getItem('token')})
    return this.http.get("http://localhost:3000/Conducteurs/all" , {headers : headers})
  }





  removePublications(_id) {
    const headers =new HttpHeaders({'x-access-token' : localStorage.getItem('token')})
    return this.http.get("http://localhost:3000/publications/delete?_id=" +_id , {headers : headers})
  }
  removeMessages(_id) {
    const headers =new HttpHeaders({'x-access-token' : localStorage.getItem('token')})
    return this.http.get("http://localhost:3000/messages/delete?_id=" +_id , {headers : headers})
  }
  removeVoyageurs(_id) {
    const headers =new HttpHeaders({'x-access-token' : localStorage.getItem('token')})
    return this.http.get("http://localhost:3000/voyageurs/delete?_id=" +_id , {headers : headers})
  }
  removeConducteurs(_id) {
    const headers =new HttpHeaders({'x-access-token' : localStorage.getItem('token')})
    return this.http.get("http://localhost:3000/Conducteurs/delete1?_id=" +_id , {headers : headers})
  }
}
