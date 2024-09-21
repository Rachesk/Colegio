import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import {UserService} from '../user.service';

@Component({
  selector: 'app-menu-home',
  templateUrl: './menu-home.page.html',
  styleUrls: ['./menu-home.page.scss'],
})
export class MenuHomePage implements OnInit {
  username: string = '';
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.username = this.userService.getUsername();
  }

}
