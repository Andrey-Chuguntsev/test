<template lang="html">
  <div class="cats-table">
    <v-container>
      <v-btn fab right absolute color="primary" @click="handleBtnAddCatClick">
        <v-icon>add</v-icon>
      </v-btn>
      <v-data-table
        :headers="headers"
        :items="getCats"
        class="elevation-1"
        item-key="id"
        loading="getCatsLoadind"
      >
        <template slot="items" slot-scope="{ item }">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>
            <v-btn small color="primary" @click="handleBtnEditClick(item)">Изменить</v-btn>
            <v-btn small color="red" @click="handleBtnDeleteClick(item)">Удалить</v-btn>
          </td>
        </template>
      </v-data-table>
    </v-container>
    <cat-dialog ref="refCatDialog"></cat-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CatDialog from './CatDialog';

export default {
  components: {
    CatDialog
  },
  computed: {
    ...mapGetters({
      getCats:        'getCats',
      getCatsLoadind: 'getCatsLoadind'
    })
  },
  data: () => ({
    headers: [
      { text: '#', value: 'id', width: '50px' },
      { text: 'Наименование категории', value: 'name' },
      { text: 'Действия', value: 'name', width: '270px' }
    ]
  }),
  methods: {
    handleBtnAddCatClick() {
      this.$refs.refCatDialog.open();
    },
    handleBtnEditClick(item) {
      this.$refs.refCatDialog.open(item);
    },
    handleBtnDeleteClick(item) {
      if (confirm(`Вы действительно желаете удалить сатегорию "${item.name}"`)) {
        this.$store.dispatch('DELETE_CATEGORY', item.id);
      }
    }
  }
}
</script>

<style lang="css">
</style>
