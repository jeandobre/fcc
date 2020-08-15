<template>
  <v-main>
    <v-container fluid>
      <router-view/>
      <router-view name="modal"/>
    </v-container>    
  </v-main>
</template>

<script>
  export default {
    name: 'Content',

    data: () => ({
      
    }),
  }
</script>
