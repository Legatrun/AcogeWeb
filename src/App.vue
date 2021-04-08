<template>
  <v-app id="inspire" class='app-login'>
        <v-app-bar v-if="!$store.state.auth" class="primary" dark fixed clipped-left app height="100px">
          <img rounded src="/images/logo.png"/>
            <v-toolbar-title style="padding-left: 20px"><h1>ACOGE WEB</h1></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn text><h3>Quienes Somos</h3></v-btn>
                <v-btn text><h3>Nuestros Servicios</h3></v-btn>
                <v-btn text><h3>Nuestros Clientes</h3></v-btn>
                <v-btn text @click="Login()"><h3>Ingresar al Sistema</h3></v-btn>
            </v-toolbar-items>
        </v-app-bar>
        <v-navigation-drawer v-if="$store.state.auth" persistent clipped enable-resize-watcher expand-on-hover permanent app width="30%">
            <Menu></Menu>
        </v-navigation-drawer>
        <v-app-bar class="primary" v-if="$store.state.auth" dark fixed clipped-left app>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
            <v-toolbar-title style="padding-left: 20px"><h1>ACOGE WEB</h1></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn text ><h3>Cambiar Contraseña</h3></v-btn>
                <v-btn text @click="Logout()"><h3>Salir del Sistema</h3></v-btn>
            </v-toolbar-items>
        </v-app-bar>
        <main class="body-background">
            <v-content>
                <!-- <v-container grid-list-xl fluid style="width:'100%'  " > -->
                    <router-view></router-view>
            </v-content>
        </main>
        <v-footer class="primary" app fixed>
            <span class="white--text">Alpha Systems &copy; {{ new Date().getFullYear()}}</span>
            <v-spacer/>
            <span class="white--text">v{{version}}</span>
        </v-footer>
    </v-app>
</template>
<script src="./App.ts"></script>

<style>
    .bg {
        /* The image used */
        background-image: url("/images/background.jpg");
        /* Full height */
        height: 100%;
        /* Center and scale the image nicely */
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }
</style>