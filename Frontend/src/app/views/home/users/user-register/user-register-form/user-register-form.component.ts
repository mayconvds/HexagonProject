import {Component, Input} from '@angular/core';
import {User} from "../../../../../models/user/user";
import {UserModel} from "../../../../../models/user/user-model";
import {AjaxLoadService} from "../../../../../services/ajax-load.service";
import {UserResponse} from "../../../../../models/user/user-response";

@Component({
    selector: 'app-user-register-form',
    templateUrl: './user-register-form.component.html',
    styleUrls: ['./user-register-form.component.css']
})
export class UserRegisterFormComponent {
    @Input() user: User = new User();
    response: UserResponse = new UserResponse();


    constructor(private userModel: UserModel, private ajaxLoadService: AjaxLoadService) {
    }

    async register(): Promise<void> {
        this.ajaxLoadService.showLoading();
        const result = await this.userModel.registerUser(this.user);
        this.response = result;
        this.ajaxLoadService.hideLoading();
        this.user = new User();
    }

}
