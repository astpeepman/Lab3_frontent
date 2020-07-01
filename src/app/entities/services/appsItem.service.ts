import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {AppItem} from '../interfaces/apps.interface'

@Injectable()
export class AppsItemService {
    private appItem$$: BehaviorSubject<AppItem[]> = new BehaviorSubject([]);
    public appItem$: Observable<AppItem[]> = this.appItem$$.asObservable();

    //private OneAppItem$$:BehaviorSubject<AppItem>=new BehaviorSubject();


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
    
    public getApps():void {
        this.api.get('appsItems')
        .toPromise()
        .then((app: AppItem[])=> {
            this.appItem$$.next(app)
        });
    }

    public getUsersOfApps(id):Observable<string[]> {
        return this.api.get('appsItems/UsersFromApps/'+id);
        
    }

    public setApps(item): void {
        this.api.post('appsItems', item).toPromise().then((app: AppItem[])=> {
            this.appItem$$.next(app);
            //console.log(app);
        });
    }

    public getOneApp(id:string):Observable<AppItem> {
        return this.api.get("appsItems"+id);
    }

}