<template>
	<v-card>
		<v-toolbar color="primary" style="color:white">
			<v-toolbar-title>Datos de planilla esp</v-toolbar-title>
			<v-divider></v-divider>
			<v-text-field v-model="buscarplanilla_esp"
					append-icon="search"
					label="Buscar Registro"
					single-line
					solo
					hide-details></v-text-field>
		</v-toolbar>
		<v-data-table 	style="padding: 5px"
						:headers="headers" 
						:items="lstplanilla_esp" 
						:items-per-page="30"
						:search = "buscarplanilla_esp" 
						:footer-props="{
							showFirstLastPage: true,
							'items-per-page-options': [10, 20, 30, 40, 50, -1],
							'items-per-page-text': 'Registros por Pagina:',
						}"
						dense
						class="elevation-1">
			<template slot="item" slot-scope="props">
				<tr>
					<!--<td>{{ helper.showDataDescription(props.item.planilla_esp,lstplanilla_esp, id, descripcion)  }}</td>// Ejemplo de Uso de Helper Para obtener la Descripcion de una Tabla por medio de su Id-->
					<!--<td>{{ props.item.planilla_esp }}</td>-->
					<td>{{ props.item.descripcion }}</td>
					<td>{{ props.item.haber }}</td>
					<td>{{ props.item.tipo }}</td>
					<td>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn color="success" v-on="on" fab small dark  @click="Actualizar(props.item)"><v-icon>edit</v-icon></v-btn>
							</template>
							<span>Modificar Registro de planilla esp</span>
						</v-tooltip>
						<v-tooltip style="padding-left:10px" bottom>
							<template v-slot:activator="{ on }" >
								<v-btn color="error" v-on="on" fab small dark  @click="Eliminar(props.item)"><v-icon>delete</v-icon></v-btn>
							</template>
							<span>Eliminar Registro de  planilla es</span>
						</v-tooltip>
					</td>
				</tr>
			</template>
			<template v-slot:top>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn color="accent" v-on="on" @click="Insertar()">Adicionar Nuevo Registro de planilla esp</v-btn>
					</template>
					<span>Adicionar nuevo registro de  planilla es</span>
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
					<v-toolbar-title>Datos de planilla esp</v-toolbar-title>
				</v-toolbar>
				<v-divider></v-divider>
				<v-form ref="form" style="padding:10px" v-model="activa">
					<v-card-text>
						<v-layout wrap>
							<v-flex sm12 style="padding: 5px">
								<v-textarea v-model="planilla_esp.descripcion"
											label="Ingrese descripcion"
											clearable
											persistent-hint
											required
                      :rules="validacion"
                      counter
                      maxlength="50"
											@input="planilla_esp.descripcion = updateText(planilla_esp.descripcion)">
								</v-textarea>
							</v-flex>
							<v-flex sm6 style="padding: 5px">
								<v-text-field v-model="planilla_esp.haber"
											label="Ingrese haber"
											
                      :rules="Rulehaber"
											
                      counter
                      maxlength="10"
											@input="planilla_esp.haber = updateText(planilla_esp.haber)">
								</v-text-field>
							</v-flex>
							<v-flex sm6 style="padding: 5px">
								<v-text-field v-model="planilla_esp.tipo"
											label="Ingrese tipo de planilla"
										
                      :rules="validacion"
                      counter
                      maxlength="1"
											@input="planilla_esp.tipo = updateText(planilla_esp.tipo)">
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

<script src="./planilla_esp.ts"></script>
