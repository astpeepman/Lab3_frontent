import {Component, Inject, OnInit} from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../interfaces/users.interface'
import {UserService} from '../../../services/users.service'


@Component({
    selector: 'app-allusers',
    templateUrl: './allusers.component.html',
    styleUrls: ['./allusers.component.css']
})

export class AllUserComponent implements OnInit  {

    public UsersList: User[];
    public onlypaid:boolean;
    

    constructor(private UserService: UserService, private activatedRoute: ActivatedRoute, 
        private _router: Router){
    }

    ngOnInit():void {
        this.UserService.User$.subscribe((u:User[])=> this.UsersList = u);
        this.UserService.getUsers();
    }
}

