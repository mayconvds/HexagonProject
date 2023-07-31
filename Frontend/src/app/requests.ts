import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environment/environment";

@Injectable({
    providedIn: "root"
})

export class Requests {
    get useToken(): boolean {
        return this._useToken;
    }

    set useToken(value: boolean) {
        this._useToken = value;
    }

    get params(): any {
        return this._params;
    }

    set params(value: any) {

        this._params = value;
    }

    get contentType(): string {
        return this._contentType;
    }

    set contentType(value: string) {
        this._contentType = value;
    }


    get url(): string {
        return this._url;
    }

    set url(value: string) {
        this._url = value;
    }

    private _url: string = "";
    private _contentType: string = "application/json";
    private _params: any;
    private api: string = environment.apiUrl;
    private _useToken: boolean = false;

    constructor(private http: HttpClient) {

    }

    private mountOptions(): any {
        let getOption: any = {observe: "response"};
        const token = window.localStorage.getItem("token");

        if (this._useToken && token && token.length > 0) {
            getOption = {
                observe: "response",
                headers: {
                    'Authorization': 'Bearer ' + token,
                    "Content-Type": this._contentType
                }
            };
        } else {
            getOption = {
                observe: "response",
                headers: {"Content-Type": this._contentType}
            };
        }

        return getOption;
    }


    private mountParamsFormUrlEncode(): HttpParams {
        if (this._params.length <= 0) {
            throw new Error("Nenhum parametro passado.")
        }

        return new HttpParams({
            fromObject: this.params,
        });
    }

    public post(): Observable<any> | any {
        const url: string = this.api + this._url
        const params = this.mountParamsFormUrlEncode();
        const options = this.mountOptions();

        if (this._contentType === "application/json") {
            return this.http.post(url, this._params, options);
        }

        return this.http.post(url, params.toString(), options);
    }

    public put(): Observable<any> | any {
        const url: string = this.api + this._url
        const params = this.mountParamsFormUrlEncode();
        const options = this.mountOptions();
        if (this._contentType === "application/json") {
            return this.http.put(url, this._params, options);
        }

        return this.http.put(url, params.toString(), options);
    }

    public get(): Observable<any> | any {
        let getOption: any = {observe: "response"};
        const token = window.localStorage.getItem("token");

        if (this._useToken && token && token.length > 0) {
            getOption = {
                observe: "response",
                headers: {
                    'Authorization': 'Bearer ' + token,
                    "Content-Type": this._contentType
                }
            };
        } else {
            getOption = {
                observe: "response",
                headers: {"Content-Type": this._contentType}
            };
        }

        const url: string = this.api + this._url
        return this.http.get(url, getOption);
    }

    public delete(): Observable<any> | any {
        let getOption: any = {observe: "response"};
        const token = window.localStorage.getItem("token");

        if (this._useToken && token && token.length > 0) {
            getOption = {
                observe: "response",
                headers: {
                    'Authorization': 'Bearer ' + token,
                    "Content-Type": this._contentType
                }
            };
        } else {
            getOption = {
                observe: "response",
                headers: {"Content-Type": this._contentType}
            };
        }

        const url: string = this.api + this._url
        return this.http.delete(url, getOption);
    }


}
