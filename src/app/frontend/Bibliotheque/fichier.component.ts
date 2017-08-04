import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ElementRef, AfterViewInit ,Input} from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { Fichier } from '../../../models/fichier';
import { FichierService } from '../../../services/fichier.service';
import { Dossier } from '../../../models/dossier';
import { DossierService } from '../../../services/dossier.service';

import { FormBuilder, Validators } from '@angular/forms';


@Component({
    moduleId: module.id,
    selector: 'fichier-cmp',
    templateUrl: 'fichier.component.html'
})



    export class AffFichierComponent implements OnInit{
      fichier: Fichier[];
      selectedfichier: Fichier;
      fichiers: Fichier;
      private values: Fichier[];
      private iddossier:number;



      constructor(
        private fichierService: FichierService,
        private dossierService:DossierService,
        private router: Router,
          private route: ActivatedRoute,
        public fb: FormBuilder) {


          this.route.queryParams.subscribe(params => {
               this.iddossier= params['key'];// id iddossier


             });


        }

      //  afficher la liste des fichiers
        getFichiers() {
          this.fichierService.getFichiers(this.iddossier)
                           .then((values)=> { this.values = values; });
        }




           ngOnInit() : void {



          this.getFichiers();
         }

      //  supprimer un dossier
        delete(fichier: Fichier):void{
           this.fichierService
           .delete(fichier.id)
           .then(() => {
             this.values = this.values.filter(h => h !== fichier);
             if (this.selectedfichier === fichier) { this.fichier = null; }
           });
        }

        onClickLi(pro:Fichier){  this.selectedfichier=pro;}

        //modifier un dossier
        gotoDetail(fichier: Fichier): void { this.router.navigate(['/fichier', fichier.id]); }


}
