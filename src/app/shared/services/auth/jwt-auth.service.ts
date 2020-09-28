import { Injectable } from "@angular/core";
import { LocalStoreService } from "../local-store.service";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { map, catchError, delay } from "rxjs/operators";
import { User } from "../../models/user.model";
import { of, BehaviorSubject, throwError } from "rxjs";
import { environment } from "environments/environment";

@Injectable({
  providedIn: "root",
})
export class JwtAuthService {
  token;
  isAuthenticated: Boolean;
  user: User;
  //user$ = (new BehaviorSubject<User>(this.user));
  signingIn: Boolean;
  JWT_TOKEN = "JWT_TOKEN";
  APP_USER = "MATX_USER";

  constructor(
    private ls: LocalStoreService,
    private http: HttpClient,
    private router: Router
  ) {}

  public signin(name, password) { 
    this.signingIn = true;
    return this.http.post(`${environment.apiURL}/login`, { name, password })
      .pipe(
        map((res: any) => {
          this.setUserAndToken(res.token, res.user, !!res);   
          this.signingIn = false;
          return res;
        }),
        catchError((error) => {
          return throwError(error);
        })
      );
  }
  public register(name, email, password) {
    const url = `${environment.apiURL}/register`;
    return this.http.post<any>(url, {name,email,password}).pipe(
        map(
            user => {
                if (
                    user['error'] === true ||
                    user['error_email'] === true
                    
                ) {
                    //this.thongbaoService.open('Email đã tồn tại! Vui lòng đăng ký với email khác', 'bg-danger');
                } else {
                    //this.userService.pushUserSubject(user.user);                        
                    //this.thongbaoService.open('Đăng ký tài khoản thành công', 'bg-success');
                    alert("Đăng ký tài khoản thành công");
                }
                return user;
            },
            err => {}
            )
            );
    }

  /*
    checkTokenIsValid is called inside constructor of
    shared/components/layouts/admin-layout/admin-layout.component.ts
  */
  public checkTokenIsValid() {
    return this.http.get(`${environment.apiURL}/user`)
      .pipe(
        map((profile: User) => {
          this.setUserAndToken(this.getJwtToken(), profile, true);
          return profile;
        }),
        catchError((error) => {
          return of(error);
        })
      );
  }
  
  

  public signout() {
    this.setUserAndToken(null, null, false);
    this.router.navigateByUrl("sessions/signin");
  }

  isLoggedIn(): Boolean {
    return !!this.getJwtToken();
  }

  getJwtToken() {
    return this.ls.getItem(this.JWT_TOKEN);
  }
  getUser() {
    return this.ls.getItem(this.APP_USER);
  }

  setUserAndToken(token: String, user: User, isAuthenticated: Boolean) {
    this.isAuthenticated = isAuthenticated;
    this.token = token;
    this.user = user;
    //this.user$.next(user);
    this.ls.setItem(this.JWT_TOKEN, token);
    this.ls.setItem(this.APP_USER, user);
  }
}