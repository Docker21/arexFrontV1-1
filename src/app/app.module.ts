
// a ne pa toucher
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { LocalStorageModule } from 'angular-2-local-storage';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { tiroireComponent } from './frontend/Bibliotheque/tiroire.component';
import { TiroireService } from '../services/tiroire.service';
import { AddTiroireComponent } from './frontend/Bibliotheque/Addtiroire/Addtiroire.component';
import { UpdateTiroireComponent } from './frontend/Bibliotheque/Updatetiroire/Updatetiroire.component';
import { AffDossierComponent } from './frontend/Bibliotheque/dossier.component';
import { DossierService } from '../services/dossier.service';
import { AddDossierComponent } from './frontend/Bibliotheque/Adddossier/Adddossier.component';
import { UpdateDossierComponent } from './frontend/Bibliotheque/Updatedossier/Updatedossier.component';
import { AffFichierComponent } from './frontend/Bibliotheque/fichier.component';
import { FichierService } from '../services/fichier.service';
import { AddFichierComponent } from './frontend/Bibliotheque/Addfichier/Addfichier.component';
import { UpdateFichierComponent } from './frontend/Bibliotheque/Updatefichier/Updatefichier.component';
// temporaire
import { BienvenuComponent } from './frontend/Bienvenu/bienvenu.component';

// alert

import { AuthService } from './auth.service';

// authentification
import { LoginComponent } from './frontend/login/login.component';



const appRoutes: Routes = [
// login
{ path: 'login', component:LoginComponent},


  {path: 'bienvenu', component:BienvenuComponent},
  {path: 'tiroires', component:tiroireComponent},//la page des listes des tiroirs


  {path: 'tiroire/:id', component:UpdateTiroireComponent},
  {path: 'Add_tiroire', component:AddTiroireComponent},
  {path: 'Aff_dossier', component:AffDossierComponent},// liste des dossiers
  {path: 'Add_dossier', component:AddDossierComponent},
  {path: 'dossier/:id', component:UpdateDossierComponent},
  {path: 'Aff_fichier', component:AffFichierComponent},// liste des fichiers
  {path: 'Add_fichier', component:AddFichierComponent},
  {path: 'fichier/:id', component:UpdateFichierComponent},

];

@NgModule({
  declarations: [
  // a ne pas toucher
  AppComponent,

  // authetification
  LoginComponent,


  // temporaire
  BienvenuComponent,tiroireComponent,AddTiroireComponent,UpdateTiroireComponent,AffDossierComponent,AddDossierComponent,UpdateDossierComponent,
  AffFichierComponent,AddFichierComponent,UpdateFichierComponent



  ],
  imports: [// A ne pas toucher
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    ReactiveFormsModule,

    LocalStorageModule.withConfig({
      prefix: 'my-app',
      storageType: 'localStorage'
    })
  ],
  providers: [// les services

 AuthService,TiroireService,DossierService,FichierService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
