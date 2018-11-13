<template lang="html">
  <div class="index-page">
    <v-container grid-list-md>
      <v-layout row wrap v-for="post in getFilteredPosts" :key="post.id">
        <v-flex xs10 offset-lg1>
          <v-card>
            <v-card-title primary-title>
              <h2>{{ post.name }}</h2>
              <div class="text-truncate">
                {{ post.text }}
              </div>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" flat :to="`/post/${post.id}`">Читать</v-btn>
            </v-card-actions>
          </v-card>
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
      getFilteredPosts: 'getFilteredPosts'
    })
  }
}
</script>

<style lang="css">
</style>
