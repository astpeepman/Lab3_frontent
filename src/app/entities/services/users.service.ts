import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../interfaces/users.interface'

@Injectable()
export class UserService {
    private User$$: BehaviorSubject<User[]> = new BehaviorSubject([]);
    public User$: Observable<User[]> = this.User$$.asObservable();

    private UserApps$$: BehaviorSubject<string[]> = new BehaviorSubject([]);
    public UserApps$: Observable<string[]> = this.UserApps$$.asObservable();

    constructor(public api: ApiService) {
    }

    public CheckRights(): boolean {
        if (!(localStorage.getItem('login') === 'admin')) {
          alert('Для этого действия вы должны войти как admin');
          return false;
        }
        else {
          return true;
        }
    }

    public getUsers():void {
        this.api.get('Users')
        .toPromise()
        .then((u: User[])=> {
            this.User$$.next(u)
        });
    }

    public getAppsOfUser(id):Observable<string[]> {
        return this.api.get('Users/appsFromUser/'+id);
        
    }

    public setUsers(item): void {
        this.api.post('Users', item).toPromise().then((u: User[])=> {
            this.User$$.next(u);
            //console.log(u);
        });
    }

    public getOneUser(id:string):Observable<User> {
        return this.api.get("Users/"+id);
    }

    public deleteUser(id):void {
        //console.log("Users/"+id);
        this.api.delete('Users/'+id);
    }

    

    public getPaidUsers():void {
        this.api.get('Users/paid')
        .toPromise()
        .then((u: User[])=> {
            this.User$$.next(u)
        });
    }

    public setAppforUser(item):Observable<string> {
        //console.log(item);
        return this.api.setAppforUser('Users/addApp', item);
    }

}
