<template>
	<div>
    <div v-if="$route.name === 'Login'">
      <router-view />  
    </div>
		<v-app v-else>
			<TopBar></TopBar>
			<Menu :items="menus" />
			<Content></Content>
			<Footer></Footer>
		</v-app>
		
	</div>
</template>
<script>
import TopBar from "./components/TopBar";
import Content from "./components/Content";
import Menu from "./components/Menu";
import Footer from "./components/Footer";

import { mapMutations } from "vuex";

export default {
	components: {
		TopBar,
		Content,
		Menu,
		Footer,
	},
	data: () => ({
		menus: [
			{
				title: "Home",
				icon: "mdi-home",
				link: "/",
			},
			{
				title: "Novo FCC",
				icon: "mdi-plus",
				link: "/novo-fcc",
			},
			{
				title: "Consultar QR-code",
				icon: "mdi-qrcode",
				link: "/consultar-fcc",
			},
			{
				title: "Sobre",
				icon: "mdi-about",
				link: "/about",
			},
		],
  }),

  methods: {
    ...mapMutations(["setUsuarioLogado", "setUsuarios", "setFormularios"])
  },
  
  created() {
    const usuarios = [{
      avatar: "https://avatars1.githubusercontent.com/u/15679617?s=460&u=5ba37f20de689c5b398ffab9c34afd6719a9459c&v=4",
      nome: "Jean Dobre",
      cpf: "00012345678",
      matricula: "123456",
      login: "jeandobre",
      senha: "123456",
      lotacao: "Dourados/MS",
      cargo: "Especialista"
    }, {
      avatar: "https://pps.whatsapp.net/v/t61.24694-24/117538057_646756359302375_1299727773366108578_n.jpg?oh=71f766caf6c28eafa0ac524b39322976&oe=5F349A8C",
      nome: "Paulo Dobre",
      cpf: "00011122200",
      matricula: "151515",
      login: "paulodobre",
      senha: "123456",
      lotacao: "Ponta Porã/MS",
      cargo: "Escrivão"
    }]
    this.setUsuarios(usuarios);
    this.setUsuarioLogado(usuarios[1]);
    this.setFormularios([]);
  }
};
</script>
<style lang="scss">
</style>
