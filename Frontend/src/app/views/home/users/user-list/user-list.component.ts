import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../../models/user/user";
import {UserDeleteModalComponent} from "../../../../components/modais/user-delete-modal/user-delete-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit{
    users: User[] = [];
    @Output() loadUsers: EventEmitter<string> = new EventEmitter<string>();
    showUsers: User[] = [];
    actPage: number = 1;
    usersPerPage: number = 8
    totalPages = 1;

    constructor(private modalService: NgbModal) {
    }

    setPage(page: number): void {
        this.actPage = page;
        this.setShowUsers();
    }

    setUsers(users: User[]): void {
        this.users = users;
        this.setShowUsers();
    }

    nextPage(): void {
        if (this.actPage >= this.totalPages) {
            return;
        }
        this.setPage(this.actPage + 1);
    }

    previousPage(): void {
        if (this.actPage <= 0) {
            return;
        }

        this.setPage(this.actPage - 1);
    }

    customIndexArray(): number[] {
        return Array.from({ length: this.totalPages }, (_, index) => index + 1);
    }

    setShowUsers(): void {
        const totalUsers = this.users.length;
        this.totalPages = Math.ceil(totalUsers / this.usersPerPage);
        this.showUsers = [];
        let users: User[] = [];
        let indexFinal = this.actPage * this.usersPerPage;
        let indexInit = (this.actPage * this.usersPerPage)  - this.usersPerPage ;
        for (let user of this.users) {
            const index = this.users.indexOf(user);
            if (index >= indexInit) {
                users.push(user)
            }
            if (index + 1 >= indexFinal ) {
                break;
            }
        }
        this.showUsers = users;
    }

    deleteUser(user: User): void {
        let modal = this.modalService.open(UserDeleteModalComponent, {backdrop: 'static', keyboard: false, centered: true})
        modal.componentInstance.user = user;
        modal.result.then(async (result) => {
            if (result && result === "success") {
                this.loadUsers.emit("reload");
            }
        });
    }

    ngOnInit(): void {
    }
}
