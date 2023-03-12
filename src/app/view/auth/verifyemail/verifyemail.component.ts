import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CurrentuserdataService } from 'src/app/services/currentuserdata.service';
import { ProfileService } from 'src/app/services/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verifyemail',
  templateUrl: './verifyemail.component.html',
  styleUrls: ['./verifyemail.component.css']
})
export class VerifyemailComponent implements OnInit {
  token:string=''
  private onDestroyUnSubscribe = new Subject<void>();
  constructor(
    private route: ActivatedRoute,
    private authService:AuthService,
    private router: Router,
    private profileService: ProfileService,
    private currentUser: CurrentuserdataService,
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
     this.token = params['token'];
     this.verifyEmail();
    });
  }
  verifyEmail(){
    this.authService.verifyEmail(this.token)
    .pipe(takeUntil(this.onDestroyUnSubscribe))
    .subscribe(
      (result: any) => {
        this.currentUser.set_user_data(result)
        this.router.navigate(['user/profile'])
      },
      error=>{

        if(error.status ==403){
          Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: error['error']['message'],
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Resend Link',
          }).then(data=>{
              if(data){
                  this.reSendEmail();
                  this.router.navigate(['user/profile'])
              }else{
                this.router.navigate(['user/profile'])
              }
          });
        }

      }
    )
  }
  reSendEmail(){
    this.profileService.reSendEmail().
    pipe(takeUntil(this.onDestroyUnSubscribe)).
    subscribe(
      result =>{
        this.router.navigate(['user/profile'])
      },
      error=>{
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: error['error']['message'],
        })
      }
    )
  }
}
