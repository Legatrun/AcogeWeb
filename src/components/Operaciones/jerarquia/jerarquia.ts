import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as services from '@/services';
import swal from 'sweetalert2';
import moment from 'moment';
import * as popup from '@/popup';
import helpers from '@/helper';

@Component
export default class AdmjerarquiaComponent extends Vue {
	private headers: any[] = [
		{ text: 'Codigo de  jerarquia', align: 'left', sortable: true, value: 'jerarquia', width: '25%' },
		{ text: 'Nombre', align: 'left', sortable: false, value: 'nombre', width: '25%' },
		{ text: 'Operaciones', align: 'center', sortable: false, value: 'action', width: '15%' },
	];
	private WebApi = new services.Endpoints();

	private jerarquia = new services.clase_jerarquia();
	private lstjerarquia: services.clase_jerarquia[] = [];
	private buscarjerarquia = '';
	private dialog = false;
	private operacion = '';
	private activa = false;
	private helper: helpers = new helpers();
	private popup = new popup.Swal();
	RulNombre = [
		(v:any) => !!v || "El campo es requiredo",
		(v:any) => (/^[a-z A-Z]*$/.test(v)) || "No se permiten  caracteres especiales"
	];
	RuleCodJer = [
		(v:any) => !!v || "El campo es requiredo",
		(v:any) => (/^[0-9 A-Z]*$/.test(v)) || "No se permiten  caracteres especiales"
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
		new services.Operaciones().Consultar(this.WebApi.ws_jerarquia_Consultar)
			.then((resjerarquia) => {
				if (resjerarquia.data._error.error === 0) {
					this.lstjerarquia = resjerarquia.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', resjerarquia.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
	}
	private Insertar(): void {
		this.jerarquia = new services.clase_jerarquia();
		this.operacion = 'Insert';
		this.dialog = true;
	}
	private Grabar() {
		if (this.operacion === 'Update') {
			new services.Operaciones().Actualizar(this.WebApi.ws_jerarquia_Actualizar, this.jerarquia)
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
		new services.Operaciones().Insertar(this.WebApi.ws_jerarquia_Insertar, this.jerarquia)
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
	private Actualizar(data: services.clase_jerarquia): void {
		this.jerarquia = data;
		this.operacion = 'Update';
		this.dialog = true;
	}
	private select_fecha(fecha: string) {
		return fecha.substr(0, 10);
	}
	private Eliminar(data: services.clase_jerarquia): void {
		swal.fire({
			title: 'Esta seguro de esta operacion?',
			text: 'Eliminacion de Registro' + data.jerarquia,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'green',
			cancelButtonColor: 'red',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Eliminar!',
		}).then((resultOfQuestion) => {
			if (resultOfQuestion.value) {
			new services.Operaciones().Eliminar(this.WebApi.ws_jerarquia_Eliminar, data)
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
