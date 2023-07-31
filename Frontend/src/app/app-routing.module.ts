import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./views/home/home.component";
import {UsersComponent} from "./views/home/users/users.component";
import {InvalidRouteGuard} from "./guards/invalid-route.guard";
import {UserByIdComponent} from "./views/home/users/user-by-id/user-by-id.component";
import {UserRegisterComponent} from "./views/home/users/user-register/user-register.component";
import {LoginComponent} from "./views/home/login/login.component";
import {AuthGuard} from "./guards/auth.guard";


const routes: Routes = [
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
    },
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: "",
                component: LoginComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'usuarios',
                component: UsersComponent
            },
            {
                path: 'registrarusuario',
                component: UserRegisterComponent
            },
            {
                path: 'usuario/:id',
                component: UserByIdComponent
            },

            {
                path: '**',
                component: UsersComponent,
                canActivate: [InvalidRouteGuard]
            }
        ],

    }
];

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes, {
            useHash: false,
            scrollPositionRestoration: 'top',
            anchorScrolling: "enabled",
            scrollOffset: [0, 64]
        })
    ],
    exports: [RouterModule]

})
export class AppRoutingModule {}
