import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as services from '@/services';
import swal from 'sweetalert2';
import moment from 'moment';
import * as popup from '@/popup';
import helpers from '@/helper';

@Component
export default class AdmCtasPresupComponent extends Vue {
	
	private headers: any[] = [
		
		{ text: 'CuentaPresup', align: 'left', sortable: true, value: 'cuentapresup', width: '10%' },
		{ text: 'nombrecuentapresup', align: 'left', sortable: false, value: 'nombrecuentapresup', width: '10%' },
		{ text: 'idmoneda', align: 'left', sortable: false, value: 'idmoneda', width: '10%' },
		{ text: 'nivel', align: 'left', sortable: false, value: 'nivel', width: '10%' },
		{ text: 'fechacreacion', align: 'left', sortable: false, value: 'fechacreacion', width: '10%' },
		{ text: 'fechamodificacion', align: 'left', sortable: false, value: 'fechamodificacion', width: '10%' },
		{ text: 'balancecuenta', align: 'left', sortable: false, value: 'balancecuenta', width: '10%' },
		{ text: 'cuentaasiento', align: 'left', sortable: false, value: 'cuentaasiento', width: '10%' },
		{ text: 'grabado', align: 'left', sortable: false, value: 'grabado', width: '10%' },
		{ text: 'Operaciones', align: 'left', sortable: false, value: 'action', width: '10%' },
	];
	// tslint:disable-next-line: variable-name
	private menu_fechacreacion: boolean = false;
	// tslint:disable-next-line: variable-name
	private menu_fechamodificacion: boolean = false;
	private WebApi = new services.Endpoints();

	private ctaspresup = new services.clase_ctaspresup();
	private lstctaspresup: services.clase_ctaspresup[] = [];
	private buscarctaspresup = '';
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
		new services.Operaciones().Consultar(this.WebApi.ws_ctaspresup_Consultar)
			.then((resctaspresup) => {
				if (resctaspresup.data._error.error === 0) {
					this.lstctaspresup = resctaspresup.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', resctaspresup.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
	}
	private Insertar(): void {
		this.ctaspresup = new services.clase_ctaspresup();
		this.ctaspresup.fechacreacion = this.FormatDate(Date.now());
		this.ctaspresup.fechamodificacion = this.FormatDate(Date.now());
		this.operacion = 'Insert';
		this.dialog = true;
	}
	private Grabar() {
		if (this.operacion === 'Update') {
			new services.Operaciones().Actualizar(this.WebApi.ws_ctaspresup_Actualizar, this.ctaspresup)
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
		new services.Operaciones().Insertar(this.WebApi.ws_ctaspresup_Insertar, this.ctaspresup)
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
	private Actualizar(data: services.clase_ctaspresup): void {
		this.ctaspresup = data;
		this.ctaspresup.fechacreacion = this.FormatDate(Date.now());
		this.ctaspresup.fechamodificacion = this.FormatDate(Date.now());
		this.operacion = 'Update';
		this.dialog = true;
	}
	private select_fecha(fecha: string) {
		return fecha.substr(0, 10);
	}
	private Eliminar(data: services.clase_ctaspresup): void {
		swal.fire({
			title: 'Esta seguro de esta operacion?',
			text: 'Eliminacion de Registro ' + data.nombrecuentapresup,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'green',
			cancelButtonColor: 'red',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Eliminar!',
		}).then((resultOfQuestion) => {
			if (resultOfQuestion.value) {
			new services.Operaciones().Eliminar(this.WebApi.ws_ctaspresup_Eliminar, data)
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
