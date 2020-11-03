import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export interface Users {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
}

const Users_DATA: Users[] = [
  { firstName: 'Bharath', lastName: 'N S', age: 35, gender: 'Male' },
  { firstName: 'Kiran', lastName: 'N S', age: 30, gender: 'Male' },
  { firstName: 'Chetan', lastName: 'N S', age: 27, gender: 'Male' },
  { firstName: 'Shivkumar', lastName: 'K S', age: 50, gender: 'Male' },
  { firstName: 'Raghu', lastName: 'K S', age: 27, gender: 'Male' },
  { firstName: 'Basavaraj', lastName: 'K S', age: 18, gender: 'Male' },
  { firstName: 'Bhavani', lastName: 'S N', age: 38, gender: 'Female' },
  { firstName: 'Ganesh', lastName: 'S N', age: 37, gender: 'Male' },
  { firstName: 'Shivayogi', lastName: 'S N', age: 58, gender: 'Male' },
  { firstName: 'Renuka', lastName: 'B K', age: 53, gender: 'Female' }
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'age', 'gender', 'edit', 'delete'];
  dataSource;
  editable: boolean[] = [];
  addUsersForm: FormGroup;
  teen_age_count = 0; 
  middle_age_count = 0; 
  senior_age_count = 0;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private modalService: NgbModal,
    private formBuilder: FormBuilder) {
    this.addUsersForm = this.formBuilder.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.refreshDataSource();
    this.injectPiechartData();
  }

  injectPiechartData(){
    Users_DATA.filter((user)=>{
      if(user.age >= 18 && user.age <= 35){
        this.teen_age_count++; 
      }else if(user.age >= 36 && user.age <= 40){
        this.middle_age_count++;
      }else if(user.age > 41){
        this.senior_age_count++;
      }
    })
  }

  refreshDataSource() {
    this.dataSource = new MatTableDataSource(Users_DATA);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  addUsers(content) {
    this.modalService.open(content, { centered: true });
  }

  deleteUsers(index) {
    this.dataSource.data.splice(index, 1);
    this.refreshDataSource();
    this.injectPiechartData();
  }

  onSubmitUsersForm() {
    this.dataSource.data.push(this.addUsersForm.value);
    this.refreshDataSource();
    this.injectPiechartData();
    this.modalService.dismissAll();
  }
}
