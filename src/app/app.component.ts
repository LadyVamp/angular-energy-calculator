import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { of } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  form: FormGroup;
  activities = [];
  weight: number = 60;
  time: number = 60;
  result: string = '';

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      weight: [''],
      activities: [''],
      time: [''],
    });

    // async orders
    of(this.getActivities()).subscribe(activities => {
      this.activities = activities;
      this.form.controls.activities.patchValue(this.activities[0].calories);
    });

  }

  getActivities() { //http://plavaem.info/raskhod_kaloriy.php
    return [
      { calories: '5', name: 'Езда на велосипеде (15 км/ч)'},
      { calories: '8', name: 'Езда на велосипеде (20 км/ч)'},
      { calories: '7', name: 'Ходьба на лыжах'},
      { calories: '3', name: 'Статическая йога' },
      { calories: '7', name: 'Бег (8 км/ч)' },
      { calories: '8', name: 'Бег (10 км/ч)' },
      { calories: '9', name: 'Бег по пересеченной местности' },
    ];
  }

  calc() {
    console.log(this.form.value);
    this.result = (this.weight * this.form.value.activities * this.time / 60).toFixed(2);
  }
}
