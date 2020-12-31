import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as services from '@/services';
import swal from 'sweetalert2';
import moment from 'moment';
import * as popup from '@/popup';
import helpers from '@/helper';

@Component
export default class AdmProveedoresComponent extends Vue {
	private headers: any[] = [
		{ text: 'CodigoProveedor', align: 'left', sortable: true, value: 'codigoproveedor', width: '5%' },
		{ text: 'iddocumentoidentidad', align: 'left', sortable: false, value: 'iddocumentoidentidad', width: '5%' },
		{ text: 'numerodocumento', align: 'left', sortable: false, value: 'numerodocumento', width: '5%' },
		{ text: 'razonsocial', align: 'left', sortable: false, value: 'razonsocial', width: '5%' },
		{ text: 'direccion', align: 'left', sortable: false, value: 'direccion', width: '5%' },
		{ text: 'idpais', align: 'left', sortable: false, value: 'idpais', width: '5%' },
		{ text: 'idciudad', align: 'left', sortable: false, value: 'idciudad', width: '5%' },
		{ text: 'idmoneda', align: 'left', sortable: false, value: 'idmoneda', width: '5%' },
		{ text: 'contacto', align: 'left', sortable: false, value: 'contacto', width: '5%' },
		{ text: 'telefonos', align: 'left', sortable: false, value: 'telefonos', width: '5%' },
		{ text: 'fax', align: 'left', sortable: false, value: 'fax', width: '5%' },
		{ text: 'cuenta', align: 'left', sortable: false, value: 'cuenta', width: '5%' },
		{ text: 'idtipoproveedor', align: 'left', sortable: false, value: 'idtipoproveedor', width: '5%' },
		{ text: 'fechacreacion', align: 'left', sortable: false, value: 'fechacreacion', width: '5%' },
		{ text: 'codaduana', align: 'left', sortable: false, value: 'codaduana', width: '5%' },
		{ text: 'Operaciones', align: 'left', sortable: false, value: 'action', width: '10%' },
	];
	// tslint:disable-next-line: variable-name
	private menu_fechacreacion: boolean = false;
	private WebApi = new services.Endpoints();

	private proveedores = new services.clase_proveedores();
	private lstproveedores: services.clase_proveedores[] = [];
	private buscarproveedores = '';
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
		new services.Operaciones().Consultar(this.WebApi.ws_proveedores_Consultar)
			.then((resproveedores) => {
				if (resproveedores.data._error.error === 0) {
					this.lstproveedores = resproveedores.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', resproveedores.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
	}
	private Insertar(): void {
		this.proveedores = new services.clase_proveedores();
		this.proveedores.fechacreacion = this.FormatDate(Date.now());
		this.operacion = 'Insert';
		this.dialog = true;
	}
	private Grabar() {
		if (this.operacion === 'Update') {
			new services.Operaciones().Actualizar(this.WebApi.ws_proveedores_Actualizar, this.proveedores)
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
		new services.Operaciones().Insertar(this.WebApi.ws_proveedores_Insertar, this.proveedores)
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
	private Actualizar(data: services.clase_proveedores): void {
		this.proveedores = data;
		this.proveedores.fechacreacion = this.FormatDate(Date.now());
		this.operacion = 'Update';
		this.dialog = true;
	}
	private select_fecha(fecha: string) {
		return fecha.substr(0, 10);
	}
	private Eliminar(data: services.clase_proveedores): void {
		swal.fire({
			title: 'Esta seguro de esta operacion?',
			text: 'Eliminacion de Registro ' +'Proveedor '+ data.codigoproveedor,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'green',
			cancelButtonColor: 'red',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Eliminar!',
		}).then((resultOfQuestion) => {
			if (resultOfQuestion.value) {
			new services.Operaciones().Eliminar(this.WebApi.ws_proveedores_Eliminar, data)
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
