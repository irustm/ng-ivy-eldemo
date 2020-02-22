import { Component, ɵrenderComponent } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `{{title}}`
})
export class AppComponent {
  title = 'ng-ivy-eldemo';
}

ɵrenderComponent(AppComponent);