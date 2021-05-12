import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as services from '@/services';
import swal from 'sweetalert2';
import moment from 'moment';
import * as popup from '@/popup';
import helpers from '@/helper';

@Component
export default class Admempleado_deptoComponent extends Vue {
	private headers: any[] = [
	//	{ text: 'Empleado', align: 'left', sortable: true, value: 'empleado', width: '15%' },
		{ text: 'Departamento', align: 'left', sortable: false, value: 'departamento', width: '15%' },
		{ text: 'Cargo', align: 'left', sortable: false, value: 'cargo', width: '15%' },
		{ text: 'Haber basico', align: 'left', sortable: false, value: 'haber_basico', width: '10%' },
		{ text: 'Quincena', align: 'left', sortable: false, value: 'quincena', width: '10%' },
		{ text: 'Fecha ingreso', align: 'left', sortable: false, value: 'fecha_ingreso', width: '15%' },
		{ text: 'Fecha quinquenio', align: 'left', sortable: false, value: 'fecha_quinquenio', width: '15%' },
		//{ text: 'correlativo', align: 'left', sortable: false, value: 'correlativo', width: '15%' },
		//{ text: 'Tipo empleado', align: 'left', sortable: false, value: 'tipoempleado', width: '15%' },
		//{ text: 'Planilla', align: 'left', sortable: false, value: 'planilla', width: '15%' },
		//{ text: 'Jerarquia', align: 'left', sortable: false, value: 'jerarquia', width: '15%' },
		//{ text: 'cuenta', align: 'left', sortable: false, value: 'cuenta', width: '15%' },
		{ text: 'Oficina', align: 'left', sortable: false, value: 'oficina', width: '15%' },
		//{ text: 'estado', align: 'left', sortable: false, value: 'estado', width: '15%' },
		//{ text: 'saldo_anterior_iva', align: 'left', sortable: false, value: 'saldo_anterior_iva', width: '15%' },
		//{ text: 'envio_email', align: 'left', sortable: false, value: 'envio_email', width: '15%' },
		{ text: 'Operaciones', align: 'center', sortable: false, value: 'action', width: '20%' },
	];
	// tslint:disable-next-line: variable-name
	private menu_fecha_ingreso: boolean = false;
	// tslint:disable-next-line: variable-name
	private menu_fecha_quinquenio: boolean = false;
	private WebApi = new services.Endpoints();
	private empleado = 0;
	private menu_empleado = false;
	private empleado_depto = new services.clase_empleado_depto();
	private lstempleado_depto: services.clase_empleado_depto[] = [];
	private lstempleadodeptocargar: services.clase_empleado_depto[] = [];
	private buscarempleado_depto = '';
	private empleados = new services.clase_empleado();
	private lstempleados: services.clase_empleado[] = [];

	private tipompleados = new services.clase_tipo_empleado();
	private lstetipompleados: services.clase_tipo_empleado[] = [];

	private planilla = new services.clase_planilla();
	private lsteplanilla: services.clase_planilla[] = [];

	private jerarquia = new services.clase_jerarquia();
	private lstjerarquia: services.clase_jerarquia[] = [];

	private ciudades = new services.clase_ciudades();
	private lstciudades: services.clase_ciudades[] = [];
	private departamentos = new services.clase_personal_departamentos();
	private lstdepartamentos: services.clase_personal_departamentos[] = [];

	private dialog = false;
	private message = "";
	private operacion = '';
	private helper: helpers = new helpers();
	private popup = new popup.Swal();
	private activa = false;
	private listarciudad: any[] = [
		{ciudad: 'LA PAZ'},{ciudad:'COCHABAMBA'},{ciudad:'SANTA CRUZ'},{ciudad:'BENI'},{ciudad: 'PANDO'},{ciudad: 'TERIJA'},{ciudad: 'ORURO'},{ciudad: 'POTOSI'},{ciudad: 'CHOQUISACA'},
	];
	validacion = [
		(v:any) => !!v || "El campo es requiredo",
		(v:any) => (/^[0-9,.]*$/.test(v)) || "El campo solo acepta numeros",
	];
	ruleValida = [
		(v: any) => !!v || 'El campo es requerido',
		(v: any) => !/^\s*$/.test(v) || 'No se permite espacios vacios',
	];
	private sumarfecha(){
		var imput = this.empleado_depto.fecha_ingreso;
		var ar = imput.split('-');
		var fechaactual = new Date(ar[0],ar[1],ar[2]);
		fechaactual.setFullYear(fechaactual.getFullYear()+5);
		var res = fechaactual.getFullYear() +'-'+ fechaactual.getMonth() +'-'+ fechaactual.getDate();
		this.empleado_depto.fecha_quinquenio = res;
	}

	beforeUpdate(){
		this.sumarfecha()
		this.validarquincena();
	}
	private validarquincena(){
		var mes="";
		var po = 0;
		 po=(this.empleado_depto.haber_basico*50)/100;
		 if (this.empleado_depto.quincena>po){
		 	this.message = "tiene que ser menor 50% de basico"
		 }

	}
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
		new services.Operaciones().Consultar(this.WebApi.ws_empleado_depto_Consultar)
			.then((resempleado_depto) => {
				if (resempleado_depto.data._error.error === 0) {
					this.lstempleado_depto = resempleado_depto.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', resempleado_depto.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
		this.cargarEmpleados();
		this.cargarDepartamento();
		this.cargarTipoEmpleado();
		this.cargarPlanilla();
		this.cargarJerarquia();
		this.cargarTipoEmpleado();
		//this.cargarCiudad();

	}
	slectEmpleado(nextInput: number){
		console.log(nextInput)
		this.lstempleado_depto = [];
		if (this.empleado !== undefined)
		{
			this.buscarEmpleado();
		}
		this.empleado_depto.departamento = 0;
		this.empleado_depto.cargo = "";
		this.empleado_depto.haber_basico = 0;
		this.empleado_depto.quincena = 0;
		this.empleado_depto.fecha_ingreso = "";
		this.empleado_depto.fecha_quinquenio = "";
		this.empleado_depto.correlativo = 0;
		this.empleado_depto.planilla = 0;
		this.empleado_depto.jerarquia = 0;
		this.empleado_depto.cuenta = "";
		this.empleado_depto.oficina = '';
		this.empleado_depto.tipoempleado = 0;
		this.empleado_depto.saldo_anterior_iva = 0;
		this.empleado_depto.estado = false;
		this.empleado_depto.envio_email = false;
		this.setFocus(nextInput);
	}
	private buscarEmpleado(){

		this.empleado_depto.empleado=this.empleado;
		const params = new URLSearchParams();
		params.append('empleado', String(this.empleado_depto.empleado));
		console.log(this.empleado_depto)
		new services.Operaciones().Buscar(this.WebApi.ws_empleado_depto_Buscar, this.empleado_depto)
			.then((resEmpleado) => {
				this.lstempleado_depto = resEmpleado.data._data;
				this.empleado_depto.departamento =this.lstempleado_depto[0].departamento;
				this.empleado_depto.cargo =this.lstempleado_depto[0].cargo;
				this.empleado_depto.haber_basico =this.lstempleado_depto[0].haber_basico;
				this.empleado_depto.quincena =this.lstempleado_depto[0].quincena;
				this.empleado_depto.fecha_ingreso =this.lstempleado_depto[0].fecha_ingreso;
				this.empleado_depto.fecha_quinquenio =this.lstempleado_depto[0].fecha_quinquenio;
				this.empleado_depto.correlativo =this.lstempleado_depto[0].correlativo;
				this.empleado_depto.tipoempleado =this.lstempleado_depto[0].tipoempleado;
				this.empleado_depto.planilla =this.lstempleado_depto[0].planilla;
				this.empleado_depto.jerarquia =this.lstempleado_depto[0].jerarquia;
				this.empleado_depto.cuenta =this.lstempleado_depto[0].cuenta;
				this.empleado_depto.oficina =this.lstempleado_depto[0].oficina;
				this.empleado_depto.estado =this.lstempleado_depto[0].estado;
				this.empleado_depto.saldo_anterior_iva =this.lstempleado_depto[0].saldo_anterior_iva;
				this.empleado_depto.envio_email =this.lstempleado_depto[0].envio_email;
				this.empleado_depto.fecha_ingreso = this.FormatDate(this.empleado_depto.fecha_ingreso);
				this.empleado_depto.fecha_quinquenio = this.FormatDate(this.empleado_depto.fecha_quinquenio);
				console.log(this.empleado_depto.departamento)
				console.log(this.empleado_depto.cargo)
				//console.log(this.empleado_depto.haber_basico)
				this.$forceUpdate();
			}).catch((err) => {this.lstempleado_depto = []; });
	}
	private clickOnFocus(id: any) {

		JSclickOnFocus(id);
	}
	private setFocus(nextId: any){

		(document.querySelector('#' + nextId) as any).focus();
	}
	private cargarDepartamento(){
		new services.Operaciones().Consultar(this.WebApi.ws_personal_departamentos_Consultar)
			.then((resdepartamento) => {
				if (resdepartamento.data._error.error === 0) {
					this.lstdepartamentos = resdepartamento.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', resdepartamento.data._error.nombre);
				}
			}).catch((error) => {
			this.popup.error('Consultar', 'Error Inesperado: ' + error);
		});

	}
	private cargarEmpleados(){
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
	private cargarTipoEmpleado(){
		new services.Operaciones().Consultar(this.WebApi.ws_tipo_empleado_Consultar)
			.then((restipoemple) => {
				if (restipoemple.data._error.error === 0) {
					this.lstetipompleados = restipoemple.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', restipoemple.data._error.nombre);
				}
			}).catch((error) => {
			this.popup.error('Consultar', 'Error Inesperado: ' + error);
		});

	}
	private cargarPlanilla(){
		new services.Operaciones().Consultar(this.WebApi.ws_planilla_Consultar)
			.then((resplanilla) => {
				if (resplanilla.data._error.error === 0) {
					this.lsteplanilla = resplanilla.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', resplanilla.data._error.nombre);
				}
			}).catch((error) => {
			this.popup.error('Consultar', 'Error Inesperado: ' + error);
		});

	}
	private cargarJerarquia(){
		new services.Operaciones().Consultar(this.WebApi.ws_jerarquia_Consultar)
			.then((resjerarquia) => {
				if (resjerarquia.data._error.error === 0) {
					this.lstjerarquia = resjerarquia.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', resjerarquia.data._error.nombre);
				}
			}).catch((error) => {
			this.popup.error('Consultar', 'Error Inesperado: ' + error);
		});

	}

	private Insertar(): void {
		this.empleado_depto = new services.clase_empleado_depto();
		this.empleado_depto.fecha_ingreso = this.FormatDate(Date.now());
		this.empleado_depto.fecha_quinquenio = this.FormatDate(Date.now());
		this.operacion = 'Insert';
		this.dialog = true;
	}
	private Grabar() {
		if (this.operacion === 'Update') {
			new services.Operaciones().Actualizar(this.WebApi.ws_empleado_depto_Actualizar, this.empleado_depto)
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
		new services.Operaciones().Insertar(this.WebApi.ws_empleado_depto_Insertar, this.empleado_depto)
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
	private Actualizar(data: services.clase_empleado_depto): void {
		//this.empleado_depto = data;

		new services.Operaciones().Buscar(this.WebApi.ws_empleado_depto_Buscar, data )
			.then((resEmpleDepto) => {
				this.lstempleadodeptocargar= resEmpleDepto.data._data;
				this.empleado_depto = this.lstempleadodeptocargar[0];
				this.empleado_depto.fecha_ingreso = this.FormatDate(this.empleado_depto.fecha_ingreso);
				this.empleado_depto.fecha_quinquenio = this.FormatDate(this.empleado_depto.fecha_quinquenio);
			}).catch((err) => {
		});
		this.operacion = 'Update';
		this.dialog = true;
	}
	private select_fecha(fecha: string) {
		return fecha.substr(0, 10);
	}
	private Eliminar(data: services.clase_empleado_depto): void {
		swal.fire({
			title: 'Esta seguro de esta operacion?',
			text: 'Eliminacion de Registro' + data.empleado,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'green',
			cancelButtonColor: 'red',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Eliminar!',
		}).then((resultOfQuestion) => {
			if (resultOfQuestion.value) {
			new services.Operaciones().Eliminar(this.WebApi.ws_empleado_depto_Eliminar, data)
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
	private newDepartamento(){
		this.$router.push({​​​​ path: '/Personal_departamentos' }​​​​);​​​​
	}
	get empleadodeptoformateados(){
		return this.lstempleado_depto.map((empleadoDepto : services.clase_empleado_depto)=>{
			return{
				empleado:empleadoDepto.empleado,
				departamento:this.formatearDepartamento(empleadoDepto.departamento),
				cargo:empleadoDepto.cargo,
				haber_basico:empleadoDepto.haber_basico,
				quincena:empleadoDepto.quincena,
				fecha_ingreso:empleadoDepto.fecha_ingreso,
				fecha_quinquenio:empleadoDepto.fecha_quinquenio,
				correlativo:empleadoDepto.correlativo,
				tipoempleado:empleadoDepto.tipoempleado,
				planilla:empleadoDepto.planilla,
				jerarquia:empleadoDepto.jerarquia,
				cuenta:empleadoDepto.cuenta,
				oficina:empleadoDepto.oficina,
				estado:empleadoDepto.estado,
				saldo_anterior_iva:empleadoDepto.saldo_anterior_iva,
				envio_email:empleadoDepto.envio_email,
			}
		})
	}
	private formatearDepartamento(departamento : Number){
		let departamentoLiteral: string = '';
		this.lstdepartamentos.forEach(function(value){
			if(value.personal_departamento == departamento){
				departamentoLiteral = value.nombre;
			}
		});
		return departamentoLiteral;
	}

}
function JSclickOnFocus(id:any) {
	var obj: any = document.getElementById(id);
	obj.click();
}
