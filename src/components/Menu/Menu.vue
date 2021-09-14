<template>
  <v-card>
    <v-list class="menubar" dense nav>
      <v-list-item v-for="item in menuItems" :key="item.title" :to="item.path" no-action>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title style="font-size:1.2em" >{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
  <v-list>
      
      <!-- Compras -->
      <v-list-group
        :value="false"
        prepend-icon="mdi-account-circle"
      >
        <template v-slot:activator>
          <v-list-item-title>Compras</v-list-item-title>
        </template>
        <v-list-group
          :value="false"
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Administracion</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item v-for="subItem in menuListaCompras" :key="subItem.title" :to="subItem.path" no-action>
              <v-list-item-content>
                  <v-list-item-title  v-text="subItem.title"></v-list-item-title>
              </v-list-item-content>
          </v-list-item>
                
        </v-list-group>
        <v-list-group
          no-action
          sub-group
        >
        <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Transacciones</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="([title, icon], i) in cruds"
            :key="i"
            link
          >
            <v-list-item-title v-text="title"></v-list-item-title>
            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>

        <v-list-group
          no-action
          sub-group
        >
        <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Reportes</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="([title, icon], i) in cruds"
            :key="i"
            link
          >
            <v-list-item-title v-text="title"></v-list-item-title>
            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
      </v-list-group>
      <!-- Inventarios -->
       <v-list-group
        :value="false"
        prepend-icon="mdi-account-circle"
      >
        <template v-slot:activator>
          <v-list-item-title>Inventarios</v-list-item-title>
        </template>
        <v-list-group
          :value="false"
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Administracion</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item v-for="subItem in menuListaInventarios" :key="subItem.title" :to="subItem.path" no-action>
              <v-list-item-content>
                  <v-list-item-title  v-text="subItem.title"></v-list-item-title>
              </v-list-item-content>
          </v-list-item>
               
        </v-list-group>
        <v-list-group
          no-action
          sub-group
        >
        <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Transacciones</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="([title, icon], i) in cruds"
            :key="i"
            link
          >
            <v-list-item-title v-text="title"></v-list-item-title>
            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>

        <v-list-group
          no-action
          sub-group
        >
        <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Reportes</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="([title, icon], i) in cruds"
            :key="i"
            link
          >
            <v-list-item-title v-text="title"></v-list-item-title>
            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
      </v-list-group>

       <!-- Ctas por Cobrar -->
       <v-list-group
        :value="false"
        prepend-icon="mdi-account-circle"
      >
        <template v-slot:activator>
          <v-list-item-title>Cuentas por Cobrar</v-list-item-title>
        </template>
        <v-list-group
          :value="false"
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Administracion</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item v-for="subItem in menuListaCuetasPorCobrar" :key="subItem.title" :to="subItem.path" no-action>
              <v-list-item-content>
                  <v-list-item-title  v-text="subItem.title"></v-list-item-title>
              </v-list-item-content>
          </v-list-item>
<!-- Parametros Cuentas por Cobrar -->
<v-list-group
          :value="false"
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Parametros Cuentas por Cobrar</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item v-for="subItem in menuListaParametrosCuetasPorCobrar" :key="subItem.title" :to="subItem.path" no-action>
              <v-list-item-content>
                  <v-list-item-title  v-text="subItem.title"></v-list-item-title>
              </v-list-item-content>
          </v-list-item>
               
        </v-list-group>
<!-- Bancos -->
<v-list-group
          :value="false"
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Bancos</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item v-for="subItem in menuListaBancos" :key="subItem.title" :to="subItem.path" no-action>
              <v-list-item-content>
                  <v-list-item-title  v-text="subItem.title"></v-list-item-title>
              </v-list-item-content>
          </v-list-item>
              
        </v-list-group>
        </v-list-group>
        <v-list-group
          no-action
          sub-group
        >
        <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Transacciones</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="([title, icon], i) in cruds"
            :key="i"
            link
          >
            <v-list-item-title v-text="title"></v-list-item-title>
            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>

        <v-list-group
          no-action
          sub-group
        >
        <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Reportes</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="([title, icon], i) in cruds"
            :key="i"
            link
          >
            <v-list-item-title v-text="title"></v-list-item-title>
            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
      </v-list-group>
       <!-- Contabilidad -->
       <v-list-group
        :value="false"
        prepend-icon="mdi-account-circle"
      >
        <template v-slot:activator>
          <v-list-item-title>Contabilidad</v-list-item-title>
        </template>
        <v-list-group
          :value="false"
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Administracion</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item v-for="subItem in menuListaContabilidad" :key="subItem.title" :to="subItem.path" no-action>
              <v-list-item-content>
                  <v-list-item-title  v-text="subItem.title"></v-list-item-title>
              </v-list-item-content>
          </v-list-item>
                
        </v-list-group>
        <v-list-group
          no-action
          sub-group
        >
        <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Transacciones</v-list-item-title>
            </v-list-item-content>
          </template>
              <v-list-item v-for="subItem in menuListaTransaccionesContabilidad" :key="subItem.title" :to="subItem.path" no-action>
              <v-list-item-content>
                  <v-list-item-title  v-text="subItem.title"></v-list-item-title>
              </v-list-item-content>
          </v-list-item>
          
            <v-list-item-title v-text="title"></v-list-item-title>
            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
         
        </v-list-group>

        <v-list-group
          no-action
          sub-group
        >
        <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Reportes</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="([title, icon], i) in cruds"
            :key="i"
            link
          >
            <v-list-item-title v-text="title"></v-list-item-title>
            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
      </v-list-group>

      <!-- Parametros Generales -->
       <v-list-group
        :value="false"
        prepend-icon="mdi-account-circle"
      >
        <template v-slot:activator>
          <v-list-item-title>Parametros Generales</v-list-item-title>
        </template>
        <v-list-group
          :value="false"
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Administracion</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item v-for="subItem in menuListaParametrosGenerales" :key="subItem.title" :to="subItem.path" no-action>
              <v-list-item-content>
                  <v-list-item-title  v-text="subItem.title"></v-list-item-title>
              </v-list-item-content>
          </v-list-item>
               
        </v-list-group>
        <v-list-group
          no-action
          sub-group
        >
        <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Transacciones</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="([title, icon], i) in cruds"
            :key="i"
            link
          >
            <v-list-item-title v-text="title"></v-list-item-title>
            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>

        <v-list-group
          no-action
          sub-group
        >
        <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Reportes</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="([title, icon], i) in cruds"
            :key="i"
            link
          >
            <v-list-item-title v-text="title"></v-list-item-title>
            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
      </v-list-group>

      <!-- Ctas por Cobrar -->
       <v-list-group
        :value="false"
        prepend-icon="mdi-account-circle"
      >
        <template v-slot:activator>
          <v-list-item-title>RRHH</v-list-item-title>
        </template>
        <v-list-group
          :value="false"
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Administracion</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item v-for="subItem in menuListaPlanillas" :key="subItem.title" :to="subItem.path" no-action>
              <v-list-item-content>
                  <v-list-item-title  v-text="subItem.title"></v-list-item-title>
              </v-list-item-content>
          </v-list-item>
               
        </v-list-group>
        <v-list-group
          no-action
          sub-group
        >
        <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Transacciones</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="([title, icon], i) in cruds"
            :key="i"
            link
          >
            <v-list-item-title v-text="title"></v-list-item-title>
            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>

        <v-list-group
          no-action
          sub-group
        >
        <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Reportes</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="([title, icon], i) in cruds"
            :key="i"
            link
          >
            <v-list-item-title v-text="title"></v-list-item-title>
            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
      </v-list-group>
    </v-list> 

<!-- >Tesoreria -->
       <v-list-group
        :value="false"
        prepend-icon="mdi-account-circle"
      >
        <template v-slot:activator>
          <v-list-item-title>Tesoreria</v-list-item-title>
        </template>
        <v-list-group
          :value="false"
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Administracion</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item v-for="subItem in menuListaParametros" :key="subItem.title" :to="subItem.path" no-action>
              <v-list-item-content>
                  <v-list-item-title  v-text="subItem.title"></v-list-item-title>
              </v-list-item-content>
          </v-list-item>
               
        </v-list-group>
        <v-list-group
          no-action
          sub-group
        >
        <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Transacciones</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="([title, icon], i) in cruds"
            :key="i"
            link
          >
            <v-list-item-title v-text="title"></v-list-item-title>
            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>

        <v-list-group
          no-action
          sub-group
        >
        <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Reportes</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="([title, icon], i) in cruds"
            :key="i"
            link
          >
            <v-list-item-title v-text="title"></v-list-item-title>
            <v-list-item-icon>
              <v-icon v-text="icon"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
      </v-list-group>
    </v-list>
    <v-list> 
      <v-list-item v-for="item in menuSalir" :key="item.title" @click="Logout()">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>            
        <v-list-item-content>
          <v-list-item-title style="font-size:1.2em">{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script src="./Menu.ts"></script>





        