import {Component, OnInit, ViewChild} from '@angular/core';
import {Requests} from "../../../requests";
import {User} from "../../../models/user/user";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserDeleteModalComponent} from "../../../components/modais/user-delete-modal/user-delete-modal.component";
import {UserModel} from "../../../models/user/user-model";
import {UserListComponent} from "./user-list/user-list.component";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
    users: User[] = [];
    @ViewChild("userListComponent") userListComponent!: UserListComponent;

    constructor(private requests: Requests, private userModel: UserModel) {
    }

    async loadUsers(): Promise<void> {
        this.users = await this.userModel.getUsersList();
        this.userListComponent.setUsers(this.users);
    }

    ngOnInit(): void {
        this.loadUsers().then();
    }


}
