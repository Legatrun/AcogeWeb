<template>
	<v-card>
		<v-toolbar color="primary" style="color:white">
			<v-toolbar-title>Datos de planilla haberes</v-toolbar-title>
			<v-divider></v-divider>
			<v-text-field v-model="buscarplanilla_haberes"
					append-icon="search"
					label="Buscar Registro"
					single-line
					solo
					hide-details></v-text-field>
		</v-toolbar>
		<v-data-table 	style="padding: 5px"
						:headers="headers" 
						:items="lstplanilla_haberes"
						:items-per-page="30"
						:search = "buscarplanilla_haberes" 
						:footer-props="{
							showFirstLastPage: true,
							'items-per-page-options': [10, 20, 30, 40, 50, -1],
							'items-per-page-text': 'Registros por Pagina:',
						}"
						dense
						class="elevation-1">
			<template slot="item" slot-scope="props">
				<tr>
					<!--<td>{{ helper.showDataDescription(props.item.correlativo,lstplanilla_haberes, id, descripcion)  }}</td>// Ejemplo de Uso de Helper Para obtener la Descripcion de una Tabla por medio de su Id-->
				<!--	<td>{{ props.item.empleado }}</td>-->
					<td>{{FormatMes(props.item.mes )}}</td>
					<td>{{ props.item.año }}</td>
					<!--<td>{{ props.item.haber }}</td>-->
					<td>{{ props.item.correlativo }}</td>
					<td>{{ FormatDate(props.item.fecha) }}</td>
					<td>{{ props.item.valor }}</td>
					<td>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn color="success" v-on="on" fab small dark  @click="Actualizar(props.item)"><v-icon>edit</v-icon></v-btn>
							</template>
							<span>Modificar Registro de  planilla haberes</span>
						</v-tooltip>
						<v-tooltip style="padding-left:10px" bottom>
							<template v-slot:activator="{ on }" >
								<v-btn color="error" v-on="on" fab small dark  @click="Eliminar(props.item)"><v-icon>delete</v-icon></v-btn>
							</template>
							<span>Eliminar Registro de  planilla haberes</span>
						</v-tooltip>
					</td>
				</tr>
			</template>
			<template v-slot:top>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn color="accent" v-on="on" @click="Insertar()">Adicionar Nuevo Registro de planilla haberes</v-btn>
					</template>
					<span>Adicionar nuevo registro de  planilla haberes</span>
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
					<v-toolbar-title>Datos de planilla haberes</v-toolbar-title>
				</v-toolbar>
				<v-divider></v-divider>
				<v-form ref="form" style="padding:10px" v-model="activa">
					<v-card-text>
						<v-layout wrap>
							<template v-if="operacion == 'Insert'">
								<v-flex sm6 style="padding: 5px">
									<v-autocomplete  v-model="planilla_haberes.empleado"
												label="Seleccione empleado"
                         :items="lstempleadodeptos"
                         item-text="empleado"
                         item-value="empleado"
                         outlined
                         autocomplete="off"
                         color="#1A237E"
                         :rules="RulAuton"
                         no-data-text="No se encontro ningun tema">
									</v-autocomplete>
								</v-flex>
								<v-flex sm6 style="padding: 5px">
									<v-autocomplete v-model="planilla_haberes.mes"
												label="Seleccione mes"
                        :items="lstparametros"
                        item-text="mes"
                        item-value="mes"
                        outlined
                        autocomplete="off"
                        color="#1A237E"
                        :rules="RulAuton"
                        no-data-text="No se encontro ningun tema">
									</v-autocomplete>
								</v-flex>
								<v-flex sm6 style="padding: 5px">
									<v-autocomplete v-model="planilla_haberes.año"
												label="Seleccione año"
                        :items="lstparametros"
                        item-text="año"
                        item-value="año"
                        outlined
                        autocomplete="off"
                        color="#1A237E"
                        :rules="RulAuton"
                        no-data-text="No se encontro ningun tema"
												>
									</v-autocomplete>
								</v-flex>
								<v-flex sm6 style="padding: 5px">
									<v-autocomplete v-model="planilla_haberes.haber"
												label="Seleccione haber"
                        :items="lsthaberes"
                        item-text="nombre"
                        item-value="haber"
                        outlined
                        autocomplete="off"
                        color="#1A237E"
                        :rules="RulAuton"
                        no-data-text="No se encontro ningun tema"
												>
									</v-autocomplete>
								</v-flex>
								<v-flex sm4 style="padding: 5px">
									<v-text-field v-model="planilla_haberes.correlativo"
                      label="Ingrese correlativo"
                      readonly
                      persistent-hint>
									</v-text-field>
								</v-flex>
							</template>
							<template v-else>
								<v-flex sm6 style="padding: 5px">
									<v-text-field v-model="planilla_haberes.empleado"
												label="empleado"
												placeholder="empleado"
												readonly
												persistent-hint>
									</v-text-field>
								</v-flex>
								<v-flex sm6 style="padding: 5px">
									<v-text-field v-model="planilla_haberes.mes"
												label="mes"
												placeholder="mes"
												readonly
												persistent-hint>
									</v-text-field>
								</v-flex>
								<v-flex sm6 style="padding: 5px">
									<v-text-field v-model="planilla_haberes.año"
												label="año"
												placeholder="año"
												readonly
												persistent-hint>
									</v-text-field>
								</v-flex>
								<v-flex sm6 style="padding: 5px">
									<v-text-field v-model="planilla_haberes.haber"
												label="haber"
												placeholder="haber"
												readonly
												persistent-hint>
									</v-text-field>
								</v-flex>
								<v-flex sm4 style="padding: 5px">
									<v-text-field v-model="planilla_haberes.correlativo"
												label="correlativo"
												placeholder="correlativo"
												readonly
												persistent-hint>
									</v-text-field>
								</v-flex>
							</template>
							<v-flex sm4 class="hidden-xs-only" style="padding: 5px">
								<v-menu
									ref="menu_fecha"
										v-model="menu_fecha"
										:close-on-content-click="false"
										transition="scale-transition"
										offset-y
										full-width
										max-width="290px"
										min-width="290px">
									<template v-slot:activator="{ on }">
										<v-text-field
											v-model="planilla_haberes.fecha"
											label="Ingrese fecha"
											persistent-hint
											prepend-icon="event"
											v-on="on">
										</v-text-field>
									</template>
									<v-date-picker v-model="planilla_haberes.fecha" no-title @input="menu_fecha = false"></v-date-picker>
								</v-menu>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-text-field v-model="planilla_haberes.valor"
											label="Ingrese valor"
											clearable
											pesistent-hint
											required
                      :rules="validacion"
                      counter
                      maxlength="10"
                >
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

<script src="./planilla_haberes.ts"></script>
