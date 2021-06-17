import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as services from '@/services';
import swal from 'sweetalert2';
import moment from 'moment';
import * as popup from '@/popup';
import helpers from '@/helper';

@Component
export default class AdmBancosComponent extends Vue {
	private headers: any[] = [
		//{ text: 'IDBanco', align: 'left', sortable: true, value: 'idbanco', width: '15%' },
		{ text: 'nit', align: 'left', sortable: false, value: 'nit', width: '15%' },
		{ text: 'descripcion', align: 'left', sortable: false, value: 'descripcion', width: '15%' },
		{ text: 'bancopropio', align: 'left', sortable: false, value: 'bancopropio', width: '15%' },
		{ text: 'idpais', align: 'left', sortable: false, value: 'idpais', width: '15%' },
		{ text: 'idciudad', align: 'left', sortable: false, value: 'idciudad', width: '15%' },
		{ text: 'Operaciones', align: 'center', sortable: false, value: 'action', width: '20%' },
	];
	private WebApi = new services.Endpoints();

	private bancos = new services.clase_bancos();
	private lstbancos: services.clase_bancos[] = [];
	private lstbancosCargar: services.clase_bancos[] = [];
	private buscarbancos = '';
	private pais = new services.clase_pais();
	private lstpais: services.clase_pais[] = [];
	private ciudades = new services.clase_ciudades();
	private lstciudades: services.clase_ciudades[] = [];
	private dialog = false;
	private operacion = '';
	private helper: helpers = new helpers();
	private popup = new popup.Swal();
	private activo = false;
	private BancoPropio = false;
	validacion = [
	(v: any) => !!v || 'El campo es requerido',
    (v: any) => !/^\s*$/.test(v) || 'No se permite espacios vacios',
  ];
  validacionNIT = [
	(v: any) => !!v || 'El campo es requerido',
	(v: any) => !(!/^[0-9, -]*$/.test(v)) || "El campo sólo permite '-' como caracter especial",
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
		new services.Operaciones().Consultar(this.WebApi.ws_bancos_Consultar)
			.then((resbancos) => {
				if (resbancos.data._error.error === 0) {
					this.lstbancos = resbancos.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', resbancos.data._error.descripcion);
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
		this.bancos = new services.clase_bancos();
		this.operacion = 'Insert';
		this.dialog = true;
	}
	private Grabar() {
		this.bancos.bancopropio = this.BancoPropio;
		this.bancos.nit=this.bancos.nit.trim();
		if (this.operacion === 'Update') {
			new services.Operaciones().Actualizar(this.WebApi.ws_bancos_Actualizar, this.bancos)
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
		new services.Operaciones().Insertar(this.WebApi.ws_bancos_Insertar, this.bancos)
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
	private Actualizar(data: services.clase_bancos): void {
		new services.Operaciones().Buscar(this.WebApi.ws_bancos_Buscar, data )
			 .then((resBanco) => {	
					 this.lstbancosCargar= resBanco.data._data;
					 this.bancos = this.lstbancosCargar[0];
				 }).catch((err) => {   
				});
		this.operacion = 'Update';
		this.dialog = true;
	}
	private select_fecha(fecha: string) {
		return fecha.substr(0, 10);
	}
	private Eliminar(data: services.clase_bancos): void {
		swal.fire({
			title: 'Esta seguro de esta operacion?',
			text: 'Eliminacion de Registro ' + data.descripcion,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'green',
			cancelButtonColor: 'red',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Eliminar!',
		}).then((resultOfQuestion) => {
			if (resultOfQuestion.value) {
			new services.Operaciones().Eliminar(this.WebApi.ws_bancos_Eliminar, data)
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
	private newPais(){
		this.$router.push({​​​​ path: '/Pais' }​​​​);​​​​
	}
	private newCiudad(){
		this.$router.push({​​​​ path: '/Ciudades' }​​​​);​​​​
	}
	get lstbancosormateados(){
		return this.lstbancos.map((bancos : services.clase_bancos)=>{
			return{
				idbanco:bancos.idbanco,
				nit:bancos.nit,
				descripcion: bancos.descripcion,
				bancopropio: bancos.bancopropio,
				idpais: this.formatearPais(bancos.idpais),
				idciudad: this.formatearCiudad(bancos.idciudad)
			}
		})
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
	private formatearPais(idpais: Number){
		let paisLiteral: string = '';
			this.lstpais.forEach(function(value){
				if(value.idpais== idpais){
					paisLiteral = value.descripcion;
				}
			});
		return paisLiteral;	
	}
}
