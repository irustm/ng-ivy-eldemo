import { ɵrenderComponent } from '@angular/core';
import { AppComponent } from './app/app.component';
import { TestComponent } from './app/test.component';
import { HelloComponent } from './app/hello.component';

// import { enableProdMode } from '@angular/core';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// import { AppModule } from './app/app.module';
// import { environment } from './environments/environment';

// if (environment.production) {
//   enableProdMode();
// }

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));

ɵrenderComponent(AppComponent);
ɵrenderComponent(TestComponent);
ɵrenderComponent(HelloComponent);
