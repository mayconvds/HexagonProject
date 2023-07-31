import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AppRoutingModule} from "./app-routing.module";
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { UsersComponent } from './views/home/users/users.component';
import {RouterOutlet} from "@angular/router";
import { NavbarComponent } from './views/home/navbar/navbar.component';
import { FooterComponent } from './views/home/footer/footer.component';
import { LoopingDirective } from './directives/looping.directive';
import {HttpClientModule} from "@angular/common/http";
import { CpfPipe } from './pipes/cpf.pipe';
import { UserByIdComponent } from './views/home/users/user-by-id/user-by-id.component';
import {NgxMaskDirective, NgxMaskPipe, provideEnvironmentNgxMask} from "ngx-mask";
import {FormsModule} from "@angular/forms";
import {UserModel} from "./models/user/user-model";
import { UserDeleteModalComponent } from './components/modais/user-delete-modal/user-delete-modal.component';
import { UserRegisterComponent } from './views/home/users/user-register/user-register.component';
import { UserListComponent } from './views/home/users/user-list/user-list.component';
import { UserUpdateFormComponent } from './views/home/users/user-by-id/user-update-form/user-update-form.component';
import { UserRegisterFormComponent } from './views/home/users/user-register/user-register-form/user-register-form.component';
import { LoginComponent } from './views/home/login/login.component';
import {AuthModel} from "./models/auth/auth-model";
import { ModalAuthComponent } from './components/modais/modal-auth/modal-auth.component';
import {AuthGuard} from "./guards/auth.guard";



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    NavbarComponent,
    FooterComponent,
    LoopingDirective,
    CpfPipe,
    UserByIdComponent,
    UserDeleteModalComponent,
    UserRegisterComponent,
    UserListComponent,
    UserUpdateFormComponent,
    UserRegisterFormComponent,
    LoginComponent,
    ModalAuthComponent,
  ],
    imports: [
        BrowserModule,
        RouterOutlet,
        AppRoutingModule,
        HttpClientModule,
        NgxMaskDirective,
        FormsModule,
        NgxMaskPipe
    ],
  providers: [
      provideEnvironmentNgxMask(),
      UserModel,
      AuthModel,
      AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
