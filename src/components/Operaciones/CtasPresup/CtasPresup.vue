<template>
	<v-card>
		<v-toolbar color="primary" style="color:white">
			<v-toolbar-title>Datos de CtasPresup</v-toolbar-title>
			<v-divider></v-divider>
			<v-text-field v-model="buscarctaspresup"
					append-icon="search"
					label="Buscar Registro"
					single-line
					solo
					hide-details></v-text-field>
		</v-toolbar>
		<v-data-table 	style="padding: 5px"
						:headers="headers" 
						:items="lstctaspresupformateados" 
						:items-per-page="30"
						:search = "buscarctaspresup" 
						:footer-props="{
							showFirstLastPage: true,
							'items-per-page-options': [10, 20, 30, 40, 50, -1],
							'items-per-page-text': 'Registros por Pagina:',
						}"
						dense
						class="elevation-1">
			<template slot="item" slot-scope="props">
				<tr>
					<!--<td>{{ helper.showDataDescription(props.item.cuentapresup,lstCtasPresup, id, descripcion)  }}</td>// Ejemplo de Uso de Helper Para obtener la Descripcion de una Tabla por medio de su Id-->
					
					<td>{{ props.item.cuentapresup }}</td>
					<td>{{ props.item.nombrecuentapresup }}</td>
					<td>{{ props.item.idmoneda }}</td>
					<td>{{ props.item.nivel }}</td>
					<td>{{ FormatDate(props.item.fechacreacion) }}</td>
					<td>{{ FormatDate(props.item.fechamodificacion) }}</td>
					<td>{{ FormatBoolean(props.item.balancecuenta) }}</td>
					<td>{{ FormatBoolean(props.item.cuentaasiento) }}</td>
					<td>{{ FormatBoolean(props.item.grabado) }}</td>
					<td>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn color="success" v-on="on" fab small dark  @click="Actualizar(props.item)"><v-icon>edit</v-icon></v-btn>
							</template>
							<span>Modificar Registro</span>
						</v-tooltip>
						<v-tooltip style="padding-left:10px" bottom>
							<template v-slot:activator="{ on }" >
								<v-btn color="error" v-on="on" fab small dark  @click="Eliminar(props.item)"><v-icon>delete</v-icon></v-btn>
							</template>
							<span>Eliminar Registro</span>
						</v-tooltip>
					</td>
				</tr>
			</template>
			<template v-slot:top>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn color="accent" v-on="on" @click="Insertar()">Adicionar Nuevo Registro de CtasPresup</v-btn>
					</template>
					<span>Adicionar nuevo registro de Cita Presupuestada</span>
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
					<v-toolbar-title>Datos de Cuentas Presupuesto</v-toolbar-title>
				</v-toolbar>
				<v-divider></v-divider>
				<v-form ref="form" style="padding:10px" v-model="activo">
					<v-card-text>
						<v-layout wrap>
							<template v-if="operacion == 'Insert'">
								<v-flex sm6 style="padding: 5px">
									<v-text-field v-model="ctaspresup.cuentapresup"
												label="CuentaPresup"
												hint="Ingrese Cuenta Presupuesto"
												placeholder="Cuenta Presupuesto"
												clearable
												persistent-hint
												required
												:rules="validacion"
												@input="ctaspresup.cuentapresup = updateText(ctaspresup.cuentapresup)">
									</v-text-field>
								</v-flex>
							</template>
							<template v-else>
								<v-flex sm6 style="padding: 5px">
									<v-text-field v-model="ctaspresup.cuentapresup"
												label="Cuenta Presupuesto"
												placeholder="Cuenta Presupuesto"
												readonly
												persistent-hint>
									</v-text-field>
								</v-flex>
							</template>
							<v-flex sm6 style="padding: 5px">
								<v-text-field v-model="ctaspresup.nombrecuentapresup"
											label="Nombre de Cuenta Presupuesto"
											hint="Ingrese Nombre Cuenta Presupuesto"
											placeholder="Nombre Cuenta Presupuesto"
											clearable
											persistent-hint
											required
											:rules="validacion"
											@input="ctaspresup.nombrecuentapresup = updateText(ctaspresup.nombrecuentapresup)">
								</v-text-field>
							</v-flex>
							
							<v-col cols="5" sm="6" class="pa-2">
								<v-autocomplete
								v-model="ctaspresup.idmoneda"
								label="Moneda"
								:items="lstmonedas"
								item-text="descripcion"
								item-value="idmoneda"
								:rules="validacion"
								outlined
								autocomplete="off"
								color="#1A237E"
								@input="ctaspresup.idmoneda = updateText(ctaspresup.idmoneda)"
								></v-autocomplete>
							</v-col>
							<v-flex sm6 style="padding: 5px">
								<v-text-field v-model="ctaspresup.nivel"
											label="Nivel"
											hint="Ingrese Nivel"
											placeholder="Nivel"
											clearable
											persistent-hint
											required
											:rules="validacion"
											@input="ctaspresup.nivel = updateText(ctaspresup.nivel)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 class="hidden-xs-only" style="padding: 5px">
								<v-menu
									ref="menu_fechacreacion"
										v-model="menu_fechacreacion"
										:close-on-content-click="false"
										transition="scale-transition"
										offset-y
										full-width
										max-width="290px"
										min-width="290px">
									<template v-slot:activator="{ on }">
										<v-text-field
											v-model="ctaspresup.fechacreacion"
											label="Ingrese fecha de creacion"
											hint="Ingrese fecha de creacion"
											persistent-hint
											prepend-icon="event"
											v-on="on">
										</v-text-field>
									</template>
									<v-date-picker v-model="ctaspresup.fechacreacion" no-title @input="menu_fechacreacion = false"></v-date-picker>
								</v-menu>
							</v-flex>
							<v-flex sm4 class="hidden-xs-only" style="padding: 5px">
								<v-menu
									ref="menu_fechamodificacion"
										v-model="menu_fechamodificacion"
										:close-on-content-click="false"
										transition="scale-transition"
										offset-y
										full-width
										max-width="290px"
										min-width="290px">
									<template v-slot:activator="{ on }">
										<v-text-field
											v-model="ctaspresup.fechamodificacion"
											label="Ingrese fecha de modificacion"
											hint="Ingrese fecha de modificacion"
											persistent-hint
											prepend-icon="event"
											v-on="on">
										</v-text-field>
									</template>
									<v-date-picker v-model="ctaspresup.fechamodificacion" no-title @input="menu_fechamodificacion = false"></v-date-picker>
								</v-menu>
							</v-flex>
							
							<v-flex sm6 style="padding: 3px">
								<v-col cols="4" sm="5">
									<p class="text-sm-left"><b>Balance de Cuenta: </b></p> <v-switch  v-model="ctaspresup.balancecuenta" color="custom"  :label="`Estado: ${ctaspresup.balancecuenta ? 'Si' : 'No'}`"> </v-switch>
									</v-col>
							</v-flex>
							
							<v-flex sm6 style="padding: 3px">
								<v-col cols="4" sm="5">
									<p class="text-sm-left"><b>Cuenta de Asiento: </b></p> <v-switch  v-model="ctaspresup.cuentaasiento" color="custom"  :label="`Estado: ${ctaspresup.cuentaasiento ? 'Si' : 'No'}`"> </v-switch>
									</v-col>
							</v-flex>
							
							<v-flex sm6 style="padding: 3px">
								<v-col cols="4" sm="5">
									<p class="text-sm-left"><b>Grabado: </b></p> <v-switch  v-model="ctaspresup.grabado" color="custom"  :label="`Estado: ${ctaspresup.grabado ? 'Si' : 'No'}`"> </v-switch>
									</v-col>
							</v-flex>
						</v-layout>
					</v-card-text>
				</v-form>
				<v-divider></v-divider>
				<v-card-actions style="justify-content: center;padding:10px">
					<v-btn color="success" dark style="width: 50%" :disabled="!activo" @click="Grabar()">Grabar</v-btn>
					<v-btn color="error" dark style="width: 50%" @click="Cancelar()">Cancelar</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-card>
</template>

<script src="./CtasPresup.ts"></script>
