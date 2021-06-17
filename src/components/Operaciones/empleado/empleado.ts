import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as services from '@/services';
import swal from 'sweetalert2';
import moment from 'moment';
import * as popup from '@/popup';
import helpers from '@/helper';

@Component
export default class AdmempleadoComponent extends Vue {
	private headers: any[] = [
		//{ text: 'empleado', align: 'left', sortable: true, value: 'empleado', width: '15%' },
		{ text: 'Empleados', align: 'left', sortable: false, value: 'nombres', width: '20%' },
		
		//{ text: 'Materno', align: 'left', sortable: false, value: 'materno', width: '10%' },
		//{ text: 'Nombres', align: 'left', sortable: false, value: 'nombres', width: '15%' },
		//{ text: 'Fecha nac', align: 'left', sortable: false, value: 'fecha_nac', width: '10%' },
		{ text: 'Cidula de identidad', align: 'left', sortable: false, value: 'identificacion', width: '15%' },
		{ text: 'Cod asegurado', align: 'left', sortable: false, value: 'cod_asegurado', width: '10%' },
		//{ text: 'Direccion', align: 'left', sortable: false, value: 'direccion', width: '15%' },
		//{ text: 'Email', align: 'left', sortable: false, value: 'email', width: '15%' },
		//{ text: 'Telefono', align: 'left', sortable: false, value: 'telefono', width: '10%' },
		//{ text: 'Lugar nac', align: 'left', sortable: false, value: 'lugar_nac', width: '10%' },
		{ text: 'Pais', align: 'left', sortable: false, value: 'nacionalidad', width: '20%' },
		{ text: 'Genero', align: 'left', sortable: false, value: 'sexo', width: '15%' },
		{ text: 'Estado', align: 'left', sortable: false, value: 'estado_civil', width: '10%' },
		//{ text: 'patmes', align: 'left', sortable: false, value: 'patmes', width: '15%' },
		{ text: 'Operaciones', align: 'center', sortable: false, value: 'action', width: '20%' },
	];
	// tslint:disable-next-line: variable-name
	private menu_fecha_nac: boolean = false;
	private WebApi = new services.Endpoints();

	private empleado = new services.clase_empleado();
	private lstempleado: services.clase_empleado[] = [];
	private ltsempleadosCargar: services.clase_empleado[] = [];
	private lsgenero: services.clase_empleado[] = [];

	private zonas = new services.clase_zonas();
	private lstzonas: services.clase_zonas[] = [];
	private paises = new services.clase_pais();
	private lstpaises: services.clase_pais[] = [];

	private buscarempleado = '';
	private dialog = false;
	private operacion = '';
	private helper: helpers = new helpers();
	private popup = new popup.Swal();
	private activo = false;
	beforeUpdate(){
		this.RecorteTexto()
	}
	private FormatDate(data: any) {
		return moment(data).format('YYYY-MM-DD');
	}
	private listarSexo: any[] = [
		{Sexo: 'Masculino',value:1},{Sexo:'Femenino',value:0}
	];
	private listarEstado: any[] = [
		{Estado: 'Soltero (a)',value:0},{Estado:'Casado (a)',value:1},{Estado:'Divorciado (a)',value:2},{Estado:'Viudo (a)',value:3}
	];
	 RulnomPatMat = [
		(v:any) => !!v || "El campo es requiredo",
        (v:any) => (v && v.length>=3) || "Minimo 3 caracteres",
		(v:any) => (/^[a-z A-Z]*$/.test(v)) || "No se permiten numeros o carcteres especiales"
	];
	 RulEmpEmai = [
		(v:any) => !!v || "El campo es requiredo",
		(v:any) => ( /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v)) || "Email no es valido"
	];
	 RulEmpTele = [
		(v:any) => !!v || "El campo es requiredo",
        (v:any) => (v && v.length>=6) || "Minimo 6 numeros",
        (v:any) => (/^[0-9]*$/.test(v)) || "No se permiten letras o carcteres especiales"

	];
	civalidacionUpd = [
        (v:any) => (/^[0-9 A-Z-]*$/.test(v)) || "CI(Ej: 123456-LP)"

	];
	 validacion = [
		(v: any) => !!v || 'El campo es requerido',
       // (v:any) => (v&&v.length >= 6) || "Deberia ingresar minimo 6 caracteres",
		//(v:any) => (v&&v.length <= 20) || "Se permite hasta 20 caracteres",	
		(v:any) => (/^\d{6,10}((\s|[-])[A-Z]{2})?$/.test(v)) || "CI(Ej: 123456-LP)",
	];
	 RulAuton = [
		 (v: any) => !/^\s*$/.test(v) || 'No se permite espacios vacios o carcteres especiales',
	 ];


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
		new services.Operaciones().Consultar(this.WebApi.ws_empleado_Consultar)
			.then((resempleado) => {
				if (resempleado.data._error.error === 0) {
					this.lstempleado = resempleado.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', resempleado.data._error.descripcion);
				}
			}).catch((error) => {
					this.popup.error('Consultar', 'Error Inesperado: ' + error);
			});
		this.cargarZona();
		this.cargarPaises();

	}
	private cargarPaises(){
		new services.Operaciones().Consultar(this.WebApi.ws_pais_Consultar)
			.then((respaises) => {
				if (respaises.data._error.error === 0) {
					this.lstpaises = respaises.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', respaises.data._error.descripcion);
				}
			}).catch((error) => {
			this.popup.error('Consultar', 'Error Inesperado: ' + error);
		});
	}
	private cargarZona(){
		new services.Operaciones().Consultar(this.WebApi.ws_zonas_Consultar)
			.then((reszonas) => {
				if (reszonas.data._error.error === 0) {
					this.lstzonas = reszonas.data._data;
					this.dialog = false;
				} else {
					this.popup.error('Consultar', reszonas.data._error.descripcion);
				}
			}).catch((error) => {
			this.popup.error('Consultar', 'Error Inesperado: ' + error);
		});
	}
	private Insertar(): void {
		this.empleado = new services.clase_empleado();
		this.empleado.fecha_nac = this.FormatDate(Date.now());
		this.operacion = 'Insert';

		this.dialog = true;
	}
	private Grabar() {
		if (this.operacion === 'Update') {
			new services.Operaciones().Actualizar(this.WebApi.ws_empleado_Actualizar, this.empleado)
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
		new services.Operaciones().Insertar(this.WebApi.ws_empleado_Insertar, this.empleado)
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
	private Actualizar(data: services.clase_empleado): void {
		this.empleado = data;
		this.empleado.fecha_nac = this.FormatDate(Date.now());
		//console.log('EMPLEADO'+JSON.stringify(this.empleado));

        this.operacion = 'Update';
        this.dialog = true;
	}
	private select_fecha(fecha: string) {
		return fecha.substr(0, 10);
	}
	private Eliminar(data: services.clase_empleado): void {
		swal.fire({
			title: 'Esta seguro de esta operacion?',
			text: 'Eliminacion de Registro ' + data.nombres+ ' ' +data.paterno + ' ' +data.materno,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: 'green',
			cancelButtonColor: 'red',
			cancelButtonText: 'Cancelar',
			confirmButtonText: 'Eliminar!',
		}).then((resultOfQuestion) => {
			if (resultOfQuestion.value) {
			new services.Operaciones().Eliminar(this.WebApi.ws_empleado_Eliminar, data)
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

	private RecorteTexto()
	{
		this.empleado.cod_asegurado = this.empleado.fecha_nac.substr(2,3)+''+
			this.empleado.fecha_nac.substr(5,2)+''+
			this.empleado.fecha_nac.substr(-2)+'-'+
			this.empleado.paterno.substr(0,1)+''+
			this.empleado.materno.substr(0,1)+''+
			this.empleado.nombres.substr(0,1);
	}

}
