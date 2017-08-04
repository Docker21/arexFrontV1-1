import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Tiroire } from '../models/tiroire';// a chnagre
import { LocalStorageService } from 'angular-2-local-storage';
import { url3} from '../app/globals';// a changer

@Injectable()
export class TiroireService {

 private TiroireUrl = url3;
  headers;


  constructor(private http: Http, private localStorageService: LocalStorageService) {
    this.headers = this.localStorageService.get('headers');
  }



  getTiroires(): Promise<Tiroire[]> {
    return this.http.get(this.TiroireUrl, {headers: this.headers})
               .toPromise()
               .then(response => response.json().data as Tiroire[])
               .catch(this.handleError);
  }



  getTiroire(id: number): Promise<Tiroire> {
    const url = `${this.TiroireUrl}/${id}`;
    console.log('>>>>>>>>>>>>>>>>>>>>');
    return this.http.get(url, {headers: this.headers})
      .toPromise()

      .then(response => response.json().data as Tiroire)

      .catch(this.handleError);

  }




  delete(id: number): Promise<void> {
    const url = `${this.TiroireUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }


  create(tiroire: Tiroire): Promise<Tiroire> {
    return this.http
      .post(this.TiroireUrl, JSON.stringify(tiroire), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }



  update(tiroire: Tiroire): Promise<Tiroire> {
 const url = `${this.TiroireUrl}/${tiroire.id}`;////////////////

    return this.http
      .put(url, JSON.stringify(tiroire), {headers: this.headers})
      .toPromise()
      .then(() => tiroire)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
