import { Component, OnInit } from '@angular/core';
// import initVectorMap = require('../../../assets/js/init/initVectorMap.js');
// import initCharts = require('../../../assets/js/init/charts.js');
// import initAniCharts = require('../../../assets/js/init/initAniCharts.js');
// import initTooltips= require('../../../assets/js/init/initTooltips.js');
// import initNotify= require('../../../assets/js/init/notify.js');
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { Utilisateur} from '../../../models/utilisateur';

@Component({
    selector: ' bienvenu-cmp ',
    templateUrl: 'bienvenu.component.html'

})

export class BienvenuComponent implements OnInit{
 user:Utilisateur;
 idUser1: number;
 name1: string;

    constructor(private router:Router,private authService: AuthService,){}



    ngOnInit(){



}
}
