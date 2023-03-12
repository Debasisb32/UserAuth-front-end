import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Erros } from 'src/app/models/errors';
import { AuthService } from 'src/app/services/auth.service';
import { CurrentuserdataService } from 'src/app/services/currentuserdata.service';
import { PasswordValidator } from 'src/app/services/password.validator.service';
import Swal from 'sweetalert2';
import swal from 'sweetalert2';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit,OnDestroy {
  public errors: any = Erros;
  public isValid:boolean = false;
  public show:boolean = false;
  private onDestroyUnSubscribe = new Subject<void>();
  private previousUrl = "";
  public showConfirm:boolean = false;
  maxDate:string
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private currentUser:CurrentuserdataService,

  ) {}

  signupForm = this.fb.group({
    fname: ['', Validators.required],
    lname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    dob: ['', [Validators.required]],
    password: ['',[Validators.required,Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),],    ],
    passwordc: ['',[Validators.required,],]
  },{ validator: PasswordValidator('password', 'passwordc') });

  ngOnInit(): void {
    this.maxDate= new Date().toISOString().split('T')[0]
  }


  toggleShow() {
    this.show = !this.show;
  }
  confirmtoggleShow(){
    this.showConfirm = !this.showConfirm;
  }
  signup() {
    this.isValid = true;
    if (this.signupForm.valid) {
      this.isValid = false;
      delete this.signupForm.value['passwordc']
      this.authService.signUp(this.signupForm.value)
        .pipe(takeUntil(this.onDestroyUnSubscribe))
        .subscribe(
          (result: any) => {
              Swal.fire({
                icon: 'success',
                title: 'Success...',
                text: result['message'],
                timer: 2000,
              }).then(()=>{
                this.router.navigate(['/auth/signin'])
              });
          },
          (error: any) => {

              Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: error['message'],
                timer: 2000,
              });

          }
        );
    }
  }





  generatePassword(){
    let numberChars = "0123456789";
    let specialChars = "@#$%^&*!";
    let upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let lowerChars = "abcdefghijklmnopqrstuvwxyz";
    let allChars = upperChars + numberChars + lowerChars+specialChars;
    let randPasswordArray = Array(8);
    randPasswordArray[0] = upperChars;
    randPasswordArray[1] = numberChars;
    randPasswordArray[2] = specialChars;
    randPasswordArray[3] = lowerChars;
    randPasswordArray = randPasswordArray.fill(allChars, 4);
    let password =  this.shuffleArray(randPasswordArray.map(function(x) { return x[Math.floor(Math.random() * x.length)] })).join('');
    this.signupForm.patchValue({password:password,passwordc:password});
  }
  shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  ngOnDestroy() {
    this.onDestroyUnSubscribe.next();
    this.onDestroyUnSubscribe.complete();
  }

}


