<template>
	<div>
		<v-card class="mx-auto">
			<v-card-title class="title font-weight-regular justify-space-between">
				<span>{{ title }}</span>
				<v-chip class="ml-3">{{ formulario.status }}</v-chip>
				<v-spacer></v-spacer>
				<v-btn small class="error" v-if="formulario.status === 'CADASTRADO'" @click="remover()">Excluir</v-btn>
				<v-btn small class="secundary ml-3" v-if="formulario.status === 'CADASTRADO'" @click="alterar()">Alterar</v-btn>
				<v-btn small class="primary ml-3" v-if="formulario.status === 'CADASTRADO'" @click="abrir()">Enviar</v-btn>

				<v-btn small class="secundary" v-if="formulario.status === 'ENVIADO'" @click="imprimir()">Imprimir</v-btn>
			</v-card-title>

			<v-card class="ma-2">
				<v-card-title class="subtitle-1">Informações gerais do vestígio</v-card-title>
				<v-card-text>
					<v-row>
						<v-col>
							<span class="label">No do Lacre:</span>
							{{ formulario.lacre }}
						</v-col>
						<v-col class="col-3">
							<span class="label">Data / Hora:</span>
							{{ formulario.dataHora}}
						</v-col>

						<v-col>
							<span class="label">Registro de entrada:</span>
							{{ formulario.registro }}
						</v-col>
					</v-row>
					<v-row>
						<v-col>
							<span class="label">Unidade:</span>
							{{ formulario.unidade }}
						</v-col>
						<v-col class="col-2">
							<span class="label">Procedimento:</span>
							{{ formulario.procedimento }}
						</v-col>
						<v-col>
							<span class="label">Processo:</span>
							{{ formulario.processo }}
						</v-col>
					</v-row>
					<v-spacer></v-spacer>
					<v-row>
						<v-col>
							<span class="label">Endereço do local do crime (e/ou coordenadas):</span>
							{{ formulario.endereco }}
						</v-col>
						<v-col>
							<span class="label">Descrição do vestígio/vítima/suspeito:</span>
							{{ formulario.vestigio }}
						</v-col>

						<v-col>
							<span class="label">Localização do vestígio no local de crime/vítima/suspeito:</span>
							{{ formulario.localizacao }}
						</v-col>
					</v-row>
				</v-card-text>
			</v-card>
			<v-card class="ma-2">
				<v-card-title class="subtitle-1">Responsável pelo lacre (1º custodiante)</v-card-title>
				<v-card-text>
					<span class="label">Nome: {{ formulario.custodiante.nome }}</span>

					<span class="ml-10">Matricula: {{ formulario.custodiante.matricula }}</span>

					<span class="ml-10">Lotação: {{ formulario.custodiante.lotacao }}</span>

					<span class="ml-10">Cargo: {{ formulario.custodiante.cargo }}</span>
				</v-card-text>
			</v-card>

			<v-card class="ma-2" v-if="formulario.cadeia.length > 0">
				<v-card-title class="subtitle-1">Cadeia de custódia</v-card-title>
				<v-card-text>
					<v-data-table dense
						:headers="headers" 
						:items="formulario.cadeia">

					</v-data-table>
				</v-card-text>
			</v-card>
		</v-card>

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
		dialog: false,
		items: ["Delegacia", "Cartório", "Perícia", "Custódia", "Vara criminal"],
		motivo: "",
		unidade: "",
		datahora: "",
		headers: [{
			text: "#",
			value: "numero"
		},{
			text: "Recebido de:",
			value: "pessoa"
		}, {
			text: "Data/Hora",
			value: "dataHora"
		}, {
			text: "Matrícula/Lotação",
			value: "matricula"
		}, {
			text: "Razão da movimentação",
			value: "razao"
		}]
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

		abrir() {
			this.dialog = true;
		},

		enviar() {

			const numero = this.formulario.cadeia.length + 1;
			this.formulario.cadeia.push({
				numero,
				pessoa: this.usuarioLogado.nome,
				dataHora: this.dataHora,
				matricula: this.usuarioLogado.matricula,
				lotacao: this.usuarioLogado.lotacao,
				unidade: this.unidade,
				razao: this.motivo
			});

			this.formulario.status = "ENVIADO";
			
			this.dialog = false;

		}
	}
};
</script>

<style>
	.label {
		font-weight: 700;
	}
</style>