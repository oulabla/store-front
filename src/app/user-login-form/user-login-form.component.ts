import { 
  Component, 
  OnInit 
} from '@angular/core';

import { FormGroup, FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { SecurityService } from '../security.service';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.css']
})
export class UserLoginFormComponent implements OnInit {
  // loginForm: FormGroup;

  constructor(
    private security: SecurityService
  ) { 
    // this.loginForm = 
  }

  onSubmit(form: any): void {
    this.security.login(form.username, form.password)
    // console.log('u su ', form )
  }

  ngOnInit(): void {
  }

}
