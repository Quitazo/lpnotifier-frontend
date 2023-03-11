export interface licitacion {
  id_proceso:string;
  entidad:string;
  nit_entidad:string;
  nombre_procedimiento:string;
  fase:string;
  fecha_publicacion:Date;
  precio_base: number
  justificacion_modalidad:string;
  duracion:string;
  unidad_duracion:string;
  ciudad_de_la_unidad:string;
  nombre_de_la_unidad:string;
  tipo_contrato:string;
  url:string;
}
