import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as services from '@/services';
import swal from 'sweetalert2';
import moment from 'moment';
import * as popup from '@/popup';
import helpers from '@/helper';


@Component
export default class RegistrosDiariosComponent extends Vue {
	private headersCuentas: any[] = [
		{ text: 'Cuenta', align: 'left', sortable: true, value: 'cuenta', width: '15%' },
		{ text: 'Nombre de Cuenta', align: 'left', sortable: false, value: 'nombrecuenta', width: '15%' },
		{ text: 'Nivel', align: 'left', sortable: false, value: 'nivel', width: '10%' },
		{ text: 'Cuenta Asiento', align: 'left', sortable: false, value: 'cuentaasiento', width: '15%' },
		{ text: 'Cuenta Sumar', align: 'left', sortable: false, value: 'cuentasumar', width: '15%' },
		{ text: 'Operaciones', align: 'left', sortable: false, value: 'action', width: '10%' },
	];
	private headers: any[] = [
		//{ text: 'IDMoneda', align: 'left', sortable: true, value: 'idmoneda', width: '15%' },
		{ text: 'Nro', align: 'left', sortable: false, value: 'descripcion', width: '5%' },
		{ text: 'Cuenta', align: 'left', sortable: false, value: 'sigla', width: '10%' },
		{ text: 'Buscar Cuenta', align: 'left', sortable: false, value: 'monedalocal', width: '5%' },
		{ text: 'Nombre Cuenta', align: 'left', sortable: false, value: 'action', width: '15%' },
		{ text: 'GlosaDetalle', align: 'left', sortable: false, value: 'descripcion', width: '15%' },
		{ text: 'DebeMontoBs', align: 'left', sortable: false, value: 'sigla', width: '10%' },
		{ text: 'DebeMontoSus', align: 'left', sortable: false, value: 'monedalocal', width: '10%' },
		{ text: 'HaberMontoBs', align: 'left', sortable: false, value: 'action', width: '10%' },
		{ text: 'HaberMontoSus', align: 'left', sortable: false, value: 'descripcion', width: '10%' },
	];
	private headersAsientos: any[] = [
		{ text: 'fecha', align: 'left', sortable: false, value: 'fecha', width: '15%' },
		{ text: 'IDTipoComprobante', align: 'left', sortable: true, value: 'idtipocomprobante', width: '15%' },
		{ text: 'NumeroComprobante', align: 'left', sortable: true, value: 'numerocomprobante', width: '15%' },
		{ text: 'referencia', align: 'left', sortable: false, value: 'referencia', width: '15%' },
		{ text: 'glosa', align: 'left', sortable: false, value: 'glosa', width: '15%' },
		{ text: 'T.C.', align: 'left', sortable: false, value: 'cotizacion', width: '15%' },
		{ text: 'codigomodulo', align: 'left', sortable: false, value: 'codigomodulo', width: '15%' },
		{ text: 'Operaciones', align: 'center', sortable: false, value: 'action', width: '20%' },
	];
	private WebApi = new services.Endpoints();
    private fecha = '';
    private menu_fechacreacion = false;
	private monedas = new services.clase_monedas();
	private lstmonedas: services.clase_monedas[] = [];
	private asientosencabezado = new services.clase_asientosencabezado();
	private lstasientosencabezado: services.clase_asientosencabezado[] = [];
	private cuentas = new services.clase_cuentas();
	private lstcuentas: services.clase_cuentas[] = [];
	private tiposdecambio = new services.clase_tiposdecambio();
	private lsttiposdecambio: services.clase_tiposdecambio[] = [];
	private asientosdetalle = new services.clase_asientosdetalle();
	private lstasientosdetalle: services.clase_asientosdetalle[] = [];
	private tiposcomprobantes = new services.clase_tiposcomprobantes();
	private lsttiposcomprobantes: services.clase_tiposcomprobantes[] = [];
	private buscarmonedas = '';
	private dialog = false;
	private operacion = '';
	private helper: helpers = new helpers();
	private popup = new popup.Swal();
	private activo = false;
	private nuevo=false;
	private dialogCuentas=false;
	private buscarCuenta = '';
	private numeroComprobante = '';
	private buscarasientosencabezado = '';
	private dialogAsientos= false;
    private lstComprobante =['Diario', 'Compras', 'Ingresos', 'Ingresos Santa Cruz']
	validacion = [
		(v: any) => !!v || 'El campo es requerido',
    (v: any) => !/^\s*$/.test(v) || 'No se permite espacios vacios',
	];
  siglarules = [
	(v: any) => !!v || 'El campo es requerido',
	(v: any) => (/^[a-zA-Z-0-9]*$/.test(v)) || 'No se permite espacios vacios ni caracteres especiales',
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
		new services.Operaciones().Consultar(this.WebApi.ws_tiposcomprobantes_Consultar)
			.then((restiposcomprobantes) => {
				if (restiposcomprobantes.data._error.error === 0) {
					this.lsttiposcomprobantes = restiposcomprobantes.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', restiposcomprobantes.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
			this.cargarCuentas();
			this.cargarAsientos();
	}
	private cargarAsientos(){
		new services.Operaciones().Consultar(this.WebApi.ws_asientosencabezado_Consultar)
			.then((resasientosencabezado) => {
				if (resasientosencabezado.data._error.error === 0) {
					this.lstasientosencabezado = resasientosencabezado.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', resasientosencabezado.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
	}
	private BuscarCuentas(){
		this.dialogCuentas=true;
	}
	private cargarCuentas(){
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
	}
	private Insertar(): void {
		this.monedas = new services.clase_monedas();
		this.operacion = 'Insert';
		this.dialog = true;
	}
	private Grabar() {
		this.monedas.sigla = this.monedas.sigla.trim();
		console.log(this.monedas)
		if (this.operacion === 'Update') {
			new services.Operaciones().Actualizar(this.WebApi.ws_monedas_Actualizar, this.monedas)
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
		new services.Operaciones().Insertar(this.WebApi.ws_monedas_Insertar, this.monedas)
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
		this.dialogCuentas = false;
		this.dialogAsientos = false;
		this.nuevo=false;
	}
	private nuevoOn(){
		this.nuevo=true;
	}
	private Actualizar(data: services.clase_cuentas): void {
		this.cuentas = data;
		// this.operacion = 'Update';
		this.dialogCuentas = false;
	}
	private ActualizarAsiento(data: services.clase_asientosencabezado): void {
		this.asientosencabezado = data;
		// this.operacion = 'Update';
		this.dialogAsientos = false;
	}
	private select_fecha(fecha: string) {
		return fecha.substr(0, 10);
	}
	private Eliminar(data: services.clase_monedas): void {
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
			new services.Operaciones().Eliminar(this.WebApi.ws_monedas_Eliminar, data)
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
	select_tipoCambio(nextInput: string)
	{
		console.log(nextInput)
		this.lsttiposdecambio = [];
			if (this.fecha !== undefined)
			{
				this.buscarTipoDeCambio();
			}					
		
		//REINICIAR CAMPOS
		//this.reiniciarDinamicos();
		this.setFocus(nextInput);
	}
	
	private buscarTipoDeCambio(){
		
		this.tiposdecambio.fecha=this.fecha;
		const params = new URLSearchParams();
		params.append('fecha', this.tiposdecambio.fecha);
		console.log(this.tiposdecambio)
		new services.Operaciones().Buscar(this.WebApi.ws_tiposdecambio_Buscar, this.tiposdecambio)
		.then((resTiposDeCambio) => {
			this.lsttiposdecambio = resTiposDeCambio.data._data;
			this.tiposdecambio.cotizacionoficial =this.lsttiposdecambio[0].cotizacionoficial;
			console.log(this.tiposdecambio.cotizacionoficial)
			this.$forceUpdate();
		}).catch((err) => {this.lsttiposdecambio = []; });
	}
	private generaNumComprobante(){
		this.numeroComprobante =  moment().year.toString() + '/' + moment().month.toString() +  '-' + '000001';
		
	}
	private clickOnFocus(id: string) {
		
		JSclickOnFocus(id);
	}
	private setFocus(nextId: string){
		
		(document.querySelector('#' + nextId) as any).focus();
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
function JSclickOnFocus(id:string) {
	var obj: any = document.getElementById(id);
		obj.click();
}