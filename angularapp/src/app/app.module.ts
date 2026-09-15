import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthguardComponent } from './components/authguard/authguard.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AddFeedComponent } from './supplierComponents/add-feed/add-feed.component';
import { SupplierNavbarComponent } from './supplierComponents/supplier-navbar/supplier-navbar.component';
import { ViewFeedComponent } from './supplierComponents/view-feed/view-feed.component';
import { ViewRequestComponent } from './supplierComponents/view-request/view-request.component';
import { LivestockFormComponent } from './ownerComponents/livestock-form/livestock-form.component';
import { MyRequestComponent } from './ownerComponents/my-request/my-request.component';
import { OwnerNavbarComponent } from './ownerComponents/owner-navbar/owner-navbar.component';
import { OwnerViewfeedComponent } from './ownerComponents/owner-viewfeed/owner-viewfeed.component';
import { ViewLivestockComponent } from './ownerComponents/view-livestock/view-livestock.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';
import { AuthInterceptor } from './services/auth.interceptor';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LearnMoreComponent } from './components/learn-more/learn-more.component';




@NgModule({
  declarations: [
    AppComponent,
    AuthguardComponent,
    ErrorPageComponent,
    ForgotPasswordComponent,
    HomePageComponent,
    LoginComponent,
    SignupComponent,
    AddFeedComponent,
    SupplierNavbarComponent,
    ViewFeedComponent,
    ViewRequestComponent,
    LivestockFormComponent,
    MyRequestComponent,
    OwnerNavbarComponent,
    OwnerViewfeedComponent,
    ViewLivestockComponent,
    NavbarComponent,
    FooterComponent,
    LearnMoreComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


