import {Component, Inject, OnInit} from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../interfaces/users.interface'
import {UserService} from '../../../services/users.service'


@Component({
    selector: 'app-oneuser',
    templateUrl: './oneuser.component.html',
    styleUrls: ['./oneuser.component.css']
})

export class oneuserComponent implements OnInit {

    public oneuser: User;
    public id:string;
    public appid:string;
    public answer:string;
    public UserApps: string[];

    constructor(private UserService: UserService, private activatedRoute: ActivatedRoute, 
        private _router: Router
         ){
    }
    
    ngOnInit():void {
        this.answer='';
        //console.log(123);
        this.activatedRoute.url.subscribe(data=>{
            this.UserService.getOneUser(data[1].path)
            .subscribe(res=>{this.oneuser=res});

            this.UserService.getAppsOfUser(data[1].path).subscribe(res=>{this.UserApps=res});
    });
        //console.log(this.oneuser);


    }

    public addAppforUser():void {
        if (!this.UserService.CheckRights()) {
            return;
        }
        this.UserService.setAppforUser([this.oneuser.id,parseInt(this.appid)]).subscribe(res=>{this.answer=res});
        this.UserService.getAppsOfUser(this.oneuser.id).subscribe(res=>{this.UserApps=res});
    }

    public DeleteUser():void {
        if (!this.UserService.CheckRights()) {
            return;
        }
        this.UserService.deleteUser(this.oneuser.id);
        this._router.navigate(['/Users/all']);
    }



}