<template>
	<v-app-bar app clipped-left color="deep-purple accent-4" dense dark>
		<v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
		<span class="title ml-3 mr-15">
			FCC&nbsp;
			<span class="font-weight-light">Keep</span>
		</span>

		<v-text-field
			solo-inverted
			flat
			hide-details
			label="Procurar fcc por número"
			prepend-inner-icon="mdi-magnify"
			dense
			class="ml-11"
		></v-text-field>

		<v-spacer></v-spacer>

		<v-avatar size="32px" item>
			<v-img :src="usuarioLogado.avatar" alt="Avatar"></v-img>
		</v-avatar>

    <span class="ml-3">
      <div class="login">{{ usuarioLogado.nome }}</div>
      <div class="matricula">{{ usuarioLogado.matricula }}</div>
    </span>
	</v-app-bar>
</template>

<script>

import { mapState } from "vuex";

export default {
  name: "TopBar",
  
  computed: {
    ...mapState(["usuarioLogado"])
  }
};
</script>

<style>
  .search {
    margin: 2px;
  }

  .login {
    font-size: 0.9rem;
  }

  .matricula {
    font-size: 0.725rem;
    font-weight: 500;
  }

</style>