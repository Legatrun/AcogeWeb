<template>
	<v-card>
		<v-toolbar color="primary" style="color:white">
			<v-toolbar-title>Datos de CuentasBancos</v-toolbar-title>
			<v-divider></v-divider>
			<v-text-field v-model="buscarcuentasbancos"
					append-icon="search"
					label="Buscar Registro"
					single-line
					solo
					hide-details></v-text-field>
		</v-toolbar>
		<v-data-table 	style="padding: 5px"
						:headers="headers" 
						:items="lstcuentasbancos" 
						:items-per-page="30"
						:search = "buscarcuentasbancos" 
						:footer-props="{
							showFirstLastPage: true,
							'items-per-page-options': [10, 20, 30, 40, 50, -1],
							'items-per-page-text': 'Registros por Pagina:',
						}"
						dense
						class="elevation-1">
			<template slot="item" slot-scope="props">
				<tr>
					<!--<td>{{ helper.showDataDescription(props.item.nrocuenta,lstCuentasBancos, id, descripcion)  }}</td>// Ejemplo de Uso de Helper Para obtener la Descripcion de una Tabla por medio de su Id-->
					<td>{{ props.item.idbanco }}</td>
					<td>{{ props.item.nrocuenta }}</td>
					<td>{{ props.item.idmoneda }}</td>
					<td>{{ props.item.saldoactual }}</td>
					<td>{{ props.item.cuentacontable }}</td>
					<td>{{ FormatDate(props.item.fechaapertura) }}</td>
					<td>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn color="success" v-on="on" fab small dark  @click="Actualizar(props.item)"><v-icon>edit</v-icon></v-btn>
							</template>
							<span>Modificar Registro de Demo</span>
						</v-tooltip>
						<v-tooltip style="padding-left:10px" bottom>
							<template v-slot:activator="{ on }" >
								<v-btn color="error" v-on="on" fab small dark  @click="Eliminar(props.item)"><v-icon>delete</v-icon></v-btn>
							</template>
							<span>Eliminar Registro de Demo</span>
						</v-tooltip>
					</td>
				</tr>
			</template>
			<template v-slot:top>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn color="accent" v-on="on" @click="Insertar()">Adicionar Nuevo Registro de CuentasBancos</v-btn>
					</template>
					<span>Adicionar nuevo registro de cliente</span>
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
					<v-toolbar-title>Datos de CuentasBancos</v-toolbar-title>
				</v-toolbar>
				<v-divider></v-divider>
				<v-form ref="form" style="padding:10px">
					<v-card-text>
						<v-layout wrap>
							<template v-if="operacion == 'Insert'">
								<v-flex sm12 style="padding: 5px">
									<v-text-field v-model="cuentasbancos.idbanco"
												label="IDBanco"
												hint="Ingrese IDBanco"
												placeholder="IDBanco"
												clearable
												persistent-hint
												required
												@input="cuentasbancos.idbanco = updateText(cuentasbancos.idbanco)">
									</v-text-field>
								</v-flex>
								<v-flex sm12 style="padding: 5px">
									<v-text-field v-model="cuentasbancos.nrocuenta"
												label="NroCuenta"
												hint="Ingrese NroCuenta"
												placeholder="NroCuenta"
												clearable
												persistent-hint
												required
												@input="cuentasbancos.nrocuenta = updateText(cuentasbancos.nrocuenta)">
									</v-text-field>
								</v-flex>
							</template>
							<template v-else>
								<v-flex sm12 style="padding: 5px">
									<v-text-field v-model="cuentasbancos.idbanco"
												label="IDBanco"
												placeholder="IDBanco"
												readonly
												persistent-hint>
									</v-text-field>
								</v-flex>
								<v-flex sm12 style="padding: 5px">
									<v-text-field v-model="cuentasbancos.nrocuenta"
												label="NroCuenta"
												placeholder="NroCuenta"
												readonly
												persistent-hint>
									</v-text-field>
								</v-flex>
							</template>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="cuentasbancos.idmoneda"
											label="IDMoneda"
											hint="Ingrese IDMoneda"
											placeholder="IDMoneda"
											clearable
											persistent-hint
											required
											@input="cuentasbancos.idmoneda = updateText(cuentasbancos.idmoneda)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="cuentasbancos.saldoactual"
											label="SaldoActual"
											hint="Ingrese SaldoActual"
											placeholder="SaldoActual"
											clearable
											persistent-hint
											required
											@input="cuentasbancos.saldoactual = updateText(cuentasbancos.saldoactual)">
								</v-text-field>
							</v-flex>
							<v-flex sm12 style="padding: 5px">
								<v-text-field v-model="cuentasbancos.cuentacontable"
											label="CuentaContable"
											hint="Ingrese CuentaContable"
											placeholder="CuentaContable"
											clearable
											persistent-hint
											required
											@input="cuentasbancos.cuentacontable = updateText(cuentasbancos.cuentacontable)">
								</v-text-field>
							</v-flex>
							<v-flex sm4 class="hidden-xs-only" style="padding: 5px">
								<v-menu
									ref="menu_fechaapertura"
										v-model="menu_fechaapertura"
										:close-on-content-click="false"
										transition="scale-transition"
										offset-y
										full-width
										max-width="290px"
										min-width="290px">
									<template v-slot:activator="{ on }">
										<v-text-field
											v-model="cuentasbancos.fechaapertura"
											label="Ingrese fechaapertura"
											hint="Ingrese fechaapertura"
											persistent-hint
											prepend-icon="event"
											v-on="on">
										</v-text-field>
									</template>
									<v-date-picker v-model="cuentasbancos.fechaapertura" no-title @input="menu_fechaapertura = false"></v-date-picker>
								</v-menu>
							</v-flex>
						</v-layout>
					</v-card-text>
				</v-form>
				<v-divider></v-divider>
				<v-card-actions style="justify-content: center;padding:10px">
					<v-btn color="success" dark style="width: 50%" @click="Grabar()">Grabar</v-btn>
					<v-btn color="error" dark style="width: 50%" @click="Cancelar()">Cancelar</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-card>
</template>

<script src="./CuentasBancos.ts"></script>
