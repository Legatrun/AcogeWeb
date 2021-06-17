import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as services from '@/services';
import swal from 'sweetalert2';
import moment from 'moment';
import * as popup from '@/popup';
import helpers from '@/helper';

@Component
export default class AdmZonasComponent extends Vue {
	private headers: any[] = [
		//{ text: 'IDZona', align: 'left', sortable: true, value: 'idzona', width: '15%' },
		{ text: 'idpais', align: 'left', sortable: false, value: 'idpais', width: '15%' },
		{ text: 'idciudad', align: 'left', sortable: false, value: 'idciudad', width: '15%' },
		{ text: 'descripcion', align: 'left', sortable: false, value: 'descripcion', width: '15%' },
		{ text: 'Operaciones', align: 'left', sortable: false, value: 'action', width: '20%' },
	];
	private WebApi = new services.Endpoints();

	private zonas = new services.clase_zonas();
	private lstzonas: services.clase_zonas[] = [];
	private lstzonascargar: services.clase_zonas[] = [];
	private buscarzonas = '';
	private pais = new services.clase_pais();
	private lstpais: services.clase_pais[] = [];
	private ciudades = new services.clase_ciudades();
	private lstciudades: services.clase_ciudades[] = [];
	private dialog = false;
	private operacion = '';
	private helper: helpers = new helpers();
	private popup = new popup.Swal();
	private activo = false;
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
		this.cargarPais();
		this.cargarCiudad();
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
	private Insertar(): void {
		this.zonas = new services.clase_zonas();
		this.operacion = 'Insert';
		this.dialog = true;
	}
	private Grabar() {
		if (this.operacion === 'Update') {
			new services.Operaciones().Actualizar(this.WebApi.ws_zonas_Actualizar, this.zonas)
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
		new services.Operaciones().Insertar(this.WebApi.ws_zonas_Insertar, this.zonas)
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
	private Actualizar(data: services.clase_zonas): void {
		new services.Operaciones().Buscar(this.WebApi.ws_zonas_Buscar, data )
			 .then((resZonas) => {	
					 this.lstzonascargar= resZonas.data._data;
					 this.zonas = this.lstzonascargar[0];
				 }).catch((err) => {   
				});
		this.operacion = 'Update';
		this.dialog = true;
	}
	private select_fecha(fecha: string) {
		return fecha.substr(0, 10);
	}
	private Eliminar(data: services.clase_zonas): void {
		swal.fire({
			title: 'Esta seguro de esta operacion?',
			text: 'Eliminacion de Registro ' +data.descripcion,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'green',
			cancelButtonColor: 'red',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Eliminar!',
		}).then((resultOfQuestion) => {
			if (resultOfQuestion.value) {
			new services.Operaciones().Eliminar(this.WebApi.ws_zonas_Eliminar, data)
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
	get lstzonasformateados(){
		return this.lstzonas.map((zonas : services.clase_zonas)=>{
			return{
				idzona: zonas.idzona,
				idpais: this.formatearpais(zonas.idpais),
				idciudad: this.formatearciudad(zonas.idciudad),
				descripcion: zonas.descripcion
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
	private formatearciudad(idciudad : Number){
		let ciudadLiteral: string = '';
			this.lstciudades.forEach(function(value){
				if(value.idciudad == idciudad){
					ciudadLiteral = value.descripcion;
				}
			});
		return ciudadLiteral;	
	}
}
