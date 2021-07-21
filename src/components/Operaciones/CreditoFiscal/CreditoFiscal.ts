import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as services from '@/services';
import swal from 'sweetalert2';
import moment from 'moment';
import * as popup from '@/popup';
import helpers from '@/helper';

@Component
export default class AdmCreditoFiscalComponent extends Vue {
	private headers: any[] = [
		//{ text: 'Empleado', align: 'left', sortable: true, value: 'empleado', width: '15%' },
		{ text: 'Empleado', align: 'left', sortable: true, value: 'mes', width: '15%' },
		{ text: 'Paterno', align: 'left', sortable: true, value: 'año', width: '15%' },
		{ text: 'Materno', align: 'left', sortable: false, value: 'declarado', width: '15%' },
		{ text: 'Nombres', align: 'left', sortable: false, value: 'actualizacion', width: '15%' },
		{ text: 'Saldo Mes ', align: 'left', sortable: false, value: 'saldo', width: '15%' },
		{ text: 'Saldo Anterior ', align: 'left', sortable: false, value: 'saldo', width: '15%' },
		{ text: 'Operaciones', align: 'center', sortable: false, value: 'action', width: '20%' },
	];
	private headersdos: any[] = [
		//{ text: 'Empleado', align: 'left', sortable: true, value: 'empleado', width: '15%' },
		{ text: 'Correlativo', align: 'left', sortable: true,  width: '15%' },
		{ text: 'Total Prestamo', align: 'left', sortable: true,  width: '15%' },
		{ text: 'Fecha', align: 'left', sortable: false,   width: '15%' },
		{ text: 'Empleado', align: 'left', sortable: false , width: '15%' },
		{ text: 'Saldo Mes ', align: 'left', sortable: false,  width: '15%' },
		{ text: 'Nombre ', align: 'left', sortable: false,  width: '15%' },
		{ text: 'Paterno', align: 'center', sortable: false,  width: '20%' },
	];
	private WebApi = new services.Endpoints();

	private creditofiscal = new services.clase_creditofiscal();
	private lstcreditofiscal: services.clase_creditofiscal[] = [];
	private lstcreditofiscalcargar: services.clase_creditofiscal[] = [];
	private buscarcreditofiscal = '';
	private empleados = new services.clase_empleado();
	private lstempleados: services.clase_empleado[] = [];
	private dialog = false;
	private operacion = '';
	private helper: helpers = new helpers();
	private popup = new popup.Swal();
	private activa = false;

	validacion = [
        (v:any) => !!v || "El campo es requiredo",
        (v:any) => (/^[0-9,.]*$/.test(v)) || "El campo solo acepta numeros",
    ];
    ruleValida = [
        (v: any) => !!v || 'El campo es requerido',
        (v: any) => !/^\s*$/.test(v) || 'No se permite espacios vacios',
    ];
    private listarMes: any[] = [
		{Mes:'ENERO',value:1},{Mes:'FEBRERO',value:2},	{Mes:'MARZO',value:3},{Mes:'ABRIL',value:4},{Mes:'MAYO',value:5},{Mes:'JUNIO',value:6},
		{Mes:'JULIO',value:7},{Mes:'AGUSTO',value:8}, {Mes:'SEPTIEMBRE',value:9},{Mes:'OCTUBRE',value:10},	{Mes:'NOVIEMBRE',value:11},{Mes:'DICIEMBRE',value:12}
    ];
    private listarGestion: any[]=[
		{Gestion:2021},{Gestion:2022},{Gestion:2023},{Gestion:2024},{Gestion:2025}
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
		new services.Operaciones().Consultar(this.WebApi.ws_creditofiscal_Consultar)
			.then((rescreditofiscal) => {
				if (rescreditofiscal.data._error.error === 0) {
					this.lstcreditofiscal = rescreditofiscal.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', rescreditofiscal.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
		this.cargarEmpleados();
	}
    private cargarEmpleados(){
        new services.Operaciones().Consultar(this.WebApi.ws_empleado_Consultar)
            .then((resempleado) => {
                if (resempleado.data._error.error === 0) {
                    this.lstempleados = resempleado.data._data;
                    this.dialog = false;
                } else {
                    this.popup.error('Consultar', resempleado.data._error.descripcion);
                }
            }).catch((error) => {
            this.popup.error('Consultar', 'Error Inesperado: ' + error);
        });

    }
	private Insertar(): void {
		this.creditofiscal = new services.clase_creditofiscal();
		this.operacion = 'Insert';
		this.dialog = true;
	}
	private Grabar() {
		if (this.operacion === 'Update') {
			new services.Operaciones().Actualizar(this.WebApi.ws_creditofiscal_Actualizar, this.creditofiscal)
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
		new services.Operaciones().Insertar(this.WebApi.ws_creditofiscal_Insertar, this.creditofiscal)
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
	private Actualizar(data: services.clase_creditofiscal): void {
		this.creditofiscal = data;
		this.operacion = 'Update';
		this.dialog = true;
	}
	private select_fecha(fecha: string) {
		return fecha.substr(0, 10);
	}
	private Eliminar(data: services.clase_creditofiscal): void {
		swal.fire({
			title: '¿Esta seguro de esta operación?',
			text: 'Eliminacion de Registro' + data.empleado + data.mes + data.año,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'green',
			cancelButtonColor: 'red',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Eliminar!',
		}).then((resultOfQuestion) => {
			if (resultOfQuestion.value) {
			new services.Operaciones().Eliminar(this.WebApi.ws_creditofiscal_Eliminar, data)
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
	private newempleado(){
		this.$router.push({​​​​ path: '/empleado' }​​​​);​​​​
	}

	get lstcreditosformateados(){
		return this.lstcreditofiscal.map((creditofiscal : services.clase_creditofiscal)=>{
			return{
				empleado: this.formatearEmpleado(creditofiscal.empleado),
				mes: creditofiscal.mes,
				año: creditofiscal.año,
				declarado: creditofiscal.declarado,
				actualizacion: creditofiscal.actualizacion,
				saldo: creditofiscal.saldo

			}
		})
	}
	private formatearEmpleado(empleado : any){
		let empleadoLiteral: string = '';
		this.lstempleados.forEach(function(value){
			if(value.empleado == empleado){
				empleadoLiteral = value.nombres;
			}
		});
		return empleadoLiteral;
	}

}
