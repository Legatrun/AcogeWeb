<template>
	<v-card>
		<v-toolbar color="primary" style="color:white">
			<v-toolbar-title>Datos de Personal departamentos</v-toolbar-title>
			<v-divider></v-divider>
			<v-text-field v-model="buscarpersonal_departamentos"
					append-icon="search"
					label="Buscar Registro"
					single-line
					solo
					hide-details></v-text-field>
		</v-toolbar>
		<v-data-table 	style="padding: 5px"
						:headers="headers" 
						:items="lstpersonal_departamentos" 
						:items-per-page="30"
						:search = "buscarpersonal_departamentos" 
						:footer-props="{
							showFirstLastPage: true,
							'items-per-page-options': [10, 20, 30, 40, 50, -1],
							'items-per-page-text': 'Registros por Pagina:',
						}"
						dense
						class="elevation-1">
			<template slot="item" slot-scope="props">
				<tr>
					<!--<td>{{ helper.showDataDescription(props.item.personal_departamento,lstPersonal_departamentos, id, descripcion)  }}</td>// Ejemplo de Uso de Helper Para obtener la Descripcion de una Tabla por medio de su Id-->
					<td>{{ props.item.personal_departamento }}</td>
					<td>{{ props.item.nombre }}</td>
					<td>{{ props.item.minimo }}</td>
					<td>{{ props.item.maximo }}</td>
					<!--<td>{{ props.item.empresa }}</td>-->
					<td>
						<v-tooltip bottom color="#008080">
							<template v-slot:activator="{ on }">
								<v-btn color="success" v-on="on" fab small dark  @click="Actualizar(props.item)"><v-icon>edit</v-icon></v-btn>
							</template>
							<span>Modificar Registro de  Personal departamentos</span>
						</v-tooltip>
						<v-tooltip style="padding-left:10px" bottom color="#008080">
							<template v-slot:activator="{ on }" >
								<v-btn color="error" v-on="on" fab small dark  @click="Eliminar(props.item)"><v-icon>delete</v-icon></v-btn>
							</template>
							<span>Eliminar Registro de  Personal departamentos</span>
						</v-tooltip>
					</td>
				</tr>
			</template>
			<template v-slot:top>
				<v-tooltip bottom color="#008080">
					<template v-slot:activator="{ on }">
						<v-btn color="accent" v-on="on" @click="Insertar()"><v-icon left>mdi-plus</v-icon>Agregar  Personal departamentos</v-btn>
					</template>
					<span>Adicionar nuevo registro de  Personal departamentos</span>
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
					<v-toolbar-title>Datos de  Personal departamentos</v-toolbar-title>
				</v-toolbar>
				<v-divider></v-divider>
				<v-form ref="form" style="padding:10px" v-model="activa">
					<v-card-text>
						<v-layout wrap>
							<template v-if="operacion == 'Insert'">
								<v-flex sm6 style="padding: 5px">
									<v-text-field v-model="personal_departamentos.personal_departamento"
												label="Cod personal departamento"
												clearable
												persistent-hint
												required
                        :rules="ruleValida"
                        counter
                        maxlength="10"
												@input="personal_departamentos.personal_departamento = updateText(personal_departamentos.personal_departamento)">
									</v-text-field>
								</v-flex>
							</template>
							<template v-else>
								<v-flex sm6 style="padding: 5px">
									<v-text-field v-model="personal_departamentos.personal_departamento"
                        label=" Cod personal departamento"
												readonly
												persistent-hint>
									</v-text-field>
								</v-flex>
							</template>
							<v-flex sm6 style="padding: 5px">
								<v-text-field v-model="personal_departamentos.nombre"
											label="Ingrese nombre"
											clearable
											persistent-hint
											required
                      :rules="ruleValida"
                      counter
                      maxlength="50"
											@input="personal_departamentos.nombre = updateText(personal_departamentos.nombre)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-text-field v-model="personal_departamentos.minimo"
											label="Ingrese minimo"
											clearable
											persistent-hint
											required
                      counter
                      maxlength="10"
                      :rules="validacion"
											@input="personal_departamentos.minimo = updateText(personal_departamentos.minimo)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-text-field v-model="personal_departamentos.maximo"
											label="Ingrese maximo"
											clearable
											persistent-hint
											required
                      counter
                      maxlength="10"
                      :rules="validacion"
											@input="personal_departamentos.maximo = updateText(personal_departamentos.maximo)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-autocomplete v-model="personal_departamentos.empresa"
											label="Seleccione empresa"
                      :items="lstempresas"
                      item-value="idempresa"
                      item-text="descripcion"
                      outlined
                      autocomplete="off"
                      color="#1A237E"
                      :rules="ruleValida"
                      no-data-text="No se encontro ningun tema">
								</v-autocomplete>
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

<script src="./Personal_departamentos.ts"></script>
