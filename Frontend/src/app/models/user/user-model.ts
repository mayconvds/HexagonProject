import {User} from "./user";
import {Requests} from "../../requests";
import {Injectable} from "@angular/core";
import {UserResponse} from "./user-response";
import {Helpers} from "../../shared/helpers";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalAuthComponent} from "../../components/modais/modal-auth/modal-auth.component";
@Injectable({
    providedIn: "root"
})
export class UserModel {
    constructor(private requests: Requests, private router: Router, private modalService: NgbModal ) {
        const token = localStorage.getItem("token");
        if (!token) {
            this.redirectToLogin();
        }
    }

    private redirectToLogin(): void {
        this.router.navigate([""]).then(
            () => {
                this.modalService.open(ModalAuthComponent, {backdrop: 'static', keyboard: true, centered: true})
            }
        );
    }

    private formatDocument(document: string): string {
        if (document) {
            document = document.replace(/\D/g, ''); // Remove caracteres não numéricos
            document = document.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4'); // Aplica a máscara
        }
        return document;
    }

    removeFormatting(document: string): string {
        return document.replace(/\D/g, '');
    }

    async getUserById(id: number): Promise<User | null> {
        try {
            let user: User = new User();
            this.requests.url = `/user/${id}`;
            this.requests.useToken = true;
            const result = await this.requests.get().toPromise();
            if (result.body) {
                user = result.body;
                user.document = this.formatDocument(user.document);
            }
            return user;
        } catch (e: any) {
            const errorLogin: boolean = Helpers.checkLoginError(e.error.message);
            if (errorLogin) {
                this.redirectToLogin();
            }
            return null;
        }
    }

    async updateUser(user: User): Promise<UserResponse> {
        let userResponse = new UserResponse();
        try {
            this.requests.url = `/user/${user.id}`;
            user.document = this.removeFormatting(user.document);
            this.requests.useToken = true;
            this.requests.params = user;
            const result = await this.requests.put().toPromise();
            if (result && result.body) {
                userResponse.status = "success";
                userResponse.message = result.body.message
            }
            return userResponse;
        } catch (e: any) {
            const errorLogin: boolean = Helpers.checkLoginError(e.error.message);
            if (errorLogin) {
                this.redirectToLogin();
            }
            userResponse.status = "error";
            userResponse.message = Helpers.captureError(e.error.message);
            return userResponse;
        }
    }

    async deleteUser(user: User): Promise<UserResponse> {
        let userResponse = new UserResponse();
        try {
            this.requests.url = `/user/${user.id}`;
            this.requests.useToken = true;
            const result = await this.requests.delete().toPromise()
            if (result && result.body) {
                userResponse.status = "success";
                userResponse.message = result.body.message
            }
            return userResponse;
        } catch (e: any) {
            const errorLogin: boolean = Helpers.checkLoginError(e.error.message);
            if (errorLogin) {
                this.redirectToLogin();
            }
            userResponse.status = "error";
            userResponse.message = Helpers.captureError(e.error.message);
            return userResponse;
        }
    }

    async registerUser(user: User): Promise<UserResponse> {
        let userResponse = new UserResponse();
        try {
            this.requests.url = `/user`;
            this.requests.useToken = true;
            user.document = this.removeFormatting(user.document);
            this.requests.params = user;
            const result = await this.requests.post().toPromise()
            if (result && result.body) {
                userResponse.status = "success";
                userResponse.message = result.body.message
            }
            return userResponse;
        } catch (e: any) {
            const errorLogin: boolean = Helpers.checkLoginError(e.error.message);
            if (errorLogin) {
                this.redirectToLogin();
            }
            userResponse.status = "error";
            userResponse.message = Helpers.captureError(e.error.message);
            return userResponse;
        }
    }

    async getUsersList(): Promise<User[]> {
        let users: User[] = [];

        try {
            this.requests.url = "/user";
            this.requests.useToken = true;
            const result = await this.requests.get().toPromise();
            return result.body;
        } catch (e: any) {
            const errorLogin: boolean = Helpers.checkLoginError(e.error.message);
            if (errorLogin) {
                this.redirectToLogin();
            }
            return users;
        }

    }
}
