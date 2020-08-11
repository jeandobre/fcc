<template>
	<v-app id="inspire">
    <v-main>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Login FCC</v-toolbar-title>               
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Identificação"
                    name="login"
                    prepend-icon="mdi-account"
										persistent-hint
										hint="Nome do usuário, matrícula ou CPF"
                    type="text"
										v-model="identificacao"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Senha"
                    name="password"
                    prepend-icon="mdi-lock"
										v-model="senha"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn small color="primary" @click="login()">Entrar</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {

	data: () => ({
		identificacao: "",
		senha: ""
	}),

	computed: {
		...mapState(["usuarios"])
	},

	methods: {
		...mapMutations(["setUsuarioLogado"]),

		login() {

			if(!this.identificacao) {
				alert("A identificação do usuário precisa ser preenchida!");
			}

			if(!this.senha) {
				alert("A senha do usuário precisa ser preenchida!")
			}

			const usuarioEncontrado = this.usuarios.find(usuario => 
				((usuario.cpf === this.identificacao || usuario.login === this.identificacao
					|| usuario.matricula === this.identificacao) && usuario.senha === this.senha));

			if(usuarioEncontrado) {
				this.setUsuarioLogado(usuarioEncontrado);
				this.$router.push({ name: "Home" })
			} else {
				alert("Usuário ou senha inválido!")
			}
		}
	}

}
</script>

<style>

</style>