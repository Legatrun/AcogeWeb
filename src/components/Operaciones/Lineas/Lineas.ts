import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as services from '@/services';
import swal from 'sweetalert2';
import moment from 'moment';
import * as popup from '@/popup';
import helpers from '@/helper';

@Component
export default class AdmLineasComponent extends Vue {
	private headers: any[] = [
		//{ text: 'IDLinea', align: 'left', sortable: true, value: 'idlinea', width: '15%' },
		{ text: 'descripcion', align: 'left', sortable: false, value: 'descripcion', width: '15%' },
		{ text: 'cuenta', align: 'left', sortable: false, value: 'cuenta', width: '15%' },
		{ text: 'Operaciones', align: 'left', sortable: false, value: 'action', width: '20%' },
	];
	private WebApi = new services.Endpoints();

	private lineas = new services.clase_lineas();
	private lstlineas: services.clase_lineas[] = [];
	private lstcuentas: services.clase_cuentas[] = [];
	private buscarlineas = '';
	private dialog = false;
	private operacion = '';
	private helper: helpers = new helpers();
	private popup = new popup.Swal();
	private activo = false;
	validacion = [
		(v: any) => !!v || 'El campo es requerido',
    (v: any) => !/^\s*$/.test(v) || 'No se permite espacios vacios',
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
		this.CargarCuentas();
	}
	private cargar_data() {
		if (this.$store.state.auth !== true) {​​​​
			this.$router.push({​​​​ path: '/Login' }​​​​);​​​​
		}
		new services.Operaciones().Consultar(this.WebApi.ws_lineas_Consultar)
			.then((reslineas) => {
				if (reslineas.data._error.error === 0) {
					this.lstlineas = reslineas.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', reslineas.data._error.descripcion);
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
					console.log("Cuentas cargadas: "+JSON.stringify(this.lstcuentas))
				} else {
					this.popup.error('Consultar', rescuentas.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
	}
	private Insertar(): void {
		this.lineas = new services.clase_lineas();
		this.operacion = 'Insert';
		this.dialog = true;
	}
	private Grabar() {
		if (this.operacion === 'Update') {
			new services.Operaciones().Actualizar(this.WebApi.ws_lineas_Actualizar, this.lineas)
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
		new services.Operaciones().Insertar(this.WebApi.ws_lineas_Insertar, this.lineas)
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
	private Actualizar(data: services.clase_lineas): void {
		this.lineas = data;
		this.operacion = 'Update';
		this.dialog = true;
	}
	private select_fecha(fecha: string) {
		return fecha.substr(0, 10);
	}
	private Eliminar(data: services.clase_lineas): void {
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
			new services.Operaciones().Eliminar(this.WebApi.ws_lineas_Eliminar, data)
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
