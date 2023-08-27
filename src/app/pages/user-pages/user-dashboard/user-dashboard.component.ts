import {Component, OnInit, ViewChild} from '@angular/core';
import {licitacion} from "../../../services/licitacion";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {LicitacionService} from "../../../services/licitacion.service";
import {LoginService} from "../../../services/login.service";

@Component({
  selector: 'app-root-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  licitList: licitacion[] = [];

  displayedColumns: string[] = ['id_proceso', 'entidad', 'nit_entidad', 'nombre_procedimiento', 'fase', 'fecha_publicacion', 'precio_base','justificacion_modalidad',
    'duracion', 'unidad_duracion', 'ciudad_de_la_unidad', 'nombre_de_al_unidad', 'tipo_contrato', 'url'];
  dataSource = new MatTableDataSource<licitacion>(this.licitList);

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort = new MatSort();

  constructor(private licitacionService:LicitacionService, private loginService:LoginService) {

  }

  async ngOnInit() {
    this.licitacionService.getLicitaciones().subscribe((licitaciones: licitacion[]) =>{
      this.dataSource = new MatTableDataSource<licitacion>(licitaciones);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  async loadAll() {
    this.licitacionService.getLicitaciones().subscribe((licitaciones: licitacion[]) =>{
      this.dataSource = new MatTableDataSource<licitacion>(licitaciones);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  async loadPreferences() {
    const user = this.loginService.getUser();
    if (user){
      const username = user.username;
      this.licitacionService.getLicitacionesForPreferences(username).subscribe((licitaciones: licitacion[]) =>{
        this.dataSource = new MatTableDataSource<licitacion>(licitaciones);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }
  }

  activeFilterEvent(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.applyFilter(input);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}
