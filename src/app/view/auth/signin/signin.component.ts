import {  Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Erros } from 'src/app/models/errors';
import { AuthService } from 'src/app/services/auth.service';
import { CurrentuserdataService } from 'src/app/services/currentuserdata.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit,OnDestroy {
  public errors: any = Erros;
  private onDestroyUnSubscribe = new Subject<void>();
  public show:boolean = true;
  public isValid:boolean = false;
  public redirct:string=''
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private currentUser: CurrentuserdataService,
    private route: ActivatedRoute
  ) { }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['',[Validators.required],
    ],
  });
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.redirct = (params['redirct'])?params['redirct']:'/user/profile';
     });

  }
  toggleShow() {
    this.show = !this.show;
  }


  login(){
    this.isValid = true;
    if (this.loginForm.valid){
      this.isValid = false;
      this.authService.signin(this.loginForm.value).pipe(takeUntil(this.onDestroyUnSubscribe)).subscribe(
        (result:any) => {
              Swal.fire({
                icon: 'success',
                title: 'Success...',
                text: result['message'],
              });
              this.currentUser.set_user_data(result)
              console.log(this.redirct)
                this.router.navigate([this.redirct])

        },
        (error:any) => {
          Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: error['message'],
          });
        }
      )
    }
  }

  resendOtp(){
    console.log('first')
  }
  ngOnDestroy() {

    this.onDestroyUnSubscribe.next();
    this.onDestroyUnSubscribe.complete();
  }

}
