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
			<v-snackbar v-model="mensagem.mostrar" 
				:color="mensagem.cor">

				{{ mensagem.texto }}
				
				<template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="mensagem.mostrar = false">
          Fechar
        </v-btn>
      </template>
			</v-snackbar>
		</v-app>
		
	</div>
</template>
<script>
import TopBar from "./components/TopBar";
import Content from "./components/Content";
import Menu from "./components/Menu";
import Footer from "./components/Footer";

import { mapMutations, mapState } from "vuex";

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
				link: "/fcc/novo",
			},
			{
				title: "Consultar QR-code",
				icon: "mdi-qrcode",
				link: "/fcc/listar",
			},
			{
				title: "Sobre",
				icon: "mdi-about",
				link: "/about",
			},
		],
  }),

	computed: {
		...mapState(["mensagem"])
	},

  methods: {
    ...mapMutations(["setUsuarioLogado", "setUsuarios", "setUnidades"])
  },
  
  created() {
    const usuarios = [{
      avatar: "https://avatars1.githubusercontent.com/u/15679617?s=460&u=5ba37f20de689c5b398ffab9c34afd6719a9459c&v=4",
      nome: "Jean A. Dobre",
      cpf: "00012345678",
      matricula: "123456",
      login: "jeandobre",
      senha: "123456",
      lotacao: "Dourados/MS",
			cargo: "Especialista",
			unidades: ["Perícia", "Cartório"]
    }, {
      avatar: "https://pickaface.net/gallery/avatar/sigitwibowo190852999f4e8a99e.png",
      nome: "Paulo A. Dobre",
      cpf: "00011122200",
      matricula: "151515",
      login: "paulodobre",
      senha: "123456",
      lotacao: "Ponta Porã/MS",
			cargo: "Escrivão",
			unidades: ["Delegacia"]
    }, {
			nome: "José de Alencar",
			avatar: "https://pickaface.net/gallery/avatar/unr_bobbu_200814_0926_2gl37wg.png",
      cpf: "89889898922",
      matricula: "012546",
      login: "josealencar",
      senha: "123456",
      lotacao: "Dourados/MS",
			cargo: "Períto",
			unidades: ["Delegacia", "Vara criminal"]
		}]
    this.setUsuarios(usuarios);
		this.setUsuarioLogado(usuarios[1]); 
		
		this.setUnidades(["Delegacia", "Cartório", "Perícia", "Custódia", "Vara criminal"])
  }
};
</script>
<style lang="scss">
</style>
