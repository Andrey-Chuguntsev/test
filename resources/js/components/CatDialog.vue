<template lang="html">
  <div class="cat-dialog">
    <v-dialog
      v-model="visible"
      persistent
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title primary-title>
          {{ dialogTitle }}
        </v-card-title>

        <v-card-text>
          <v-text-field
            label="Наименование категории"
            v-model="cat.name"
            :error-messages="errors.name"
          >
          </v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-if="cat.id" color="primary" @click="handleBtnSaveClick">Сохранить</v-btn>
          <v-btn v-else color="primary" @click="handleBtnCreateClick">Создать</v-btn>
          <v-btn @click="visible = false">Отмена</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  computed: {
    dialogTitle() {
      return this.cat.id? 'Редактирование категории': 'Создание категории';
    }
  },
  data: () => ({
    cat:     {},
    errors:  {},
    visible: false
  }),
  methods: {
    handleBtnCreateClick() {
      this.$store.dispatch('CREATE_CATEGORY', this.cat).then((cat) => {
        this.$emit('category-created', cat);
        this.visible = false;
      }).catch(errors => {
        this.errors = errors;
      })
    },
    handleBtnSaveClick() {
      this.$store.dispatch('UPDATE_CATEGORY', this.cat).then((cat) => {
        this.$emit('category-updated', cat);
        this.visible = false;
      }).catch(errors => {
        this.errors = errors;
      });
    },
    open(cat) {
      this.cat = cat? _.cloneDeep(cat): {};

      this.visible = true;
    }
  }
}
</script>

<style lang="css">
</style>
