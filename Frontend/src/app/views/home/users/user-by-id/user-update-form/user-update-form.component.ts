import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../../../models/user/user";
import {UserResponse} from "../../../../../models/user/user-response";
import {UserModel} from "../../../../../models/user/user-model";
import {AjaxLoadService} from "../../../../../services/ajax-load.service";

@Component({
    selector: 'app-user-update-form',
    templateUrl: './user-update-form.component.html',
    styleUrls: ['./user-update-form.component.css']
})
export class UserUpdateFormComponent implements OnInit {
    @Input() user: User = new User();
    @Input() loaded: boolean = false;
    @Input() response: UserResponse = new UserResponse();
    @Output() loadUser: EventEmitter<string> = new EventEmitter<string>();

    constructor(private userModel: UserModel, private ajaxLoadService: AjaxLoadService) {
    }

    async updateUser(): Promise<void> {
        this.ajaxLoadService.showLoading();
        this.response = await this.userModel.updateUser(this.user);
        this.ajaxLoadService.hideLoading();
        this.loadUser.emit("reload");
    }

    ngOnInit(): void {
    }

}
