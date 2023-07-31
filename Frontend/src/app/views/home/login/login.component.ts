import {Component, OnInit} from '@angular/core';
import {Auth} from "../../../models/auth/auth";
import {AuthModel} from "../../../models/auth/auth-model";
import {UserResponse} from "../../../models/user/user-response";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
    auth: Auth = new Auth();
    response: UserResponse = new UserResponse();

    constructor(private authModel: AuthModel, private router: Router) {
    }

    async login(): Promise<void> {
        const response = await this.authModel.login(this.auth);
        if (response.status == "error") {
            this.response = response;
            return;
        }
        localStorage.setItem("token", response.message);
        this.router.navigate(["/usuarios"]).then();
    }

    ngOnInit(): void {
    }


}
