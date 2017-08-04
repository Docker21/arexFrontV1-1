import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }from '@angular/common';
import { Router } from '@angular/router';
import { Fichier } from '../../../../models/fichier';
import { FichierService } from '../../../../services/fichier.service';
import { FormBuilder, Validators } from '@angular/forms';

declare var bootstrap: any;

@Component({
    moduleId: module.id,
    selector: 'updatefichier-cmp',
    templateUrl: 'Updatefichier.component.html',
})

export class UpdateFichierComponent implements OnInit{

  fichier: Fichier;

  constructor(
    private fichierService: FichierService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    public fb: FormBuilder) {  }

  ngOnInit() : void {
    this.route.params
      .switchMap((params: Params) => this.fichierService.getFichier(+params['id']))
      .subscribe(fichier => this.fichier = fichier);
  }

  save(): void {
      this.fichierService.update(this.fichier)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
