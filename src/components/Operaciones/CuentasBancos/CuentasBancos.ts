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
		{ text: 'Banco', align: 'left', sortable: true, value: 'idbanco', width: '15%' },
		{ text: 'Nro Cuenta', align: 'left', sortable: true, value: 'nrocuenta', width: '15%' },
		{ text: 'Moneda', align: 'left', sortable: false, value: 'idmoneda', width: '15%' },
		{ text: 'Saldo Actual', align: 'left', sortable: false, value: 'saldoactual', width: '15%' },
		{ text: 'Cuenta Contable', align: 'left', sortable: false, value: 'cuentacontable', width: '15%' },
		{ text: 'Fecha Apertura', align: 'left', sortable: false, value: 'fechaapertura', width: '15%' },
		{ text: 'Operaciones', align: 'left', sortable: false, value: 'action', width: '20%' },
	];
	// tslint:disable-next-line: variable-name
	private menu_fechaapertura: boolean = false;
	private WebApi = new services.Endpoints();

	private cuentasbancos = new services.clase_cuentasbancos();
	private lstcuentasbancos: services.clase_cuentasbancos[] = [];
	private lstcuentasbancoscargar: services.clase_cuentasbancos[] = [];
	private buscarcuentasbancos = '';
	private bancos = new services.clase_bancos();
	private lstbancos: services.clase_bancos[] = [];
	private monedas = new services.clase_monedas();
	private lstmonedas: services.clase_monedas[] = [];
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
	(v: any) => (/^[0-9,-]*$/.test(v)) || "El campo sólo permite números y '-' como caracter especial",
];
saldoRules = [
	(v: any) => !!v || "El campo es requerido",
	(v: any) => (/^[0-9, ,]*$/.test(v)) || "El campo sólo permite números y ',' como caracter especial",
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
			this.cargarMonedas();
			this.cargarBanco();
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
	private cargarBanco(){
		new services.Operaciones().Consultar(this.WebApi.ws_bancos_Consultar)
			.then((resbancos) => {
				if (resbancos.data._error.error === 0) {
					this.lstbancos = resbancos.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', resbancos.data._error.descripcion);
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
	private Actualizar(data: services.clase_cuentasbancos): void {
		new services.Operaciones().Buscar(this.WebApi.ws_cuentasbancos_Buscar, data )
		.then((resCuentasBancosCargar) => {	
				this.lstcuentasbancoscargar= resCuentasBancosCargar.data._data;
				this.cuentasbancos = this.lstcuentasbancoscargar[0];
			}).catch((err) => {   
		   });
		//this.cuentasbancos.fechaapertura = this.FormatDate(Date.now());
		this.operacion = 'Update';
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
	
	private select_fecha(fecha: string) {
		return fecha.substr(0, 10);
	}
	private Eliminar(data: services.clase_cuentasbancos): void {
		swal.fire({
			title: '¿Esta seguro de esta operación?',
			text: 'Eliminacion de Registro ' + data.idbanco +'/'+ data.nrocuenta,
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
	get lstcuentasbancosformateados(){
		return this.lstcuentasbancos.map((cuentabancos : services.clase_cuentasbancos)=>{
			return{
				idbanco:cuentabancos.idbanco,
				idbancoliteral: this.formatearbanco(cuentabancos.idbanco),
				nrocuenta: cuentabancos.nrocuenta,
				idmoneda: this.formatearMoneda(cuentabancos.idmoneda),
				saldoactual:cuentabancos.saldoactual,
				cuentacontable: cuentabancos.cuentacontable,
				fechaapertura:cuentabancos.fechaapertura
			}
		})
	}
	private formatearbanco(idbanco : Number){
		let bancoLiteral: string = '';
			this.lstbancos.forEach(function(value){
				if(value.idbanco == idbanco){
					bancoLiteral = value.descripcion;
				}
			});
		return bancoLiteral;	
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
