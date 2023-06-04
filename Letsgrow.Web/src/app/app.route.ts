import { Routes } from "@angular/router";

export const appRoutes: Routes = [

  {
    path: 'letsgrow',
    loadChildren: () => import('./home/home.module').then(m=> m.HomeModule)

  },
  {
    path: 'gallery',
    loadChildren: () => import('./gallery/gallery.module').then(m=> m.GalleryModule)

  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m=> m.LoginModule)

  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m=> m.RegisterModule)

  }
];
