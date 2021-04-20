import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/interfaces/modele-interface';
import { AdminService } from 'src/providers/admin.service';
import { LocalStorageService } from 'src/providers/localstorage.service';
import { ToolsService } from 'src/providers/tools.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  admin:Admin;
  message="";
  constructor(
      private render: Renderer2,
      private adminService:AdminService,
      private router:Router,
      private storage:LocalStorageService,
      private tools:ToolsService
  )
  {
    this.admin={} as Admin;
  }

  ngOnInit(): void {

  }

  login(){
    const onSucces= (response : any) =>{
      console.log(response);
      if(response["status"]=="succes"){
        this.storage.setToken(response["data"]);
        this.router.navigateByUrl("/home");
      }else{
        this.message=response["status"];
      }
    }
    const onError= (response :any) =>{
        this.message="Server not Found";
    }
    try {
      this.adminService.setHttpLogin(this.admin).subscribe(onSucces,onError);
    } catch (error) {
      this.message=error;
    }
  }

}
