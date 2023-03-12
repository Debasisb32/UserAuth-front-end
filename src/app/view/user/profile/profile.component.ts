import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CurrentuserdataService } from 'src/app/services/currentuserdata.service';
import { ProfileService } from 'src/app/services/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser:any
  private onDestroyUnSubscribe = new Subject<void>();
  sending:boolean=false
  constructor(
    private currentuserdata: CurrentuserdataService,
    private profileService: ProfileService,
  ) { }

  ngOnInit(): void {
     this.currentUser = this.currentuserdata.get_current_user();
  }
  reSendEmail(){
    this.sending=true
    this.profileService.reSendEmail().
    pipe(takeUntil(this.onDestroyUnSubscribe)).
    subscribe(
      result =>{
        this.sending=false
        Swal.fire({
          icon: 'success',
          title: 'Success...',
          text: result['message'],
        })
      },
      error=>{
        this.sending=false
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: error['error']['message'],
        })
      }
    )
  }
}
