import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './features/pages/auth/landing/landing.component';
import { HomeComponent } from './features/pages/home/home.component';

import { LoginComponent } from './features/pages/auth/login/login.component';
import { LoginHelpComponent } from './features/pages/auth/login-help-page/login-help.component';
import { ImpressComponent } from './features/pages/legals/impress/impress.component';
import { PrivacyPolicyComponent } from './features/pages/legals/privacy-policy/privacy-policy.component';
import { RegisterComponent } from './features/pages/auth/register/register.component';
import { VerificationComponent } from './features/pages/auth/verification/verification.component';
import { ResetPasswordComponent } from './features/pages/auth/reset-password/reset-password.component';

const routes: Routes = [
  { path: '', component: LandingComponent }, // Standardroute zur Landing-Page
  { path: 'login', component: LoginComponent },
  { path: 'loginHelp', component: LoginHelpComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'verification/:user_id/:token',
    component: VerificationComponent,
  },
  { path: 'reset-password/:user_id/:token', component: ResetPasswordComponent },
  { path: 'home', component: HomeComponent }, // Route zur Home-Page
  { path: 'legal/impress', component: ImpressComponent },
  { path: 'legal/privacy', component: PrivacyPolicyComponent },
  { path: '**', redirectTo: '' }, // Fallback route, wenn keine Route übereinstimmt
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
