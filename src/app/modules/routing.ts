import { Routes } from '@angular/router';

const Routing: Routes = [
  {
    path: 'generate-numbers',
    loadChildren: () =>
      import('./generate-numbers/generate-numbers.module').then((m) => m.GenerateNumbersModule)
  },
  {
    path: '',
    redirectTo: '/generate-numbers',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/generate-numbers',
  },
];

export { Routing };
