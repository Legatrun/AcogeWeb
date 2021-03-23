<template>
	<v-card>
		<v-toolbar color="primary" style="color:white">
			<v-toolbar-title>Datos de AperturayCierreGestion</v-toolbar-title>
			<v-divider></v-divider>
			<v-text-field v-model="buscaraperturaycierregestion"
					append-icon="search"
					label="Buscar Registro"
					single-line
					solo
					hide-details></v-text-field>
		</v-toolbar>
		<v-data-table 	style="padding: 5px"
						:headers="headers" 
						:items="lstaperturaformateados" 
						:items-per-page="30"
						:search = "buscaraperturaycierregestion" 
						:footer-props="{
							showFirstLastPage: true,
							'items-per-page-options': [10, 20, 30, 40, 50, -1],
							'items-per-page-text': 'Registros por Pagina:',
						}"
						dense
						class="elevation-1">
			<template slot="item" slot-scope="props">
				<tr>
					<!--<td>{{ helper.showDataDescription(props.item.mes,lstAperturayCierreGestion, id, descripcion)  }}</td>// Ejemplo de Uso de Helper Para obtener la Descripcion de una Tabla por medio de su Id-->
					<td>{{ props.item.gestion }}</td>
					<td>{{ props.item.mesformat }}</td>
					<td>{{ FormatBoolean(props.item.abierta) }}</td>
					<td>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn color="success" v-on="on" fab small dark  @click="Actualizar(props.item)"><v-icon>edit</v-icon></v-btn>
							</template>
							<span>Modificar Registro de Apertura y Cierre de Gestión</span>
						</v-tooltip>
						<v-tooltip style="padding-left:10px" bottom>
							<template v-slot:activator="{ on }" >
								<v-btn color="error" v-on="on" fab small dark  @click="Eliminar(props.item)"><v-icon>delete</v-icon></v-btn>
							</template>
							<span>Eliminar Registro de Apertura y Cierre de Gestión</span>
						</v-tooltip>
					</td>
				</tr>
			</template>
			<template v-slot:top>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn color="accent" v-on="on" @click="Insertar()">Adicionar Nuevo Registro de AperturayCierreGestion</v-btn>
					</template>
					<span>Adicionar nuevo registro de cliente</span>
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
					<v-toolbar-title>Datos de AperturayCierreGestion</v-toolbar-title>
				</v-toolbar>
				<v-divider></v-divider>
				<v-form ref="form" style="padding:10px" v-model="activo">
					<v-card-text>
						<v-layout wrap>
							<template v-if="operacion == 'Insert'">
								<v-flex sm12 style="padding: 5px">
									<v-text-field v-model="aperturaycierregestion.gestion"
												label="Gestion"
												hint="Ingrese Gestion"
												placeholder="Gestion"
												clearable
												persistent-hint
												required
												:rules="validacion"
												@input="aperturaycierregestion.gestion = updateText(aperturaycierregestion.gestion)">
									</v-text-field>
								</v-flex>
								<v-col cols="5" sm="4" class="pa-2">	
										<v-autocomplete v-model="aperturaycierregestion.mes"
												:rules="validacion"
												:items="lstMeses"
												label="Mes"
												outlined
												autocomplete="off"
												color="#1A237E">
										</v-autocomplete>
							</v-col>
							</template>
							<template v-else>
							<!--  Se comentan estos 2 campos ya que el Procedimiento almacenado así esta diseñado, para actualizar solo el campo Booleano  -->
							<!--	<v-flex sm12 style="padding: 5px">
									<v-text-field v-model="aperturaycierregestion.gestion"
												label="Gestion"
												placeholder="Gestion"
												readonly
												persistent-hint>
									</v-text-field>
								</v-flex>
								<v-col cols="5" sm="4" class="pa-2">	
										<v-autocomplete v-model="aperturaycierregestion.mes"
												:rules="validacion"
												:items="lstMeses"
												label="Mes"
												outlined
												autocomplete="off"
												color="#1A237E">
										</v-autocomplete>
							</v-col> -->
							</template>
							<v-flex sm4 style="padding: 5px">
								<h4 class="mb-0">Abierta:</h4>
								<v-switch v-model="aperturaycierregestion.abierta"
									color="indigo"
									hint="Seleccione Abierta"
									label="aperturaycierregestion.Abierta"></v-switch>
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


					<v-row no-gutters>
						<v-card outlined hover style="border-width:thick;" width="100%" class="pa-2">
						<h4 class="title font-weight-light" style="color:#2f5572;">GESTIONES<p class="subtitle-1"> </p></h4>				
							<v-row>
								<v-expansion-panels focusable>
									<v-expansion-panel
										v-for="(grupo,i) in lstaperturaycierregestion"
										:key="i"
										@click.prevent="llenarValorParams(grupo.mes)"
									>
										<v-expansion-panel-header>
											{{ grupo.gestion }} <v-spacer></v-spacer> 
										</v-expansion-panel-header>
										<v-expansion-panel-content>
											<v-simple-table dense>
												<template v-slot:default>
													<tbody>
														<tr v-for="(param,index) in grupo.params" :key="index">
															<td>{{param.gestion}}</td>
															<template >
																<td>
																	<v-checkbox @change="check($event,param.abierta)"
																		class="mx-2" color="custom" input-value="true"> 
																	</v-checkbox>
																</td>
															</template>
														
														</tr>
													</tbody>
												</template>
											</v-simple-table>
										</v-expansion-panel-content>
									</v-expansion-panel>
								</v-expansion-panels>
							</v-row>
						</v-card>
					</v-row>
					<br>






	</v-card>
</template>

<script src="./AperturayCierreGestion.ts"></script>
