import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }from '@angular/common';
import { Router } from '@angular/router';
import { Dossier } from '../../../../models/dossier';
import { DossierService } from '../../../../services/dossier.service';
import { FormBuilder, Validators } from '@angular/forms';

declare var bootstrap: any;

@Component({
    moduleId: module.id,
    selector: 'updatedossier-cmp',
    templateUrl: 'Updatedossier.component.html',
})

export class UpdateDossierComponent implements OnInit{

  dossier: Dossier;

  constructor(
    private dossierService: DossierService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    public fb: FormBuilder) {  }

  ngOnInit() : void {
    this.route.params
      .switchMap((params: Params) => this.dossierService.getDossier(+params['id']))
      .subscribe(dossier => this.dossier = dossier);
  }

  save(): void {
      this.dossierService.update(this.dossier)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
