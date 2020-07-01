import {Component, Inject, OnInit} from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../interfaces/users.interface'
import {UserService} from '../../../services/users.service'


@Component({
    selector: 'app-paidusers',
    templateUrl: './paidusers.component.html',
    styleUrls: ['./paidusers.component.css']
})

export class PaidUserComponent implements OnInit  {

    public UsersList: User[];
    public onlypaid:boolean;
    

    constructor(private UserService: UserService, private activatedRoute: ActivatedRoute, 
        private _router: Router){
    }

    ngOnInit():void {
        this.UserService.User$.subscribe((u:User[])=> this.UsersList = u);
        this.UserService.getPaidUsers();
        //this.activatedRoute.url.subscribe(data=>{this.UserService.getPaidUsers().subscribe(((res:User[])=>{this.UsersList=res})});
        //console.log(this.UsersList);
    }
}

