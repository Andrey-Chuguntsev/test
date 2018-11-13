<template>
  <v-app>
    <v-toolbar color="indigo" dark fixed app>
      <!-- <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon> -->
      <v-toolbar-title>Мои новости</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
          <v-btn to="/manager/categories" flat dark>Категории</v-btn>
          <v-btn to="/manager" flat dark>Статьи</v-btn>
          <v-btn flat dark @click="handleBtnLogoutClick">Выход</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    methods: {
      handleBtnLogoutClick() {
        axios.post('/logout').then(() => {
          window.location.reload();
        });
      }
    }
  }
</script>
