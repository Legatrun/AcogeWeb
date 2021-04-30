<template>
	<v-card>
		<v-toolbar color="primary" style="color:white">
			<v-toolbar-title>Datos de haberes</v-toolbar-title>
			<v-divider></v-divider>
			<v-text-field v-model="buscarhaberes"
					append-icon="search"
					label="Buscar Registro"
					single-line
					solo
					hide-details></v-text-field>
		</v-toolbar>
		<v-data-table 	style="padding: 5px"
						:headers="headers"
						:items="lstatipohaberformateados"
						:items-per-page="30"
						:search = "buscarhaberes"
						:footer-props="{
							showFirstLastPage: true,
							'items-per-page-options': [10, 20, 30, 40, 50, -1],
							'items-per-page-text': 'Registros por Pagina:',
						}"
						dense
						class="elevation-1">
			<template slot="item" slot-scope="props">
				<tr>
					<!--<td>{{ helper.showDataDescription(props.item.haber,lsthaberes, id, descripcion)  }}</td>// Ejemplo de Uso de Helper Para obtener la Descripcion de una Tabla por medio de su Id-->
					<!--<td>{{ props.item.haber }}</td>-->
					<td>{{ props.item.nombre }}</td>
					<td>{{ FormatBoolean(props.item.calculo) }}</td>
					<td>{{ FormatBoolean(props.item.retencion) }}</td>
					<td>{{ FormatBoolean(props.item.tipo) }}</td>
					<td>{{ props.item.valor }}</td>
					<td>{{ props.item.tipo_haber }}</td>
					<td>{{ FormatBoolean(props.item.basico) }}</td>
					<td>{{ FormatBoolean(props.item.extra) }}</td>
					<td>{{ props.item.eventual }}</td>
					<td>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn color="success" v-on="on" fab small dark  @click="Actualizar(props.item)"><v-icon>edit</v-icon></v-btn>
							</template>
							<span>Modificar Registro de Haberes</span>
						</v-tooltip>
						<v-tooltip style="padding-left:10px" bottom>
							<template v-slot:activator="{ on }" >
								<v-btn color="error" v-on="on" fab small dark  @click="Eliminar(props.item)"><v-icon>delete</v-icon></v-btn>
							</template>
							<span>Eliminar Registro de Haberes</span>
						</v-tooltip>
					</td>
				</tr>
			</template>
			<template v-slot:top>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn color="accent" v-on="on" @click="Insertar()">Adicionar Nuevo Registro de haberes</v-btn>
					</template>
					<span>Adicionar nuevo registro  de haberes</span>
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
					<v-toolbar-title>Datos de haberes</v-toolbar-title>
				</v-toolbar>
				<v-divider></v-divider>
				<v-form ref="form" style="padding:10px" v-model="activa">
					<v-card-text>
						<v-layout wrap>

							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="haberes.nombre"
											label="Ingrese nombre"
											clearable
											persistent-hint
											required
                      :rules="HaberNom"
											@input="haberes.nombre = updateText(haberes.nombre)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<h4 class="mb-0">Haberes Calculo:</h4>
								<v-switch v-model="haberes.calculo"
									color="indigo"
                  :label="`: ${haberes.calculo ? 'Si' : 'No'}`"
									></v-switch>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<h4 class="mb-0">Haberes Retencion:</h4>
								<v-switch v-model="haberes.retencion"
									color="indigo"
                  :label="`: ${haberes.retencion ? 'Si' : 'No'}`"
									></v-switch>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<h4 class="mb-0">Haberes Tipo:</h4>
								<v-switch v-model="haberes.tipo"
									color="indigo"
                  :label="`: ${haberes.tipo ? 'Si' : 'No'}`"
								></v-switch>
							</v-flex>
							<v-flex sm6 style="padding: 5px">
								<v-text-field v-model="haberes.valor"
											label="Ingrese valor"
											clearable
											persistent-hint
											required
                      :rules="validacion"
                      counter
                      maxlength="8"
											@input="haberes.valor = updateText(haberes.valor)">
								</v-text-field>
							</v-flex>
							<v-flex sm6 style="padding: 5px">
								<v-autocomplete v-model="haberes.tipo_haber"
											label="Selecciona tipo Haberes"
                      outlined
                      :items="lsttipohaberes"
                      item-text="nombre"
                      item-value="tipo_haber"
                      autocomplete="off"
                      color="#1A237E"
                      no-data-text="No se encontro ningun tema"
											@input="haberes.tipo_haber = updateText(haberes.tipo_haber)">
								</v-autocomplete>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<h4 class="mb-0">Haberes Basico:</h4>
								<v-switch v-model="haberes.basico"
									color="indigo"
                  :label="`: ${haberes.basico ? 'Si' : 'No'}`"
								></v-switch>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<h4 class="mb-0">Haberes Extra:</h4>
								<v-switch v-model="haberes.extra"
									color="indigo"
                  :label="`: ${haberes.extra ? 'Si' : 'No'}`"
									></v-switch>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-text-field v-model="haberes.eventual"
											label="Ingrese eventual"
											clearable
											persistent-hint
											required
                      :rules="HaberEvento"
                      counter
                      maxlength="3"
											@input="haberes.eventual = updateText(haberes.eventual)">
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

<script src="./haberes.ts"></script>
