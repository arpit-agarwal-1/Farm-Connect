import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { AddFeedComponent } from './supplierComponents/add-feed/add-feed.component';
import { ViewFeedComponent } from './supplierComponents/view-feed/view-feed.component';
import { ViewRequestComponent } from './supplierComponents/view-request/view-request.component';
import { MyRequestComponent } from './ownerComponents/my-request/my-request.component';
import { OwnerViewfeedComponent } from './ownerComponents/owner-viewfeed/owner-viewfeed.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ViewLivestockComponent } from './ownerComponents/view-livestock/view-livestock.component';
import { LivestockFormComponent } from './ownerComponents/livestock-form/livestock-form.component';
import { authGuard } from './services/auth.guard';
import { roleGuard } from './services/role.guard';
import { LearnMoreComponent } from './components/learn-more/learn-more.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },

  { path: 'home', component: HomePageComponent},
  {path:'learn-more',component:LearnMoreComponent},


  { path: 'add-feed', component: AddFeedComponent, canActivate: [authGuard,roleGuard], data: { role: 'supplier' } },
  { path: 'edit-feed/:id', component: AddFeedComponent, canActivate: [authGuard,roleGuard], data: { role: 'supplier' } },
  { path: 'view-feed', component: ViewFeedComponent, canActivate: [authGuard,roleGuard], data: { role: 'supplier' } },
  { path: 'view-request', component: ViewRequestComponent, canActivate: [authGuard,roleGuard], data: { role: 'supplier' } },


  { path: 'view-livestock', component: ViewLivestockComponent, canActivate: [authGuard,roleGuard], data: { role: 'owner' } },
  { path: 'my-request', component: MyRequestComponent, canActivate: [authGuard,roleGuard], data: { role: 'owner' } },
  { path: 'owner-viewfeed', component: OwnerViewfeedComponent, canActivate: [authGuard,roleGuard], data: { role: 'owner' } },
  { path: 'add-livestock', component: LivestockFormComponent, canActivate: [authGuard,roleGuard], data: { role: 'owner' } },
  { path: 'edit-livestock/:id', component: LivestockFormComponent, canActivate: [authGuard,roleGuard], data: { role: 'owner' } },

  { path: '**', component: ErrorPageComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
