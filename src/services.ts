import axios from 'axios';
import $store from './store';

// tslint:disable-next-line: max-classes-per-file class-name
export class Endpoints {
	public ws_almacenes_Consultar: string = $store.state.server + 'Api/almacenes/Consultar';
	public ws_almacenes_Buscar: string = $store.state.server + 'Api/almacenes/Buscar';
	public ws_almacenes_Insertar: string = $store.state.server + 'Api/almacenes/Insertar';
	public ws_almacenes_Actualizar: string = $store.state.server + 'Api/almacenes/Actualizar';
	public ws_almacenes_Eliminar: string = $store.state.server + 'Api/almacenes/Eliminar';
	public ws_aperturaycierregestion_Consultar: string = $store.state.server + 'Api/aperturaycierregestion/Consultar';
	public ws_aperturaycierregestion_Buscar: string = $store.state.server + 'Api/aperturaycierregestion/Buscar';
	public ws_aperturaycierregestion_Insertar: string = $store.state.server + 'Api/aperturaycierregestion/Insertar';
	public ws_aperturaycierregestion_Actualizar: string = $store.state.server + 'Api/aperturaycierregestion/Actualizar';
	public ws_aperturaycierregestion_Eliminar: string = $store.state.server + 'Api/aperturaycierregestion/Eliminar';
	public ws_bancos_Consultar: string = $store.state.server + 'Api/bancos/Consultar';
	public ws_bancos_Buscar: string = $store.state.server + 'Api/bancos/Buscar';
	public ws_bancos_Insertar: string = $store.state.server + 'Api/bancos/Insertar';
	public ws_bancos_Actualizar: string = $store.state.server + 'Api/bancos/Actualizar';
	public ws_bancos_Eliminar: string = $store.state.server + 'Api/bancos/Eliminar';
	public ws_cajas_Consultar: string = $store.state.server + 'Api/cajas/Consultar';
	public ws_cajas_Buscar: string = $store.state.server + 'Api/cajas/Buscar';
	public ws_cajas_Insertar: string = $store.state.server + 'Api/cajas/Insertar';
	public ws_cajas_Actualizar: string = $store.state.server + 'Api/cajas/Actualizar';
	public ws_cajas_Eliminar: string = $store.state.server + 'Api/cajas/Eliminar';
	public ws_ciudades_Consultar: string = $store.state.server + 'Api/ciudades/Consultar';
	public ws_ciudades_Buscar: string = $store.state.server + 'Api/ciudades/Buscar';
	public ws_ciudades_Insertar: string = $store.state.server + 'Api/ciudades/Insertar';
	public ws_ciudades_Actualizar: string = $store.state.server + 'Api/ciudades/Actualizar';
	public ws_ciudades_Eliminar: string = $store.state.server + 'Api/ciudades/Eliminar';
	public ws_claseitems_Consultar: string = $store.state.server + 'Api/claseitems/Consultar';
	public ws_claseitems_Buscar: string = $store.state.server + 'Api/claseitems/Buscar';
	public ws_claseitems_Insertar: string = $store.state.server + 'Api/claseitems/Insertar';
	public ws_claseitems_Actualizar: string = $store.state.server + 'Api/claseitems/Actualizar';
	public ws_claseitems_Eliminar: string = $store.state.server + 'Api/claseitems/Eliminar';
	public ws_clientes_Consultar: string = $store.state.server + 'Api/clientes/Consultar';
	public ws_clientes_Buscar: string = $store.state.server + 'Api/clientes/Buscar';
	public ws_clientes_Insertar: string = $store.state.server + 'Api/clientes/Insertar';
	public ws_clientes_Actualizar: string = $store.state.server + 'Api/clientes/Actualizar';
	public ws_clientes_Eliminar: string = $store.state.server + 'Api/clientes/Eliminar';
	public ws_items_Consultar: string = $store.state.server + 'Api/items/Consultar';
	public ws_items_Buscar: string = $store.state.server + 'Api/items/Buscar';
	public ws_items_Insertar: string = $store.state.server + 'Api/items/Insertar';
	public ws_items_Actualizar: string = $store.state.server + 'Api/items/Actualizar';
	public ws_items_Eliminar: string = $store.state.server + 'Api/items/Eliminar';
	public ws_lineas_Consultar: string = $store.state.server + 'Api/lineas/Consultar';
	public ws_lineas_Buscar: string = $store.state.server + 'Api/lineas/Buscar';
	public ws_lineas_Insertar: string = $store.state.server + 'Api/lineas/Insertar';
	public ws_lineas_Actualizar: string = $store.state.server + 'Api/lineas/Actualizar';
	public ws_lineas_Eliminar: string = $store.state.server + 'Api/lineas/Eliminar';
	public ws_monedas_Consultar: string = $store.state.server + 'Api/monedas/Consultar';
	public ws_monedas_Buscar: string = $store.state.server + 'Api/monedas/Buscar';
	public ws_monedas_Insertar: string = $store.state.server + 'Api/monedas/Insertar';
	public ws_monedas_Actualizar: string = $store.state.server + 'Api/monedas/Actualizar';
	public ws_monedas_Eliminar: string = $store.state.server + 'Api/monedas/Eliminar';
	public ws_pais_Consultar: string = $store.state.server + 'Api/pais/Consultar';
	public ws_pais_Buscar: string = $store.state.server + 'Api/pais/Buscar';
	public ws_pais_Insertar: string = $store.state.server + 'Api/pais/Insertar';
	public ws_pais_Actualizar: string = $store.state.server + 'Api/pais/Actualizar';
	public ws_pais_Eliminar: string = $store.state.server + 'Api/pais/Eliminar';
	public ws_proveedores_Consultar: string = $store.state.server + 'Api/proveedores/Consultar';
	public ws_proveedores_Buscar: string = $store.state.server + 'Api/proveedores/Buscar';
	public ws_proveedores_Insertar: string = $store.state.server + 'Api/proveedores/Insertar';
	public ws_proveedores_Actualizar: string = $store.state.server + 'Api/proveedores/Actualizar';
	public ws_proveedores_Eliminar: string = $store.state.server + 'Api/proveedores/Eliminar';
	public ws_sucursales_Consultar: string = $store.state.server + 'Api/sucursales/Consultar';
	public ws_sucursales_Buscar: string = $store.state.server + 'Api/sucursales/Buscar';
	public ws_sucursales_Insertar: string = $store.state.server + 'Api/sucursales/Insertar';
	public ws_sucursales_Actualizar: string = $store.state.server + 'Api/sucursales/Actualizar';
	public ws_sucursales_Eliminar: string = $store.state.server + 'Api/sucursales/Eliminar';
	public ws_tipodepagos_Consultar: string = $store.state.server + 'Api/tipodepagos/Consultar';
	public ws_tipodepagos_Buscar: string = $store.state.server + 'Api/tipodepagos/Buscar';
	public ws_tipodepagos_Insertar: string = $store.state.server + 'Api/tipodepagos/Insertar';
	public ws_tipodepagos_Actualizar: string = $store.state.server + 'Api/tipodepagos/Actualizar';
	public ws_tipodepagos_Eliminar: string = $store.state.server + 'Api/tipodepagos/Eliminar';
	public ws_unidaddemanejo_Consultar: string = $store.state.server + 'Api/unidaddemanejo/Consultar';
	public ws_unidaddemanejo_Buscar: string = $store.state.server + 'Api/unidaddemanejo/Buscar';
	public ws_unidaddemanejo_Insertar: string = $store.state.server + 'Api/unidaddemanejo/Insertar';
	public ws_unidaddemanejo_Actualizar: string = $store.state.server + 'Api/unidaddemanejo/Actualizar';
	public ws_unidaddemanejo_Eliminar: string = $store.state.server + 'Api/unidaddemanejo/Eliminar';
	public ws_ctaspresup_Consultar: string = $store.state.server + 'Api/ctaspresup/Consultar';
	public ws_ctaspresup_Buscar: string = $store.state.server + 'Api/ctaspresup/Buscar';
	public ws_ctaspresup_Insertar: string = $store.state.server + 'Api/ctaspresup/Insertar';
	public ws_ctaspresup_Actualizar: string = $store.state.server + 'Api/ctaspresup/Actualizar';
	public ws_ctaspresup_Eliminar: string = $store.state.server + 'Api/ctaspresup/Eliminar';
	public ws_cuentas_Consultar: string = $store.state.server + 'Api/cuentas/Consultar';
	public ws_cuentas_Buscar: string = $store.state.server + 'Api/cuentas/Buscar';
	public ws_cuentas_Insertar: string = $store.state.server + 'Api/cuentas/Insertar';
	public ws_cuentas_Actualizar: string = $store.state.server + 'Api/cuentas/Actualizar';
	public ws_cuentas_Eliminar: string = $store.state.server + 'Api/cuentas/Eliminar';
	public ws_cuentasbancos_Consultar: string = $store.state.server + 'Api/cuentasbancos/Consultar';
	public ws_cuentasbancos_Buscar: string = $store.state.server + 'Api/cuentasbancos/Buscar';
	public ws_cuentasbancos_Insertar: string = $store.state.server + 'Api/cuentasbancos/Insertar';
	public ws_cuentasbancos_Actualizar: string = $store.state.server + 'Api/cuentasbancos/Actualizar';
	public ws_cuentasbancos_Eliminar: string = $store.state.server + 'Api/cuentasbancos/Eliminar';
	public ws_tipodocumentosidentidad_Consultar: string = $store.state.server + 'Api/tipodocumentosidentidad/Consultar';
	public ws_tipodocumentosidentidad_Buscar: string = $store.state.server + 'Api/tipodocumentosidentidad/Buscar';
	public ws_tipodocumentosidentidad_Insertar: string = $store.state.server + 'Api/tipodocumentosidentidad/Insertar';
	public ws_tipodocumentosidentidad_Actualizar: string = $store.state.server + 'Api/tipodocumentosidentidad/Actualizar';
	public ws_tipodocumentosidentidad_Eliminar: string = $store.state.server + 'Api/tipodocumentosidentidad/Eliminar';
	public ws_tipomovimientoinventario_Consultar: string = $store.state.server + 'Api/tipomovimientoinventario/Consultar';
	public ws_tipomovimientoinventario_Buscar: string = $store.state.server + 'Api/tipomovimientoinventario/Buscar';
	public ws_tipomovimientoinventario_Insertar: string = $store.state.server + 'Api/tipomovimientoinventario/Insertar';
	public ws_tipomovimientoinventario_Actualizar: string = $store.state.server + 'Api/tipomovimientoinventario/Actualizar';
	public ws_tipomovimientoinventario_Eliminar: string = $store.state.server + 'Api/tipomovimientoinventario/Eliminar';
	public ws_tiposcliente_Consultar: string = $store.state.server + 'Api/tiposcliente/Consultar';
	public ws_tiposcliente_Buscar: string = $store.state.server + 'Api/tiposcliente/Buscar';
	public ws_tiposcliente_Insertar: string = $store.state.server + 'Api/tiposcliente/Insertar';
	public ws_tiposcliente_Actualizar: string = $store.state.server + 'Api/tiposcliente/Actualizar';
	public ws_tiposcliente_Eliminar: string = $store.state.server + 'Api/tiposcliente/Eliminar';	
	public ws_tipositems_Consultar: string = $store.state.server + 'Api/tipositems/Consultar';
	public ws_tipositems_Buscar: string = $store.state.server + 'Api/tipositems/Buscar';
	public ws_tipositems_Insertar: string = $store.state.server + 'Api/tipositems/Insertar';
	public ws_tipositems_Actualizar: string = $store.state.server + 'Api/tipositems/Actualizar';
	public ws_tipositems_Eliminar: string = $store.state.server + 'Api/tipositems/Eliminar';
	public ws_tiposproveedor_Consultar: string = $store.state.server + 'Api/tiposproveedor/Consultar';
	public ws_tiposproveedor_Buscar: string = $store.state.server + 'Api/tiposproveedor/Buscar';
	public ws_tiposproveedor_Insertar: string = $store.state.server + 'Api/tiposproveedor/Insertar';
	public ws_tiposproveedor_Actualizar: string = $store.state.server + 'Api/tiposproveedor/Actualizar';
	public ws_tiposproveedor_Eliminar: string = $store.state.server + 'Api/tiposproveedor/Eliminar';
	public ws_zonas_Consultar: string = $store.state.server + 'Api/zonas/Consultar';
	public ws_zonas_Buscar: string = $store.state.server + 'Api/zonas/Buscar';
	public ws_zonas_Insertar: string = $store.state.server + 'Api/zonas/Insertar';
	public ws_zonas_Actualizar: string = $store.state.server + 'Api/zonas/Actualizar';
	public ws_zonas_Eliminar: string = $store.state.server + 'Api/zonas/Eliminar';
	public ws_empresa_Consultar: string = $store.state.server + 'Api/Empresa/consultar';
	public ws_tiposcomprobantes_Consultar: string = $store.state.server + 'Api/tiposcomprobantes/Consultar';
	public ws_tiposcomprobantes_Buscar: string = $store.state.server + 'Api/tiposcomprobantes/Buscar';
	public ws_tiposcomprobantes_Insertar: string = $store.state.server + 'Api/tiposcomprobantes/Insertar';
	public ws_tiposcomprobantes_Actualizar: string = $store.state.server + 'Api/tiposcomprobantes/Actualizar';
	public ws_tiposcomprobantes_Eliminar: string = $store.state.server + 'Api/tiposcomprobantes/Eliminar';
	public ws_correlativostiposcomprobantes_Consultar: string = $store.state.server + 'Api/correlativostiposcomprobantes/Consultar';
	public ws_correlativostiposcomprobantes_Buscar: string = $store.state.server + 'Api/correlativostiposcomprobantes/Buscar';
	public ws_correlativostiposcomprobantes_Insertar: string = $store.state.server + 'Api/correlativostiposcomprobantes/Insertar';
	public ws_correlativostiposcomprobantes_Actualizar: string = $store.state.server + 'Api/correlativostiposcomprobantes/Actualizar';
	public ws_correlativostiposcomprobantes_Eliminar: string = $store.state.server + 'Api/correlativostiposcomprobantes/Eliminar';
	public ws_asientosdetalle_Consultar: string = $store.state.server + 'Api/asientosdetalle/Consultar';
	public ws_asientosdetalle_Buscar: string = $store.state.server + 'Api/asientosdetalle/Buscar';
	public ws_asientosdetalle_Insertar: string = $store.state.server + 'Api/asientosdetalle/Insertar';
	public ws_asientosdetalle_Actualizar: string = $store.state.server + 'Api/asientosdetalle/Actualizar';
	public ws_asientosdetalle_Eliminar: string = $store.state.server + 'Api/asientosdetalle/Eliminar';
	public ws_asientosencabezado_Consultar: string = $store.state.server + 'Api/asientosencabezado/Consultar';
	public ws_asientosencabezado_Buscar: string = $store.state.server + 'Api/asientosencabezado/Buscar';
	public ws_asientosencabezado_Insertar: string = $store.state.server + 'Api/asientosencabezado/Insertar';
	public ws_asientosencabezado_Actualizar: string = $store.state.server + 'Api/asientosencabezado/Actualizar';
	public ws_asientosencabezado_Eliminar: string = $store.state.server + 'Api/asientosencabezado/Eliminar';
	public ws_tiposdecambio_Consultar: string = $store.state.server + 'Api/tiposdecambio/Consultar';
	public ws_tiposdecambio_Buscar: string = $store.state.server + 'Api/tiposdecambio/Buscar';
	public ws_tiposdecambio_Insertar: string = $store.state.server + 'Api/tiposdecambio/Insertar';
	public ws_tiposdecambio_Actualizar: string = $store.state.server + 'Api/tiposdecambio/Actualizar';
	public ws_tiposdecambio_Eliminar: string = $store.state.server + 'Api/tiposdecambio/Eliminar';


	public ws_descuentos_Consultar: string = $store.state.server + 'Api/descuentos/Consultar';
	public ws_descuentos_Buscar: string = $store.state.server + 'Api/descuentos/Buscar';
	public ws_descuentos_Insertar: string = $store.state.server + 'Api/descuentos/Insertar';
	public ws_descuentos_Actualizar: string = $store.state.server + 'Api/descuentos/Actualizar';
	public ws_descuentos_Eliminar: string = $store.state.server + 'Api/descuentos/Eliminar';

	public ws_empleado_Consultar: string = $store.state.server + 'Api/empleado/Consultar';
	public ws_empleado_Buscar: string = $store.state.server + 'Api/empleado/Buscar';
	public ws_empleado_Insertar: string = $store.state.server + 'Api/empleado/Insertar';
	public ws_empleado_Actualizar: string = $store.state.server + 'Api/empleado/Actualizar';
	public ws_empleado_Eliminar: string = $store.state.server + 'Api/empleado/Eliminar';


	public ws_haberes_Consultar: string = $store.state.server + 'Api/haberes/Consultar';
	public ws_haberes_Buscar: string = $store.state.server + 'Api/haberes/Buscar';
	public ws_haberes_Insertar: string = $store.state.server + 'Api/haberes/Insertar';
	public ws_haberes_Actualizar: string = $store.state.server + 'Api/haberes/Actualizar';
	public ws_haberes_Eliminar: string = $store.state.server + 'Api/haberes/Eliminar';

	public ws_parametros_Consultar: string = $store.state.server + 'Api/parametros/Consultar';
	public ws_parametros_Buscar: string = $store.state.server + 'Api/parametros/Buscar';
	public ws_parametros_Insertar: string = $store.state.server + 'Api/parametros/Insertar';
	public ws_parametros_Actualizar: string = $store.state.server + 'Api/parametros/Actualizar';
	public ws_parametros_Eliminar: string = $store.state.server + 'Api/parametros/Eliminar';

	public ws_firmas_Consultar: string = $store.state.server + 'Api/firmas/Consultar';
	public ws_firmas_Buscar: string = $store.state.server + 'Api/firmas/Buscar';
	public ws_firmas_Insertar: string = $store.state.server + 'Api/firmas/Insertar';
	public ws_firmas_Actualizar: string = $store.state.server + 'Api/firmas/Actualizar';
	public ws_firmas_Eliminar: string = $store.state.server + 'Api/firmas/Eliminar';

	public ws_planilla_Consultar: string = $store.state.server + 'Api/planilla/Consultar';
	public ws_planilla_Buscar: string = $store.state.server + 'Api/planilla/Buscar';
	public ws_planilla_Insertar: string = $store.state.server + 'Api/planilla/Insertar';
	public ws_planilla_Actualizar: string = $store.state.server + 'Api/planilla/Actualizar';
	public ws_planilla_Eliminar: string = $store.state.server + 'Api/planilla/Eliminar';

	//segundo ABMs

	public ws_creditofiscal_Consultar: string = $store.state.server + 'Api/creditofiscal/Consultar';
	public ws_creditofiscal_Buscar: string = $store.state.server + 'Api/creditofiscal/Buscar';
	public ws_creditofiscal_Insertar: string = $store.state.server + 'Api/creditofiscal/Insertar';
	public ws_creditofiscal_Actualizar: string = $store.state.server + 'Api/creditofiscal/Actualizar';
	public ws_creditofiscal_Eliminar: string = $store.state.server + 'Api/creditofiscal/Eliminar';

	public ws_jerarquia_Consultar: string = $store.state.server + 'Api/jerarquia/Consultar';
	public ws_jerarquia_Buscar: string = $store.state.server + 'Api/jerarquia/Buscar';
	public ws_jerarquia_Insertar: string = $store.state.server + 'Api/jerarquia/Insertar';
	public ws_jerarquia_Actualizar: string = $store.state.server + 'Api/jerarquia/Actualizar';
	public ws_jerarquia_Eliminar: string = $store.state.server + 'Api/jerarquia/Eliminar';

	public ws_planilla_esp_Consultar: string = $store.state.server + 'Api/planilla_esp/Consultar';
	public ws_planilla_esp_Buscar: string = $store.state.server + 'Api/planilla_esp/Buscar';
	public ws_planilla_esp_Insertar: string = $store.state.server + 'Api/planilla_esp/Insertar';
	public ws_planilla_esp_Actualizar: string = $store.state.server + 'Api/planilla_esp/Actualizar';
	public ws_planilla_esp_Eliminar: string = $store.state.server + 'Api/planilla_esp/Eliminar';

	public ws_tipo_descuento_Consultar: string = $store.state.server + 'Api/tipo_descuento/Consultar';
	public ws_tipo_descuento_Buscar: string = $store.state.server + 'Api/tipo_descuento/Buscar';
	public ws_tipo_descuento_Insertar: string = $store.state.server + 'Api/tipo_descuento/Insertar';
	public ws_tipo_descuento_Actualizar: string = $store.state.server + 'Api/tipo_descuento/Actualizar';
	public ws_tipo_descuento_Eliminar: string = $store.state.server + 'Api/tipo_descuento/Eliminar';

	public ws_tipo_empleado_Consultar: string = $store.state.server + 'Api/tipo_empleado/Consultar';
	public ws_tipo_empleado_Buscar: string = $store.state.server + 'Api/tipo_empleado/Buscar';
	public ws_tipo_empleado_Insertar: string = $store.state.server + 'Api/tipo_empleado/Insertar';
	public ws_tipo_empleado_Actualizar: string = $store.state.server + 'Api/tipo_empleado/Actualizar';
	public ws_tipo_empleado_Eliminar: string = $store.state.server + 'Api/tipo_empleado/Eliminar';

	public ws_tipo_haber_Consultar: string = $store.state.server + 'Api/tipo_haber/Consultar';
	public ws_tipo_haber_Buscar: string = $store.state.server + 'Api/tipo_haber/Buscar';
	public ws_tipo_haber_Insertar: string = $store.state.server + 'Api/tipo_haber/Insertar';
	public ws_tipo_haber_Actualizar: string = $store.state.server + 'Api/tipo_haber/Actualizar';
	public ws_tipo_haber_Eliminar: string = $store.state.server + 'Api/tipo_haber/Eliminar';

	//parte 3

	public ws_planilla_descuentos_Consultar: string = $store.state.server + 'Api/planilla_descuentos/Consultar';
	public ws_planilla_descuentos_Buscar: string = $store.state.server + 'Api/planilla_descuentos/Buscar';
	public ws_planilla_descuentos_Insertar: string = $store.state.server + 'Api/planilla_descuentos/Insertar';
	public ws_planilla_descuentos_Actualizar: string = $store.state.server + 'Api/planilla_descuentos/Actualizar';
	public ws_planilla_descuentos_Eliminar: string = $store.state.server + 'Api/planilla_descuentos/Eliminar';

	public ws_planilla_haberes_Consultar: string = $store.state.server + 'Api/planilla_haberes/Consultar';
	public ws_planilla_haberes_Buscar: string = $store.state.server + 'Api/planilla_haberes/Buscar';
	public ws_planilla_haberes_Insertar: string = $store.state.server + 'Api/planilla_haberes/Insertar';
	public ws_planilla_haberes_Actualizar: string = $store.state.server + 'Api/planilla_haberes/Actualizar';
	public ws_planilla_haberes_Eliminar: string = $store.state.server + 'Api/planilla_haberes/Eliminar';

	public ws_reportecreditofiscal_Consultar: string = $store.state.server + 'Api/reportecreditofiscal/Consultar';
	public ws_reportecreditofiscal_Buscar: string = $store.state.server + 'Api/reportecreditofiscal/Buscar';
	public ws_reportecreditofiscal_Insertar: string = $store.state.server + 'Api/reportecreditofiscal/Insertar';
	public ws_reportecreditofiscal_Actualizar: string = $store.state.server + 'Api/reportecreditofiscal/Actualizar';
	public ws_reportecreditofiscal_Eliminar: string = $store.state.server + 'Api/reportecreditofiscal/Eliminar';


	public ws_empleado_depto_Consultar: string = $store.state.server + 'Api/empleado_depto/Consultar';
	public ws_empleado_depto_Buscar: string = $store.state.server + 'Api/empleado_depto/Buscar';
	public ws_empleado_depto_Insertar: string = $store.state.server + 'Api/empleado_depto/Insertar';
	public ws_empleado_depto_Actualizar: string = $store.state.server + 'Api/empleado_depto/Actualizar';
	public ws_empleado_depto_Eliminar: string = $store.state.server + 'Api/empleado_depto/Eliminar';

	public ws_personal_departamentos_Consultar: string = $store.state.server + 'Api/personal_departamentos/Consultar';
	public ws_personal_departamentos_Buscar: string = $store.state.server + 'Api/personal_departamentos/Buscar';
	public ws_personal_departamentos_Insertar: string = $store.state.server + 'Api/personal_departamentos/Insertar';
	public ws_personal_departamentos_Actualizar: string = $store.state.server + 'Api/personal_departamentos/Actualizar';
	public ws_personal_departamentos_Eliminar: string = $store.state.server + 'Api/personal_departamentos/Eliminar';

}
// tslint:disable-next-line: max-classes-per-file class-name
export class clase_personal_departamentos {
	public personal_departamento!: number;
	public nombre!: string;
	public minimo!: number;
	public maximo!: number;
	public empresa!: number;
}
// tslint:disable-next-line: max-classes-per-file class-name
export class clase_empleado_depto {
	public empleado!: number;
	public departamento!: number;
	public cargo!: string;
	public haber_basico!: number;
	public quincena!: number;
	public fecha_ingreso!: any;
	public fecha_quinquenio!: any;
	public correlativo!: number;
	public tipoempleado!: number;
	public planilla!: number;
	public jerarquia!: number;
	public cuenta!: string;
	public oficina!: string;
	public estado!: boolean;
	public saldo_anterior_iva!: number;
	public envio_email!: boolean;
}
// tslint:disable-next-line: max-classes-per-file class-name
export class clase_planilla_descuentos {
	public empleado!: number;
	public mes!: number;
	public año!: number;
	public descuento!: number;
	public correlativo!: number;
	public fecha!: any;
	public valor!: number;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_planilla_haberes {
	public empleado!: number;
	public mes!: number;
	public año!: number;
	public haber!: number;
	public correlativo!: number;
	public fecha!: any;
	public valor!: number;
}

export class clase_reportecreditofiscal {
	public mes!: number;
	public año!: number;
	public empleado!: number;
	public cempleado!: string;
	public basico!: number;
	public antiguedad!: number;
	public totalganado!: number;
	public descuentosdeley!: number;
	public totalsueldo!: number;
	public otrosingresos!: number;
	public sueldoneto!: number;
	public minimonoimp!: number;
	public difsujetaimp!: number;
	public _13porciva!: number;
	public form87decl!: number;
	public _13s_2min!: number;
	public saldoa_f_fisco!: number;
	public saldoa_f_depent!: number;
	public saldoanterior!: number;
	public actualizacion!: number;
	public saldototal!: number;
	public saldototaldep!: number;
	public saldoutilizado!: number;
	public impuestoretenido!: number;
	public saldosigmes!: number;
}


// tslint:disable-next-line: max-classes-per-file class-name
export class clase_creditofiscal {
	public empleado!: number;
	public mes!: number;
	public año!: number;
	public declarado!: number;
	public actualizacion!: number;
	public saldo!: number;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_jerarquia {
	public jerarquia!: number;
	public nombre!: string;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_planilla_esp {
	public planilla_esp!: number;
	public descripcion!: string;
	public haber!: number;
	public tipo!: string;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_tipo_descuento {
	public tipo_descuento!: number;
	public nombre!: string;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_tipo_empleado {
	public tipo_empleado!: number;
	public nombre!: string;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_tipo_haber {
	public tipo_haber!: number;
	public nombre!: string;
}



// tslint:disable-next-line: max-classes-per-file class-name
export class clase_descuentos {
	public descuento!: number;
	public nombre!: string;
	public calculo!: boolean;
	public valor!: number;
	public tipo!: boolean;
	public tipo_descuento!: number;
	public basico!: boolean;
	public eventual!: number;
}
// tslint:disable-next-line: max-classes-per-file class-name
export class clase_empleado {
	public empleado!: number;
	public paterno!: string;
	public materno!: string;
	public nombres!: string;
	public fecha_nac!: any;
	public identificacion!: string;
	public cod_asegurado!: string;
	public direccion!: string;
	public email!: string;
	public telefono!: string;
	public lugar_nac!: string;
	public nacionalidad!: string;
	public sexo!: number;
	public estado_civil!: number;
	public patmes!: number;
}



// tslint:disable-next-line: max-classes-per-file class-name
export class clase_haberes {
	public haber!: number;
	public nombre!: string;
	public calculo!: boolean;
	public retencion!: boolean;
	public tipo!: boolean;
	public valor!: number;
	public tipo_haber!: number;
	public basico!: boolean;
	public extra!: boolean;
	public eventual!: number;
}
// tslint:disable-next-line: max-classes-per-file class-name
export class clase_parametros {
	public mes!: number;
	public año!: number;
	public cotizacion!: number;
	public minimo_nacional!: number;
	public ufb!: number;
}
// tslint:disable-next-line: max-classes-per-file class-name
export class clase_planilla {
	public planilla!: number;
	public nombre!: string;
}
// tslint:disable-next-line: max-classes-per-file class-name pull des push
export class clase_firmas {
	public firma1!: string;
	public cargo1!: string;
	public firma2!: string;
	public cargo2!: string;
}



export class clase_asientosdetalle {
	public idtipocomprobante!: number;
	public numerocomprobante!: string;
	public nrolinea!: number;
	public cuenta!: string;
	public glosadetalle!: string;
	public tipomov!: string;
	public montobs!: number;
	public montosus!: number;
}

export class clase_asientosencabezado {
	public idtipocomprobante!: number;
	public numerocomprobante!: string;
	public fecha!: any;
	public referencia!: string;
	public glosa!: string;
	public cotizacion!: number;
	public codigomodulo!: string;
}

export class clase_tiposdecambio {
	public fecha!: any;
	public idmonedaorigen!: number;
	public idmonedadestino!: number;
	public cotizacionoficial!: number;
	public cotizacioncompra!: number;
	public cotizacionventa!: number;
}
// tslint:disable-next-line: max-classes-per-file class-name
export class ClaseAutenticacion {
    public usuario!: string;
    public password!: string;
    public dominio?: string;
}

export class clase_tiposcomprobantes {
	public idtipocomprobante!: number;
	public descripcion!: string;
	public sigla!: string;
	public automatico!: boolean;
	public idsucursal!: number;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_almacenes {
	public codigoalmacen!: string;
	public descripcion!: string;
	public idtipomovimiento!: number;
	public idciudad!: number;
	public virtual!: boolean;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_aperturaycierregestion {
	public gestion!: string;
	public mes!: number;
	public abierta!: boolean;
	public mesformat!: string;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_bancos {
	public idbanco!: number;
	public nit!: string;
	public descripcion!: string;
	public bancopropio!: boolean;
	public idpais!: number;
	public idciudad!: number;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_cajas {
	public idcaja!: number;
	public descripcion!: string;
	public cuenta!: string;
	public monto!: number;
	public idmoneda!: number;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_ciudades {
	public idciudad!: number;
	public idpais!: number;
	public descripcion!: string;
	public sigla!: string;
	public idmoneda!: number;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_claseitems {
	public idclase!: number;
	public descripcion!: string;
	public sigla!: string;
	public cuentaventa!: string;
	public cuentacosto!: string;
	public cuentagasto!: string;
	public cuentainventario!: string;
	public ingresainventario!: boolean;
}

export class clase_correlativostiposcomprobantes {
	public idtipocomprobante!: number;
	public anio!: number;
	public mes!: number;
	public correlativo!: number;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_clientes {
	public codigocliente!: string;
	public codigoclienteprincipal!: string;
	public iddocumentoidentidad!: number;
	public numerodocumento!: string;
	public razonsocial!: string;
	public idpais!: number;
	public idciudad!: number;
	public idzona!: number;
	public idtipocliente!: number;
	public descripciondireccion!: string;
	public telefono!: string;
	public correoelectronico!: string;
	public casillacorreo!: string;
	public cuentacontable!: string;
	public cuentacontableanticipos!: string;
	public activo!: boolean;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_cuentas {
	public cuenta!: string;
	public nombrecuenta!: string;
	public idmoneda!: number;
	public nivel!: number;
	public cuentaasiento!: boolean;
	public cuentasumar!: string;
	public activopasivo!: number;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_cuentasbancos {
	public idbanco!: number;
	public nrocuenta!: string;
	public idmoneda!: number;
	public saldoactual!: number;
	public cuentacontable!: string;
	public fechaapertura!: any;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_ctaspresup {
	public cuentapresup!: string;
	public nombrecuentapresup!: string;
	public idmoneda!: number;
	public nivel!: number;
	public fechacreacion!: any;
	public fechamodificacion!: any;
	public balancecuenta!: boolean;
	public cuentaasiento!: boolean;
	public grabado!: boolean;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_items {
	public codigoitem!: string;
	public modelonroparte!: string;
	public descripcion!: string;
	public fechacreacion!: any;
	public fechaultimomovimiento!: any;
	public costoinicial!: number;
	public costoactual!: number;
	public saldoinicial!: number;
	public saldoactual!: number;
	public idclase!: number;
	public idtipoitem!: number;
	public idunidadmanejo!: number;
	public codigoitemsup!: string;
	public cantidadminima!: number;
	public cantidadmaxima!: number;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_lineas {
	public idlinea!: number;
	public descripcion!: string;
	public cuenta!: string;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_monedas {
	public idmoneda!: number;
	public descripcion!: string;
	public sigla!: string;
	public monedalocal!: boolean;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_pais {
	public idpais!: number;
	public descripcion!: string;
	public sigla!: string;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_proveedores {
	public codigoproveedor!: string;
	public iddocumentoidentidad!: number;
	public numerodocumento!: string;
	public razonsocial!: string;
	public direccion!: string;
	public idpais!: number;
	public idciudad!: number;
	public idmoneda!: number;
	public contacto!: string;
	public telefonos!: string;
	public fax!: string;
	public cuenta!: string;
	public idtipoproveedor!: number;
	public fechacreacion!: any;
	public codaduana!: string;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_sucursales {
	public idsucursal!: number;
	public idempresa!: number;
	public idzona!: number;
	public nombre!: string;
	public direccion!: string;
	public numero!: number;
	public telefonos!: string;
	public email!: string;
	public codigopostal!: string;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_tipodepagos {
	public idtipopago!: number;
	public descripcion!: string;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_unidaddemanejo {
	public idunidadmanejo!: number;
	public descripcion!: string;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_tipodocumentosidentidad {
	public iddocumentoidentidad!: number;
	public descripcion!: string;
	public sigla!: string;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_tipomovimientoinventario {
	public idtipomovimiento!: number;
	public descripcion!: string;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_tiposcliente {
	public idtipocliente!: number;
	public descripcion!: string;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_tipositems {
	public idtipoitem!: number;
	public descripcion!: string;
	public sigla!: string;
	public ingresainventario!: boolean;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_tiposproveedor {
	public idtipoproveedor!: number;
	public descripcion!: string;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class clase_zonas {
	public idzona!: number;
	public idpais!: number;
	public idciudad!: number;
	public descripcion!: string;
}

export class clase_empresa {
	public idempresa !: number;
	public idpais !: number;
	public idciudad!: number;
	public descripcion !: string;
	public logo !: string;
	public NIT !: string;
	public patronal !: string;
	public estado !: boolean;
}

// tslint:disable-next-line: max-classes-per-file class-name
export class Operaciones {
	public Login(url: string, objeto: any) {
		return axios.post(url, objeto, {
			headers: { 'Content-Type': 'application/json' },
		  });
	  }
	public Logout(url: string, objeto: any) {
		return axios.post(url, objeto, {
			headers: { 'Content-Type': 'application/json' },
		  });
	  }
	public Consultar(url: string) {
	  return axios.post(url);
	}
	public Buscar(url: string, objeto: any) {
		return axios.post(url, objeto, {
			headers: { 'Content-Type': 'application/json' },
		  });
	  }
	  public Insertar(url: string, objeto: any) {
		  return axios.post(url, objeto, {
			  headers: { 'Content-Type': 'application/json' },
			});
		}
	public Actualizar(url: string, objeto: any) {
		return axios.put(url, objeto, {
		headers: { 'Content-Type': 'application/json' },
		});
	}
	public Eliminar(url: string, objeto: any) {
	  return axios.delete(url, {
		headers: { 'Content-Type': 'application/json' },
		data: objeto,
	  });
	}
  }
