import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as services from '@/services';
import swal from 'sweetalert2';
import moment from 'moment';
import * as popup from '@/popup';
import helpers from '@/helper';

@Component
export default class AdmSucursalesComponent extends Vue {
	private headers: any[] = [
		//{ text: 'IDSucursal', align: 'left', sortable: true, value: 'idsucursal', width: '10%' },
		{ text: 'idempresa', align: 'left', sortable: false, value: 'idempresa', width: '10%' },
		{ text: 'idzona', align: 'left', sortable: false, value: 'idzona', width: '10%' },
		{ text: 'nombre', align: 'left', sortable: false, value: 'nombre', width: '10%' },
		{ text: 'direccion', align: 'left', sortable: false, value: 'direccion', width: '10%' },
		{ text: 'numero', align: 'left', sortable: false, value: 'numero', width: '10%' },
		{ text: 'telefonos', align: 'left', sortable: false, value: 'telefonos', width: '10%' },
		{ text: 'email', align: 'left', sortable: false, value: 'email', width: '10%' },
		{ text: 'codigopostal', align: 'left', sortable: false, value: 'codigopostal', width: '10%' },
		{ text: 'Operaciones', align: 'left', sortable: false, value: 'action', width: '10%' },
	];
	private WebApi = new services.Endpoints();

	private sucursales = new services.clase_sucursales();
	private lstsucursales: services.clase_sucursales[] = [];
	private lstsucursalescargar: services.clase_sucursales[] = [];
	private lstempresa: services.clase_empresa[] = [];
	private buscarsucursales = '';
	private zonas = new services.clase_zonas();
	private lstzonas: services.clase_zonas[] = [];
	private dialog = false;
	private operacion = '';
	private helper: helpers = new helpers();
	private popup = new popup.Swal();
	private activo = false;
	
	validacion = [
		(v: any) => !!v || 'El campo es requerido',
    (v: any) => !/^\s*$/.test(v) || 'No se permite espacios vacios',
  ];
  correosRules = [
	(v: any) => !!v || 'El campo es requerido',
	(v: any) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || "Ingrese un correo valido",
	];
	Telefonorules = [
		(v: any) => !!v || 'El campo es requerido',
		(v: any) => (/^[0-9]*$/.test(v)) || 'No se permite espacios vacios ni caracteres especiales',
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
		new services.Operaciones().Consultar(this.WebApi.ws_sucursales_Consultar)
			.then((ressucursales) => {
				if (ressucursales.data._error.error === 0) {
					this.lstsucursales = ressucursales.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', ressucursales.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
			this.cargarZona();
			this.cargarempresa();
	}
	private cargarempresa(){
		new services.Operaciones().Consultar(this.WebApi.ws_empresa_Consultar)
			.then((resempresa) => {
				if (resempresa.data._error.error === 0) {
					this.lstempresa = resempresa.data._data;
				} else {
					this.popup.error('Consultar', resempresa.data._error.descripcion);
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
	private Insertar(): void {
		this.sucursales = new services.clase_sucursales();
		this.operacion = 'Insert';
		this.dialog = true;
	}
	private Grabar() {
		if (this.operacion === 'Update') {
			new services.Operaciones().Actualizar(this.WebApi.ws_sucursales_Actualizar, this.sucursales)
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
		new services.Operaciones().Insertar(this.WebApi.ws_sucursales_Insertar, this.sucursales)
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
	private Actualizar(data: services.clase_sucursales): void {
		new services.Operaciones().Buscar(this.WebApi.ws_sucursales_Buscar, data )
			 .then((ressucursales) => {	
					 this.lstsucursalescargar= ressucursales.data._data;
					 this.sucursales = this.lstsucursalescargar[0];
				 }).catch((err) => {   
				});
		this.operacion = 'Update';
		this.dialog = true;
	}
	private select_fecha(fecha: string) {
		return fecha.substr(0, 10);
	}
	private Eliminar(data: services.clase_sucursales): void {
		swal.fire({
			title: '¿Esta seguro de esta operación?',
			text: 'Eliminacion de Registro ' + data.nombre,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'green',
			cancelButtonColor: 'red',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Eliminar!',
		}).then((resultOfQuestion) => {
			if (resultOfQuestion.value) {
			new services.Operaciones().Eliminar(this.WebApi.ws_sucursales_Eliminar, data)
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

	get lstSucursalesFormat(){
		return this.lstsucursales.map((sucursales : services.clase_sucursales)=>{
			return{
				idsucursal: sucursales.idsucursal,
				codigoproveedor: sucursales.idsucursal,
				idempresa: this.formatearempresa(sucursales.idempresa),
				idzona: this.formatearZona(sucursales.idzona),
				nombre: sucursales.nombre,
				numero: sucursales.numero,
				telefonos: sucursales.telefonos,
				codigopostal: sucursales.codigopostal,
				direccion: sucursales.direccion,
				email: sucursales.email
			}
		})
	}
	private formatearempresa(idempresa : Number){
		let empresaLiteral: string = '';
			this.lstempresa.forEach(function(value){
				if(value.idempresa == idempresa){
					empresaLiteral = value.descripcion;
				}
			});
		return empresaLiteral;	
	}
	private formatearZona(idzona: Number){
		let zonaLiteral: string = '';
			this.lstzonas.forEach(function(value){
				if(value.idzona == idzona){
					zonaLiteral = value.descripcion;
				}
			});
		return zonaLiteral;	
	}
}
