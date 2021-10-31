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

  public login(username: string, password: string){
      console.log(username, password)

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
