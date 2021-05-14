<template>
	<v-card>
		<v-toolbar color="primary" style="color:white">
			<v-toolbar-title>Datos de empleado</v-toolbar-title>
			<v-divider></v-divider>
			<v-text-field v-model="buscarempleado"
					append-icon="search"
					label="Buscar Registro"
					single-line
					solo
					hide-details></v-text-field>
		</v-toolbar>
		<v-data-table 	style="padding: 5px"
						:headers="headers" 
						:items="lstempleado"
						:items-per-page="30"
						:search = "buscarempleado" 
						:footer-props="{
							showFirstLastPage: true,
							'items-per-page-options': [10, 20, 30, 40, 50, -1],
							'items-per-page-text': 'Registros por Pagina:',
						}"
						dense
						class="elevation-1">
			<template slot="item" slot-scope="props">
				<tr>
					<!--<td>{{ helper.showDataDescription(props.item.empleado,lstempleado, id, descripcion)  }}</td>// Ejemplo de Uso de Helper Para obtener la Descripcion de una Tabla por medio de su Id-->
				<!--	<td>{{ props.item.empleado }}</td> -->
					<td>{{ props.item.paterno }}</td>
					<td>{{ props.item.materno }}</td>
					<td>{{ props.item.nombres }}</td>
					<td>{{ FormatDate(props.item.fecha_nac) }}</td>
					<!--<td>{{ props.item.identificacion }}</td>-->
					<td>{{ props.item.cod_asegurado }}</td>
					<!--<td>{{ props.item.direccion }}</td>-->
					<!--<td>{{ props.item.email }}</td>-->
					<!--<td>{{ props.item.telefono }}</td>-->
					<!--<td>{{ props.item.lugar_nac }}</td>-->
					<td>{{ props.item.nacionalidad }}</td>

					<td>
					  <template v-if="props.item.sexo == 0">
              <span>Femenino</span>
            </template>
             <template v-else>
              <span>Maculino</span>
            </template>

					</td>
					<td>
            <template v-if="props.item.sexo == 0">
              <template v-if="props.item.estado_civil == 0">
                <span>Soltera</span>
              </template>
              <template v-else-if="props.item.estado_civil == 1">
                <span>Casada</span>
              </template>
              <template v-else-if="props.item.estado_civil == 2">
                <span>Divorciada</span>
              </template>
              <template  v-else-if="props.item.estado_civil == 3">
                <span>Viuda</span>
              </template>
            </template>

            <template v-else>
              <template v-if="props.item.estado_civil == 0">
                <span>Soltero</span>
              </template>
              <template v-else-if="props.item.estado_civil == 1">
                <span>Casado</span>
              </template>
              <template v-else-if="props.item.estado_civil == 2">
                <span>Divorciado</span>
              </template>
              <template  v-else-if="props.item.estado_civil == 3">
                <span>Viudo</span>
              </template>
            </template>

          </td>
				<!--	<td>{{ props.item.patmes }}</td> -->
					<td>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn color="success" v-on="on" fab small dark  @click="Actualizar(props.item)"><v-icon>edit</v-icon></v-btn>
							</template>
							<span>Modificar Registro del Empleado</span>
						</v-tooltip>
						<v-tooltip style="padding-left:10px" bottom>
							<template v-slot:activator="{ on }" >
								<v-btn color="error" v-on="on" fab small dark  @click="Eliminar(props.item)"><v-icon>delete</v-icon></v-btn>
							</template>
							<span>Eliminar Registro del Empleado</span>
						</v-tooltip>
					</td>
				</tr>
			</template>
			<template v-slot:top>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn color="accent" v-on="on" @click="Insertar()">Adicionar Nuevo Registro de empleado</v-btn>
					</template>
					<span>Adicionar Nuevo registro de empleado</span>
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
					<v-toolbar-title>Datos de empleado</v-toolbar-title>
				</v-toolbar>
				<v-divider></v-divider>
				<v-form ref="form" style="padding:10px" v-model="activo">
					<v-card-text>
						<v-layout wrap>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="empleado.paterno"
											label="Apellido paterno"
											clearable
											persistent-hint
											required
                      counter
                      maxlength="20"
                      :rules="RulnomPatMat"
											@input="empleado.paterno = updateText(empleado.paterno)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="empleado.materno"
											label="Apellido materno"
											clearable
											persistent-hint
											required
                      counter
                      maxlength="20"
                      :rules="RulnomPatMat"
											@input="empleado.materno = updateText(empleado.materno)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="empleado.nombres"
											label="Nombre de empleado"
											clearable
											persistent-hint
											required
                      counter
                      maxlength="20"
                      :rules="RulnomPatMat"
											@input="empleado.nombres = updateText(empleado.nombres)">
								</v-text-field>
							</v-flex>
							<v-flex sm6 class="hidden-xs-only" style="padding: 5px">
								<v-menu
									ref="menu_fecha_nac"
										v-model="menu_fecha_nac"
										:close-on-content-click="false"
										transition="scale-transition"
										offset-y
										full-width
										max-width="290px"
										min-width="290px">
									<template v-slot:activator="{ on }">
										<v-text-field
											v-model="empleado.fecha_nac"
											label="Ingrese fecha de nacimiento"
											persistent-hint
											prepend-icon="event"
											v-on="on">
										</v-text-field>
									</template>
									<v-date-picker v-model="empleado.fecha_nac" no-title @input="menu_fecha_nac = false"></v-date-picker>
								</v-menu>
							</v-flex>
							<v-flex sm6 style="padding: 5px">
                <v-text-field v-model="empleado.identificacion"
                      label="Cedula de identidad"
                      clearable
                      persistent-hint
                      :rules="validacion"
                      @input="empleado.identificacion = updateText(empleado.identificacion)">
                </v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="empleado.cod_asegurado"
											label="Codigo Asegurado"
											clearable
											persistent-hint
                      disabled
											required
											@input="empleado.cod_asegurado = updateText(empleado.cod_asegurado)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="empleado.direccion"
											label="Direccion"
											clearable
											persistent-hint
                      :rules="RulnomPatMat"
											required
											@input="empleado.direccion = updateText(empleado.direccion)">
								</v-text-field>
							</v-flex>
							<v-flex sm6 style="padding: 5px">
								<v-text-field v-model="empleado.email"
											label="Email"
											clearable
											persistent-hint
                      :rules="RulEmpEmai"
											required>
								</v-text-field>
							</v-flex>
							<v-flex sm6 style="padding: 5px">
								<v-text-field v-model="empleado.telefono"
											label="Telefono"
											clearable
                      counter
                      maxlength="8"
                      :rules="RulEmpTele"
											persistent-hint
											required>
								</v-text-field>
							</v-flex>
							<v-flex sm6 style="padding: 5px">
								<v-autocomplete v-model="empleado.lugar_nac"
											label="Seleccione Lugar de nacimiento"
                      :items="lstzonas"
                      item-text="descripcion"
                      item-value="descripcion"
                      outlined
                      autocomplete="off"
                      color="#1A237E"
                      :rules="RulAuton"
                      no-data-text="No se encontro ningun tema"
											@input="empleado.lugar_nac = updateText(empleado.lugar_nac)">
								</v-autocomplete>
							</v-flex>
							<v-flex sm6 style="padding: 5px">
								<v-autocomplete v-model="empleado.nacionalidad"
											label="Seleccione Nacionalidad"
                      :items="lstpaises"
                      item-text="descripcion"
                      item-value="descripcion"
                      outlined
                      autocomplete="off"
                      color="#1A237E"
                      :rules="RulAuton"
                      no-data-text="No se encontro ningun tema"
											@input="empleado.nacionalidad = updateText(empleado.nacionalidad)">
								</v-autocomplete>
							</v-flex>

							<v-flex sm6 style="padding: 5px">
								<v-autocomplete v-model="empleado.sexo"
                      label="Seleccionar genero"
                      :items="listarSexo"
                      item-text="Sexo"
                      item-value="value"
                      :rules="RulAuton"
                      autocomplete="off"
                      outlined
                      no-data-text="No se encontro ningun tema"
                      color="primary">
								</v-autocomplete>
							</v-flex>
							<v-flex sm6 style="padding: 5px">
								<v-autocomplete v-model="empleado.estado_civil"
											label="Seleccione Estado"
                      :items="listarEstado"
                      autocomplete="off"
                      color="primary"
                      outlined
                      item-text="Estado"
                      item-value="value"
                      no-data-text="No se encontro ningun tema"
                      :rules="RulAuton">
								</v-autocomplete>
							</v-flex>

							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="empleado.patmes"
											label="Ingrese PatMes"
											value="0"
											clearable
											persistent-hint
                      disabled
                      required
											@input="empleado.patmes = updateText(empleado.patmes)">
								</v-text-field>
							</v-flex>
						</v-layout>
					</v-card-text>
				</v-form>
				<v-divider></v-divider>
				<v-card-actions style="justify-content: center;padding:10px">
					<v-btn color="success" dark style="width: 50%" :disabled="!activo" @click="Grabar()" >Grabar</v-btn>
					<v-btn color="error" dark style="width: 50%" @click="Cancelar()">Cancelar</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-card>
</template>

<script src="./empleado.ts"></script>
