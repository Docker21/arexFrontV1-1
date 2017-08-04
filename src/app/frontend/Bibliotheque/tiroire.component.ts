import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ElementRef, AfterViewInit ,Input} from '@angular/core';
import { Router } from '@angular/router';
import { Tiroire } from '../../../models/tiroire';
import { TiroireService } from '../../../services/tiroire.service';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
    moduleId: module.id,
    selector: 'tiroire-cmp',
    templateUrl: 'tiroire.component.html'
})

export class tiroireComponent implements OnInit{
  tiroire: Tiroire[];
  selectedtiroire: Tiroire;
  tiroires: Tiroire;
  private values: Tiroire[];


  constructor(
    private tiroireService: TiroireService,
    private router: Router,
    public fb: FormBuilder) {

      
    }

    // afficher la liste des tiroires.
    getTiroires() {
      this.tiroireService.getTiroires()
                       .then((values)=> { this.values = values; });
    }

     ngOnInit() { this.getTiroires(); }

    // supprimer un tiroire.
    delete(tiroire: Tiroire):void{
       this.tiroireService
       .delete(tiroire.id)
       .then(() => {
         this.values = this.values.filter(h => h !== tiroire);
         if (this.selectedtiroire === tiroire) { this.tiroire = null; }
       });
    }

    onClickLi(pro:Tiroire){  this.selectedtiroire=pro;}

    //modifier un tiroire.
    // gotoDetail(tiroire: Tiroire): void { this.router.navigate(['/tiroire', tiroire.id]); }
    gotoDetail(tiroire: Tiroire): void {
    this.router.navigate(['tiroire',tiroire.id], {
      queryParams: {
      key: tiroire.id,}
    }) }

    // ajouter un tiroire.
    focntionb(){this.router.navigate(['Add_tiroire']);}

    // afficher dossiers dun tiroire.
    focntionD(tiroire: Tiroire):void{

      this.router.navigate(['Aff_dossier'],{
      queryParams: {
      key: tiroire.id,

    }
  })

}






// ajouter un dossier pour un tiroire.
focntionb1(tiroire: Tiroire): void {
  this.router.navigate(['Add_dossier'],{
    queryParams: {
      key: tiroire.id,


    }
  })
}
}
