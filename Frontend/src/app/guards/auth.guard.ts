import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from "@angular/core";
import {catchError, map, Observable, of} from "rxjs";


@Injectable()
export class AuthGuard {


  constructor(private router: Router) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree> {
    const token = localStorage.getItem("token");
    if (!token) {
      return true;
    }
    this.router.navigate(["/usuarios"]).then();
    return false;
  }
}
