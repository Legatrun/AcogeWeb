<template>
	<v-card>
		<v-toolbar color="primary" style="color:white">
			<v-toolbar-title>Datos de Credito Fiscal</v-toolbar-title>
			<v-divider></v-divider>
			<v-text-field v-model="buscarcreditofiscal"
					append-icon="search"
					label="Buscar Registro"
					single-line
					solo
					hide-details></v-text-field>
		</v-toolbar>
		<template>
					<template >
						<v-form>
							<v-container>
								<v-row>
									<v-flex sm4 style="padding: 5px">
										<v-autocomplete
										label="Mes"
										outlined
										clearable
										>
										</v-autocomplete>
									</v-flex>
									<v-flex sm4 style="padding: 5px">
										<v-autocomplete
										label="Año"
										outlined
										clearable
										>	</v-autocomplete>
							        </v-flex>
									<v-spacer></v-spacer>
								
									<v-flex sm1.5 style="padding: 0px"  class="ma-2">
										<v-btn large color="green" dark>
											Obtener Credito Fiscal
										</v-btn>
									</v-flex>
									<v-flex sm1.5 style="padding: 10px">
										<v-tooltip bottom>
											<template v-slot:activator="{ on }">
												<v-btn color="botonActualizarTabla" dark fab small v-on="on" @click="cargar_data()"><v-icon>update</v-icon></v-btn>
											</template>
											<span>Actualizar Tabla</span>
										</v-tooltip>
									</v-flex>
								</v-row>
							</v-container>
						</v-form>
						<!--
						<v-btn color="accent" v-on="on" @click="Insertar()"><v-icon left>mdi-plus</v-icon>Agregar Credito Fiscal</v-btn>
						-->
						<template>
							<v-card flat>
								<v-tabs>
                                <v-tab>Credito Fiscal</v-tab>
								<v-tab>Presatamos</v-tab>

								<v-tab-item>
									<v-card flat>
									<v-card-text>
										<v-data-table style="padding: 5px"
											:headers="headers" 
											:items="lstcreditofiscal"
											:items-per-page="30"
											:search = "buscarcreditofiscal" 
											:footer-props="{
												showFirstLastPage: true,
												'items-per-page-options': [10, 20, 30, 40, 50, -1],
												'items-per-page-text': 'Registros por Pagina:',
											}"
											dense
											class="elevation-1" >
									    <template slot="item" slot-scope="props">
											<tr>
											<!--<td>{{ helper.showDataDescription(props.item.año,lstCreditoFiscal, id, descripcion)  }}</td>// Ejemplo de Uso de Helper Para obtener la Descripcion de una Tabla por medio de su Id-->
											<!--	<td>{{ props.item.empleado }}</td>-->
												<td>
													<template v-if="props.item.mes == 1">
														<span>ENERO</span>
													</template>
													<template v-else-if="props.item.mes == 2">
														<span>FEBRERO</span>
													</template>
													<template v-else-if="props.item.mes == 3">
														<span>MARZO</span>
													</template>
													<template v-else-if="props.item.mes == 4">
														<span>ABRIL</span>
													</template>
													<template v-else-if="props.item.mes == 5">
														<span>MAYO</span>
													</template>
													<template v-else-if="props.item.mes == 6">
														<span>JUNIO</span>
													</template>
													<template v-else-if="props.item.mes == 7">
														<span>JULIO</span>
													</template>
												<template v-else-if="props.item.mes == 8">
														<span>AGOSTO</span>
													</template>
													<template v-else-if="props.item.mes == 9">
														<span>SEPTIEMBRE</span>
													</template>
													<template v-else-if="props.item.mes == 10">
													<span>OCTUBRE</span>
													</template>
													<template v-else-if="props.item.mes == 11">
														<span>NOVIEMBRE</span>
													</template>
													<template v-else-if="props.item.mes == 12">
														<span>DICIEMBRE</span>
													</template>
												</td>
												<td>{{ props.item.año }}</td>
												<td>{{ props.item.declarado }}</td>
												<td>{{ props.item.actualizacion }}</td>
												<td>{{ props.item.saldo }}</td>
												<td>
													<v-tooltip bottom color="#008080">
														<template v-slot:activator="{ on }">
															<v-btn color="success" v-on="on" fab small dark  @click="Actualizar(props.item)"><v-icon>edit</v-icon></v-btn>
														</template>
														<span>Modificar Registro de Credito Fiscal</span>
													</v-tooltip>
													<v-tooltip style="padding-left:10px" bottom color="#008080">
														<template v-slot:activator="{ on }" >
															<v-btn color="error" v-on="on" fab small dark  @click="Eliminar(props.item)"><v-icon>delete</v-icon></v-btn>
														</template>
														<span>Eliminar Registro de  Credito Fiscal</span>
													</v-tooltip>
												</td>
										   </tr>
									    </template>
										<template v-slot:no-data>
											<v-alert :value="true" color="warning" icon="warning">
												Lo sentimos, no exiten datos a desplegar: (
											</v-alert>
										</template>
								</v-data-table>				
							        	

							</v-card-text>
							</v-card>
						</v-tab-item>

								<v-tab-item>
									<v-card flat>
									<v-card-text>
										<v-data-table 
										style="padding: 5px"
										:items-per-page="30"
										:headers="headersdos"
										:footer-props="{
											showFirstLastPage: true,
											'items-per-page-options': [10, 20, 30, 40, 50, -1],
											'items-per-page-text': 'Registros por Pagina:',
										}"
										dense
										class="elevation-1">
										<template slot="item">
											<tr>
												<td></td>
											</tr>
										</template>
											<template v-slot:no-data>
											<v-alert :value="true" color="warning" icon="warning">
												Lo sentimos, no exiten datos a desplegar: (
											</v-alert>
										</template>
										</v-data-table>
									</v-card-text>
									</v-card>
								</v-tab-item>
							
								</v-tabs> 
							</v-card>
							</template>
					</template>
					
					<!--<span>Adicionar nuevo registro de  Credito Fiscal</span>-->
				
			</template>
						<!--
			<template slot="item" slot-scope="props">
			<tr>
				<td>{{ helper.showDataDescription(props.item.año,lstCreditoFiscal, id, descripcion)  }}</td>// Ejemplo de Uso de Helper Para obtener la Descripcion de una Tabla por medio de su Id
				<td>{{ props.item.empleado }}</td>
				<td>
					<template v-if="props.item.mes == 1">
						<span>ENERO</span>
					</template>
					<template v-else-if="props.item.mes == 2">
                        <span>FEBRERO</span>
                    </template>
                    <template v-else-if="props.item.mes == 3">
                        <span>MARZO</span>
                    </template>
                    <template v-else-if="props.item.mes == 4">
                        <span>ABRIL</span>
                    </template>
                    <template v-else-if="props.item.mes == 5">
                        <span>MAYO</span>
                    </template>
                    <template v-else-if="props.item.mes == 6">
                        <span>JUNIO</span>
                    </template>
                    <template v-else-if="props.item.mes == 7">
                         <span>JULIO</span>
                    </template>
                   <template v-else-if="props.item.mes == 8">
                        <span>AGOSTO</span>
                    </template>
                    <template v-else-if="props.item.mes == 9">
                        <span>SEPTIEMBRE</span>
                    </template>
                    <template v-else-if="props.item.mes == 10">
                      <span>OCTUBRE</span>
                    </template>
                    <template v-else-if="props.item.mes == 11">
                        <span>NOVIEMBRE</span>
                    </template>
                    <template v-else-if="props.item.mes == 12">
                         <span>DICIEMBRE</span>
                    </template>
                </td>
				<td>{{ props.item.año }}</td>
				<td>{{ props.item.declarado }}</td>
				<td>{{ props.item.actualizacion }}</td>
				<td>{{ props.item.saldo }}</td>
				<td>
					<v-tooltip bottom color="#008080">
						<template v-slot:activator="{ on }">
							<v-btn color="success" v-on="on" fab small dark  @click="Actualizar(props.item)"><v-icon>edit</v-icon></v-btn>
						</template>
						<span>Modificar Registro de Credito Fiscal</span>
					</v-tooltip>
					<v-tooltip style="padding-left:10px" bottom color="#008080">
						<template v-slot:activator="{ on }" >
							<v-btn color="error" v-on="on" fab small dark  @click="Eliminar(props.item)"><v-icon>delete</v-icon></v-btn>
						</template>
						<span>Eliminar Registro de  Credito Fiscal</span>
					</v-tooltip>
				</td>
			</tr>
			</template>
			-->
			
			<!--
			<template v-slot:no-data>
				<v-alert :value="true" color="warning" icon="warning">
					Lo sentimos, no exiten datos a desplegar: (
				</v-alert>
			</template>
			-->
	
		<v-dialog v-model="dialog" persistent max-width="50%">
			<v-card>
				<v-toolbar style="padding:10px" dark class="primary">
					<v-toolbar-title>Datos de Credito Fiscal</v-toolbar-title>
				</v-toolbar>
				<v-divider></v-divider>
				<v-form ref="form" style="padding:10px" v-model="activa">
					<v-card-text>
						<v-layout wrap>
							<template v-if="operacion == 'Insert'">
								<v-flex sm12 style="padding: 5px">
									<v-autocomplete v-model="creditofiscal.empleado"
												label="Seleccionar empleado"
												:items="lstempleados"
												item-text="nombres"
												item-value="empleado"
												outlined
												autocomplete="off"
												
												:rules="ruleValida"
												no-data-text="No se encontro ningun tema">
									</v-autocomplete>
								</v-flex>
								<v-flex sm6 style="padding: 5px">
									<v-autocomplete v-model="creditofiscal.mes"
												label="Seleccionar mes"
												:items="listarMes"
												item-text="Mes"
												item-value="value"
												outlined
												autocomplete="off"
												
												:rules="ruleValida"
												no-data-text="No se encontro ningun tema"
												>
									</v-autocomplete>
								</v-flex>
								<v-flex sm6 style="padding: 5px">
									<v-autocomplete v-model="creditofiscal.año"
												label="Seleccionar año"
												:items="listarGestion"
												item-text="Gestion"
												item-value="Gestion"
												outlined
												autocomplete="off"
											
												:rules="ruleValida"
												no-data-text="No se encontro ningun tema"
												>
									</v-autocomplete>
								</v-flex>
							</template>
              <!--
							<template v-else>
                <v-flex sm12 style="padding: 5px">
                  <v-text-field v-model="creditofiscal.empleado"
                      label=" Empleado"
                      clearable
                      persistent-hint
                      required
                      >
                  </v-text-field>
                </v-flex>
                <v-flex sm6 style="padding: 5px">
                  <v-text-field v-model="creditofiscal.mes"
                    label=" Mes"
                    clearable
                    persistent-hint
                    required
                    >
                  </v-text-field>
                </v-flex>
                <v-flex sm6 style="padding: 5px">
                  <v-text-field v-model="creditofiscal.año"
                      label="Seleccionar Año"
                      clearable
                      persistent-hint
                      required
                      >
                  </v-text-field>
                </v-flex>
							</template>
              -->
							<v-flex sm4 style="padding: 5px">
								<v-text-field v-model="creditofiscal.declarado"
											label="Ingrese declarado"
											clearable
											persistent-hint
											required
											:rules="validacion"
											counter
											maxlength="10"
											@input="creditofiscal.declarado = updateText(creditofiscal.declarado)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-text-field v-model="creditofiscal.actualizacion"
											label="Ingrese actualizacion"
											clearable
											persistent-hint
											required
											:rules="validacion"
											counter
											maxlength="10"
											@input="creditofiscal.actualizacion = updateText(creditofiscal.actualizacion)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-text-field v-model="creditofiscal.saldo"
											label="Ingrese saldo"
											clearable
											persistent-hint
											required
											:rules="validacion"
											counter
											maxlength="10"
											@input="creditofiscal.saldo = updateText(creditofiscal.saldo)">
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

<script src="./CreditoFiscal.ts"></script>
