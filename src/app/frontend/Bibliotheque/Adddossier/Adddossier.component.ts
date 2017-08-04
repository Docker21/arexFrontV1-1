import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { Router,ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import {Observable} from 'rxjs/Observable';
import { Dossier } from '../../../../models/dossier';
import { DossierService } from '../../../../services/dossier.service';
import { FormBuilder, Validators,FormGroup } from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'AddDossier-cmp',
    templateUrl: 'Adddossier.component.html'
})

export class AddDossierComponent {

    Dossier: Dossier[];
    selectedDossier: Dossier;
    Dossiers: Dossier
    private values: Dossier[];
    private idtiroire:number;
    public addDossierForm ;

    constructor(
      private DossierService: DossierService,
      private router: Router,private route: ActivatedRoute,
      public fb: FormBuilder) {
        this.route.queryParams.subscribe(params => {
    this.idtiroire= params['key'];//id tiroire


  });




  this.addDossierForm= this.fb.group({
    name: ["", Validators.required],
    description: ["", Validators.required],
    id_Drawer:this.idtiroire,
  });

      }

    Adddossier(event) {
      if (!this.addDossierForm.value) { return; }

      this.DossierService.create(this.addDossierForm.value)
        .then(lesson => {
        this.values.push(this.addDossierForm.value);
      });

      if (this.addDossierForm.value) {
         this.router.navigate(['/tiroires']);
      }
    }
  }
