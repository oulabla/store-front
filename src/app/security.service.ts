import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from 'redux';
import { AppState } from './app.reducer';
import { AppStore } from './app.store';
import { setCurrentUser } from './user/user.actions';
import { GuestUser, User } from './user/user.model';



@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(
    private http: HttpClient,
    @Inject(AppStore) private store: Store<AppState>,
    private router: Router
  ) { 

  }

  public test(): void{
    console.log("Test invoked")
    this.http
    .get("http://localhost:8080/security/test")
    .subscribe(data => {
      console.log(data)
    })

  }

  public logout(){
    this.http
    .post("http://localhost:8080/security/logout", {})
    .subscribe((data: any) => {
      this.store.dispatch(setCurrentUser(GuestUser))
      if(data.success == true){
        this.router.navigate(["/home"])
      }
      console.log(data);
    })
  }

  public login(username: string, password: string){
      // console.log(username, password)
      // let options = new RequestOptions({ headers: headers, withCredentials: true });
      this.http
        .post("http://localhost:8080/security/login", {
          username: username,
          password: password
        })
        .subscribe((data: any) => {
          let phones :string[] = [];
          data.data.phones.forEach((phone: any) => {
            phones.push(phone.phone)
          });
          let roles :string[] = [];
          data.data.roles.forEach((role: any) => {
            roles.push(role.name)
          });

          let user : User = {
            id: data.data.id ,
            name: data.data.name,
            phones: phones,
            roles: roles,
          }

          this.store.dispatch(setCurrentUser(user))

          if(data.success == true){
            this.router.navigate(["/home"])
          }

          console.log(data)
        })
  }
}
