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
    const { licitaciones, error } = await this.licitacionService.getTodos();
    if (error) {
      console.error(error);
    } else if (licitaciones && Array.isArray(licitaciones)) {
      console.log(licitaciones);
      this.licitList = licitaciones.map((licitacion: licitacion) => ({
        id_proceso: licitacion.id_proceso,
        entidad: licitacion.entidad,
        nit_entidad: licitacion.nit_entidad,
        nombre_procedimiento: licitacion.nombre_procedimiento,
        fase: licitacion.fase,
        fecha_publicacion: licitacion.fecha_publicacion,
        precio_base: licitacion.precio_base,
        justificacion_modalidad: licitacion.justificacion_modalidad,
        duracion: licitacion.duracion,
        unidad_de_duracion: licitacion.unidad_de_duracion,
        ciudad_de_la_unidad: licitacion.ciudad_de_la_unidad,
        nombre_de_la_unidad: licitacion.nombre_de_la_unidad,
        tipo_de_contrato: licitacion.tipo_de_contrato,
        url: licitacion.url
      }));
      this.dataSource = new MatTableDataSource<licitacion>(this.licitList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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
