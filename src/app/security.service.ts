import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(
    private http: HttpClient
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

  public login(username: string, password: string){
      console.log(username, password)
      // let options = new RequestOptions({ headers: headers, withCredentials: true });
      this.http
        .post("http://localhost:8080/security/login", {
          username: username,
          password: password
        })
        .subscribe(data => {
          console.log(data)
        })
  }
}
