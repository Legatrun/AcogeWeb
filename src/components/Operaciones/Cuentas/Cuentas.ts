import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as services from '@/services';
import swal from 'sweetalert2';
import moment from 'moment';
import * as popup from '@/popup';
import helpers from '@/helper';

@Component
export default class AdmCuentasComponent extends Vue {
	private headers: any[] = [
		{ text: 'Cuenta', align: 'left', sortable: true, value: 'cuenta', width: '15%' },
		{ text: 'nombre cuenta', align: 'left', sortable: false, value: 'nombrecuenta', width: '15%' },
		{ text: 'moneda', align: 'left', sortable: false, value: 'idmoneda', width: '10%' },
		{ text: 'nivel', align: 'left', sortable: false, value: 'nivel', width: '10%' },
		{ text: 'cuenta asiento', align: 'left', sortable: false, value: 'cuentaasiento', width: '15%' },
		{ text: 'cuenta sumar', align: 'left', sortable: false, value: 'cuentasumar', width: '15%' },
		{ text: 'activo pasivo', align: 'left', sortable: false, value: 'activopasivo', width: '10%' },
		{ text: 'Operaciones', align: 'left', sortable: false, value: 'action', width: '10%' },
	];
	private WebApi = new services.Endpoints();

	private cuentas = new services.clase_cuentas();
	private lstcuentas: services.clase_cuentas[] = [];
	private lstcuentascargar: services.clase_cuentas[] = [];
	private monedas = new services.clase_monedas();
	private lstmonedas: services.clase_monedas[] = [];
	private buscarcuentas = '';
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
		new services.Operaciones().Consultar(this.WebApi.ws_cuentas_Consultar)
			.then((rescuentas) => {
				if (rescuentas.data._error.error === 0) {
					this.lstcuentas = rescuentas.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', rescuentas.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
		this.cargarMonedas();
	}
	
	private cargarMonedas(){
		new services.Operaciones().Consultar(this.WebApi.ws_monedas_Consultar)
			.then((resmonedas) => {
				if (resmonedas.data._error.error === 0) {
					this.lstmonedas = resmonedas.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', resmonedas.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
	}
	private validarDigito():void{
		if(this.cuentas.nivel % 1 != 0){
			this.popup.error('Número invalido', 'El nivel no puede tener decimales')
		}
	}
	private Insertar(): void {
		this.cuentas = new services.clase_cuentas();
		this.operacion = 'Insert';
		this.dialog = true;
	}
	private Grabar() {
		if (this.operacion === 'Update') {
			new services.Operaciones().Actualizar(this.WebApi.ws_cuentas_Actualizar, this.cuentas)
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
		new services.Operaciones().Insertar(this.WebApi.ws_cuentas_Insertar, this.cuentas)
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
	private Actualizar(data: services.clase_cuentas): void {
		new services.Operaciones().Buscar(this.WebApi.ws_cuentas_Buscar, data )
		.then((resCuentasCargar) => {	
				this.lstcuentascargar= resCuentasCargar.data._data;
				this.cuentas = this.lstcuentascargar[0];
			}).catch((err) => {   
		   });
		this.operacion = 'Update';
		this.dialog = true;
	}
	private select_fecha(fecha: string) {
		return fecha.substr(0, 10);
	}
	private Eliminar(data: services.clase_cuentas): void {
		swal.fire({
			title: '¿Esta seguro de esta operación?',
			text: 'Eliminacion de Registro ' + data.cuenta +'/'+ data.nombrecuenta,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'green',
			cancelButtonColor: 'red',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Eliminar!',
		}).then((resultOfQuestion) => {
			if (resultOfQuestion.value) {
			new services.Operaciones().Eliminar(this.WebApi.ws_cuentas_Eliminar, data)
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
	private newMoneda(){
		this.$router.push({​​​​ path: '/Monedas' }​​​​);​​​​
	}
	get lstcuentasformateados(){
		return this.lstcuentas.map((cuentas : services.clase_cuentas)=>{
			return{
				cuenta: cuentas.cuenta,
				nombrecuenta: cuentas.nombrecuenta,
				idmoneda: this.formatearMoneda(cuentas.idmoneda),
				nivel: cuentas.nivel,
				cuentaasiento: cuentas.cuentaasiento,
				cuentasumar : cuentas.cuentasumar,
				activopasivo : cuentas.activopasivo
			}
		})
	}
	private formatearMoneda(idmoneda: Number){
		let monedaLiteral: string = '';
			this.lstmonedas.forEach(function(value){
				if(value.idmoneda == idmoneda){
					monedaLiteral = value.descripcion;
				}
			});
		return monedaLiteral;	
	}
}
