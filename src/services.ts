import axios from 'axios';
import $store from './store';

// tslint:disable-next-line: max-classes-per-file class-name
export class Endpoints {
	public ws_almacenes_Consultar: string = $store.state.server + 'Api/almacenes/Consultar';
	public ws_almacenes_Buscar: string = $store.state.server + 'Api/almacenes/Buscar';
	public ws_almacenes_Insertar: string = $store.state.server + 'Api/almacenes/Insertar';
	public ws_almacenes_Actualizar: string = $store.state.server + 'Api/almacenes/Actualizar';
	public ws_almacenes_Eliminar: string = $store.state.server + 'Api/almacenes/Eliminar';
	public ws_aperturaycierregestion_Consultar: string = $store.state.server + 'Api/aperturaycierregestion/Consultar';
	public ws_aperturaycierregestion_Buscar: string = $store.state.server + 'Api/aperturaycierregestion/Buscar';
	public ws_aperturaycierregestion_Insertar: string = $store.state.server + 'Api/aperturaycierregestion/Insertar';
	public ws_aperturaycierregestion_Actualizar: string = $store.state.server + 'Api/aperturaycierregestion/Actualizar';
	public ws_aperturaycierregestion_Eliminar: string = $store.state.server + 'Api/aperturaycierregestion/Eliminar';
	public ws_bancos_Consultar: string = $store.state.server + 'Api/bancos/Consultar';
	public ws_bancos_Buscar: string = $store.state.server + 'Api/bancos/Buscar';
	public ws_bancos_Insertar: string = $store.state.server + 'Api/bancos/Insertar';
	public ws_bancos_Actualizar: string = $store.state.server + 'Api/bancos/Actualizar';
	public ws_bancos_Eliminar: string = $store.state.server + 'Api/bancos/Eliminar';
	public ws_cajas_Consultar: string = $store.state.server + 'Api/cajas/Consultar';
	public ws_cajas_Buscar: string = $store.state.server + 'Api/cajas/Buscar';
	public ws_cajas_Insertar: string = $store.state.server + 'Api/cajas/Insertar';
	public ws_cajas_Actualizar: string = $store.state.server + 'Api/cajas/Actualizar';
	public ws_cajas_Eliminar: string = $store.state.server + 'Api/cajas/Eliminar';
	public ws_ciudades_Consultar: string = $store.state.server + 'Api/ciudades/Consultar';
	public ws_ciudades_Buscar: string = $store.state.server + 'Api/ciudades/Buscar';
	public ws_ciudades_Insertar: string = $store.state.server + 'Api/ciudades/Insertar';
	public ws_ciudades_Actualizar: string = $store.state.server + 'Api/ciudades/Actualizar';
	public ws_ciudades_Eliminar: string = $store.state.server + 'Api/ciudades/Eliminar';
	public ws_claseitems_Consultar: string = $store.state.server + 'Api/claseitems/Consultar';
	public ws_claseitems_Buscar: string = $store.state.server + 'Api/claseitems/Buscar';
	public ws_claseitems_Insertar: string = $store.state.server + 'Api/claseitems/Insertar';
	public ws_claseitems_Actualizar: string = $store.state.server + 'Api/claseitems/Actualizar';
	public ws_claseitems_Eliminar: string = $store.state.server + 'Api/claseitems/Eliminar';
	public ws_clientes_Consultar: string = $store.state.server + 'Api/clientes/Consultar';
	public ws_clientes_Buscar: string = $store.state.server + 'Api/clientes/Buscar';
	public ws_clientes_Insertar: string = $store.state.server + 'Api/clientes/Insertar';
	public ws_clientes_Actualizar: string = $store.state.server + 'Api/clientes/Actualizar';
	public ws_clientes_Eliminar: string = $store.state.server + 'Api/clientes/Eliminar';
	public ws_items_Consultar: string = $store.state.server + 'Api/items/Consultar';
	public ws_items_Buscar: string = $store.state.server + 'Api/items/Buscar';
	public ws_items_Insertar: string = $store.state.server + 'Api/items/Insertar';
	public ws_items_Actualizar: string = $store.state.server + 'Api/items/Actualizar';
	public ws_items_Eliminar: string = $store.state.server + 'Api/items/Eliminar';
	public ws_lineas_Consultar: string = $store.state.server + 'Api/lineas/Consultar';
	public ws_lineas_Buscar: string = $store.state.server + 'Api/lineas/Buscar';
	public ws_lineas_Insertar: string = $store.state.server + 'Api/lineas/Insertar';
	public ws_lineas_Actualizar: string = $store.state.server + 'Api/lineas/Actualizar';
	public ws_lineas_Eliminar: string = $store.state.server + 'Api/lineas/Eliminar';
	public ws_monedas_Consultar: string = $store.state.server + 'Api/monedas/Consultar';
	public ws_monedas_Buscar: string = $store.state.server + 'Api/monedas/Buscar';
	public ws_monedas_Insertar: string = $store.state.server + 'Api/monedas/Insertar';
	public ws_monedas_Actualizar: string = $store.state.server + 'Api/monedas/Actualizar';
	public ws_monedas_Eliminar: string = $store.state.server + 'Api/monedas/Eliminar';
	public ws_pais_Consultar: string = $store.state.server + 'Api/pais/Consultar';
	public ws_pais_Buscar: string = $store.state.server + 'Api/pais/Buscar';
	public ws_pais_Insertar: string = $store.state.server + 'Api/pais/Insertar';
	public ws_pais_Actualizar: string = $store.state.server + 'Api/pais/Actualizar';
	public ws_pais_Eliminar: string = $store.state.server + 'Api/pais/Eliminar';
	public ws_proveedores_Consultar: string = $store.state.server + 'Api/proveedores/Consultar';
	public ws_proveedores_Buscar: string = $store.state.server + 'Api/proveedores/Buscar';
	public ws_proveedores_Insertar: string = $store.state.server + 'Api/proveedores/Insertar';
	public ws_proveedores_Actualizar: string = $store.state.server + 'Api/proveedores/Actualizar';
	public ws_proveedores_Eliminar: string = $store.state.server + 'Api/proveedores/Eliminar';
	public ws_sucursales_Consultar: string = $store.state.server + 'Api/sucursales/Consultar';
	public ws_sucursales_Buscar: string = $store.state.server + 'Api/sucursales/Buscar';
	public ws_sucursales_Insertar: string = $store.state.server + 'Api/sucursales/Insertar';
	public ws_sucursales_Actualizar: string = $store.state.server + 'Api/sucursales/Actualizar';
	public ws_sucursales_Eliminar: string = $store.state.server + 'Api/sucursales/Eliminar';
	public ws_tipodepagos_Consultar: string = $store.state.server + 'Api/tipodepagos/Consultar';
	public ws_tipodepagos_Buscar: string = $store.state.server + 'Api/tipodepagos/Buscar';
	public ws_tipodepagos_Insertar: string = $store.state.server + 'Api/tipodepagos/Insertar';
	public ws_tipodepagos_Actualizar: string = $store.state.server + 'Api/tipodepagos/Actualizar';
	public ws_tipodepagos_Eliminar: string = $store.state.server + 'Api/tipodepagos/Eliminar';
	public ws_unidaddemanejo_Consultar: string = $store.state.server + 'Api/unidaddemanejo/Consultar';
	public ws_unidaddemanejo_Buscar: string = $store.state.server + 'Api/unidaddemanejo/Buscar';
	public ws_unidaddemanejo_Insertar: string = $store.state.server + 'Api/unidaddemanejo/Insertar';
	public ws_unidaddemanejo_Actualizar: string = $store.state.server + 'Api/unidaddemanejo/Actualizar';
	public ws_unidaddemanejo_Eliminar: string = $store.state.server + 'Api/unidaddemanejo/Eliminar';
	public ws_ctaspresup_Consultar: string = $store.state.server + 'Api/ctaspresup/Consultar';
	public ws_ctaspresup_Buscar: string = $store.state.server + 'Api/ctaspresup/Buscar';
	public ws_ctaspresup_Insertar: string = $store.state.server + 'Api/ctaspresup/Insertar';
	public ws_ctaspresup_Actualizar: string = $store.state.server + 'Api/ctaspresup/Actualizar';
	public ws_ctaspresup_Eliminar: string = $store.state.server + 'Api/ctaspresup/Eliminar';
	public ws_cuentas_Consultar: string = $store.state.server + 'Api/cuentas/Consultar';
	public ws_cuentas_Buscar: string = $store.state.server + 'Api/cuentas/Buscar';
	public ws_cuentas_Insertar: string = $store.state.server + 'Api/cuentas/Insertar';
	public ws_cuentas_Actualizar: string = $store.state.server + 'Api/cuentas/Actualizar';
	public ws_cuentas_Eliminar: string = $store.state.server + 'Api/cuentas/Eliminar';
	public ws_cuentasbancos_Consultar: string = $store.state.server + 'Api/cuentasbancos/Consultar';
	public ws_cuentasbancos_Buscar: string = $store.state.server + 'Api/cuentasbancos/Buscar';
	public ws_cuentasbancos_Insertar: string = $store.state.server + 'Api/cuentasbancos/Insertar';
	public ws_cuentasbancos_Actualizar: string = $store.state.server + 'Api/cuentasbancos/Actualizar';
	public ws_cuentasbancos_Eliminar: string = $store.state.server + 'Api/cuentasbancos/Eliminar';
}

// tslint:disable-next-line: max-classes-per-file class-name
export class ClaseAutenticacion {
    public usuario!: string;
    public password!: string;
    public dominio?: string;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_almacenes {
	public codigoalmacen!: string;
	public descripcion!: string;
	public idtipomovimiento!: number;
	public idciudad!: number;
	public virtual!: boolean;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_aperturaycierregestion {
	public gestion!: string;
	public mes!: number;
	public abierta!: boolean;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_bancos {
	public idbanco!: number;
	public nit!: string;
	public descripcion!: string;
	public bancopropio!: boolean;
	public idpais!: number;
	public idciudad!: number;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_cajas {
	public idcaja!: number;
	public descripcion!: string;
	public cuenta!: string;
	public monto!: number;
	public idmoneda!: number;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_ciudades {
	public idciudad!: number;
	public idpais!: number;
	public descripcion!: string;
	public sigla!: string;
	public idmoneda!: number;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_claseitems {
	public idclase!: number;
	public descripcion!: string;
	public sigla!: string;
	public cuentaventa!: string;
	public cuentacosto!: string;
	public cuentagasto!: string;
	public cuentainventario!: string;
	public ingresainventario!: boolean;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_clientes {
	public codigocliente!: string;
	public codigoclienteprincipal!: string;
	public iddocumentoidentidad!: number;
	public numerodocumento!: string;
	public razonsocial!: string;
	public idpais!: number;
	public idciudad!: number;
	public idzona!: number;
	public idtipocliente!: number;
	public descripciondireccion!: string;
	public telefono!: string;
	public correoelectronico!: string;
	public casillacorreo!: string;
	public cuentacontable!: string;
	public cuentacontableanticipos!: string;
	public activo!: boolean;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_cuentas {
	public cuenta!: string;
	public nombrecuenta!: string;
	public idmoneda!: number;
	public nivel!: number;
	public cuentaasiento!: boolean;
	public cuentasumar!: string;
	public activopasivo!: number;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_cuentasbancos {
	public idbanco!: number;
	public nrocuenta!: string;
	public idmoneda!: number;
	public saldoactual!: number;
	public cuentacontable!: string;
	public fechaapertura!: any;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_ctaspresup {
	public cuentapresup!: string;
	public nombrecuentapresup!: string;
	public idmoneda!: number;
	public nivel!: number;
	public fechacreacion!: any;
	public fechamodificacion!: any;
	public balancecuenta!: boolean;
	public cuentaasiento!: boolean;
	public grabado!: boolean;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_items {
	public codigoitem!: string;
	public modelonroparte!: string;
	public descripcion!: string;
	public fechacreacion!: any;
	public fechaultimomovimiento!: any;
	public costoinicial!: number;
	public costoactual!: number;
	public saldoinicial!: number;
	public saldoactual!: number;
	public idclase!: number;
	public idtipoitem!: number;
	public idunidadmanejo!: number;
	public codigoitemsup!: string;
	public cantidadminima!: number;
	public cantidadmaxima!: number;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_lineas {
	public idlinea!: number;
	public descripcion!: string;
	public cuenta!: string;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_monedas {
	public idmoneda!: number;
	public descripcion!: string;
	public sigla!: string;
	public monedalocal!: boolean;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_pais {
	public idpais!: number;
	public descripcion!: string;
	public sigla!: string;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_proveedores {
	public codigoproveedor!: string;
	public iddocumentoidentidad!: number;
	public numerodocumento!: string;
	public razonsocial!: string;
	public direccion!: string;
	public idpais!: number;
	public idciudad!: number;
	public idmoneda!: number;
	public contacto!: string;
	public telefonos!: string;
	public fax!: string;
	public cuenta!: string;
	public idtipoproveedor!: number;
	public fechacreacion!: any;
	public codaduana!: string;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_sucursales {
	public idsucursal!: number;
	public idempresa!: number;
	public idzona!: number;
	public nombre!: string;
	public direccion!: string;
	public numero!: number;
	public telefonos!: string;
	public email!: string;
	public codigopostal!: string;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_tipodepagos {
	public idtipopago!: number;
	public descripcion!: string;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_unidaddemanejo {
	public idunidadmanejo!: number;
	public descripcion!: string;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class Operaciones {
	public Login(url: string, objeto: any) {
		return axios.post(url, objeto, {
			headers: { 'Content-Type': 'application/json' },
		  });
	  }
	public Logout(url: string, objeto: any) {
		return axios.post(url, objeto, {
			headers: { 'Content-Type': 'application/json' },
		  });
	  }
	public Consultar(url: string) {
	  return axios.post(url);
	}
	public Buscar(url: string, objeto: any) {
		return axios.post(url, objeto, {
			headers: { 'Content-Type': 'application/json' },
		  });
	  }
	  public Insertar(url: string, objeto: any) {
		  return axios.post(url, objeto, {
			  headers: { 'Content-Type': 'application/json' },
			});
		}
	public Actualizar(url: string, objeto: any) {
		return axios.put(url, objeto, {
		headers: { 'Content-Type': 'application/json' },
		});
	}
	public Eliminar(url: string, objeto: any) {
	  return axios.delete(url, {
		headers: { 'Content-Type': 'application/json' },
		data: objeto,
	  });
	}
  }
