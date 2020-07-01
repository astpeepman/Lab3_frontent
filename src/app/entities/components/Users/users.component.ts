import {Component, Inject, OnInit} from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import {User} from '../../interfaces/users.interface'
import {UserService} from '../../services/users.service'


@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})

export class UserComponent implements OnInit  {

    public UsersList: User[];
    public nameinput: string;
    public Phone: string;
    public paid: boolean;
    public errorphone:string;
    public searchId:string;
    public onlypaid:boolean;
    public paidOrall:string;
    

    title = 'Users Component';

    constructor(private UserService: UserService, private activatedRoute: ActivatedRoute, 
        private _router: Router){
    }

    ngOnInit():void {
        this.nameinput='';
        this.Phone='';
        this.paid=false;
        this.errorphone='';
        this.searchId='';
        //this.onlypaid=false;


        if(!this.onlypaid) {
            this.paidOrall='/Users/all';
        }
        else {
            this.paidOrall='/Users/paid';
        }
        this._router.navigate([this.paidOrall]);
    }

    
    SetPaid() {
        this.paid=!this.paid;
    }

    public addUser():void {
        if (!this.UserService.CheckRights()) {
            return;
        }
        this.UserService.setUsers({Name: this.nameinput, phone: this.Phone, paid: this.paid})
        
    }

    public checkphone():boolean{
        if(this.Phone.length!=12) {
            return false;
        }
        else {
            return true;
        }
    }

    ErroePhone(){
        this.errorphone="*Invalid number format";
    }

    public SetClick():void {
        this.UserService.User$.subscribe((u:User[])=> this.UsersList = u);
        this.UserService.getUsers();

        this.UsersList.forEach(element=>{
            if (this.searchId==element.id.toString()){
                this._router.navigate(['/Users/'+this.searchId]);
            }
        })
        this.errorphone='*Not found this id';
        
        this.UsersList.length=0;
    }

    public onsavePaidChanged(value:boolean){
        this.onlypaid = value;

        if(!this.onlypaid) {
            this.paidOrall='/Users/all';
           
        }
        else {
            this.paidOrall='/Users/paid';
        }
        this._router.navigate([this.paidOrall]);
    }

  

}

