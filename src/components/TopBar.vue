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
		<v-menu offset-y :v-model="menu" :close-on-click="false" :nudge-width="200" class="menu">
			<template v-slot:activator="{ on }">
				<span class="ml-3" v-on="on">
					<div class="login">{{ usuarioLogado.login }}</div>
					<div class="matricula">{{ usuarioLogado.matricula }}</div>
				</span>
			</template>
			<v-card class="mx-auto" max-width="344" outlined>
				<v-list-item three-line>
					<v-list-item-content>
						<div class="overline mb-4">{{ usuarioLogado.cargo }}</div>
						<v-list-item-title class="headline mb-1">{{ usuarioLogado.nome }}</v-list-item-title>
						<v-list-item-subtitle>
							{{ usuarioLogado.lotacao }}
							<v-btn icon color="secundary">
								<v-icon>mdi-autorenew</v-icon>
							</v-btn>
						</v-list-item-subtitle>
					</v-list-item-content>

					<v-list-item-avatar tile size="100" color="grey">
						<v-img :src="usuarioLogado.avatar" alt="Avatar"></v-img>
					</v-list-item-avatar>
				</v-list-item>

				<v-card-actions>
					<v-btn text color="lime darken-3">
						<v-icon>mdi-key-change</v-icon>Alterar senha
					</v-btn>
					<v-btn text color="blue-grey darken-3" to="/login">
						<v-icon>mdi-door-closed</v-icon>Logout
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-menu>
	</v-app-bar>
</template>

<script>
import { mapState } from "vuex";

export default {
	name: "TopBar",

	computed: {
		...mapState(["usuarioLogado"]),
	},
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

.menu {
	cursor: pointer;
}
</style>