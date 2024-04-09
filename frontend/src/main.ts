import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { registerLicense } from '@syncfusion/ej2-base';

// Set up for auth0 for log in
registerLicense('Ngo9BigBOggjHTQxAR8/V1NAaF1cVGhIfEx1RHxQdld5ZFRHallYTnNWUj0eQnxTdEFjWn9YcXBVT2VZUEZ0Xg==');

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
