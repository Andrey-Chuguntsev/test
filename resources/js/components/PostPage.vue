<template lang="html">
  <div class="post-page">
    <v-container>
      <h1>{{ post.name }}</h1>
      <h3>Категория: "{{ post.category_name }}"</h3>
      <v-divider></v-divider>
      <div class="">
        {{ post.text }}
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      getLoaded: 'getLoaded',
      getPosts: 'getPosts'
    })
  },
  created() {
    this.getLoaded.then(() => {
      let post = this.getPosts.find(p => p.id == this.$route.params.id);
      if (this.post){
        this.post = post;
      } else {
        this.$router.push('/');
      }
    });
  },
  data: () => ({
    post: {}
  })
}
</script>

<style lang="css">
</style>
