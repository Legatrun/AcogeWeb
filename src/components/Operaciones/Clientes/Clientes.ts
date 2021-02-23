import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as services from '@/services';
import swal from 'sweetalert2';
import moment from 'moment';
import * as popup from '@/popup';
import helpers from '@/helper';

@Component
export default class AdmClientesComponent extends Vue {
	private headers: any[] = [
		{ text: 'CodigoCliente', align: 'left', sortable: true, value: 'codigocliente', width: '5%' },
		{ text: 'codigoclienteprincipal', align: 'left', sortable: false, value: 'codigoclienteprincipal', width: '5%' },
		{ text: 'iddocumentoidentidad', align: 'left', sortable: false, value: 'iddocumentoidentidad', width: '5%' },
		{ text: 'numerodocumento', align: 'left', sortable: false, value: 'numerodocumento', width: '5%' },
		{ text: 'razonsocial', align: 'left', sortable: false, value: 'razonsocial', width: '5%' },
		{ text: 'idpais', align: 'left', sortable: false, value: 'idpais', width: '5%' },
		{ text: 'idciudad', align: 'left', sortable: false, value: 'idciudad', width: '5%' },
		{ text: 'idzona', align: 'left', sortable: false, value: 'idzona', width: '5%' },
		{ text: 'idtipocliente', align: 'left', sortable: false, value: 'idtipocliente', width: '5%' },
		{ text: 'descripciondireccion', align: 'left', sortable: false, value: 'descripciondireccion', width: '5%' },
		{ text: 'telefono', align: 'left', sortable: false, value: 'telefono', width: '5%' },
		{ text: 'correoelectronico', align: 'left', sortable: false, value: 'correoelectronico', width: '5%' },
		{ text: 'casillacorreo', align: 'left', sortable: false, value: 'casillacorreo', width: '5%' },
		{ text: 'cuentacontable', align: 'left', sortable: false, value: 'cuentacontable', width: '5%' },
		{ text: 'cuentacontableanticipos', align: 'left', sortable: false, value: 'cuentacontableanticipos', width: '5%' },
		{ text: 'activo', align: 'left', sortable: false, value: 'activo', width: '5%' },
		{ text: 'Operaciones', align: 'left', sortable: false, value: 'action', width: '5%' },
	];
	private WebApi = new services.Endpoints();

	private clientes = new services.clase_clientes();
	private lstclientes: services.clase_clientes[] = [];
	private buscarclientes = '';
	private tipodocumentosidentidad = new services.clase_tipodocumentosidentidad();
	private lsttipodocumentosidentidad: services.clase_tipodocumentosidentidad[] = [];
	private tiposcliente = new services.clase_tiposcliente();
	private lsttiposcliente: services.clase_tiposcliente[] = [];
	private pais = new services.clase_pais();
	private lstpais: services.clase_pais[] = [];
	private ciudades = new services.clase_ciudades();
	private lstciudades: services.clase_ciudades[] = [];
	private zonas = new services.clase_zonas();
	private lstzonas: services.clase_zonas[] = [];
	private dialog = false;
	private operacion = '';
	private helper: helpers = new helpers();
	private popup = new popup.Swal();
	private activo = false;
	private dialogPrueba = true;
	validacion = [
		(v: any) => !!v || 'El campo es requerido',
    (v: any) => !/^\s*$/.test(v) || 'No se permite espacios vacios',
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
		new services.Operaciones().Consultar(this.WebApi.ws_clientes_Consultar)
			.then((resclientes) => {
				if (resclientes.data._error.error === 0) {
					this.lstclientes = resclientes.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', resclientes.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
			this.cargarDocumentoIdentidad();
			this.cargarPais();
			this.cargarCiudad();
			this.cargarZona();
			this.cargarTipoCliente();
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
	private cargarZona(){
		new services.Operaciones().Consultar(this.WebApi.ws_zonas_Consultar)
			.then((reszonas) => {
				if (reszonas.data._error.error === 0) {
					this.lstzonas = reszonas.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', reszonas.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
	}
	private cargarDocumentoIdentidad(){
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
	private cargarTipoCliente(){
		new services.Operaciones().Consultar(this.WebApi.ws_tiposcliente_Consultar)
			.then((restiposcliente) => {
				if (restiposcliente.data._error.error === 0) {
					this.lsttiposcliente = restiposcliente.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', restiposcliente.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
	}
	private Insertar(): void {
		this.clientes = new services.clase_clientes();
		this.operacion = 'Insert';
		this.dialog = true;
	}
	private Grabar() {
		if (this.operacion === 'Update') {
			new services.Operaciones().Actualizar(this.WebApi.ws_clientes_Actualizar, this.clientes)
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
		new services.Operaciones().Insertar(this.WebApi.ws_clientes_Insertar, this.clientes)
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
	private Actualizar(data: services.clase_clientes): void {
		this.clientes = data;
		this.operacion = 'Update';
		this.dialog = true;
	}
	private select_fecha(fecha: string) {
		return fecha.substr(0, 10);
	}
	private Eliminar(data: services.clase_clientes): void {
		swal.fire({
			title: 'Esta seguro de esta operacion?',
			text: 'Eliminacion de Registro ' + data.codigocliente,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'green',
			cancelButtonColor: 'red',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Eliminar!',
		}).then((resultOfQuestion) => {
			if (resultOfQuestion.value) {
			new services.Operaciones().Eliminar(this.WebApi.ws_clientes_Eliminar, data)
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
	get lstclientesformateados(){
		return this.lstclientes.map((clientes : services.clase_clientes)=>{
			return{
				codigocliente:clientes.codigocliente,
				codigoclienteprincipal:clientes.codigoclienteprincipal,
				iddocumentoidentidad:clientes.iddocumentoidentidad,
				numerodocumento:clientes.numerodocumento,
				razonsocial:clientes.razonsocial,
				idpais:this.formatearpais(clientes.idpais),
				idciudad:this.formatearCiudad(clientes.idciudad),
				idzona:this.formatearzona(clientes.idzona),
				idtipocliente:this.formateartipocliente(clientes.idtipocliente),
				descripciondireccion:clientes.descripciondireccion,
				telefono:clientes.telefono,
				correoelectronico:clientes.correoelectronico,
				casillacorreo:clientes.casillacorreo,
				cuentacontable:clientes.cuentacontable,
				cuentacontableanticipos:clientes.cuentacontableanticipos,
				activo: clientes.activo
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
	private formatearCiudad(idciudad : Number){
		let ciudadLiteral: string = '';
			this.lstciudades.forEach(function(value){
				if(value.idciudad == idciudad){
					ciudadLiteral = value.descripcion;
				}
			});
		return ciudadLiteral;	
	}
	private formatearzona(idzona : Number){
		let zonaLiteral: string = '';
			this.lstzonas.forEach(function(value){
				if(value.idzona == idzona){
					zonaLiteral = value.descripcion;
				}
			});
		return zonaLiteral;	
	}
	private formateartipocliente(idtipocliente : Number){
		let tipoclienteLiteral: string = '';
			this.lsttiposcliente.forEach(function(value){
				if(value.idtipocliente == idtipocliente){
					tipoclienteLiteral = value.descripcion;
				}
			});
		return tipoclienteLiteral;	
	}
}
