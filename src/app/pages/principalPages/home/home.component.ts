import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {LicitacionService} from "../../../services/licitacion.service";
import {licitacion} from "../../../services/licitacion";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  licitList: licitacion[] = [];

  displayedColumns: string[] = ['id_proceso', 'entidad', 'nit_entidad', 'nombre_procedimiento', 'fase', 'fecha_publicacion', 'precio_base','justificacion_modalidad',
    'duracion', 'unidad_duracion', 'ciudad_de_la_unidad', 'nombre_de_al_unidad', 'tipo_contrato', 'url'];
  dataSource = new MatTableDataSource<licitacion>(this.licitList);

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort = new MatSort();

  constructor(private licitacionService:LicitacionService) {

  }

  async ngOnInit() {
    this.licitacionService.getLicitaciones().subscribe((licitaciones: licitacion[]) =>{
      this.dataSource = new MatTableDataSource<licitacion>(licitaciones);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
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
