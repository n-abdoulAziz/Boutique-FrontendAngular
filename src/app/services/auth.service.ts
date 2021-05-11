import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;
  userId:string;
  isAuth$=new BehaviorSubject<boolean>(false);

  constructor(private http:HttpClient,
              private  api=environment.api ) {
                this.initAuth();
              }

initAuth(){
  if(typeof localStorage!=='undefined'){
    const data=JSON.parse(localStorage.getItem('auth'));
    if(data){
      if(data.token && data.userId){
        this.token=data.token;
        this.userId=data.userId;
        this.isAuth$.next(true);
      }
    }
  }
}
  signup(email:string,password:string){
    return new Promise((resolve,reject)=>{
      this.http.post(this.api+'/users/signup',{email:email,password:password}).subscribe(
        (signupData:{status:number,message:string})=>{
          if(signupData.status==201){
            //authentifier l'utilisateur
            this.sgnin(email,password)
            .then(()=>{
              console.log(signupData);
              resolve(true);
            })
            .catch((err)=>{
              reject(err);
            })


          }
          else{
            reject(signupData.message)
          }

        },
        (err)=>{
          reject("erreur :"+err)
        }
        )
    })
  }
  sgnin(email:string,password:string){
    return new Promise((resolve,reject)=>{
      this.http.post(this.api+'/users/login',{email:email,password:password}).subscribe(
        (authData:{token:string,userId:string})=>{
          this.token=authData.token;
          this.userId=authData.userId;
          this.isAuth$.next(true);
          if(typeof localStorage !=="undefined"){
            localStorage.setItem('auth',JSON.stringify(authData));
          }
          console.log(authData);
          resolve(true);
        },
        (err)=>{
          reject("erreur :"+err)
        })
    });

  }
  logout(){
    this.isAuth$.next(false);
    this.userId=null;
    this.token=null;

  if(typeof localStorage!=='undefined'){
    localStorage.setItem('auth',null);
  }
  }
}
