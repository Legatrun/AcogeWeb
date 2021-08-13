import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as services from '@/services';
import swal from 'sweetalert2';
import moment from 'moment';
import * as popup from '@/popup';
import helpers from '@/helper';

@Component
export default class AdmReporteCreditoFiscalComponent extends Vue {
	private headers: any[] = [
		{ text: 'Mes', align: 'left', sortable: false, value: 'mes', width: '15%' },
		{ text: 'Año', align: 'left', sortable: false, value: 'año', width: '15%' },
		//{ text: 'Empleado', align: 'left', sortable: false, value: 'empleado', width: '15%' },
		{ text: 'CEmpleado', align: 'left', sortable: false, value: 'cempleado', width: '15%' },
		{ text: 'Basico', align: 'left', sortable: false, value: 'basico', width: '15%' },
		//{ text: 'Antiguedad', align: 'left', sortable: false, value: 'antiguedad', width: '15%' },
		//{ text: 'TotalGanado', align: 'left', sortable: false, value: 'totalganado', width: '15%' },
		//{ text: 'DescuentosDeLey', align: 'left', sortable: false, value: 'descuentosdeley', width: '15%' },
		{ text: 'Total Sueldo', align: 'left', sortable: false, value: 'totalsueldo', width: '15%' },
		//{ text: 'OtrosIngresos', align: 'left', sortable: false, value: 'otrosingresos', width: '15%' },
		//{ text: 'SueldoNeto', align: 'left', sortable: false, value: 'sueldoneto', width: '15%' },
		//{ text: 'MinimoNoImp', align: 'left', sortable: false, value: 'minimonoimp', width: '15%' },
		//{ text: 'DifSujetaImp', align: 'left', sortable: false, value: 'difsujetaimp', width: '15%' },
		//{ text: '_13PorcIVA', align: 'left', sortable: false, value: '_13porciva', width: '15%' },
		//{ text: 'Form87Decl', align: 'left', sortable: false, value: 'form87decl', width: '15%' },
		//{ text: '_13S_2Min', align: 'left', sortable: false, value: '_13s_2min', width: '15%' },
		//{ text: 'SaldoA_F_Fisco', align: 'left', sortable: false, value: 'saldoa_f_fisco', width: '15%' },
		//{ text: 'SaldoA_F_Depent', align: 'left', sortable: false, value: 'saldoa_f_depent', width: '15%' },
		{ text: 'Saldo Anterior', align: 'left', sortable: false, value: 'saldoanterior', width: '15%' },
		//{ text: 'Actualizacion', align: 'left', sortable: false, value: 'actualizacion', width: '15%' },
		//{ text: 'SaldoTotal', align: 'left', sortable: false, value: 'saldototal', width: '15%' },
		//{ text: 'SaldoTotalDep', align: 'left', sortable: false, value: 'saldototaldep', width: '15%' },
		//{ text: 'SaldoUtilizado', align: 'left', sortable: false, value: 'saldoutilizado', width: '15%' },
		//{ text: 'ImpuestoRetenido', align: 'left', sortable: false, value: 'impuestoretenido', width: '15%' },
		//{ text: 'SaldoSigMes', align: 'left', sortable: false, value: 'saldosigmes', width: '15%' },
		{ text: 'Operaciones', align: 'center', sortable: false, value: 'action', width: '20%' },
	];
	private WebApi = new services.Endpoints();

	private reportecreditofiscal = new services.clase_reportecreditofiscal();
	private lstreportecreditofiscal: services.clase_reportecreditofiscal[] = [];

	private empleados = new services.clase_empleado();
	private lstempleados: services.clase_empleado[] = [];
	private buscarreportecreditofiscal = '';
	private dialog = false;
	private operacion = '';
	private helper: helpers = new helpers();
	private popup = new popup.Swal();
	private activa = false;
	private listarMes: any[] = [
		{Mes:'ENERO',value:1},{Mes:'FEBRERO',value:2},	{Mes:'MARZO',value:3},{Mes:'ABRIL',value:4},{Mes:'MAYO',value:5},{Mes:'JUNIO',value:6},
		{Mes:'JULIO',value:7},{Mes:'AGUSTO',value:8}, {Mes:'SEPTIEMBRE',value:9},{Mes:'OCTUBRE',value:10},	{Mes:'NOVIEMBRE',value:11},{Mes:'DICIEMBRE',value:12}
	];
	//var gestion = new Date().getUTCFullYear();

	private gestion(){
		var gestion = new Date().getUTCFullYear();
		this.reportecreditofiscal.año = gestion;
	}
	beforeUpdate(){
		this.gestion()
	}
	validacion=[
		(v:any) => !!v || "El campo es requiredo",
		(v:any) => (/^[0-9,.]*$/.test(v)) || "El campo solo acepta numeros",
	];
	ruleSelec=[
		(v: any) => !!v || 'El campo es requerido',
		(v: any) => !/^\s*$/.test(v) || 'No se permite espacios vacios',
	];
	RuleLetras=[
		(v:any) => !!v || "El campo es requiredo",
		(v:any) => (/^[A-Z a-z]*$/.test(v)) || "El campo solo acepta letras",
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
	private FormatMes(data: any) {
		if (data == 1) {
			return 'ENERO';
		}
		if (data == 2) {
			return 'FEBRERO';
		}
		if (data == 3) {
			return 'MARZO';
		}
		if (data == 4) {
			return 'ABRIL';
		}
		if (data == 5) {
			return 'MAYO';
		}
		if (data == 6) {
			return 'JUNIO';
		}
		if (data == 7) {
			return 'JULIO';
		}
		if (data == 8) {
			return 'AGOSTO';
		}
		if (data == 9) {
			return 'SEPTIEMBRE';
		}
		if (data == 10) {
			return 'OCTUBRE';
		}
		if (data == 11) {
			return 'NOVIEMBRE';
		}
		if (data == 12) {
			return 'DICIEMBRE';
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
		new services.Operaciones().Consultar(this.WebApi.ws_reportecreditofiscal_Consultar)
			.then((resreportecreditofiscal) => {
				if (resreportecreditofiscal.data._error.error === 0) {
					this.lstreportecreditofiscal = resreportecreditofiscal.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', resreportecreditofiscal.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
		this.cargarEmpleado();
	}
	private cargarEmpleado(){
		new services.Operaciones().Consultar(this.WebApi.ws_empleado_Consultar)
			.then((resempleado) => {
				if (resempleado.data._error.error === 0) {
					this.lstempleados = resempleado.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', resempleado.data._error.nombres);
				}
			}).catch((error) => {
			this.popup.error('Consultar', 'Error Inesperado: ' + error);
		});

	}
	private Insertar(): void {
		this.reportecreditofiscal = new services.clase_reportecreditofiscal();
		this.operacion = 'Insert';
		this.dialog = true;
	}
	private Grabar() {
		if (this.operacion === 'Update') {
			new services.Operaciones().Actualizar(this.WebApi.ws_reportecreditofiscal_Actualizar, this.reportecreditofiscal)
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
		new services.Operaciones().Insertar(this.WebApi.ws_reportecreditofiscal_Insertar, this.reportecreditofiscal)
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
	private Actualizar(data: services.clase_reportecreditofiscal): void {
		this.reportecreditofiscal = data;
		this.operacion = 'Update';
		this.dialog = true;
	}
	private select_fecha(fecha: string) {
		return fecha.substr(0, 10);
	}
	private Eliminar(data: services.clase_reportecreditofiscal): void {
		swal.fire({
			title: '¿Esta seguro de esta operación?',
			text: 'Eliminacion de Registro',
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'green',
			cancelButtonColor: 'red',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Eliminar!',
		}).then((resultOfQuestion) => {
			if (resultOfQuestion.value) {
			new services.Operaciones().Eliminar(this.WebApi.ws_reportecreditofiscal_Eliminar, data)
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
