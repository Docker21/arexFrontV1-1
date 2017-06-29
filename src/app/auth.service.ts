import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';

import { LocalStorageService } from 'angular-2-local-storage';

import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Subject';


import { Utilisateur } from '../models/utilisateur';
import { url1 } from './globals';
import { url2 } from './globals';

@Injectable()
export class AuthService {

  isAuthenticated: boolean = false;
  userId;
  windowHandle;
  ourcode;
  accesstoken;
  headers;

  constructor(private http: Http, private router: Router, private localStorageService: LocalStorageService) {

    if(this.localStorageService.get('token') != ""){

      this.headers = new Headers();
      this.headers.append('Accept', 'application/json');
      this.headers.append('Content-Type', 'application/json');
      this.headers.append('Authorization', 'Bearer '+ this.localStorageService.get('token'));
      this.localStorageService.set('headers', this.headers);

    }

  }

  login(usercreds){

    var headers = new Headers();
    var creds = 'username=' + usercreds.username + '&password='+ usercreds.password +'&client_id=id1&client_secret=secret1&grant_type=password';
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return new Promise((resolve) => {
        this.http.post(url1, creds, {headers: headers}).subscribe((data) => {
          if(data.json().access_token != "") {
             this.isAuthenticated = true;
             console.log('le Token>>>>>>>>>>>>');
             console.log(data.json().access_token);
             this.localStorageService.set('token', data.json().access_token);
             sessionStorage.setItem('tokenthis',data.json().access_token);// ziada
          }
          resolve(this.isAuthenticated);
        }
      )
    })
  }

  infoUser(){
    return this.http.get(url2, {headers: this.headers})
               .toPromise()
               .then(response => response.json().data as Utilisateur);
  }

  logout() {
    sessionStorage.removeItem('tokenthis');
  }

}
