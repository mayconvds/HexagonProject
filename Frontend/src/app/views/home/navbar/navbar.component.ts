import { Component } from '@angular/core';
import memo from "memo-decorator"
import {Router} from "@angular/router";



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
    constructor(private router: Router) {
    }

    hasToken(): boolean {
        let token = localStorage.getItem("token");
        return (!!token);
    }

    logout(): void {
        localStorage.removeItem("token");
        this.router.navigate(["/"]).then()
    }
}
