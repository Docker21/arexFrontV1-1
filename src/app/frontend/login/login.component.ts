import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth.service';
import { Router,ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit {

  returnUrl: string;

  user = {
    username: '',
    password: ''
  };

  constructor(private router:Router,private auth: AuthService, private route: ActivatedRoute) { }
  ngOnInit() { }

  login(usercreds) {

     let userlogin = this.auth.login(usercreds);
     let user=this.auth.infoUser();
     userlogin.then((res) => {
        if (res) {this.router.navigate(['/bienvenu']);}
  })
}
}
