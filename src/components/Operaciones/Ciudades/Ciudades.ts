import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as services from '@/services';
import swal from 'sweetalert2';
import moment from 'moment';
import * as popup from '@/popup';
import helpers from '@/helper';

@Component
export default class AdmCiudadesComponent extends Vue {
	private headers: any[] = [
		//{ text: 'IDCiudad', align: 'left', sortable: true, value: 'idciudad', width: '15%' },
		{ text: 'País', align: 'left', sortable: false, value: 'idpais', width: '15%' },
		{ text: 'Descripción', align: 'left', sortable: false, value: 'descripcion', width: '15%' },
		{ text: 'Sigla', align: 'left', sortable: false, value: 'sigla', width: '15%' },
		{ text: 'Moneda', align: 'left', sortable: false, value: 'idmoneda', width: '15%' },
		{ text: 'Operaciones', align: 'left', sortable: false, value: 'action', width: '5%' },
	];
	private WebApi = new services.Endpoints();

	private ciudades = new services.clase_ciudades();
	private lstciudades: services.clase_ciudades[] = [];
	private lstciudadesCargar: services.clase_ciudades[] = [];
	private buscarciudades = '';
	private monedas = new services.clase_monedas();
	private lstmonedas: services.clase_monedas[] = [];
	private pais = new services.clase_pais();
	private lstpais: services.clase_pais[] = [];
	private dialog = false;
	private operacion = '';
	private helper: helpers = new helpers();
	private popup = new popup.Swal();
	private activo = false;
	validacion = [
		(v: any) => !!v || 'El campo es requerido',
    	(v: any) => !/^\s*$/.test(v) || 'No se permiten espacios vacios',
  ];
  valiaSigla = [
	(v: any) => !!v || 'El campo es requerido',
	(v:any) => (v && v.length<=5) || "No se permite mas de  5 caracteres",
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
			this.cargarMonedas();
			this.cargarPais();
	}
	private cargarMonedas(){
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
	private Insertar(): void {
		this.ciudades = new services.clase_ciudades();
		this.operacion = 'Insert';
		this.dialog = true;
	}
	private Grabar() {
		if (this.operacion === 'Update') {
			new services.Operaciones().Actualizar(this.WebApi.ws_ciudades_Actualizar, this.ciudades)
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
		new services.Operaciones().Insertar(this.WebApi.ws_ciudades_Insertar, this.ciudades)
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
	private Actualizar(data: services.clase_ciudades): void {
		new services.Operaciones().Buscar(this.WebApi.ws_ciudades_Buscar, data )
		.then((resCiudades) => {	
				this.lstciudadesCargar= resCiudades.data._data;
				this.ciudades = this.lstciudadesCargar[0];
			}).catch((err) => {   
		   });
		this.operacion = 'Update';
		this.dialog = true;
	}
	private select_fecha(fecha: string) {
		return fecha.substr(0, 10);
	}
	private Eliminar(data: services.clase_ciudades): void {
		swal.fire({
			title: '¿Esta seguro de esta operación?',
			text: 'Eliminacion de Registro ' + data.descripcion,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'green',
			cancelButtonColor: 'red',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Eliminar!',
		}).then((resultOfQuestion) => {
			if (resultOfQuestion.value) {
			new services.Operaciones().Eliminar(this.WebApi.ws_ciudades_Eliminar, data)
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
	private newMoneda(){
		this.$router.push({​​​​ path: '/Monedas' }​​​​);​​​​
	}
	get lstciudadesformateados(){
		return this.lstciudades.map((ciudades : services.clase_ciudades)=>{
			return{
				idpais: this.formatearpais(ciudades.idpais),
				idciudad: ciudades.idciudad,
				descripcion: ciudades.descripcion,
				sigla: ciudades.sigla,
				idmoneda: this.formatearMoneda(ciudades.idmoneda)
				
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
}
