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
  licitaciones: licitacion[] = [];

  displayedColumns: string[] = ['id_proceso', 'entidad', 'nit_entidad', 'nombre_procedimiento', 'fase', 'fecha_publicacion', 'precio_base','justificacion_modalidad',
    'duracion', 'unidad_duracion', 'ciudad_de_la_unidad', 'nombre_de_al_unidad', 'tipo_contrato', 'url'];
  dataSource = new MatTableDataSource<licitacion>(this.licitaciones);

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort = new MatSort();

  constructor(private licitacionService:LicitacionService) {

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async ngOnInit() {
    // const { licitaciones, error } = await this.licitacionService.getTodos();
    // if (error) {
    //   console.error(error);
    // } else if (licitaciones && Array.isArray(licitaciones)) {
    //   this.licitaciones = licitaciones.map((licitacion: any) => ({
    //     id_proceso: licitacion.id_proceso,
    //     entidad: licitacion.entidad,
    //     nit_entidad: licitacion.nit_entidad,
    //     nombre_procedimiento: licitacion.nombre_procedimiento,
    //     fase: licitacion.fase,
    //     fecha_publicacion: licitacion.fecha_publicacion,
    //     precio_base: licitacion.precio_base,
    //     justificacion_modalidad: licitacion.justificacion_modalidad,
    //     duracion: licitacion.duracion,
    //     unidad_duracion: licitacion.unidad_duracion,
    //     ciudad_de_la_unidad: licitacion.ciudad_de_la_unidad,
    //     nombre_de_la_unidad: licitacion.nombre_de_la_unidad,
    //     tipo_contrato: licitacion.tipo_contrato,
    //     url: licitacion.url
    //   }));
    // }
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
