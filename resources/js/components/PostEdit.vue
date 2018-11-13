<template lang="html">
  <div class="post-dialog">
    <v-container grid-list-lg>
      <v-layout row wrap>
        <v-flex lg4>
          <v-select
            :items="getCats"
            label="Категория"
            item-text="name"
            item-value="id"
            clearable
            :error-messages="errors.category_id"
            v-model="post.category_id"
          >
          </v-select>
        </v-flex>
        </v-flex>
        <v-flex lg8>
          <v-text-field
            label="Наименование статьи"
            v-model="post.name"
            :error-messages="errors.name"
          >
          </v-text-field>
        </v-flex>
      </v-layout>
      <v-textarea
        label="Текст статьи"
        v-model="post.text"
        hint="Hint text"
        clearable
        no-resize
        rows="20"
        :error-messages="errors.text"
      >
      </v-textarea>
      <v-layout row wrap>
        <v-spacer></v-spacer>
        <v-btn v-if="post.id" color="primary" @click="handleBtnSaveClick">Сохранить</v-btn>
        <v-btn v-else color="primary" @click="handleBtnCreatedClick">Создать</v-btn>
        <v-btn @click="$router.push('/manager')">Отменить</v-btn>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      getCats:   'getCats',
      getLoaded: 'getLoaded',
      getPosts:  'getPosts'
    })
  },
  created() {
    let id = this.$route.params.id;
    if (id) {
      this.getLoaded.then(() => {
        this.post = _.cloneDeep(this.getPosts.find(p => p.id == id));
      });
    }
  },
  data: () => ({
    errors: {},
    post:   {}
  }),
  methods: {
    handleBtnCreatedClick() {
      this.$store.dispatch('CREATE_POST', this.post).then((post) => {
        this.$router.push('/manager');
      }).catch(errors => {
        this.errors = errors;
      });
    },
    handleBtnSaveClick() {
      this.$store.dispatch('UPDATE_POST', this.post).then((post) => {
        this.$router.push('/manager');
      }).catch(errors => {
        this.errors = errors;
      });
    }
  }
}
</script>

<style lang="css">
</style>
