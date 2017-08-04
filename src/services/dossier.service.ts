import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Dossier } from '../models/dossier';// a chnagre
import { LocalStorageService } from 'angular-2-local-storage';
import { url4, url5} from '../app/globals';// a changer

@Injectable()
export class DossierService {

 private DossierUrl = url4;
 private DossierTiroireUrl = url5;

 headers;

 constructor(private http: Http, private localStorageService: LocalStorageService) {
    this.headers = this.localStorageService.get('headers');
  }



  getDossiers(id_tiroire: number): Promise<Dossier[]> {
    const url = `${this.DossierTiroireUrl}/${id_tiroire}`;
    return this.http.get(url, {headers: this.headers})
               .toPromise()
               .then(response => response.json().data as Dossier[])
               .catch(this.handleError);
  }



  getDossier(id: number): Promise<Dossier> {
    const url = `${this.DossierUrl}/${id}`;
    return this.http.get(url, {headers: this.headers})
      .toPromise()
      .then(response => response.json().data as Dossier)
      .catch(this.handleError);
  }




  delete(id: number): Promise<void> {
    const url = `${this.DossierUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }


  create(dossier: Dossier): Promise<Dossier> {
    return this.http
      .post(this.DossierUrl, JSON.stringify(dossier), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }



  update(dossier: Dossier): Promise<Dossier> {
    const url = `${this.DossierUrl}/${dossier.id}`;
    return this.http
      .put(url, JSON.stringify(dossier), {headers: this.headers})
      .toPromise()
      .then(() => dossier)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
