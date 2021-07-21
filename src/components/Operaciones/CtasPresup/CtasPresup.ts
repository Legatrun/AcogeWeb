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
		
		{ text: 'Cuenta Presup', align: 'left', sortable: true, value: 'cuentapresup', width: '10%' },
		{ text: 'nombre cuenta presup', align: 'left', sortable: false, value: 'nombrecuentapresup', width: '10%' },
		{ text: 'moneda', align: 'left', sortable: false, value: 'idmoneda', width: '10%' },
		// { text: 'nivel', align: 'left', sortable: false, value: 'nivel', width: '10%' },
		// { text: 'fecha creacion', align: 'left', sortable: false, value: 'fechacreacion', width: '10%' },
		// { text: 'fecha modificacion', align: 'left', sortable: false, value: 'fechamodificacion', width: '10%' },
		{ text: 'balance cuenta', align: 'left', sortable: false, value: 'balancecuenta', width: '10%' },
		{ text: 'cuenta asiento', align: 'left', sortable: false, value: 'cuentaasiento', width: '10%' },
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
	private lstctaspresupcargar: services.clase_ctaspresup[] = [];
	private buscarctaspresup = '';
	private dialog = false;
	private monedas = new services.clase_monedas();
	private lstmonedas: services.clase_monedas[] = [];
	private operacion = '';
	private helper: helpers = new helpers();
	private popup = new popup.Swal();
	private activo = false;
	private lista=['1', '2','3','4','5', '6'];
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
	private Insertar(): void {
		this.ctaspresup = new services.clase_ctaspresup();
		this.ctaspresup.fechacreacion = this.FormatDate(Date.now());
		this.ctaspresup.fechamodificacion = this.FormatDate(Date.now());
		this.operacion = 'Insert';
		this.dialog = true;
	}
	private Grabar() {
		console.log(this.ctaspresup)
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
		new services.Operaciones().Buscar(this.WebApi.ws_ctaspresup_Buscar, data )
		.then((resCtasPresup) => {	
				this.lstctaspresupcargar= resCtasPresup.data._data;
				this.ctaspresup = this.lstctaspresupcargar[0];
			}).catch((err) => {   
		});
		this.operacion = 'Update';
		this.dialog = true;
	}
	private select_fecha(fecha: string) {
		return fecha.substr(0, 10);
	}
	private Eliminar(data: services.clase_ctaspresup): void {
		swal.fire({
			title: '¿Esta seguro de esta operación?',
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
////////////////////////////////////////////terminar
	get lstctaspresupformateados(){
		return this.lstctaspresup.map((ctaspresup : services.clase_ctaspresup)=>{
			return{
				cuentapresup: ctaspresup.cuentapresup,
				nombrecuentapresup: ctaspresup.nombrecuentapresup,
				idmoneda: this.formatearMoneda(ctaspresup.idmoneda),
				nivel:ctaspresup.nivel,
				fechacreacion: ctaspresup.fechacreacion,
				fechamodificacion:ctaspresup.fechamodificacion,
				balancecuenta:ctaspresup.balancecuenta,
				cuentaasiento:ctaspresup.cuentaasiento,
				grabado:ctaspresup.grabado
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
