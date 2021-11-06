import { Inject, Injectable, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { HttpClientModule, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { APP_BASE_HREF, HashLocationStrategy, LocationStrategy } from '@angular/common';
import rootReducer, { AppState } from './app.reducer';
import { AppStore, appStoreProviders } from './app.store';
import { Store } from 'redux';
import { GuestUser } from './user/user.model';



const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },

  { path: 'login', component: UserLoginFormComponent },
]

@Injectable()
export class CustomInterceptor implements HttpInterceptor { 
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
        request = request.clone({
            withCredentials: true
        });
    
        return next.handle(request);
    }
}

@NgModule({
  declarations: [
    AppComponent,
    UserLoginFormComponent,
    HomePageComponent,
    ProfilePageComponent,
    MainNavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: APP_BASE_HREF, useValue: '/' },
    appStoreProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

  constructor( 
  ) {
  }

}
