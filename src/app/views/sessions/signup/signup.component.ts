import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormControl,
  FormBuilder,
  FormGroup
} from "@angular/forms";
import { CustomValidators } from "ngx-custom-validators";
import { matxAnimations } from "app/shared/animations/matx-animations";
import { JwtAuthService } from "app/shared/services/auth/jwt-auth.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
  animations: matxAnimations
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  return: string;
  constructor(private fb: FormBuilder,private jwtAuth: JwtAuthService,private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit() {
    const password = new FormControl("", Validators.required);
    const confirmPassword = new FormControl(
      "",
      CustomValidators.equalTo(password)
    );

    this.signupForm = this.fb.group({
      username: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: password,
      agreed: [false, Validators.required]
    });
  }

  onSubmit() {
    // if (!this.signupForm.invalid) {
    //   // do what you wnat with your data
    //   console.log(this.signupForm.value);
    // }
    const signupData = this.signupForm.value
    //this.loading = true;
    this.jwtAuth.register(signupData.username,signupData.email, signupData.password)
    .subscribe(response => {
      //this.loading = false;
      this.router.navigateByUrl(this.return);
    }, err => {
      //this.loading = false;
      //this.errorMsg = err.message;
    })
  }
}
