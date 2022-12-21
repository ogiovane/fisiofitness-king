import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../core/layout.service';
import {UserAuthService} from "../../../../_services/user-auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  toolbarButtonMarginClass = 'ms-1 ms-lg-3';
  toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px';
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px';
  toolbarButtonIconSizeClass = 'svg-icon-1';
  headerLeft: string = 'menu';

  constructor(private layout: LayoutService, private userAuth: UserAuthService, private router: Router) {}

  ngOnInit(): void {
    this.headerLeft = this.layout.getProp('header.left') as string;
  }

  logout() {
    this.userAuth.clear();
    this.router.navigate(['/auth/login']);
  }
}
