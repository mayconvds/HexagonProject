import {Component, Input} from '@angular/core';
import {UserModel} from "../../../models/user/user-model";
import {User} from "../../../models/user/user";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Requests} from "../../../requests";
import {UserResponse} from "../../../models/user/user-response";
import {AjaxLoadService} from "../../../services/ajax-load.service";

@Component({
  selector: 'app-user-delete-modal',
  templateUrl: './user-delete-modal.component.html',
  styleUrls: ['./user-delete-modal.component.css']
})
export class UserDeleteModalComponent {
    @Input() user: User = new User();
    userResponse: UserResponse = new UserResponse();

    constructor(public activeModal: NgbActiveModal, private requests: Requests,
                private userModel: UserModel, private ajaxLoadService: AjaxLoadService) {
    }

    close(): void {
        if (this.userResponse.status.length > 0) {
            this.activeModal.close("success");
            return;
        }
        this.activeModal.close("close");
    }

    async delete(): Promise<void> {
        this.ajaxLoadService.showLoading();
        this.userResponse = await this.userModel.deleteUser(this.user);
        this.ajaxLoadService.hideLoading();
    }
}
