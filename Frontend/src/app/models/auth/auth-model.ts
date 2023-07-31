import {Injectable} from "@angular/core";
import {Requests} from "../../requests";
import {UserResponse} from "../user/user-response";
import {Auth} from "./auth";
import {Helpers} from "../../shared/helpers";

@Injectable({
    providedIn: "root"
})
export class AuthModel {
    constructor(private requests: Requests) {
    }

    async login(auth: Auth): Promise<UserResponse> {
        let userResponse: UserResponse = new UserResponse();

        try {
            this.requests.url = "/auth"
            this.requests.params = auth;
            const result = await this.requests.post().toPromise();
            if (result && result.body) {
                userResponse.status = "success";
                userResponse.message = result.body.message;
            }
            return userResponse;
        } catch (e: any) {
            userResponse.status = "error";
            userResponse.message = Helpers.captureError(e.error.message);
            return userResponse;
        }
    }
}
