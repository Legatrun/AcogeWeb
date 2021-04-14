import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as services from '@/services';
import swal from 'sweetalert2';
import moment from 'moment';
import * as popup from '@/popup';
import helpers from '@/helper';

@Component
export default class AdmProveedoresComponent extends Vue {
	private headers: any[] = [
		{ text: 'CodigoProveedor', align: 'left', sortable: true, value: 'codigoproveedor', width: '5%' },
		{ text: 'iddocumentoidentidad', align: 'left', sortable: false, value: 'iddocumentoidentidad', width: '5%' },
		{ text: 'numerodocumento', align: 'left', sortable: false, value: 'numerodocumento', width: '5%' },
		{ text: 'razonsocial', align: 'left', sortable: false, value: 'razonsocial', width: '5%' },
		{ text: 'direccion', align: 'left', sortable: false, value: 'direccion', width: '5%' },
		{ text: 'idpais', align: 'left', sortable: false, value: 'idpais', width: '5%' },
		{ text: 'idciudad', align: 'left', sortable: false, value: 'idciudad', width: '5%' },
		{ text: 'idmoneda', align: 'left', sortable: false, value: 'idmoneda', width: '5%' },
		{ text: 'contacto', align: 'left', sortable: false, value: 'contacto', width: '5%' },
		{ text: 'telefonos', align: 'left', sortable: false, value: 'telefonos', width: '5%' },
		{ text: 'fax', align: 'left', sortable: false, value: 'fax', width: '5%' },
		{ text: 'cuenta', align: 'left', sortable: false, value: 'cuenta', width: '5%' },
		{ text: 'idtipoproveedor', align: 'left', sortable: false, value: 'idtipoproveedor', width: '5%' },
		{ text: 'fechacreacion', align: 'left', sortable: false, value: 'fechacreacion', width: '5%' },
		{ text: 'codaduana', align: 'left', sortable: false, value: 'codaduana', width: '5%' },
		{ text: 'Operaciones', align: 'left', sortable: false, value: 'action', width: '10%' },
	];
	// tslint:disable-next-line: variable-name
	private menu_fechacreacion: boolean = false;
	private WebApi = new services.Endpoints();
	private proveedores = new services.clase_proveedores();
	private lstproveedores: services.clase_proveedores[] = [];
	private lstproveedorescargar: services.clase_proveedores[] = [];
	private buscarproveedores = '';
	private pais = new services.clase_pais();
	private lstpais: services.clase_pais[] = [];
	private tipodocumentosidentidad = new services.clase_tipodocumentosidentidad();
	private lsttipodocumentosidentidad: services.clase_tipodocumentosidentidad[] = [];
	private ciudades = new services.clase_ciudades();
	private lstciudades: services.clase_ciudades[] = [];
	private monedas = new services.clase_monedas();
	private lstmonedas: services.clase_monedas[] = [];
	private tiposproveedor = new services.clase_tiposproveedor();
	private lsttiposproveedor: services.clase_tiposproveedor[] = [];
	private dialog = false;
	private operacion = '';
	private helper: helpers = new helpers();
	private popup = new popup.Swal();
	private activo = false;
	validacion = [
		(v: any) => !!v || 'El campo es requerido',
    (v: any) => !/^\s*$/.test(v) || 'No se permite espacios vacios',
  ];
  Codigorules = [
	(v: any) => !!v || 'El campo es requerido',
	(v: any) => (/^[0-9]*$/.test(v)) || 'No se permite espacios vacios ni caracteres especiales',
	];
	NumeroDocrules = [
		(v: any) => !!v || 'El campo es requerido',
		(v: any) => (/^[0-9,-]*$/.test(v)) || 'No se permite espacios vacios ni caracteres especiales solo "-',
		];
		cuentasrules = [
			(v: any) => !!v || 'El campo es requerido',
			(v: any) => (/^[0-9,-]*$/.test(v)) || 'No se permite espacios vacios ni caracteres especiales solo "-" ',
			];
	private FormatDate(data: any) {
		return moment(data).format('YYYY-MM-DD');
	}
	private FormatBoolean(data: any) {
		if (data) {
			return 'SI';
		} else {
			return 'NO';
		}
	}
	private updateText(Value: string) {
		if (Value !== null) {
			return Value.toUpperCase();
		} else {
			return Value;
		}
	}
	private mounted() {
		this.cargar_data();
	}
	private cargar_data() {
		if (this.$store.state.auth !== true) {​​​​
			this.$router.push({​​​​ path: '/Login' }​​​​);​​​​
		}
		new services.Operaciones().Consultar(this.WebApi.ws_proveedores_Consultar)
			.then((resproveedores) => {
				if (resproveedores.data._error.error === 0) {
					this.lstproveedores = resproveedores.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', resproveedores.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
			this.cargartipoDocumentoIdentidad();
			this.cargarPais();
			this.cargarMoneda();
			this.cargarTipoProveedor();
			this.cargarCiudad();
	}
	private cargartipoDocumentoIdentidad(){
		new services.Operaciones().Consultar(this.WebApi.ws_tipodocumentosidentidad_Consultar)
			.then((restipodocumentosidentidad) => {
				if (restipodocumentosidentidad.data._error.error === 0) {
					this.lsttipodocumentosidentidad = restipodocumentosidentidad.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', restipodocumentosidentidad.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
	}
	private cargarPais(){
		new services.Operaciones().Consultar(this.WebApi.ws_pais_Consultar)
			.then((respais) => {
				if (respais.data._error.error === 0) {
					this.lstpais = respais.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', respais.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
	}
	private cargarMoneda(){
		new services.Operaciones().Consultar(this.WebApi.ws_monedas_Consultar)
			.then((resmonedas) => {
				if (resmonedas.data._error.error === 0) {
					this.lstmonedas = resmonedas.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', resmonedas.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
	}
	private cargarTipoProveedor(){
		new services.Operaciones().Consultar(this.WebApi.ws_tiposproveedor_Consultar)
			.then((restiposproveedor) => {
				if (restiposproveedor.data._error.error === 0) {
					this.lsttiposproveedor = restiposproveedor.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', restiposproveedor.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
	}
	private cargarCiudad(){
		new services.Operaciones().Consultar(this.WebApi.ws_ciudades_Consultar)
		.then((resciudades) => {
			if (resciudades.data._error.error === 0) {
				this.lstciudades = resciudades.data._data;
				this.dialog = false;
			} else {
				this.popup.error('Consultar', resciudades.data._error.descripcion);
			}
		}).catch((error) => {
				this.popup.error('Consultar', 'Error Inesperado: ' + error);
		});
	}
	private Insertar(): void {
		this.proveedores = new services.clase_proveedores();
		this.proveedores.fechacreacion = this.FormatDate(Date.now());
		this.operacion = 'Insert';
		this.dialog = true;
	}
	private Grabar() {
		if (this.operacion === 'Update') {
			new services.Operaciones().Actualizar(this.WebApi.ws_proveedores_Actualizar, this.proveedores)
			.then((result) => {
				if (result.data.error === 0) {
					this.popup.success('Actualizar', result.data.descripcion);
				this.cargar_data();
				this.dialog = false;
			} else {
			this.popup.error('Actualizar', result.data.descripcion);
			}
		})
		.catch((error) => {
			this.popup.error('Actualizar', 'Error Inesperado: ' + error);
			});
	} else {
		new services.Operaciones().Insertar(this.WebApi.ws_proveedores_Insertar, this.proveedores)
		.then((result) => {
			if (result.data.error === 0) {
			this.popup.success('Insertar', result.data.descripcion);
			this.cargar_data();
			this.dialog = false;
			} else {
			this.popup.error('Insertar', result.data.descripcion);
			}
		})
		.catch((error) => {
			this.popup.error('Insertar', 'Error Inesperado: ' + error);
			});
		}
	}
	private Cancelar() {
		this.cargar_data();
		this.dialog = false;
	}
	private Actualizar(data: services.clase_proveedores): void {
		new services.Operaciones().Buscar(this.WebApi.ws_proveedores_Buscar, data )
			 .then((resProveedores) => {	
					 this.lstproveedorescargar= resProveedores.data._data;
					 this.proveedores = this.lstproveedorescargar[0];
				 }).catch((err) => {   
				});
		this.operacion = 'Update';
		this.dialog = true;
		// this.proveedores.fechacreacion = this.FormatDate(Date.now());

	}
	private select_fecha(fecha: string) {
		return fecha.substr(0, 10);
	}
	private Eliminar(data: services.clase_proveedores): void {
		swal.fire({
			title: 'Esta seguro de esta operacion?',
			text: 'Eliminacion de Registro ' +'Proveedor '+ data.codigoproveedor,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'green',
			cancelButtonColor: 'red',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Eliminar!',
		}).then((resultOfQuestion) => {
			if (resultOfQuestion.value) {
			new services.Operaciones().Eliminar(this.WebApi.ws_proveedores_Eliminar, data)
				.then((result) => {
				if (result.data.error === 0) {
					swal.fire({
					type: 'success',
					title: 'Eliminar',
					text: result.data.descripcion,
					showConfirmButton: false,
					timer: 2000,
				});
				this.cargar_data();
				} else {
					swal.fire({
						type: 'error',
						title: 'Eliminar',
						text: result.data.descripcion,
						showConfirmButton: false,
						timer: 2000,
					});
				}
			}).catch((error) => {
				swal.fire({
					type: 'error',
					title: 'Eliminar',
					text: 'Error Inesperado',
					showConfirmButton: false,
					timer: 2000,
				});
			});
		}
		});
	}
	get lstproveedoresformateados(){
		return this.lstproveedores.map((proveedores : services.clase_proveedores)=>{
			return{
				codigoproveedor: proveedores.codigoproveedor,
				iddocumentoidentidad: this.formatearDocumentoIdentidad(proveedores.iddocumentoidentidad),
				numerodocumento: proveedores.numerodocumento,
				razonsocial: proveedores.razonsocial,
				direccion: proveedores.direccion,
				idpais: this.formatearpais(proveedores.idpais),
				idciudad: this.formatearCiudad(proveedores.idciudad),
				idmoneda: this.formatearMoneda(proveedores.idmoneda),
				contacto: proveedores.contacto,
				telefonos: proveedores.telefonos,
				fax: proveedores.fax,
				cuenta: proveedores.cuenta,
				idtipoproveedor: this.formatearTipoProveedor(proveedores.idtipoproveedor),
				fechacreacion:proveedores.fechacreacion,
				codaduana: proveedores.codaduana
			}
		})
	}
	private formatearpais(idpais : Number){
		let paisLiteral: string = '';
			this.lstpais.forEach(function(value){
				if(value.idpais == idpais){
					paisLiteral = value.descripcion;
				}
			});
		return paisLiteral;	
	}
	private formatearMoneda(idmoneda: Number){
		let monedaLiteral: string = '';
			this.lstmonedas.forEach(function(value){
				if(value.idmoneda == idmoneda){
					monedaLiteral = value.descripcion;
				}
			});
		return monedaLiteral;	
	}
	private formatearCiudad(idciudad: Number){
		let ciudadLiteral: string = '';
			this.lstciudades.forEach(function(value){
				if(value.idciudad == idciudad){
					ciudadLiteral = value.descripcion;
				}
			});
		return ciudadLiteral;	
	}
	private formatearTipoProveedor(idtipoproveedor: Number){
		let tipoproveedorLiteral: string = '';
			this.lsttiposproveedor.forEach(function(value){
				if(value.idtipoproveedor == idtipoproveedor){
					tipoproveedorLiteral = value.descripcion;
				}
			});
		return tipoproveedorLiteral;	
	}
	private formatearDocumentoIdentidad(iddocumentoidentidad: Number){
		let documentoidentidadLiteral: string = '';
			this.lsttipodocumentosidentidad.forEach(function(value){
				if(value.iddocumentoidentidad == iddocumentoidentidad){
					documentoidentidadLiteral = value.descripcion;
				}
			});
		return documentoidentidadLiteral;	
	}
}
