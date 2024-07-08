import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { LandingPageComponent } from './features/landing-page/components/landing-page/landing-page.component';
import { HomePageComponent } from './features/home-page/components/home-page/home-page.component';
import { BackgroundImgComponent } from './shared/components/background-img/background-img.component';
import { CardLandingComponent } from './features/card-landing/components/card-landing/card-landing.component';
import { LoginPageComponent } from './features/login-page/components/login-page/login-page.component';
import { CardLoginComponent } from './features/card-login/components/card-login/card-login.component';
import { ImpressComponent } from './features/impress/components/impress/impress.component';
import { PrivacyPolicyComponent } from './features/privacy-policy/components/privacy-policy/privacy-policy.component';
import { CardRegisterComponent } from './features/card-register/components/card-register/card-register.component';
import { RegisterPageComponent } from './features/register-page/components/register-page/register-page.component';
import { LoginHelpPageComponent } from './features/loginHelp-page/components/login-help-page/login-help-page.component';
import { CardLoginHelpComponent } from './features/card-loginHelp/components/card-login-help/card-login-help.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LandingPageComponent,
    HomePageComponent,
    BackgroundImgComponent,
    CardLandingComponent,
    LoginPageComponent,
    CardLoginComponent,
    ImpressComponent,
    PrivacyPolicyComponent,
    CardRegisterComponent,
    RegisterPageComponent,
    LoginHelpPageComponent,
    CardLoginHelpComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
