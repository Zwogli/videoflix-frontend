import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './features/landing-page/components/landing-page/landing-page.component';
import { HomePageComponent } from './features/home-page/components/home-page/home-page.component';

import { LoginPageComponent } from './features/login-page/components/login-page/login-page.component';
import { LoginHelpPageComponent } from './features/loginHelp-page/components/login-help-page/login-help-page.component';
import { ImpressComponent } from './features/impress/components/impress/impress.component';
import { PrivacyPolicyComponent } from './features/privacy-policy/components/privacy-policy/privacy-policy.component';
import { RegisterPageComponent } from './features/register-page/components/register-page/register-page.component';
import { VerificationPageComponent } from './features/verification-page/components/verification-page/verification-page.component';
import { ResetPasswordComponent } from './features/pages/reset-password/reset-password.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent }, // Standardroute zur Landing-Page
  { path: 'login', component: LoginPageComponent },
  { path: 'loginHelp', component: LoginHelpPageComponent },
  { path: 'register', component: RegisterPageComponent },
  {
    path: 'verification/:user_id/:token',
    component: VerificationPageComponent,
  },
  { path: 'reset-password/:user_id/:token', component: ResetPasswordComponent },
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
