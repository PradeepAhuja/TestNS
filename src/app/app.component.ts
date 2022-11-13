import { Component } from '@angular/core'
import { Application } from '@nativescript/core';

@Component({
  selector: 'ns-app',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor()
  {
    Application.on(Application.resumeEvent, (args) => {
      console.log("rrrrrrrrrrrrrrr");
    });
  }
}
