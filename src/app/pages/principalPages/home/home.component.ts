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

  ngOnInit(): void {
    this.getLicitaciones();
    console.log(this.licitaciones[0]);
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

  public getLicitaciones(): void {
    this.licitacionService.getTodos().then(data => {
      data.licitaciones?.map(licitacion => {
        this.licitaciones.push([licitacion['id_proceso'], licitacion["entidad"], licitacion["nit_entidad"], licitacion["nombre_procedimiento"], licitacion["fase"], licitacion["fecha_publicacion"],
          licitacion["precio_base"], licitacion["justificacion_modalidad"], licitacion["duracion"], licitacion["unidad_duracion"], licitacion["ciudad_de_la_unidad"], licitacion["nombre_de_la_unidad"],
          licitacion["tipo_contrato"], licitacion["url"]]);
      });
      console.log(this.licitaciones);
    }).catch(reason => {
      console.log(reason);
    });
  }
}
