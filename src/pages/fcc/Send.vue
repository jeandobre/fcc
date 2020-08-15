<template>
	<div>
	
		<v-dialog v-model="dialog" width="600">
			<v-card dense>
        <v-card-title class="headline">
					Confirmar envio
        </v-card-title>

        <v-card-text>
					<div>
						<b>Data/hora atual:</b> {{ dataHora }}
						</div>
					<div>
						<b>Responsável:</b>
						{{ usuarioLogado.nome }}
					</div>
					<div>
						<b>Matrícula/Lotação:</b>
						{{ usuarioLogado.matricula }} / {{ usuarioLogado.lotacao }}
					</div>
					<v-select :items="items" label="Selecione a unidade para enviar:" v-model="unidade"> 						
					</v-select>

					<v-text-field label="Razão da movimentação:" v-model="motivo"></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
					<v-btn
            color="error"
            text
            @click="dialog = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="enviar()"
          >
            Enviar
          </v-btn>
        </v-card-actions>
      </v-card>
		</v-dialog>

	</div>
</template>

<script>
import { mapState } from "vuex";

export default {
	data: () => ({
		formulario: {
			custodiante: {}
		},
		dialog: true,
		items: ["Delegacia", "Cartório", "Perícia", "Custódia", "Vara criminal"],
		motivo: "",
		unidade: "",
		datahora: "",		
	}),

	computed: {
		...mapState(["formularios", "usuarioLogado"]),

		title() {
			return "Gerenciar formulário";
		}
	},

	created() {
		const id = this.$route.params.id;

		const formularios = [...this.formularios];

		const frm = formularios.find(frm => frm.id === id);

		if (!frm) {
			alert(`Formulário com id ${id} não encontrado!`);
		}

		const data = new Date().toISOString().substr(0,10);
		const [year, month, day] = data.split("-");
		const hora =  new Date();
		let min = hora.getMinutes();
		if (min < 10)
			min = "0" + min;

		this.dataHora = `${day}/${month}/${year} ${hora.getHours()}:${min}`;

		this.formulario = frm; 
	},

	methods: {

		enviar() {

			const numero = this.formulario.cadeia.length + 1;
			this.formulario.cadeia.push({
				numero,
				pessoa: this.usuarioLogado.nome,
				dataHora: this.dataHora,
				matricula: this.usuarioLogado.matricula,
				lotacao: this.usuarioLogado.lotacao,
				unidade: this.unidade,
				razao: this.motivo,
				enviado: true,
				recebido: false
			});

			this.formulario.status = "ENVIADO";
			
			this.dialog = false;

			this.setMensagem({
				mostrar: true,
				cor: "success",
				texto: `FCC ${numero} enviado com sucesso!`
			});
		}
	}
};
</script>

<style>
	.label {
		font-weight: 700;
	}
</style>