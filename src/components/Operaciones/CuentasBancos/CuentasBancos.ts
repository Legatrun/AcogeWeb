import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as services from '@/services';
import swal from 'sweetalert2';
import moment from 'moment';
import * as popup from '@/popup';
import helpers from '@/helper';

@Component
export default class AdmCuentasBancosComponent extends Vue {
	private headers: any[] = [
		{ text: 'IDBanco', align: 'left', sortable: true, value: 'idbanco', width: '15%' },
		{ text: 'NroCuenta', align: 'left', sortable: true, value: 'nrocuenta', width: '15%' },
		{ text: 'idmoneda', align: 'left', sortable: false, value: 'idmoneda', width: '15%' },
		{ text: 'saldoactual', align: 'left', sortable: false, value: 'saldoactual', width: '15%' },
		{ text: 'cuentacontable', align: 'left', sortable: false, value: 'cuentacontable', width: '15%' },
		{ text: 'fechaapertura', align: 'left', sortable: false, value: 'fechaapertura', width: '15%' },
		{ text: 'Operaciones', align: 'center', sortable: false, value: 'action', width: '20%' },
	];
	// tslint:disable-next-line: variable-name
	private menu_fechaapertura: boolean = false;
	private WebApi = new services.Endpoints();

	private cuentasbancos = new services.clase_cuentasbancos();
	private lstcuentasbancos: services.clase_cuentasbancos[] = [];
	private buscarcuentasbancos = '';
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
		new services.Operaciones().Consultar(this.WebApi.ws_cuentasbancos_Consultar)
			.then((rescuentasbancos) => {
				if (rescuentasbancos.data._error.error === 0) {
					this.lstcuentasbancos = rescuentasbancos.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', rescuentasbancos.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
	}
	private Insertar(): void {
		this.cuentasbancos = new services.clase_cuentasbancos();
		this.cuentasbancos.fechaapertura = this.FormatDate(Date.now());
		this.operacion = 'Insert';
		this.dialog = true;
	}
	private Grabar() {
		if (this.operacion === 'Update') {
			new services.Operaciones().Actualizar(this.WebApi.ws_cuentasbancos_Actualizar, this.cuentasbancos)
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
		new services.Operaciones().Insertar(this.WebApi.ws_cuentasbancos_Insertar, this.cuentasbancos)
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
	private Actualizar(data: services.clase_cuentasbancos): void {
		this.cuentasbancos = data;
		this.cuentasbancos.fechaapertura = this.FormatDate(Date.now());
		this.operacion = 'Update';
		this.dialog = true;
	}
	private select_fecha(fecha: string) {
		return fecha.substr(0, 10);
	}
	private Eliminar(data: services.clase_cuentasbancos): void {
		swal.fire({
			title: 'Esta seguro de esta operacion?',
			text: 'Eliminacion de Registro' + data.idbanco + data.nrocuenta,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'green',
			cancelButtonColor: 'red',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Eliminar!',
		}).then((resultOfQuestion) => {
			if (resultOfQuestion.value) {
			new services.Operaciones().Eliminar(this.WebApi.ws_cuentasbancos_Eliminar, data)
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
