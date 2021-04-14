<template>

	<v-card class="contenedor" max-width="75%" height="100%"> 
	 <!-- <v-layout wrap> -->
		 
      <v-navigation-drawer
        permanent
        expand-on-hover
      >
        <v-list>
          <!-- <v-list-item class="px-2">
          </v-list-item> -->

          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="title">
                
              </v-list-item-title>
              <v-list-item-subtitle>Operaciones</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list
          nav
          dense
        >
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>add_circle_outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title @click="nuevo=true">Nuevo</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-share</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Grabar</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi mdi-file-document-box-search-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title @click="dialogAsientos=true">Buscar</v-list-item-title>
          </v-list-item>
		    <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-circle-edit-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Anular</v-list-item-title>
          </v-list-item>
		    <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi mdi-floppy</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Imprimir</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

		<v-card max-width="100%">
        <v-toolbar color="primary" style="color:white">
			<v-toolbar-title>Registros Diarios</v-toolbar-title>
			<v-divider></v-divider>
		</v-toolbar> 
        <v-divider></v-divider>
		<v-layout column>
				<v-form ref="form" style="padding:10px" v-model="activo">
					<v-card-text>
					<!--	<v-layout wrap>
												<v-btn color="primary" ><v-icon>add_circle_outline</v-icon>
												&nbsp; Nuevo</v-btn> 
								
												&nbsp;&nbsp;&nbsp;<v-btn color="primary" ><v-icon>mdi-share</v-icon>
												&nbsp; Grabar</v-btn>
								
												&nbsp;&nbsp;&nbsp;<v-btn color="primary" ><v-icon> mdi mdi-file-document-box-search-outline</v-icon>
												&nbsp; Buscar</v-btn>

												&nbsp;&nbsp;&nbsp;<v-btn color="primary" ><v-icon>mdi-circle-edit-outline</v-icon>
												&nbsp; Anular</v-btn>

												&nbsp;&nbsp;&nbsp;<v-btn color="primary" ><v-icon>mdi mdi-floppy</v-icon>
												&nbsp; Imprimir</v-btn>			
						</v-layout>	-->
						<v-divider></v-divider>
						<br>
						<v-layout wrap>
							<v-flex sm3 class="hidden-xs-only" style="padding: 5px">
								<v-menu
									ref="menu_fechacreacion"
										v-model="menu_fechacreacion"
										:close-on-content-click="false"
										transition="scale-transition"
										offset-y
										full-width
										max-width="290px"
										min-width="290px">
									<template v-slot:activator="{ on }">
										<v-text-field
											v-model="fecha"
											label="Ingrese fecha "
											persistent-hint
											prepend-icon="event"
											v-on="on"
											id="fecha"
											>
										</v-text-field>
									</template>
									<v-date-picker v-model="fecha" no-title @input="menu_fechacreacion = false"
													@change="select_tipoCambio"
													@focus="clickOnFocus('fecha')"></v-date-picker>
								</v-menu>
							</v-flex>
							<v-flex sm2 class="hidden-xs-only" style="padding: 5px">
							<v-text-field
											v-model="tiposdecambio.cotizacionoficial"
											label="Tipo Cambio: "
											persistent-hint
											readonly>
										</v-text-field>
							</v-flex>
							<v-col cols="5" sm="3" class="pa-2">
								<v-autocomplete
								v-model="asientosencabezado.idtipocomprobante"
								label="Comprobante: "
								:items="lsttiposcomprobantes"
								item-text="descripcion"
								item-value="idtipocomprobante"
								outlined
								autocomplete="off"
								color="primary"
								></v-autocomplete>
							</v-col>
							<v-flex sm4 style="padding: 5px">
								<v-text-field 
											label="Numero de Comprobante"
											v-model="asientosencabezado.numerocomprobante"
											
											persistent-hint
											outlined
											>
								</v-text-field>
							</v-flex>
						</v-layout>
						<v-layout wrap>
							
							<v-flex sm4 style="padding: 5px">
								<v-text-field 
											label="Referencia: "
											v-model="asientosencabezado.referencia"
											placeholder="Referencia"
											persistent-hint
											outlined
											clearable
											>
								</v-text-field>
							</v-flex>
	
						</v-layout>
					</v-card-text>
					<v-divider></v-divider>
			<v-card max-width="1800" v-if="nuevo==true">
				<v-toolbar color="primary" style="color:white">
			<v-toolbar-title>Nuevo</v-toolbar-title>
				<v-spacer></v-spacer>
			
				<v-spacer></v-spacer>
				<v-btn color="error" dark @click="Cancelar()">X</v-btn>
		</v-toolbar>
		<br>
				<v-layout column>
					<v-layout wrap>
						
					</v-layout>
					<v-layout wrap>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<!-- <v-btn color="success" v-on="on" fab small dark  @click="BuscarCuentas()"><v-icon>search</v-icon></v-btn> -->
						
						<v-flex sm4 style="padding: 5px">
								<v-text-field 
											label="Nombre de la Cuenta: "
											v-model="cuentas.nombrecuenta"
											placeholder="Nombre de la Cuenta"
											persistent-hint
											outlined
											clearable>
								</v-text-field>
							</v-flex>
					    <v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn color="primary" v-on="on" fab small dark  @click="BuscarCuentas()"><v-icon>search</v-icon></v-btn>
							</template>
							<span>Buscar Cuenta</span>
						</v-tooltip>
						<v-col sm6 style="padding: 5px">
							<v-flex sm4 style="padding: 5px">
									<v-text-field v-model="cuentas.cuenta"
												label="Cuenta "
												placeholder="Cuenta "
												persistent-hint
												outlined
												color="blue"
												>
									</v-text-field>
							</v-flex>
						</v-col>
						
					</v-layout>
					
					<v-layout wrap>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<v-flex sm4 style="padding: 5px">
								<v-text-field 
											label="Glosa Detalle: "
											v-model="asientosdetalle.glosadetalle"
											placeholder="Glosa Detalle"
											persistent-hint
											outlined
											clearable>
								</v-text-field>
							</v-flex>
					</v-layout>


				<v-layout column>
						<v-layout wrap>
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<v-flex sm4 style="padding: 5px">
								<v-text-field 
											label="Debe Monto Bs: "
											v-model="asientosencabezado.referencia"
											placeholder="Debe Monto Bs"
											persistent-hint
											outlined
											clearable
											>
								</v-text-field>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-text-field 
											label="Debe Monto Sus: "
											v-model="asientosencabezado.referencia"
											placeholder="Debe Monto Sus"
											persistent-hint
											outlined
											clearable
											>
								</v-text-field>
							</v-flex>
						</v-layout>
						<v-layout wrap>
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<v-flex sm4 style="padding: 5px">
								<v-text-field 
											label="Haber Monto Bs: "
											v-model="asientosencabezado.referencia"
											placeholder="Haber Monto Bs"
											persistent-hint
											outlined
											clearable
											>
								</v-text-field>
							</v-flex>
							<v-flex sm4 style="padding: 5px">
								<v-text-field 
											label="Haber Monto Sus: "
											v-model="asientosencabezado.referencia"
											placeholder="Haber Monto Sus"
											persistent-hint
											outlined
											clearable
											>
								</v-text-field>
							</v-flex>
							
							<v-layout wrap>
								
							
							</v-layout>
						</v-layout>
					</v-layout>
				</v-layout>
			</v-card>
					
						
			<v-card max-width="1500">
				<v-layout wrap>
					&nbsp;&nbsp;&nbsp;&nbsp;
				<v-layout column>
						
						<v-col sm="12" class="pa-2" >
								<v-textarea
								v-model="asientosencabezado.glosa"
								name="input-7-1"
								label="Glosa General"
								hint="Glosa General"
								no-resize
								color="primary"
								height="180"
								></v-textarea>
						</v-col>
					<v-col sm="15" class="pa-2" >
						<v-flex sm6 style="padding: 5px">
								<v-text-field v-model="asientosencabezado.codigomodulo"
											value="S/MODULO"
											readonly
											label="Mod. Procedencia: "
											placeholder="Mod. Procedencia: "
											persistent-hint
											outlined
											color="blue"
											>
								</v-text-field>
							</v-flex>
					</v-col>
					
				</v-layout>
						<v-col cols="5" sm="6" class="pa-2" >
							<v-card max-width="715">
								<v-divider></v-divider>
								<v-layout wrap>
									&nbsp;&nbsp;&nbsp;&nbsp;
							<v-flex sm4 style="padding: 5px">
									<v-text-field 
											label="Debe Bs: "
											v-model="asientosencabezado.referencia"
											placeholder="Debe Bs "
											persistent-hint
											outlined
											clearable
											>
								</v-text-field>

							</v-flex>
									<v-flex sm4 style="padding: 5px">
								<v-text-field 
											label="Debe Sus: "
											hint=" "
											placeholder="Debe Sus: "
											persistent-hint
											outlined
											color="blue"
											>
								</v-text-field>
							</v-flex>
								</v-layout>
								<v-layout wrap>
									&nbsp;&nbsp;&nbsp;&nbsp;
									<v-flex sm4 style="padding: 5px">
								<v-text-field 
											label="Haber Bs: "
											hint=" "
											placeholder="Haber Bs: "
											persistent-hint
											outlined
											color="blue"
											>
								</v-text-field>
							</v-flex>
									<!-- <p><b>Haber Sus: </b> </p> -->
									<v-flex sm4 style="padding: 5px">
								<v-text-field 
											label="Haber Sus: "
											hint=" "
											placeholder="Haber Sus: "
											persistent-hint
											outlined
											color="blue"
											>
								</v-text-field>
							</v-flex>
								</v-layout>
								<v-layout wrap>
									<!-- &nbsp;&nbsp;&nbsp;&nbsp;<p><b>Ajuste Bs: </b> </p>  -->
									&nbsp;&nbsp;&nbsp;&nbsp;
							<v-flex sm4 style="padding: 5px">
								<v-text-field 
											label="Ajuste Bs: "
											hint=" "
											placeholder="Ajuste Bs: "
											persistent-hint
											outlined
											color="red"
											>
								</v-text-field>
							</v-flex>
									<!-- <p><b>Ajuste Sus: </b> </p> -->
							<v-flex sm4 style="padding: 5px">
								<v-text-field 
											label="Ajuste Sus: "
											hint=" "
											placeholder="Ajuste Sus"
											persistent-hint
											outlined
											color="red"
											>
								</v-text-field>
							</v-flex>
							</v-layout>
							</v-card>
						</v-col>
					</v-layout>
			    	</v-card>
				</v-form>
		    </v-layout>
			<v-divider></v-divider>
		</v-card>
		
<v-dialog v-model="dialogCuentas" max-width="70%">
	<v-toolbar color="primary" style="color:white">
			<v-toolbar-title>Buscar Cuenta</v-toolbar-title>
				<v-spacer></v-spacer>
				<v-text-field v-model="buscarCuenta"
						append-icon="search"
						label="Buscar Cuentas"
						single-line
						solo
						hide-details></v-text-field>
				<v-spacer></v-spacer>
				<v-btn color="error" dark @click="Cancelar()">X</v-btn>
		</v-toolbar>
	<v-data-table 	style="padding: 5px"
						:headers="headersCuentas" 
						:items="lstcuentasformateados" 
						:items-per-page="30"
						:search = "buscarCuenta" 
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
					<td>{{ props.item.nivel }}</td>
					<td>{{ FormatBoolean(props.item.cuentaasiento) }}</td>
					<td>{{ props.item.cuentasumar }}</td>
					<td>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn color="success" v-on="on" fab small dark  @click="Actualizar(props.item)"><v-icon>edit</v-icon></v-btn>
							</template>
							<span>Adicionar Registro de Cuenta</span>
						</v-tooltip>
					</td>
				</tr>
			</template>
			
			<template v-slot:no-data>
				<v-alert :value="true" color="warning" icon="warning">
					Lo sentimos, no exiten datos a desplegar: (
				</v-alert>
			</template>
	</v-data-table>
			
	</v-dialog>

	<v-dialog v-model="dialogAsientos" max-width="70%">
	<v-toolbar color="primary" style="color:white">
			<v-toolbar-title>Buscar Cuenta</v-toolbar-title>
				<v-spacer></v-spacer>
				<v-text-field v-model="buscarasientosencabezado"
						append-icon="search"
						label="Buscar"
						single-line
						solo
						hide-details></v-text-field>
				<v-spacer></v-spacer>
				<v-btn color="error" dark @click="Cancelar()">X</v-btn>
		</v-toolbar>
	<v-data-table 	style="padding: 5px"
						:headers="headersAsientos" 
						:items="lstasientosencabezado" 
						:items-per-page="30"
						:search = "buscarCuenta" 
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
					<td>{{ FormatDate(props.item.fecha) }}</td>
					<td>{{ props.item.idtipocomprobante }}</td>
					<td>{{ props.item.numerocomprobante }}</td>
					<td>{{ props.item.referencia }}</td>
					<td>{{ props.item.glosa }}</td>
					<td>{{ props.item.cotizacion }}</td>
					<td>{{ props.item.codigomodulo }}</td>
					<td>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-btn color="success" v-on="on" fab small dark  @click="ActualizarAsiento(props.item)"><v-icon>edit</v-icon></v-btn>
							</template>
							<span>Adicionar Registro de Cuenta</span>
						</v-tooltip>
					</td>
				</tr>
			</template>
			
			<template v-slot:no-data>
				<v-alert :value="true" color="warning" icon="warning">
					Lo sentimos, no exiten datos a desplegar: (
				</v-alert>
			</template>
	</v-data-table>
			
	</v-dialog>

	</v-card>

</template>

<script src="./RegistrosDiarios.ts"></script>

<style lang="scss" scoped>
.contenedor {
	display: flex;
	flex-direction: row;
	margin: 2%;
	justify-content: center;
}
</style>
