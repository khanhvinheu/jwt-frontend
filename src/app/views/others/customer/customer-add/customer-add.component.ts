import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from 'app/shared/services/web-partner/customer.service';
import { CustomValidators } from 'ngx-custom-validators';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.scss']
})
export class CustomerAddComponent implements OnInit {
  formData = {};
  console = console;
  basicForm: FormGroup;

  constructor(private customerServicec:CustomerService) {}

  ngOnInit() {
    this.createForm();
  }
  createForm(){
    let password = new FormControl("", Validators.required);
    let confirmPassword = new FormControl(
      "",
      CustomValidators.equalTo(password)
    );

    this.basicForm = new FormGroup({
      tenCongty: new FormControl("", [
        Validators.minLength(4),
        Validators.maxLength(9)
      ]),
      diaChi: new FormControl("", [Validators.required]),
      website: new FormControl("", [Validators.required, Validators.email]),
      tinhTrang: new FormControl("", CustomValidators.url)      
    });
  }
  onSubmitForm(){
    this.customerServicec.createNew(this.basicForm.value);
  }

}
