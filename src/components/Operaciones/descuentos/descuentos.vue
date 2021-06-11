<template>
	<v-card>
		<v-toolbar color="primary" style="color:white">
			<v-toolbar-title>Datos de descuentos</v-toolbar-title>
			<v-divider></v-divider>
			<v-text-field v-model="buscardescuentos"
					append-icon="search"
					label="Buscar Registro"
					single-line
					solo
					hide-details></v-text-field>
		</v-toolbar>
		<v-data-table 	style="padding: 5px"
						:headers="headers"
            :items="lstdescuentosformateados"

						:items-per-page="30"
						:search = "buscardescuentos" 
						:footer-props="{
							showFirstLastPage: true,
							'items-per-page-options': [10, 20, 30, 40, 50, -1],
							'items-per-page-text': 'Registros por Pagina:',
						}"
						dense
						class="elevation-1">
			<template slot="item" slot-scope="props">
				<tr>
					<!--<td>{{ helper.showDataDescription(props.item.descuento,lstdescuentos, id, descripcion)  }}</td>// Ejemplo de Uso de Helper Para obtener la Descripcion de una Tabla por medio de su Id-->
					<!--<td>{{ props.item.descuento }}</td> -->
					<td>{{ props.item.nombre }}</td>
					<td>{{ FormatBoolean(props.item.calculo) }}</td>
					<td>{{ props.item.valor }}</td>
					<td>{{ FormatBoolean(props.item.tipo) }}</td>
					<td>{{ props.item.idtipodescuentoFormat }}</td>
					<td>{{ FormatBoolean(props.item.basico) }}</td>
					<td>{{ props.item.eventual }}</td>
					<td>
						<v-tooltip bottom color="#008080">
							<template v-slot:activator="{ on }">
								<v-btn color="success" v-on="on" fab small dark  @click="Actualizar(props.item)"><v-icon>edit</v-icon></v-btn>
							</template>
							<span>Modificar Registro de Descuento</span>
						</v-tooltip>
						<v-tooltip style="padding-left:10px" bottom color="#008080">
							<template v-slot:activator="{ on }" >
								<v-btn color="error" v-on="on" fab small dark  @click="Eliminar(props.item)"><v-icon>delete</v-icon></v-btn>
							</template>
							<span>Eliminar Registro de Descuento</span>
						</v-tooltip>
					</td>
				</tr>
			</template>
			<template v-slot:top>
				<v-tooltip bottom color="#008080">
					<template v-slot:activator="{ on }">
						<v-btn color="accent" v-on="on" @click="Insertar()"><v-icon left>mdi-plus</v-icon>Agregar descuentos</v-btn>
					</template>
					<span>Adicionar nuevo registro de descuentos</span>
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
					<v-toolbar-title>Datos de descuentos</v-toolbar-title>
				</v-toolbar>
				<v-divider></v-divider>
				<v-form ref="form" style="padding:10px" v-model="validacion">
					<v-card-text>
						<v-layout wrap>
							<v-flex sm6 style="padding: 5px">
								<v-text-field v-model="descuentos.nombre"
											label="Ingrese Nombre de descuento"
											clearable
											persistent-hint
											:rules="RuleDeNo"
											counter
											maxlength="25"
											required
											@input="descuentos.nombre = updateText(descuentos.nombre)">
								</v-text-field>
							</v-flex>
							<v-flex sm6 style="padding: 5px">
								<v-autocomplete v-model="descuentos.tipo_descuento"
											label="Seleccione Tipo descuento"
											:items="lsttipodescuento"
											item-text="nombre"
											item-value="tipo_descuento"
											outlined
											autocomplete="off"
											@input="descuentos.tipo_descuento = updateText(descuentos.tipo_descuento)">
								</v-autocomplete>
							</v-flex>

							<v-flex sm6 style="padding: 5px">
								<v-text-field v-model="descuentos.valor"
											label="Ingrese valor"
											clearable
											persistent-hint
											:rules="RuleDeValor"
											counter
											maxlength="8"
											required
											@input="descuentos.valor = updateText(descuentos.valor)">
								</v-text-field>
							</v-flex>
							<v-flex sm6 style="padding: 5px">
								<v-text-field v-model="descuentos.eventual"
											label="Ingrese Eventual"
											clearable
											persistent-hint
                      						:rules="RuleEven"
											required
											counter
											maxlength="2"
											@input="descuentos.eventual = updateText(descuentos.eventual)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<h4 class="mb-0">Calculo:</h4>
								<v-switch v-model="descuentos.calculo"
									color="success"
                                    :label="`Descuento calculo: ${descuentos.calculo ? 'Si' : 'No'}`"
									></v-switch>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<h4 class="mb-0">Tipo:</h4>
								<v-switch v-model="descuentos.tipo"
									color="success"	
                                    :label="`Descuento tipo: ${descuentos.tipo ? 'Si' : 'No'}`"
									></v-switch>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<h4 class="mb-0">Basico:</h4>
								<v-switch v-model="descuentos.basico"
									color="success"
                                    :label="`Descuento basico: ${descuentos.basico ? 'Si' : 'No'}`"
									></v-switch>
							</v-flex>
						</v-layout>
					</v-card-text>
				</v-form>
				<v-divider></v-divider>
				<v-card-actions style="justify-content: center;padding:10px">
					<v-btn color="success" dark style="width: 50%" :disabled="!validacion" @click="Grabar()" >Grabar</v-btn>
					<v-btn color="error" dark style="width: 50%" @click="Cancelar()">Cancelar</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-card>
</template>

<script src="./descuentos.ts"></script>
