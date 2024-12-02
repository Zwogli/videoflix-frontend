// Imports:
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {
  HttpClientModule,
  HttpClientXsrfModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TokenInterceptor } from './shared/services/interceptors/token.interceptor';
// Material design
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// Declarations:
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { LandingComponent } from './features/pages/auth/landing/landing.component';
import { HomeComponent } from './features/pages/home/home.component';
import { BackgroundImgComponent } from './shared/components/background-img/background-img.component';
import { CardLandingComponent } from './features/cards/landing/card-landing.component';
import { LoginComponent } from './features/pages/auth/login/login.component';
import { CardLoginComponent } from './features/cards/login/card-login.component';
import { ImpressComponent } from './features/pages/legals/impress/impress.component';
import { PrivacyPolicyComponent } from './features/pages/legals/privacy-policy/privacy-policy.component';
import { CardRegisterComponent } from './features/cards/register/card-register.component';
import { RegisterComponent } from './features/pages/auth/register/register.component';
import { LoginHelpComponent } from './features/pages/auth/login-help-page/login-help.component';
import { CardLoginHelpComponent } from './features/cards/login-help/card-login-help.component';
import { DialogComponent } from './shared/components/dialog/dialog/dialog.component';
import { VerificationComponent } from './features/pages/auth/verification/verification.component';
import { ResetPasswordComponent } from './features/pages/auth/reset-password/reset-password.component';
import { FeaturedVideoComponent } from './features/components/featured-video/featured-video.component';
import { GlobalVideoGaleryComponent } from './features/components/global-video-galery/global-video-galery.component';
import { LocalVideoGaleryComponent } from './features/components/local-video-galery/local-video-galery.component';
import { VideoOverlayComponent } from './features/components/video-overlay/video-overlay.component';
import { UploadVideoComponent } from './features/pages/upload-video/upload-video.component';
import { UploadVideoCardComponent } from './features/cards/upload-video-card/upload-video-card.component';
import { ConfirmDeleteDialogComponent } from './shared/components/dialog/confirm-delete-dialog/confirm-delete-dialog.component';
// import { LocalVideoGaleryTestComponent } from './features/components/local-video-galery-test/local-video-galery-test.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LandingComponent,
    HomeComponent,
    BackgroundImgComponent,
    CardLandingComponent,
    LoginComponent,
    CardLoginComponent,
    ImpressComponent,
    PrivacyPolicyComponent,
    CardRegisterComponent,
    RegisterComponent,
    LoginHelpComponent,
    CardLoginHelpComponent,
    DialogComponent,
    VerificationComponent,
    ResetPasswordComponent,
    FeaturedVideoComponent,
    GlobalVideoGaleryComponent,
    LocalVideoGaleryComponent,
    VideoOverlayComponent,
    UploadVideoComponent,
    UploadVideoCardComponent,
    ConfirmDeleteDialogComponent,
    // LocalVideoGaleryTestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'csrftoken',
      headerName: 'X-CSRFToken',
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
