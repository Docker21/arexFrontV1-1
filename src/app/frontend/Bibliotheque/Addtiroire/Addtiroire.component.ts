import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import {Observable} from 'rxjs/Observable';
import { Tiroire } from '../../../../models/tiroire';
import { TiroireService } from '../../../../services/tiroire.service';
import { FormBuilder, Validators,FormGroup } from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'AddTiroire-cmp',
    templateUrl: 'Addtiroire.component.html'
})

export class AddTiroireComponent {

    Tiroire: Tiroire[];
    selectedTiroire: Tiroire;
    Tiroires: Tiroire
    private values: Tiroire[];

    public addTiroireForm = this.fb.group({
      name: ["", Validators.required],
      description: ["", Validators.required],

    });

    constructor(
      private TiroireService: TiroireService,
      private router: Router,
      public fb: FormBuilder) {}

    Addtiroire(event) {
      if (!this.addTiroireForm.value) { return; }

      this.TiroireService.create(this.addTiroireForm.value)
        .then(lesson => {
        this.values.push(this.addTiroireForm.value);
      });

      if (this.addTiroireForm.value) {
         this.router.navigate(['/tiroires']);
      }
    }
  }
