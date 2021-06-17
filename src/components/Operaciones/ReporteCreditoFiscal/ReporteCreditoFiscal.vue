<template>
	<v-card>
		<v-toolbar color="primary" style="color:white">
			<v-toolbar-title>Datos de Reporte Credito Fiscal</v-toolbar-title>
			<v-divider></v-divider>
			<v-text-field v-model="buscarreportecreditofiscal"
					append-icon="search"
					label="Buscar Registro"
					single-line
					solo
					hide-details></v-text-field>
		</v-toolbar>
		<v-data-table 	style="padding: 5px"
						:headers="headers" 
						:items="lstreportecreditofiscal" 
						:items-per-page="30"
						:search = "buscarreportecreditofiscal" 
						:footer-props="{
							showFirstLastPage: true,
							'items-per-page-options': [10, 20, 30, 40, 50, -1],
							'items-per-page-text': 'Registros por Pagina:',
						}"
						dense
						class="elevation-1">
			<template slot="item" slot-scope="props">
				<tr>
					<!--<td>{{ helper.showDataDescription(props.item.saldosigmes,lstReporteCreditoFiscal, id, descripcion)  }}</td>// Ejemplo de Uso de Helper Para obtener la Descripcion de una Tabla por medio de su Id-->
					<td>{{ FormatMes(props.item.mes)}}</td>
					<td>{{ props.item.año }}</td>
          <!--	<td>{{ props.item.empleado }}</td>-->
            <td>{{ props.item.cempleado }}</td>
					<td>{{ props.item.basico }}</td>
          <!--
					<td>{{ props.item.antiguedad }}</td>
					<td>{{ props.item.totalganado }}</td>
					<td>{{ props.item.descuentosdeley }}</td>
					-->
					<td>{{ props.item.totalsueldo }}</td>
          <!--
					<td>{{ props.item.otrosingresos }}</td>
					<td>{{ props.item.sueldoneto }}</td>
					<td>{{ props.item.minimonoimp }}</td>
					<td>{{ props.item.difsujetaimp }}</td>
					<td>{{ props.item._13porciva }}</td>
					<td>{{ props.item.form87decl }}</td>
					<td>{{ props.item._13s_2min }}</td>
					<td>{{ props.item.saldoa_f_fisco }}</td>
					<td>{{ props.item.saldoa_f_depent }}</td>
          -->
					<td>{{ props.item.saldoanterior }}</td>
					<!--<td>{{ props.item.actualizacion }}</td>-->
          <!--
					<td>{{ props.item.saldototal }}</td>
					<td>{{ props.item.saldototaldep }}</td>
					<td>{{ props.item.saldoutilizado }}</td>
					<td>{{ props.item.impuestoretenido }}</td>
					<td>{{ props.item.saldosigmes }}</td>
          -->
					<td>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn color="success" v-on="on" fab small dark  @click="Actualizar(props.item)"><v-icon>edit</v-icon></v-btn>
							</template>
							<span>Modificar Registro de Reporte Credito Fiscal</span>
						</v-tooltip>
						<v-tooltip style="padding-left:10px" bottom>
							<template v-slot:activator="{ on }" >
								<v-btn color="error" v-on="on" fab small dark  @click="Eliminar(props.item)"><v-icon>delete</v-icon></v-btn>
							</template>
							<span>Eliminar Registro de Reporte Credito Fiscal</span>
						</v-tooltip>
					</td>
				</tr>
			</template>
			<template v-slot:top>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn color="accent" v-on="on" @click="Insertar()">Adicionar Nuevo Registro de Reporte Credito Fiscal</v-btn>
					</template>
					<span>Adicionar nuevo registro de Reporte Credito Fiscal</span>
				</v-tooltip>
			</template>
			<template v-slot:no-data>
				<v-alert :value="true" color="warning" icon="warning">
					Lo sentimos, no exiten datos a desplegar: (
				</v-alert>
			</template>
		</v-data-table>
		<v-dialog v-model="dialog" persistent max-width="50%">
			<v-card>
				<v-toolbar style="padding:10px" dark class="primary">
					<v-toolbar-title>Datos de Reporte Credito Fiscal</v-toolbar-title>
				</v-toolbar>
				<v-divider></v-divider>
				<v-form ref="form" style="padding:10px" v-model="activa">
					<v-card-text>
						<v-layout wrap>
							<v-flex sm4 style="padding: 5px">
								<v-autocomplete v-model="reportecreditofiscal.mes"
											label="Seleccione mes"
                      :items="listarMes"
                      item-text="Mes"
                      item-value="value"
                      outlined
                      autocomplete="off"
                      color="#1A237E"
                      :rules="ruleSelec"
                      no-data-text="No se encontro ningun tema"
											>
								</v-autocomplete>
							</v-flex>
							<v-flex sm3 style="padding: 5px">
								<v-text-field v-model="reportecreditofiscal.año"
											label="Año"
                      clearable
                      disabled
                      persistent-hint
                      required
											>
								</v-text-field>
							</v-flex>
							<v-flex sm5 style="padding: 5px">
								<v-autocomplete v-model="reportecreditofiscal.empleado"
											label="Seleccione Empleado"
                      :items="lstempleados"
                      item-text="nombres"
                      item-value="empleado"
                      outlined
                      autocomplete="off"
                      color="#1A237E"
                      :rules="ruleSelec"
                      no-data-text="No se encontro ningun tema"
									>
								</v-autocomplete>
							</v-flex>
							<v-flex sm6 style="padding: 5px">
								<v-text-field v-model="reportecreditofiscal.cempleado"
											label="Ingrese CEmpleado"
											clearable
											persistent-hint
											required
                      :rules="RuleLetras"
											@input="reportecreditofiscal.cempleado = updateText(reportecreditofiscal.cempleado)">
								</v-text-field>
							</v-flex>
							<v-flex sm6 style="padding: 5px">
								<v-text-field v-model="reportecreditofiscal.basico"
											label="Ingrese Basico"
											clearable
											persistent-hint
											required
                      :rules="validacion"
											@input="reportecreditofiscal.basico = updateText(reportecreditofiscal.basico)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-text-field v-model="reportecreditofiscal.antiguedad"
											label="Ingrese Antiguedad"
											clearable
											persistent-hint
											required
                      :rules="validacion"
											@input="reportecreditofiscal.antiguedad = updateText(reportecreditofiscal.antiguedad)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-text-field v-model="reportecreditofiscal.totalganado"
											label="Ingrese Total Ganado"
											clearable
											persistent-hint
											required
                      :rules="validacion"
											@input="reportecreditofiscal.totalganado = updateText(reportecreditofiscal.totalganado)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-text-field v-model="reportecreditofiscal.descuentosdeley"
											label="Ingrese Descuentos De Ley"
											clearable
											persistent-hint
											required
                      :rules="validacion"
											@input="reportecreditofiscal.descuentosdeley = updateText(reportecreditofiscal.descuentosdeley)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-text-field v-model="reportecreditofiscal.totalsueldo"
											label="Ingrese TotalSueldo"
											clearable
											persistent-hint
											required
                      :rules="validacion"
											@input="reportecreditofiscal.totalsueldo = updateText(reportecreditofiscal.totalsueldo)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-text-field v-model="reportecreditofiscal.otrosingresos"
											label="Ingrese Otros Ingreso"
											clearable
											persistent-hint
											required
                      :rules="validacion"
											@input="reportecreditofiscal.otrosingresos = updateText(reportecreditofiscal.otrosingresos)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-text-field v-model="reportecreditofiscal.sueldoneto"
											label="Ingrese Sueldo Neto"
											clearable
											persistent-hint
											required
                      :rules="validacion"
											@input="reportecreditofiscal.sueldoneto = updateText(reportecreditofiscal.sueldoneto)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-text-field v-model="reportecreditofiscal.minimonoimp"
											label="Ingrese Minimo No Imp"
											clearable
											persistent-hint
											required
                      :rules="validacion"
											@input="reportecreditofiscal.minimonoimp = updateText(reportecreditofiscal.minimonoimp)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-text-field v-model="reportecreditofiscal.difsujetaimp"
											label="Ingrese Dif Sujeta Imp"
											clearable
											persistent-hint
                      :rules="validacion"
											required
											@input="reportecreditofiscal.difsujetaimp = updateText(reportecreditofiscal.difsujetaimp)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-text-field v-model="reportecreditofiscal._13porciva"
											label="Ingrese _13% IVA"
											clearable
											persistent-hint
											required
                      :rules="validacion"
											@input="reportecreditofiscal._13porciva = updateText(reportecreditofiscal._13porciva)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-text-field v-model="reportecreditofiscal.form87decl"
											label="Ingrese Form Decl"
											clearable
											persistent-hint
											required
                      :rules="validacion"
											@input="reportecreditofiscal.form87decl = updateText(reportecreditofiscal.form87decl)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-text-field v-model="reportecreditofiscal._13s_2min"
											label="Ingrese Min"
											clearable
											persistent-hint
											required
                      :rules="validacion"
											@input="reportecreditofiscal._13s_2min = updateText(reportecreditofiscal._13s_2min)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-text-field v-model="reportecreditofiscal.saldoa_f_fisco"
											label="Ingrese Saldo A_F_Fisco"
											clearable
											persistent-hint
											required
                      :rules="validacion"
											@input="reportecreditofiscal.saldoa_f_fisco = updateText(reportecreditofiscal.saldoa_f_fisco)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-text-field v-model="reportecreditofiscal.saldoa_f_depent"
											label="Ingrese Saldo A_F_Depent"
											clearable
											persistent-hint
											required
                      :rules="validacion"
											@input="reportecreditofiscal.saldoa_f_depent = updateText(reportecreditofiscal.saldoa_f_depent)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-text-field v-model="reportecreditofiscal.saldoanterior"
											label="Ingrese Saldo Anterior"
											clearable
											persistent-hint
											required
                      :rules="validacion"
											@input="reportecreditofiscal.saldoanterior = updateText(reportecreditofiscal.saldoanterior)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-text-field v-model="reportecreditofiscal.actualizacion"
											label="Ingrese Actualizacion"
											clearable
											persistent-hint
											required
                      :rules="validacion"
											@input="reportecreditofiscal.actualizacion = updateText(reportecreditofiscal.actualizacion)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-text-field v-model="reportecreditofiscal.saldototal"
											label="Ingrese Saldo Total"
											clearable
											persistent-hint
											required
                      :rules="validacion"
											@input="reportecreditofiscal.saldototal = updateText(reportecreditofiscal.saldototal)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-text-field v-model="reportecreditofiscal.saldototaldep"
											label="Ingrese Saldo Total Dep"
											clearable
											persistent-hint
											required
                      :rules="validacion"
											@input="reportecreditofiscal.saldototaldep = updateText(reportecreditofiscal.saldototaldep)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-text-field v-model="reportecreditofiscal.saldoutilizado"
											label="Ingrese Saldo Utilizado"
											clearable
											persistent-hint
											required
                      :rules="validacion"
											@input="reportecreditofiscal.saldoutilizado = updateText(reportecreditofiscal.saldoutilizado)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-text-field v-model="reportecreditofiscal.impuestoretenido"
											label="Ingrese Impuesto Retenido"
											clearable
											persistent-hint
											required
                      :rules="validacion"
											@input="reportecreditofiscal.impuestoretenido = updateText(reportecreditofiscal.impuestoretenido)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-text-field v-model="reportecreditofiscal.saldosigmes"
											label="Ingrese Saldo Sig Mes"
											clearable
											persistent-hint
											required
                      :rules="validacion"
											@input="reportecreditofiscal.saldosigmes = updateText(reportecreditofiscal.saldosigmes)">
								</v-text-field>
							</v-flex>
						</v-layout>
					</v-card-text>
				</v-form>
				<v-divider></v-divider>
				<v-card-actions style="justify-content: center;padding:10px">
					<v-btn color="success" dark style="width: 50%" :disabled="!activa" @click="Grabar()">Grabar</v-btn>
					<v-btn color="error" dark style="width: 50%" @click="Cancelar()">Cancelar</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-card>
</template>

<script src="./ReporteCreditoFiscal.ts"></script>
