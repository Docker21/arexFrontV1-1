import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Fichier } from '../models/fichier';// a chnagre
import { LocalStorageService } from 'angular-2-local-storage';
import { url6, url7} from '../app/globals';// a changer

@Injectable()
export class FichierService {

 private FichierUrl = url6;
 private FichierDossierUrl = url7;

 headers;

 constructor(private http: Http, private localStorageService: LocalStorageService) {
    this.headers = this.localStorageService.get('headers');
  }



  getFichiers(id_dossier: number): Promise<Fichier[]> {
    const url = `${this.FichierDossierUrl}/${id_dossier}`;
    return this.http.get(url, {headers: this.headers})
               .toPromise()
               .then(response => response.json().data as Fichier[])
               .catch(this.handleError);
  }



  getFichier(id: number): Promise<Fichier> {
    const url = `${this.FichierUrl}/${id}`;
    return this.http.get(url, {headers: this.headers})
      .toPromise()
      .then(response => response.json().data as Fichier)
      .catch(this.handleError);
  }




  delete(id: number): Promise<void> {
    const url = `${this.FichierUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }


  create(fichier: Fichier): Promise<Fichier> {
    let headers = new Headers;
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Authorization', 'Bearer '+ this.localStorageService.get('token'));
    console.log(fichier);
    const url = `${this.FichierUrl}/${fichier.id_folder}`;
    return this.http
      .post(url, JSON.stringify(fichier), {headers: headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }



  update(fichier: Fichier): Promise<Fichier> {
    const url = `${this.FichierUrl}/${fichier.id}`;
    return this.http
      .put(url, JSON.stringify(fichier), {headers: this.headers})
      .toPromise()
      .then(() => fichier)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
