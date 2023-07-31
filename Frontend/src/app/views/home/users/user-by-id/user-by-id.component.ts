import {Component, OnInit} from '@angular/core';
import {Requests} from "../../../../requests";
import {UserModel} from "../../../../models/user/user-model";
import {User} from "../../../../models/user/user";
import {ActivatedRoute} from "@angular/router";
import {AjaxLoadService} from "../../../../services/ajax-load.service";
import {UserResponse} from "../../../../models/user/user-response";

@Component({
  selector: 'app-user-by-id',
  templateUrl: './user-by-id.component.html',
  styleUrls: ['./user-by-id.component.css']
})
export class UserByIdComponent implements OnInit{
    user: User = new User();
    userId: string | null = "";
    loaded: boolean = false;
    response: UserResponse = new UserResponse();

    constructor(private userModel: UserModel, private activateRoute: ActivatedRoute,
                private ajaxLoadService: AjaxLoadService) {
    }

    async loadUser(): Promise<void> {
        const userId = (this.userId ? parseInt(this.userId) : 0)
        this.ajaxLoadService.showLoading();
        const result = await this.userModel.getUserById(userId);
        this.loaded = true;
        this.ajaxLoadService.hideLoading();

        if (!result) {
            return;
        }
        this.user = result;
    }



    ngOnInit(): void {
        if (this.activateRoute.snapshot.paramMap.get("id")) {
            this.userId = (this.activateRoute.snapshot.paramMap.get("id") ? this.activateRoute.snapshot.paramMap.get("id") : "0");
        }
        this.loadUser().then();
    }

}
