import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as services from '../../../services';
import swal from 'sweetalert2';
import moment from 'moment';
import * as popup from '@/popup';

@Component
export default class AdmTiposComprobantesComponent extends Vue {
	private headers: any[] = [
		// { text: 'IDTipoComprobante', align: 'left', sortable: true, value: 'idtipocomprobante', width: '15%' },
		{ text: 'Descripcion', align: 'left', sortable: false, value: 'descripcion', width: '15%' },
		{ text: 'Sigla', align: 'left', sortable: false, value: 'sigla', width: '15%' },
		{ text: 'Automatico', align: 'left', sortable: false, value: 'automatico', width: '15%' },
		{ text: 'Sucursal', align: 'left', sortable: false, value: 'idsucursal', width: '15%' },
		{ text: 'Operaciones', align: 'center', sortable: false, value: 'action', width: '5%' },
	];
	private WebApi = new services.Endpoints;

	private tiposcomprobantes = new services.clase_tiposcomprobantes();
	private lsttiposcomprobantes: services.clase_tiposcomprobantes[] = [];
	private sucursales = new services.clase_sucursales();
	private lstsucursales: services.clase_sucursales[] = [];
	private buscartiposcomprobantes = '';
	private dialog = false;
	private operacion = '';
	private popup = new popup.Swal();
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
	// /*eslint no-shadow: 'error'*/
	// if (this.$store.state.auth !== true) {
	// this.$router.push({ path: '/Login' });
	// }
		new services.Operaciones().Consultar(this.WebApi.ws_tiposcomprobantes_Consultar)
			.then((restiposcomprobantes) => {
				if (restiposcomprobantes.data._error.error === 0) {
					this.lsttiposcomprobantes = restiposcomprobantes.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', restiposcomprobantes.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
			this.cargarSucursales();
	}
	private cargarSucursales(){
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
	}
	private Insertar(): void {
		this.tiposcomprobantes = new services.clase_tiposcomprobantes();
		this.operacion = 'Insert';
		this.dialog = true;
	}
	private Grabar() {
		if (this.operacion === 'Update') {
			new services.Operaciones().Actualizar(this.WebApi.ws_tiposcomprobantes_Actualizar, this.tiposcomprobantes)
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
		new services.Operaciones().Insertar(this.WebApi.ws_tiposcomprobantes_Insertar, this.tiposcomprobantes)
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
	private Actualizar(data: services.clase_tiposcomprobantes): void {
		this.tiposcomprobantes = data;
		this.operacion = 'Update';
		this.dialog = true;
	}
	private select_fecha(fecha: string) {
		return fecha.substr(0, 10);
	}
	private Eliminar(data: services.clase_tiposcomprobantes): void {
		swal.fire({
			title: '¿Esta seguro de esta operación?',
			text: 'Eliminacion de Registro' + data.idtipocomprobante,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'green',
			cancelButtonColor: 'red',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Eliminar!',
		}).then((result) => {
			if (result.value) {
			new services.Operaciones().Eliminar(this.WebApi.ws_tiposcomprobantes_Eliminar, data)
				// tslint:disable-next-line: no-shadowed-variable
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
	//FORMATEO DE LOS ID POR LITERALES EN LISTA PRINCIPAL
	get lsttiposcomprobanteformateados(){
		return this.lsttiposcomprobantes.map((tiposcomprobantes : services.clase_tiposcomprobantes)=>{
			return{
				idtipocomprobate: tiposcomprobantes.idtipocomprobante,
				descripcion: tiposcomprobantes.descripcion,
				idsucursal: this.formatearidSucursal(tiposcomprobantes.idsucursal),
				automatico: tiposcomprobantes.automatico,
				sigla: tiposcomprobantes.sigla,
			}
		})
	}
	private formatearidSucursal(idsucursal : Number){
		let idsucursalLiteral: string = '';
			this.lstsucursales.forEach(function(value){
				if(value.idsucursal == idsucursal){
					idsucursalLiteral = value.nombre;
				}
			});
		return idsucursalLiteral;	
	}
	
}
