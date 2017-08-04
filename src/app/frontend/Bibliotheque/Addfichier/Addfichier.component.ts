import { Component, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/switchMap';
import { Router,ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import {Observable} from 'rxjs/Observable';
import { Fichier } from '../../../../models/fichier';
import { FichierService } from '../../../../services/fichier.service';
import { FormBuilder, Validators,FormGroup } from '@angular/forms';
import { url6, url7} from '../../../../app/globals';
import { RequestOptions } from '@angular/http';
@Component({
    moduleId: module.id,
    selector: 'AddFichier-cmp',
    templateUrl: 'Addfichier.component.html'
})

export class AddFichierComponent {

    Fichier: Fichier[];
    selectedFichier: Fichier;
    Fichiers: Fichier
    private values: Fichier[];
    private iddossier:number;
    public addFichierForm ;
 private FichierUrl = url6;


    constructor(private http:Http,

      private FichierService: FichierService,
      private router: Router,private route: ActivatedRoute,
      public fb: FormBuilder) {

          this.route.queryParams.subscribe(params => {
      this.iddossier= params['key'];//id tiroire


    });

    this.addFichierForm= this.fb.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      id_folder:this.iddossier,

    });







      }

    // Addfichier(event) {
    //   if (!this.addFichierForm.value) { return; }
    //
    //   this.FichierService.create(this.addFichierForm.value)
    //     .then(lesson => {
    //     this.values.push(this.addFichierForm.value);
    //   });
    //
    //   if (this.addFichierForm.value) {
    //      this.router.navigate(['/Aff_fichier']);
    //   }
    // }


    fileChange(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        let file: File = fileList[0];
        let formData:FormData = new FormData();
        formData.append('uploadFile', file, file.name);
        let headers = new Headers();
        /** No need to include Content-Type in Angular 4 */
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });
        this.http.post(`${this.addFichierForm}`, formData, options)
            .map(res => res.json())
            .catch(error => Observable.throw(error))
            .subscribe(
                data => console.log('success'),
                error => console.log(error)
            )
    }
}


  }
