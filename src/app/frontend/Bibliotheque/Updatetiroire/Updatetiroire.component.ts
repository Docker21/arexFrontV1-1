import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }from '@angular/common';
import { Router } from '@angular/router';
import { Tiroire } from '../../../../models/tiroire';
import { TiroireService } from '../../../../services/tiroire.service';
import { FormBuilder, Validators } from '@angular/forms';

declare var bootstrap: any;

@Component({
    moduleId: module.id,
    selector: 'updatetiroire-cmp',
    templateUrl: 'Updatetiroire.component.html',
})

export class UpdateTiroireComponent implements OnInit{

  tiroire: Tiroire;
idtiroire:number;
  constructor(
    private tiroireService: TiroireService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    public fb: FormBuilder) {  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {

     this.idtiroire= params['key'];

    this.tiroireService.getTiroire(this.idtiroire)
        .then((tiroire)=> {
          this.tiroire = tiroire[0];

  });  });

}



  save(): void {
    console.log(this.tiroire);
      this.tiroireService.update(this.tiroire)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
