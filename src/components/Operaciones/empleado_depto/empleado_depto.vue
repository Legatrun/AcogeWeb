<template>
	<v-card>
		<v-toolbar color="primary" style="color:white">
			<v-toolbar-title>Datos de empleado departamento</v-toolbar-title>
			<v-divider></v-divider>
			<v-text-field v-model="buscarempleado_depto"
					append-icon="search"
					label="Buscar Registro"
					single-line
					solo
					hide-details></v-text-field>
		</v-toolbar>
		<v-data-table 	style="padding: 5px"
						:headers="headers" 
						:items="empleadodeptoformateados"
						:items-per-page="30"
						:search = "buscarempleado_depto" 
						:footer-props="{
							showFirstLastPage: true,
							'items-per-page-options': [10, 20, 30, 40, 50, -1],
							'items-per-page-text': 'Registros por Pagina:',
						}"
						dense
						class="elevation-1">
			<template slot="item" slot-scope="props">
				<tr>
					<!--<td>{{ helper.showDataDescription(props.item.empleado,lstempleado_depto, id, descripcion)  }}</td>// Ejemplo de Uso de Helper Para obtener la Descripcion de una Tabla por medio de su Id-->
					<!--<td>{{ props.item.empleado }}</td>-->
					<td>{{ props.item.departamento }}</td>
					<td>{{ props.item.cargo }}</td>
					<td>{{ props.item.haber_basico }}</td>
					<td>{{ props.item.quincena }}</td>
					<td>{{ FormatDate(props.item.fecha_ingreso) }}</td>
					<td>{{ FormatDate(props.item.fecha_quinquenio) }}</td>
					<!--<td>{{ props.item.correlativo }}</td>
					<td>{{ props.item.tipoempleado }}</td>
					<td>{{ props.item.planilla }}</td>
					<td>{{ props.item.jerarquia }}</td>
					<td>{{ props.item.cuenta }}</td>-->
					<td>{{ props.item.oficina }}</td>
          <!--
					<td>{{ FormatBoolean(props.item.estado) }}</td>
					<td>{{ props.item.saldo_anterior_iva }}</td>

					<td>{{ FormatBoolean(props.item.envio_email) }}</td>
						-->
					<td>
						<v-tooltip bottom color="#008080">
							<template v-slot:activator="{ on }">
								<v-btn color="success" v-on="on" fab small dark  @click="Actualizar(props.item)"><v-icon>edit</v-icon></v-btn>
							</template>
							<span>Modificar Registro de empleado departamento</span>
						</v-tooltip>
						<v-tooltip style="padding-left:10px" bottom color="#008080">
							<template v-slot:activator="{ on }" >
								<v-btn color="error" v-on="on" fab small dark  @click="Eliminar(props.item)"><v-icon>delete</v-icon></v-btn>
							</template>
							<span>Eliminar Registro de empleado departamento</span>
						</v-tooltip>
					</td>
				</tr>
			</template>
			<template v-slot:top>
				<v-tooltip bottom color="#008080">
					<template v-slot:activator="{ on }">
						<v-btn color="botonCrear" dark v-on="on" @click="Insertar()"><v-icon left>mdi-plus</v-icon>Añadir empleado a departamento</v-btn>
					</template>
					<span>Adicionar nuevo registro de empleado departamento</span>
				</v-tooltip>
			</template>
			<template v-slot:no-data>
				<v-alert :value="true" color="warning" icon="warning">
					Lo sentimos, no exiten datos a desplegar: (
				</v-alert>
			</template>
		</v-data-table>
		<v-tooltip bottom>
			<template v-slot:activator="{ on }">
				<v-btn color="botonActualizarTabla" dark fab small v-on="on" @click="cargar_data()"><v-icon>update</v-icon></v-btn>
			</template>
			<span>Actualizar Tabla</span>
		</v-tooltip>
		<v-dialog v-model="dialog" persistent max-width="70%">
			<v-card>
				<v-toolbar style="padding:10px" dark class="primary">
					<v-toolbar-title>Datos de empleado departamento</v-toolbar-title>
				</v-toolbar>
				<v-divider></v-divider>
				<v-form ref="form" style="padding:10px" v-model="activa">
					<v-card-text>
						<v-layout wrap>
							<template v-if="operacion == 'Insert'">
								<v-flex sm6 style="padding: 5px">
                  <v-autocomplete v-model="empleado" @input="menu_empleado=false"
                        label="Seleccione empleado"
                        :items="lstempleados"
                        item-text="nombres"
                        item-value="empleado"
                        outlined
                        autocomplete="off"
                        color="#1A237E"
                        :rules="ruleValida"
                        id="empleado"
                        @change="slectEmpleado"
                        @focus="clickOnFocus('empleado')"
                        no-data-text="No se encontro ningun tema">
                  </v-autocomplete>
                  <!--

                  -->
								</v-flex>
							</template>
							<template v-else>
								<v-flex sm6 style="padding: 5px">
									<v-text-field v-model="empleado_depto.empleado"
												label="empleado"
												placeholder="empleado"
												readonly
												persistent-hint>
									</v-text-field>
								</v-flex>
							</template>
							<v-flex sm6 style="padding: 5px">
								<v-autocomplete v-model="empleado_depto.departamento"
											label="Seleccione departamento"
											:items="lstdepartamentos"
											item-text="nombre"
											item-value="personal_departamento"
											outlined
											color="#1A237E"
											:rules="ruleValida"
											no-data-text="No se encontro ningun tema">
								</v-autocomplete>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-text-field v-model="empleado_depto.cargo"
											label="Ingrese cargo"
											clearable
											persistent-hint
											required
                      counter
                      maxlength="50"
                      :rules="ruleValida"
											@input="empleado_depto.cargo = updateText(empleado_depto.cargo)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-text-field v-model="empleado_depto.haber_basico"
											label="Ingrese haber basico"
											clearable
											persistent-hint
											required
                      :rules="validacion"
                      counter
                      maxlength="10"
											@input="empleado_depto.haber_basico = updateText(empleado_depto.haber_basico)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-text-field v-model="empleado_depto.quincena"
											label="Ingrese quincena"
											clearable
											persistent-hint
                                            :error-messages="message"
											required
											:rules="quincena"
											@input="empleado_depto.quincena = updateText(empleado_depto.quincena)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 class="hidden-xs-only" style="padding: 5px">
								<v-menu
									ref="menu_fecha_ingreso"
										v-model="menu_fecha_ingreso"
										:close-on-content-click="false"
										transition="scale-transition"
										offset-y
										full-width
										max-width="290px"
										min-width="290px">
									<template v-slot:activator="{ on }">
										<v-text-field
											v-model="empleado_depto.fecha_ingreso"
											label="Ingrese fecha ingreso"
											persistent-hint
											prepend-icon="event"
											v-on="on">
										</v-text-field>
									</template>
									<v-date-picker v-model="empleado_depto.fecha_ingreso" no-title @input="menu_fecha_ingreso = false"></v-date-picker>
								</v-menu>
							</v-flex>
							<v-flex sm4 class="hidden-xs-only" style="padding: 5px">
								<v-menu
									ref="menu_fecha_quinquenio"
										v-model="menu_fecha_quinquenio"
										:close-on-content-click="false"
										transition="scale-transition"
										offset-y
										full-width
										max-width="290px"
										min-width="290px">
									<template v-slot:activator="{ on }">
										<v-text-field
											v-model="empleado_depto.fecha_quinquenio"
											label="Fecha quinquenio"
                     						disabled
											persistent-hint
											prepend-icon="event"
											v-on="on">
										</v-text-field>
									</template>
									<v-date-picker v-model="empleado_depto.fecha_quinquenio" no-title @input="menu_fecha_quinquenio = false"></v-date-picker>
								</v-menu>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-text-field v-model="empleado_depto.correlativo"
											label="Ingrese correlativo"
											clearable
											persistent-hint
											required
											@input="empleado_depto.correlativo = updateText(empleado_depto.correlativo)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-autocomplete v-model="empleado_depto.tipoempleado"
											label="Selecciona tipo empleado"
                      :items="lstetipompleados"
                      item-text="nombre"
                      item-value="tipo_empleado"
                      outlined
                      autocomplete="off"
                      color="#1A237E"
                      :rules="ruleValida"
                      no-data-text="No se encontro ningun tema">
								</v-autocomplete>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-autocomplete v-model="empleado_depto.planilla"
											label="Seleccione planilla"
                      :items="lsteplanilla"
                      item-text="nombre"
                      item-value="planilla"
                      outlined
                      autocomplete="off"
                      color="#1A237E"
                      :rules="ruleValida"
                      no-data-text="No se encontro ningun tema">
								</v-autocomplete>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-autocomplete v-model="empleado_depto.jerarquia"
											label="Selecciona jerarquia"
                      :items="lstjerarquia"
                      item-text="nombre"
                      item-value="jerarquia"
                      outlined
                      autocomplete="off"
                      color="#1A237E"
                      :rules="ruleValida"
                      no-data-text="No se encontro ningun tema">
								</v-autocomplete>
							</v-flex>
							<v-flex sm6 style="padding: 5px">
								<v-text-field v-model="empleado_depto.cuenta"
											label="Ingrese cuenta"
											clearable
											persistent-hint
											required
											@input="empleado_depto.cuenta = updateText(empleado_depto.cuenta)">
								</v-text-field>
							</v-flex>
							<v-flex sm6 style="padding: 5px">
									<v-autocomplete v-model="empleado_depto.oficina"
											label="Selecciona oficina"
												:items="lstciudades"
								item-text="descripcion"
								item-value="descripcion"
											outlined
											autocomplete="off"
                    
                      no-data-text="No se encontro ningun tema">
								</v-autocomplete>
							
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<h4 class="mb-0">Estado empleado departamento:</h4>
								<v-switch v-model="empleado_depto.estado"
									color="success"
                  					:label="`: ${empleado_depto.estado ? 'Si' : 'No'}`"></v-switch>
							</v-flex>

							<v-flex sm4 style="padding: 5px">
								<h4 class="mb-0">Envio email:</h4>
								<v-switch v-model="empleado_depto.envio_email"
									color="success"
                  					:label="`: ${empleado_depto.envio_email ? 'Si' : 'No'}`"></v-switch>
							</v-flex>
              <v-flex sm4 style="padding: 5px">
                <v-text-field v-model="empleado_depto.saldo_anterior_iva"
                              label="Ingrese saldo anterior iva"
                              clearable
                              persistent-hint
                              required
                              @input="empleado_depto.saldo_anterior_iva = updateText(empleado_depto.saldo_anterior_iva)">
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

<script src="./empleado_depto.ts"></script>
