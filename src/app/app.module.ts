import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
