<template>
	<v-card>
		<v-toolbar color="primary" style="color:white">
			<v-toolbar-title>Datos de parametros</v-toolbar-title>
			<v-divider></v-divider>
			<v-text-field v-model="buscarparametros"
					append-icon="search"
					label="Buscar Registro"
					single-line
					solo
					hide-details></v-text-field>
		</v-toolbar>
		<v-data-table 	style="padding: 5px"
						:headers="headers" 
						:items="lstparametros" 
						:items-per-page="30"
						:search = "buscarparametros" 
						:footer-props="{
							showFirstLastPage: true,
							'items-per-page-options': [10, 20, 30, 40, 50, -1],
							'items-per-page-text': 'Registros por Pagina:',
						}"
						dense
						class="elevation-1">
			<template slot="item" slot-scope="props">
				<tr>
					<!--<td>{{ helper.showDataDescription(props.item.año,lstparametros, id, descripcion)  }}</td>// Ejemplo de Uso de Helper Para obtener la Descripcion de una Tabla por medio de su Id-->
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
					<td>{{ props.item.cotizacion }}</td>
					<td>{{ props.item.minimo_nacional }}</td>
					<td>{{ props.item.ufb }}</td>
					<td>
						<v-tooltip bottom color="#008080">
							<template v-slot:activator="{ on }">
								<v-btn color="success" v-on="on" fab small dark  @click="Actualizar(props.item)"><v-icon>edit</v-icon></v-btn>
							</template>
							<span>Modificar Registro de Parametros</span>
						</v-tooltip>
						<v-tooltip style="padding-left:10px" bottom color="#008080">
							<template v-slot:activator="{ on }" >
								<v-btn color="error" v-on="on" fab small dark  @click="Eliminar(props.item)"><v-icon>delete</v-icon></v-btn>
							</template>
							<span>Eliminar Registro de Parametros</span>
						</v-tooltip>
					</td>
				</tr>
			</template>
			<template v-slot:top>
				<v-tooltip bottom color="#008080">
					<template v-slot:activator="{ on }">
						<v-btn color="accent" v-on="on" @click="Insertar()"><v-icon left>mdi-plus</v-icon>Agregar parametros</v-btn>
					</template>
					<span>Adicionar nuevo registro  de parametro</span>
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
					<v-toolbar-title>Datos de parametros</v-toolbar-title>
				</v-toolbar>
				<v-divider></v-divider>
				<v-form ref="form" style="padding:10px" v-model="activa">
					<v-card-text>
						<v-layout wrap>
							<template v-if="operacion == 'Insert'">
								<v-flex sm6 style="padding: 5px">
									<v-autocomplete v-model="parametros.mes"
												label="Seleccionar mes"
												persistent-hint
                        autocomplete="off"
                        outlined
                        color="primary"
                        :items="listarMes"
                        item-text="Mes"
                        item-value="value"
                        :rules="ruleSelec"
                        no-data-text="No se encontro ningun tema"
												>
									</v-autocomplete>
								</v-flex>
								<v-flex sm6 style="padding: 5px">
									<v-autocomplete v-model="parametros.año"
												label="Seleccionar año"
												autocomplete="off"
												outlined
												color="primary"
												:items="listarGestion"
												item-value="Gestion"
												item-text="Gestion"
												:rules="ruleSelec"
												no-data-text="No se encontro ningun tema"
												>
									</v-autocomplete>
								</v-flex>
							</template>
              <!--
							<template v-else>
								<v-flex sm12 style="padding: 5px">
                  <v-autocomplete v-model="parametros.mes"
                      label="Seleccionar mes"
                      persistent-hint
                      autocomplete="off"
                      outlined
                      color="primary"
                      :items="listarMes"
                      item-text="Mes"
                      item-value="Mes"
                      :rules="ruleSelec"
                      no-data-text="No se encontro ningun tema"
                  >
                  </v-autocomplete>
								</v-flex>
								<v-flex sm12 style="padding: 5px">
                  <v-autocomplete v-model="parametros.año"
                      label="Seleccionar año"
                      autocomplete="off"
                      outlined
                      color="primary"
                      :items="listarGestion"
                      item-value="Gestion"
                      item-text="Gestion"
                      :rules="ruleSelec"
                      no-data-text="No se encontro ningun tema"
                      >
                  </v-autocomplete>
								</v-flex>
							</template>
              -->
							<v-flex sm4 style="padding: 5px">
								<v-text-field v-model="parametros.cotizacion"
											label="Ingrese cotizacion"
											clearable
											persistent-hint
                                            :rules="validacion"
											required
											counter
											maxlength="10"
											@input="parametros.cotizacion = updateText(parametros.cotizacion)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-text-field v-model="parametros.minimo_nacional"
											label="Ingrese minimo nacional"
											clearable
											persistent-hint
											required
											:rules="validacion"
											counter
											maxlength="10"
											@input="parametros.minimo_nacional = updateText(parametros.minimo_nacional)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-text-field v-model="parametros.ufb"
											label="Ingrese UFB"
											clearable
											persistent-hint
											required
											:rules="validacion"
											counter
											maxlength="10"
											@input="parametros.ufb = updateText(parametros.ufb)">
								</v-text-field>
							</v-flex>
						</v-layout>
					</v-card-text>
				</v-form>
				<v-divider></v-divider>
				<v-card-actions style="justify-content: center;padding:10px">
					<v-btn color="success" dark style="width: 50%" :disabled="!activa" @click="Grabar()" >Grabar</v-btn>
					<v-btn color="error" dark style="width: 50%" @click="Cancelar()">Cancelar</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-card>
</template>

<script src="./parametros.ts"></script>
