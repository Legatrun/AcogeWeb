<template>
	<v-card>
		<v-toolbar color="primary" style="color:white">
			<v-toolbar-title>Datos de tipo descuento</v-toolbar-title>
			<v-divider></v-divider>
			<v-text-field v-model="buscartipo_descuento"
					append-icon="search"
					label="Buscar Registro"
					single-line
					solo
					hide-details></v-text-field>
		</v-toolbar>
		<v-data-table 	style="padding: 5px"
						:headers="headers" 
						:items="lsttipo_descuento" 
						:items-per-page="30"
						:search = "buscartipo_descuento" 
						:footer-props="{
							showFirstLastPage: true,
							'items-per-page-options': [10, 20, 30, 40, 50, -1],
							'items-per-page-text': 'Registros por Pagina:',
						}"
						dense
						class="elevation-1">
			<template slot="item" slot-scope="props">
				<tr>
					<!--<td>{{ helper.showDataDescription(props.item.tipo_descuento,lsttipo_descuento, id, descripcion)  }}</td>// Ejemplo de Uso de Helper Para obtener la Descripcion de una Tabla por medio de su Id-->
					<!--<td>{{ props.item.tipo_descuento }}</td>-->
					<td>{{ props.item.nombre }}</td>
					<td>
						<v-tooltip bottom color="#008080">
							<template v-slot:activator="{ on }">
								<v-btn color="success" v-on="on" fab small dark  @click="Actualizar(props.item)"><v-icon>edit</v-icon></v-btn>
							</template>
							<span>Modificar Registro de tipo descuento</span>
						</v-tooltip>
						<v-tooltip style="padding-left:10px" bottom color="#008080">
							<template v-slot:activator="{ on }" >
								<v-btn color="error" v-on="on" fab small dark  @click="Eliminar(props.item)"><v-icon>delete</v-icon></v-btn>
							</template>
							<span>Eliminar Registro de tipo descuento</span>
						</v-tooltip>
					</td>
				</tr>
			</template>
			<template v-slot:top>
				<v-tooltip bottom color="#008080">
					<template v-slot:activator="{ on }">
						<v-btn color="accent" v-on="on" @click="Insertar()"><v-icon left>mdi-plus</v-icon>Agregar tipo descuento</v-btn>
					</template>
					<span>Adicionar nuevo registro de  tipo descuento</span>
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
					<v-toolbar-title>Datos de tipo descuento</v-toolbar-title>
				</v-toolbar>
				<v-divider></v-divider>
				<v-form ref="form" style="padding:10px" v-model="activa">
					<v-card-text>
						<v-layout wrap>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="tipo_descuento.nombre"
											label="Ingrese tipo descuento"
											clearable
											persistent-hint
                    						:rules="RulNombre"
											required
											@input="tipo_descuento.nombre = updateText(tipo_descuento.nombre)">
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

<script src="./tipo_descuento.ts"></script>
