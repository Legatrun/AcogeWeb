import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as services from '@/services';
import swal from 'sweetalert2';
import moment from 'moment';
import * as popup from '@/popup';
import helpers from '@/helper';

@Component
export default class AdmAsientosDetalleComponent extends Vue {
	private headers: any[] = [
		{ text: 'Tipo de Comprobante', align: 'left', sortable: true, value: 'idtipocomprobante', width: '10%' },
		{ text: 'Numero de Comprobante', align: 'left', sortable: true, value: 'numerocomprobante', width: '10%' },
		{ text: 'Nro de Linea', align: 'left', sortable: true, value: 'nrolinea', width: '10%' },
		{ text: 'Cuenta', align: 'left', sortable: false, value: 'cuenta', width: '10%' },
		{ text: 'Glosa de detalle', align: 'left', sortable: false, value: 'glosadetalle', width: '10%' },
		{ text: 'Tipo de movimiento', align: 'left', sortable: false, value: 'tipomov', width: '10%' },
		{ text: 'Monto en Bs', align: 'left', sortable: false, value: 'montobs', width: '10%' },
		{ text: 'Monto en Sus', align: 'left', sortable: false, value: 'montosus', width: '10%' },
		{ text: 'Operaciones', align: 'center', sortable: false, value: 'action', width: '10%' },
	];
	private WebApi = new services.Endpoints();

	private asientosdetalle = new services.clase_asientosdetalle();
	private lstasientosdetalle: services.clase_asientosdetalle[] = [];
	private buscarasientosdetalle = '';
	private dialog = false;
	private operacion = '';
	private helper: helpers = new helpers();
	private popup = new popup.Swal();
	private lstcuentas: services.clase_cuentas[] = [];
	CuentasRules = [
		(v: any) => !!v || "El campo es requerido",
		// (v:any) => (v && v.length<=20) || "No se permite mas de  20 caracteres",
		// (v: any) => (/^[0-9 ,-]*$/.test(v)) || "El campo sólo permite números y '-' como caracter especial",
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
		this.CargarCuentas();
	}
	private cargar_data() {
		if (this.$store.state.auth !== true) {​​​​
			this.$router.push({​​​​ path: '/Login' }​​​​);​​​​
		}
		new services.Operaciones().Consultar(this.WebApi.ws_asientosdetalle_Consultar)
			.then((resasientosdetalle) => {
				if (resasientosdetalle.data._error.error === 0) {
					this.lstasientosdetalle = resasientosdetalle.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', resasientosdetalle.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
	}
	private CargarCuentas(){
		new services.Operaciones().Consultar(this.WebApi.ws_cuentas_Consultar)
			.then((rescuentas) => {
				if (rescuentas.data._error.error === 0) {
					this.lstcuentas = rescuentas.data._data;
					// console.log("Cuentas cargadas: "+JSON.stringify(this.lstcuentas))
				} else {
					this.popup.error('Consultar', rescuentas.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
	}
	private Insertar(): void {
		this.asientosdetalle = new services.clase_asientosdetalle();
		this.operacion = 'Insert';
		this.dialog = true;
	}
	private Grabar() {
		if (this.operacion === 'Update') {
			new services.Operaciones().Actualizar(this.WebApi.ws_asientosdetalle_Actualizar, this.asientosdetalle)
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
		new services.Operaciones().Insertar(this.WebApi.ws_asientosdetalle_Insertar, this.asientosdetalle)
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
	private Actualizar(data: services.clase_asientosdetalle): void {
		this.asientosdetalle = data;
		this.operacion = 'Update';
		this.dialog = true;
	}
	private select_fecha(fecha: string) {
		return fecha.substr(0, 10);
	}
	private Eliminar(data: services.clase_asientosdetalle): void {
		swal.fire({
			title: '¿Esta seguro de esta operación?',
			text: 'Eliminacion de Registro' + data.idtipocomprobante + data.numerocomprobante + data.nrolinea,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'green',
			cancelButtonColor: 'red',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Eliminar!',
		}).then((resultOfQuestion) => {
			if (resultOfQuestion.value) {
			new services.Operaciones().Eliminar(this.WebApi.ws_asientosdetalle_Eliminar, data)
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
}
