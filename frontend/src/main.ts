import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NHaF1cWWhIfEx3THxbf1xzZFJMYFRbRHZPMyBoS35RdURhWH1ed3RdRmBbV0Bx');

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
