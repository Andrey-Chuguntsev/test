<template lang="html">
  <v-app>
    <v-toolbar color="indigo" dark fixed app>
      <!-- <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon> -->
      <v-toolbar-title>Новости</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-select
        :items="getCats"
        v-model="categoryId"
        item-text="name"
        item-value="id"
        clearable
        label="Фильтр по категориям"
      >
      </v-select>
      <v-toolbar-items>
          <v-btn flat dark @click="handleBtnLoginClick">Вход</v-btn>
          <v-btn flat dark @click="handleBtnRegisterClick">Регистрация</v-btn>
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
import { mapGetters } from 'vuex';

export default {
  computed: {
    categoryId: {
      get() {
        return this.$store.state.categoryId;
      },
      set(value) {
        this.$store.commit('setCategoryId', value);
      }
    },
    ...mapGetters({
      getCats: 'getCats'
    })
  },
  methods: {
    handleBtnLoginClick() {
      window.location.href = '/login';
    },
    handleBtnRegisterClick() {
      window.location.href = '/register';
    }
  }
}
</script>

<style lang="css">
</style>
