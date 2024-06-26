import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './features/landing-page/components/landing-page/landing-page.component';
import { HomePageComponent } from './features/home-page/components/home-page/home-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },  // Standardroute zur Landing-Page
  { path: 'home', component: HomePageComponent }, // Route zur Home-Page
  { path: '**', redirectTo: '' }  // Fallback route, wenn keine Route übereinstimmt
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
