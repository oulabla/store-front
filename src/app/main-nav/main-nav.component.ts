import { Component, Inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from 'redux';
import { AppState } from '../app.reducer';
import { AppStore, appStoreProviders } from '../app.store';
import { setRoute } from '../route/route.actions';
import { getCurrentRoute } from '../route/router.reducer';
import { SecurityService } from '../security.service';
import { getCurrentUser } from '../user/users.reducer';

class MenuLink{
  
  constructor(
    public name: string = '',
    public path: string = '',
    public isActive: boolean = false,
  ){}
};

const guestLinks: Array<MenuLink> = [
  new MenuLink('Home', '/home', true),
  new MenuLink('Login', '/login'),
];

const userLinks: Array<MenuLink> = [
  new MenuLink('Home', '/home', true),

];


@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})

export class MainNavComponent implements OnInit {
  @Input() title: string = 'main-menu';
  userName: string = "";
  hasUser: boolean = false;

  guestLinks: Array<MenuLink> = [
    new MenuLink('Home', '/home', true),
    new MenuLink('Login', '/login'),
  ];
  
  userLinks: Array<MenuLink> = [
    new MenuLink('Home', '/home', true),
  
  ];

  links: Array<MenuLink>;

  constructor(
    @Inject(AppStore) private store: Store<AppState>,
    private router: Router,
    @Inject(SecurityService) private security: SecurityService,
  ) { 
    this.links = guestLinks;
    store.subscribe(() => {
      this.updateState();
    })
  }

  updateState(){
    const state: AppState = this.store.getState();
    const activeRoute = getCurrentRoute(state);
    const user  = getCurrentUser(state);
    this.hasUser = user.id > 0;
    if(this.hasUser){
      this.links = this.userLinks;
    } else {
      this.links = this.guestLinks;
    }
    this.userName = user.name;
    this.links.forEach((link) => {
      if(link.path == activeRoute){
        link.isActive = true;
      } else {
        link.isActive = false;
      }
    })
  }

  clicked(selectedPath: string){
    this.links.forEach((link) => {
      if(link.path == selectedPath){
        this.store.dispatch(setRoute(link.path))
      } 
    })
  }

  logoutClicked(){
    
    this.security.logout();
  }

  ngOnInit(): void {
  }

}
