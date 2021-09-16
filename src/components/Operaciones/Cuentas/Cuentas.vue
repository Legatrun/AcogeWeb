<template>
	<v-card>
		<v-toolbar color="primary" style="color:white">
			<v-toolbar-title>Datos de Cuentas</v-toolbar-title>
			<v-divider></v-divider>
			<v-text-field v-model="buscarcuentas"
					append-icon="search"
					label="Buscar Registro"
					single-line
					solo
					hide-details></v-text-field>
		</v-toolbar>
		<v-data-table 	style="padding: 5px"
						:headers="headers" 
						:items="lstcuentasformateados" 
						:items-per-page="30"
						:search = "buscarcuentas" 
						:footer-props="{
							showFirstLastPage: true,
							'items-per-page-options': [10, 20, 30, 40, 50, -1],
							'items-per-page-text': 'Registros por Pagina:',
						}"
						dense
						class="elevation-1">
			<template slot="item" slot-scope="props">
				<tr>
					<!--<td>{{ helper.showDataDescription(props.item.cuenta,lstCuentas, id, descripcion)  }}</td>// Ejemplo de Uso de Helper Para obtener la Descripcion de una Tabla por medio de su Id-->
					<td>{{ props.item.cuenta }}</td>
					<td>{{ props.item.nombrecuenta }}</td>
					<td>{{ props.item.idmoneda }}</td>
					<td>{{ props.item.nivel }}</td>
					<td>{{ FormatBoolean(props.item.cuentaasiento) }}</td>
					<td>{{ props.item.cuentasumar }}</td>
					<td>{{ props.item.activopasivo }}</td>
					<td>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn color="success" v-on="on" fab small dark  @click="Actualizar(props.item)"><v-icon>edit</v-icon></v-btn>
							</template>
							<span>Modificar Registro de Cuenta</span>
						</v-tooltip>
						<v-tooltip style="padding-left:10px" bottom>
							<template v-slot:activator="{ on }" >
								<v-btn color="error" v-on="on" fab small dark  @click="Eliminar(props.item)"><v-icon>delete</v-icon></v-btn>
							</template>
							<span>Eliminar Registro de Cuenta</span>
						</v-tooltip>
					</td>
				</tr>
			</template>
			<template v-slot:top>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn color="botonCrear" dark v-on="on" @click="Insertar()">Añadir Cuenta</v-btn>
					</template>
					<span>Adicionar nueva Cuenta</span>
				</v-tooltip>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn color="botonAdicional" outlined v-on="on" @click="newMoneda()">Añadir Moneda</v-btn>
					</template>
					<span>Adicionar nueva Moneda</span>
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
		<v-dialog v-model="dialog" persistent max-width="50%">
			<v-card>
				<v-toolbar style="padding:10px" dark class="primary">
					<v-toolbar-title>Datos de Cuentas</v-toolbar-title>
				</v-toolbar>
				<v-divider></v-divider>
				<v-form ref="form" style="padding:10px" v-model="activo">
					<v-card-text>
						<v-layout wrap>
							<template v-if="operacion == 'Insert'">
								<v-flex sm12 style="padding: 5px">
									<v-text-field v-model="cuentas.cuenta"
												label="Cuenta"
												clearable
												persistent-hint
												required
												:rules="validacion"
												@input="cuentas.cuenta = updateText(cuentas.cuenta)">
									</v-text-field>
								</v-flex>
							</template>
							<template v-else>
								<v-flex sm12 style="padding: 5px">
									<v-text-field v-model="cuentas.cuenta"
												label="Cuenta"
												placeholder="Cuenta"
												readonly
												persistent-hint>
									</v-text-field>
								</v-flex>
							</template>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="cuentas.nombrecuenta"
											label="Nombre Cuenta"
											clearable
											persistent-hint
											required
											:rules="validacion"
											@input="cuentas.nombrecuenta = updateText(cuentas.nombrecuenta)">
								</v-text-field>
							</v-flex>
							<v-col cols="5" sm="12" class="pa-2">
								<v-autocomplete
								v-model="cuentas.idmoneda"
								label="Moneda"
								:items="lstmonedas"
								item-text="descripcion"
								item-value="idmoneda"
								:rules="validacion"
								outlined
								autocomplete="off"
								color="#1A237E"
								@input="cuentas.idmoneda = updateText(cuentas.idmoneda)"
								></v-autocomplete>
							</v-col>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="cuentas.nivel"
											type="number"
											label="Nivel"
											clearable
											persistent-hint
											required
											@change="validarDigito"
											:rules="validacion"
											@input="cuentas.nivel = updateText(cuentas.nivel)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<h4 class="mb-0">Cuenta Asiento:</h4>
								<v-switch v-model="cuentas.cuentaasiento"
									color="indigo"
									>
									</v-switch>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model.number="cuentas.cuentasumar"
											type="number"
											label="Cuenta Sumar"
											clearable
											persistent-hint
											required
											:rules="validacion"
											@input="cuentas.cuentasumar = updateText(cuentas.cuentasumar)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model.number="cuentas.activopasivo"
											type="number"
											label="Activo Pasivo"
											clearable
											persistent-hint
											required
											:rules="validacion"
											@input="cuentas.activopasivo = updateText(cuentas.activopasivo)">
								</v-text-field>
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
	</v-card>
</template>

<script src="./Cuentas.ts"></script>
