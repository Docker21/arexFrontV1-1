
// a ne pa toucher
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { LocalStorageModule } from 'angular-2-local-storage';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';


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

];

@NgModule({
  declarations: [
  // a ne pas toucher
  AppComponent,

  // authetification
  LoginComponent,


  // temporaire
  BienvenuComponent,



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

 AuthService

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
