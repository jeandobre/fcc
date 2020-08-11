<template>
	<div>
		<v-card class="mx-auto">
			<v-card-title class="title font-weight-regular justify-space-between">
				<span>{{ title }}</span>
				<v-chip class="ml-3">{{ formulario.status }}</v-chip>
				<v-spacer></v-spacer>
				<v-btn small class="error" @click="remover()">Excluir</v-btn>
				<v-btn small class="secundary ml-3" @click="alterar()">Alterar</v-btn>
				<v-btn small class="primary ml-3" @click="enviar()">Enviar</v-btn>
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
		</v-card>
	</div>
</template>

<script>
import { mapState } from "vuex";

export default {
	data: () => ({
		formulario: {
			custodiante: {}
		}
	}),

	computed: {
		...mapState(["formularios"]),

		title() {
			return "Gerenciar formulário";
		},
	},

	created() {
		const id = this.$route.params.id;

		console.log(this.formularios); 

		const formularios = [...this.formularios];

		const frm = formularios.find(frm => frm.id === id);

		if (!frm) {
			alert(`Formulário com id ${id} não encontrado!`);
		}

		this.formulario = frm; 
	},
};
</script>

<style>
	.label {
		font-weight: 700;
	}
</style>