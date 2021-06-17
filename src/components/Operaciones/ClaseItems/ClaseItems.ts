import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as services from '@/services';
import swal from 'sweetalert2';
import moment from 'moment';
import * as popup from '@/popup';
import helpers from '@/helper';

@Component
export default class AdmClaseItemsComponent extends Vue {
	private headers: any[] = [
		//{ text: 'IDClase', align: 'left', sortable: true, value: 'idclase', width: '10%' },
		{ text: 'Descripcion', align: 'left', sortable: false, value: 'descripcion', width: '10%' },
		{ text: 'Sigla', align: 'left', sortable: false, value: 'sigla', width: '10%' },
		{ text: 'Cuenta Venta', align: 'left', sortable: false, value: 'cuentaventa', width: '10%' },
		{ text: 'Cuenta Costo', align: 'left', sortable: false, value: 'cuentacosto', width: '10%' },
		{ text: 'Cuenta Gasto', align: 'left', sortable: false, value: 'cuentagasto', width: '10%' },
		{ text: 'Cuenta Inventario', align: 'left', sortable: false, value: 'cuentainventario', width: '10%' },
		{ text: 'Inventario Igresado', align: 'left', sortable: false, value: 'ingresainventario', width: '10%' },
		{ text: 'Operaciones', align: 'left', sortable: false, value: 'action', width: '10%' },
	];
	private WebApi = new services.Endpoints();

	private claseitems = new services.clase_claseitems();
	private lstclaseitems: services.clase_claseitems[] = [];
	private buscarclaseitems = '';
	private dialog = false;
	private operacion = '';
	private helper: helpers = new helpers();
	private popup = new popup.Swal();
	private activo = false;
	validacion = [
		(v: any) => !!v || 'El campo es requerido',
    (v: any) => !/^\s*$/.test(v) || 'No se permite espacios vacios',
  ];
   CuentasRules = [
	(v: any) => !!v || "El campo es requerido",
	(v:any) => (v && v.length<=20) || "No se permite mas de  20 caracteres",
	(v: any) => (/^[0-9 ,-]*$/.test(v)) || "El campo sólo permite números y '-' como caracter especial",
  ]; 

   siglarules = [

	(v: any) => !!v || 'El campo es requerido',
	(v:any) => (v && v.length<=5) || "No se permite mas de  5 caracteres",
	(v: any) => (/^[a-zA-Z 0-9,-]*$/.test(v)) || 'No se permite espacios vacios ni caracteres especiales',
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
		new services.Operaciones().Consultar(this.WebApi.ws_claseitems_Consultar)
			.then((resclaseitems) => {
				if (resclaseitems.data._error.error === 0) {
					this.lstclaseitems = resclaseitems.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', resclaseitems.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
	}
	private Insertar(): void {
		this.claseitems = new services.clase_claseitems();
		this.operacion = 'Insert';
		this.dialog = true;
	}
	private Grabar() {
		if (this.operacion === 'Update') {
			new services.Operaciones().Actualizar(this.WebApi.ws_claseitems_Actualizar, this.claseitems)
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
		new services.Operaciones().Insertar(this.WebApi.ws_claseitems_Insertar, this.claseitems)
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
	private Actualizar(data: services.clase_claseitems): void {
		this.claseitems = data;
		this.operacion = 'Update';
		this.dialog = true;
	}
	private select_fecha(fecha: string) {
		return fecha.substr(0, 10);
	}
	private Eliminar(data: services.clase_claseitems): void {
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
			new services.Operaciones().Eliminar(this.WebApi.ws_claseitems_Eliminar, data)
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
