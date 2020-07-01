import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
  })

  export class HeaderComponent implements OnInit {

    public title= "AppData"
    
    @Input()
    public sidenavDrawer!: MatDrawer;
  
    constructor() { }
  
    ngOnInit(): void {
    }
  
    toggleSidenav(): void {
      this.sidenavDrawer.toggle();
    }

    public LogIn() {
      return localStorage.getItem('login') ? `You are logged in as a ${localStorage.getItem('login')}` : 'Login';
    }
  }