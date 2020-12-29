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
		{ text: 'IDSucursal', align: 'left', sortable: true, value: 'idsucursal', width: '15%' },
		{ text: 'idempresa', align: 'left', sortable: false, value: 'idempresa', width: '15%' },
		{ text: 'idzona', align: 'left', sortable: false, value: 'idzona', width: '15%' },
		{ text: 'nombre', align: 'left', sortable: false, value: 'nombre', width: '15%' },
		{ text: 'direccion', align: 'left', sortable: false, value: 'direccion', width: '15%' },
		{ text: 'numero', align: 'left', sortable: false, value: 'numero', width: '15%' },
		{ text: 'telefonos', align: 'left', sortable: false, value: 'telefonos', width: '15%' },
		{ text: 'email', align: 'left', sortable: false, value: 'email', width: '15%' },
		{ text: 'codigopostal', align: 'left', sortable: false, value: 'codigopostal', width: '15%' },
		{ text: 'Operaciones', align: 'center', sortable: false, value: 'action', width: '20%' },
	];
	private WebApi = new services.Endpoints();

	private sucursales = new services.clase_sucursales();
	private lstsucursales: services.clase_sucursales[] = [];
	private buscarsucursales = '';
	private dialog = false;
	private operacion = '';
	private helper: helpers = new helpers();
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
		this.sucursales = data;
		this.operacion = 'Update';
		this.dialog = true;
	}
	private select_fecha(fecha: string) {
		return fecha.substr(0, 10);
	}
	private Eliminar(data: services.clase_sucursales): void {
		swal.fire({
			title: 'Esta seguro de esta operacion?',
			text: 'Eliminacion de Registro' + data.idsucursal,
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
}
