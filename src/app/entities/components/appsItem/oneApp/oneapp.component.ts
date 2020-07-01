import {Component, Inject, OnInit} from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import {AppItem} from '../../../interfaces/apps.interface'
import {AppsItemService} from '../../../services/appsItem.service'


@Component({
    selector: 'app-oneapp',
    templateUrl: './oneapp.component.html',
    styleUrls: ['./oneapp.component.css']
})

export class oneappComponent implements OnInit {

    public oneapp: AppItem;
    public id:string;
    public AppUsers: string[];

    constructor(private AppsService: AppsItemService, private activatedRoute: ActivatedRoute, 
         ){
    }
    
    ngOnInit():void {
        //console.log(123);
        this.activatedRoute.url.subscribe(data=>{
            this.AppsService.getOneApp('/'+data[1].path)
            .subscribe(res=>{this.oneapp=res; console.log(this.oneapp)});
        
            this.AppsService.getUsersOfApps(data[1].path).subscribe(res=>{this.AppUsers=res});
        });
        //console.log(this.oneapp);
    }

   

}