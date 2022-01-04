import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-back-to-home',
  templateUrl: './back-to-home.component.html',
  styleUrls: ['./back-to-home.component.scss'],
})
export class BackToHomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Back' : '';
  }

}
