import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { rejects } from 'assert';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm:FormGroup;
  errorMessage:string;
  loading:boolean;
  constructor(private fb:FormBuilder,
              private router:Router,
              private auth:AuthService) { }

  ngOnInit(): void {
    this.signupForm=this.fb.group({
      email:[null,[Validators.required,Validators.email]],
      password:[null,[Validators.required]]
    })
  }
  onSubmit(){
    this.loading=true;
    const email=this.signupForm.get('email').value;
    const password=this.signupForm.get('password').value;
    this.auth.signup(email,password)
    .then(()=>{
      this.loading=false;
      this.router.navigate(['/shop']);
    })
    .catch((err)=>{
      this.loading=false;
      this.errorMessage=err.Message})
  }

}
