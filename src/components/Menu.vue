<template>
	<v-navigation-drawer 
      v-model="drawer"
      app clipped>
      <v-list dense>
        <v-list-item link v-for="item in items" v-bind:key="item.index" :to="item.link">
          <v-list-item-action >
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>        
      </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
	name: "Menu",
  props: ["items", "drawer"],
  model: {
    prop: "drawer",
    event: "input"
  }
}
</script>

<style>

</style>