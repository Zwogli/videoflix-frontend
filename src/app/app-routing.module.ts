import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './features/landing-page/components/landing-page/landing-page.component';
import { HomePageComponent } from './features/home-page/components/home-page/home-page.component';

import { LoginPageComponent } from './features/login-page/components/login-page/login-page.component';
import { ImpressComponent } from './features/impress/components/impress/impress.component';
import { PrivacyPolicyComponent } from './features/privacy-policy/components/privacy-policy/privacy-policy.component';
import { RegisterPageComponent } from './features/register-page/components/register-page/register-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent }, // Standardroute zur Landing-Page
  { path: 'login', component: LoginPageComponent },
  { path: 'signin', component: RegisterPageComponent },
  { path: 'home', component: HomePageComponent }, // Route zur Home-Page
  { path: 'legal/impress', component: ImpressComponent },
  { path: 'legal/privacy', component: PrivacyPolicyComponent },
  { path: '**', redirectTo: '' }, // Fallback route, wenn keine Route übereinstimmt
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
