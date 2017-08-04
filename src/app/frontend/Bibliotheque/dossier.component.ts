import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ElementRef, AfterViewInit ,Input} from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { Dossier } from '../../../models/dossier';
import { DossierService } from '../../../services/dossier.service';
import { Tiroire } from '../../../models/tiroire';
import { TiroireService } from '../../../services/tiroire.service';

import { FormBuilder, Validators } from '@angular/forms';


@Component({
    moduleId: module.id,
    selector: 'dossier-cmp',
    templateUrl: 'dossier.component.html'
})

export class AffDossierComponent implements OnInit{
  dossier: Dossier[];
  selecteddossier: Dossier;
  dossiers: Dossier;
  private values: Dossier[];
  private idtiroire:number;



  constructor(
    private dossierService: DossierService,
    private tiroireService:TiroireService,
    private router: Router,
      private route: ActivatedRoute,
    public fb: FormBuilder) {


      this.route.queryParams.subscribe(params => {
           this.idtiroire= params['key'];// id tiroire


         });


    }

    //afficher la liste des dossiers
    getDossiers() {
      this.dossierService.getDossiers(this.idtiroire)
                       .then((values)=> { this.values = values; });
    }




       ngOnInit() : void {



       this.getDossiers();
     }

    // supprimer un dossier
    delete(dossier: Dossier):void{
       this.dossierService
       .delete(dossier.id)
       .then(() => {
         this.values = this.values.filter(h => h !== dossier);
         if (this.selecteddossier === dossier) { this.dossier = null; }
       });
    }

    onClickLi(pro:Dossier){  this.selecteddossier=pro;}

    //modifier un dossier
    gotoDetail(dossier: Dossier): void { this.router.navigate(['/dossier', dossier.id]); }




    // afficher fichier dun dossier.
    focntionD(dossier: Dossier):void{

      this.router.navigate(['Aff_fichier'],{
      queryParams: {
      key: dossier.id,

    }
  })

}






// ajouter un fichier d(un dossier).
focntionb1(dossier: Dossier): void {
  this.router.navigate(['Add_fichier'],{
    queryParams: {
      key: dossier.id,


    }
  })
}


}
