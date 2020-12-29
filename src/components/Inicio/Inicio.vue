<template>
  <div>
    <v-carousel cycle hide-delimiters class="green dark">
      <v-carousel-item v-for="(item,i) in lstitems" :src="item.src" :key="i"></v-carousel-item>
    </v-carousel>
    <v-card height="100%" flat>
      <v-card-title primary-title>
      </v-card-title>
    </v-card>
  </div>
</template>

<script src="./Inicio.ts"></script>