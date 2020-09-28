import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Customer } from 'app/shared/models/customer.model';
import { CustomerService } from 'app/shared/services/web-partner/customer.service';
import { TablesService } from 'app/views/tables/tables.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  subscriptions: Subscription[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  Customer:Customer[]=[];
  displayedColumns: string[] = [];
  dataSource: any;

  constructor(
    private tableService: TablesService,
    private customerService: CustomerService ,
    private router: Router,     
    ) { }

  ngOnInit() {
    this.customerService.getAll();
    this.displayedColumns = this.customerService.getDataConf().map((c) => c.prop)
    //this.dataSource = new MatTableDataSource(this.tableService.getAll());
    this.subscriptions.push(
      this.customerService.itemsObs.subscribe(
          data => {
              this.Customer = data;
              console.log(data);
              
              this.dataSource = new MatTableDataSource<Customer>(
                  this.Customer
              );
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
              //this.isLoading = false;
          },
          () => {}
      )
    );
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  onDelete(customer: Customer) {
    // this.confirmDialogService.openDialog().then(result => {
    //     if (result) {
            this.customerService.delete(customer);
        // }
    //});
  }
  onEdit(data) {
    alert(data.id)
    this.router.navigate(['pages/khachhang/', data.id, 'edit']);
  }
}
