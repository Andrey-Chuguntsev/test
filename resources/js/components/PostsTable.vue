<template lang="html">
  <div class="news-table">
    <v-container>
      <v-btn fab right absolute color="primary" @click="handleBtnAddPostClick">
        <v-icon>add</v-icon>
      </v-btn>
      <v-layout row wrap>
        <v-flex>
          <v-data-table
            :headers="headers"
            :items="getPosts"
            class="elevation-1"
            item-key="id"
            disable-initial-sort
          >
            <template slot="items" slot-scope="{ item }">
              <td>{{ item.id }}</td>
              <td>{{ item.category_name }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.text }}</td>
              <td>
                <v-btn small color="primary" @click="handleBtnEditClick(item)">Изменить</v-btn>
                <v-btn small color="red" @click="handleBtnDeleteClick(item)">Удалить</v-btn>
              </td>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      getPosts:   'getPosts'
    })
  },
  data: () => ({
    headers: [
      { text: '#', value: 'id', width: '50px' },
      { text: 'Категория', value: 'category_name', width: '100px' },
      { text: 'Наименование', value: 'name', width: '200px' },
      { text: 'Текст', value: 'text' },
      { text: 'Действия', value: 'name', width: '270px' },
    ]
  }),
  methods: {
    handleBtnAddPostClick() {
      this.$router.push('/manager/post');
    },
    handleBtnDeleteClick(item) {
      if (confirm(`Вы действительно желаете удалить статью "${item.name}"`)) {
        this.$store.dispatch('DELETE_POST', item.id);
      }
    },
    handleBtnEditClick(item) {
      this.$router.push(`/manager/post/${item.id}`);
    }
  }
}
</script>

<style lang="css">
</style>
