import {Component, OnInit, ViewChild} from '@angular/core';
import {user} from "../../../services/user";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {userService} from "../../../services/user.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-root-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  progressBar = false;
  users: user[] = [];

  displayedColumns: string[] = ['id', 'name', 'email', 'enable', 'username', 'phone', 'opciones'];
  dataSource = new MatTableDataSource<user>(this.users);

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort = new MatSort();

  constructor(private usrServices: userService) {

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getUsers();
  }

  activeFilterEvent(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.applyFilter(input);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  public getUsers(): void {
    this.progressBar=true;
    this.usrServices.getUsers().subscribe(
      (response: user[]) => {
        this.dataSource.data = response;
        this.progressBar=false;

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.progressBar=false;
      }
    );
  }

  public delUser(id: number): void {
    this.progressBar=true;
    this.usrServices.deleteUser(id).subscribe(
      () => {
        this.progressBar=false;
        alert("El usuario con el ID "+id+" ha sido eliminado exitosamente.");
        this.getUsers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.progressBar=false;
      }
    );
  }
}
