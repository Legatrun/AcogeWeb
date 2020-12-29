import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as services from '@/services';
import swal from 'sweetalert2';
import moment from 'moment';
import * as popup from '@/popup';
import helpers from '@/helper';

@Component
export default class AdmItemsComponent extends Vue {
	private headers: any[] = [
		{ text: 'CodigoItem', align: 'left', sortable: true, value: 'codigoitem', width: '15%' },
		{ text: 'modelonroparte', align: 'left', sortable: false, value: 'modelonroparte', width: '15%' },
		{ text: 'descripcion', align: 'left', sortable: false, value: 'descripcion', width: '15%' },
		{ text: 'fechacreacion', align: 'left', sortable: false, value: 'fechacreacion', width: '15%' },
		{ text: 'fechaultimomovimiento', align: 'left', sortable: false, value: 'fechaultimomovimiento', width: '15%' },
		{ text: 'costoinicial', align: 'left', sortable: false, value: 'costoinicial', width: '15%' },
		{ text: 'costoactual', align: 'left', sortable: false, value: 'costoactual', width: '15%' },
		{ text: 'saldoinicial', align: 'left', sortable: false, value: 'saldoinicial', width: '15%' },
		{ text: 'saldoactual', align: 'left', sortable: false, value: 'saldoactual', width: '15%' },
		{ text: 'idclase', align: 'left', sortable: false, value: 'idclase', width: '15%' },
		{ text: 'idtipoitem', align: 'left', sortable: false, value: 'idtipoitem', width: '15%' },
		{ text: 'idunidadmanejo', align: 'left', sortable: false, value: 'idunidadmanejo', width: '15%' },
		{ text: 'codigoitemsup', align: 'left', sortable: false, value: 'codigoitemsup', width: '15%' },
		{ text: 'cantidadminima', align: 'left', sortable: false, value: 'cantidadminima', width: '15%' },
		{ text: 'cantidadmaxima', align: 'left', sortable: false, value: 'cantidadmaxima', width: '15%' },
		{ text: 'Operaciones', align: 'center', sortable: false, value: 'action', width: '20%' },
	];
	// tslint:disable-next-line: variable-name
	private menu_fechacreacion: boolean = false;
	// tslint:disable-next-line: variable-name
	private menu_fechaultimomovimiento: boolean = false;
	private WebApi = new services.Endpoints();

	private items = new services.clase_items();
	private lstitems: services.clase_items[] = [];
	private buscaritems = '';
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
		new services.Operaciones().Consultar(this.WebApi.ws_items_Consultar)
			.then((resitems) => {
				if (resitems.data._error.error === 0) {
					this.lstitems = resitems.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', resitems.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
	}
	private Insertar(): void {
		this.items = new services.clase_items();
		this.items.fechacreacion = this.FormatDate(Date.now());
		this.items.fechaultimomovimiento = this.FormatDate(Date.now());
		this.operacion = 'Insert';
		this.dialog = true;
	}
	private Grabar() {
		if (this.operacion === 'Update') {
			new services.Operaciones().Actualizar(this.WebApi.ws_items_Actualizar, this.items)
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
		new services.Operaciones().Insertar(this.WebApi.ws_items_Insertar, this.items)
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
	private Actualizar(data: services.clase_items): void {
		this.items = data;
		this.items.fechacreacion = this.FormatDate(Date.now());
		this.items.fechaultimomovimiento = this.FormatDate(Date.now());
		this.operacion = 'Update';
		this.dialog = true;
	}
	private select_fecha(fecha: string) {
		return fecha.substr(0, 10);
	}
	private Eliminar(data: services.clase_items): void {
		swal.fire({
			title: 'Esta seguro de esta operacion?',
			text: 'Eliminacion de Registro' + data.codigoitem,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'green',
			cancelButtonColor: 'red',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Eliminar!',
		}).then((resultOfQuestion) => {
			if (resultOfQuestion.value) {
			new services.Operaciones().Eliminar(this.WebApi.ws_items_Eliminar, data)
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
