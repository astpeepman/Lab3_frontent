import {Component, Inject, OnInit} from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import {AppItem} from '../../interfaces/apps.interface'
import {AppsItemService} from '../../services/appsItem.service'

@Component({
    selector: 'app-appsItem',
    templateUrl: './appsItem.component.html',
    styleUrls: ['./appsItem.component.css']
})

export class AppsItemComponent implements OnInit {

    public AppsList: AppItem[];
    public nameinput: string;
    public autorinput: string;
    public freeinput: boolean;
    public searchId:string;
    public error:string;

    title = 'Apps Component';


    constructor(private AppsService: AppsItemService, private activatedRoute: ActivatedRoute, private _router: Router
        ){
        
    }

    
    public SetClick():void {
        this.AppsService.appItem$.subscribe((a:AppItem[])=> this.AppsList = a);
        this.AppsService.getApps();

        this.AppsList.forEach(element=>{
            if (this.searchId==element.id.toString()){
                this._router.navigate(['/AppsItems/'+this.searchId]);
            }
        })
        this.error='*Not found this id';
        
        this.AppsList.length=0;
        
    }
    
    ngOnInit():void {
        this.AppsService.appItem$.subscribe((a:AppItem[])=> this.AppsList = a);
        this.AppsService.getApps();
        this.nameinput='';
        this.autorinput='';
        this.freeinput=false; 
        this.error='';
    };

    SetFree(){
        this.freeinput=!this.freeinput;
    }

    public addApp():void {
        if (!this.AppsService.CheckRights()) {
            return;
        }
        //console.log(this.nameinput);
        this.AppsService.setApps({Name: this.nameinput, Autor: this.autorinput, Free: this.freeinput});
    }




}

