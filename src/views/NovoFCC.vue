<template>
	<div>
		<v-card class="mx-auto">
			<v-card-title class="title font-weight-regular justify-space-between">
				<span>{{ title }}</span>

				<v-btn small class="success" @click="salvar()">Salvar</v-btn>
			</v-card-title>

			<v-card class="ma-2">
				<v-card-title class="subtitle-1">Informações gerais do vestígio</v-card-title>
				<v-card-text>
					<v-row>
						<v-col>
							<v-text-field label="Nº do lacre:" v-model="lacre.valor" :rules="lacre.regras"></v-text-field>
						</v-col>
						<v-col class="col-2">
							<v-menu
								v-model="menu2"
								:close-on-content-click="false"
								:nudge-right="40"
								transition="scale-transition"
								offset-y
								min-width="290px"
							>
								<template v-slot:activator="{ on, attrs }">
									<v-text-field
										v-model="dataFormatada"
										label="Data da coleta"
										prepend-icon="mdi-calendar"
										@blur="date = parseDate(dataFormatada)"
										readonly
										v-bind="attrs"
										v-on="on"
									></v-text-field>
								</template>
								<v-date-picker locale="pt-br" v-model="date" @input="menu2 = false"></v-date-picker>
							</v-menu>
						</v-col>

						<v-col class="col-2">
							<v-text-field v-model="hora" label="Hora da coleta" prepend-icon="mdi-timer"></v-text-field>
						</v-col>

						<v-col>
							<v-text-field label="Registro de entrada:" v-model="registro"></v-text-field>
						</v-col>
					</v-row>
					<v-row>
						<v-col>
							<v-select :items="unidades" label="Unidade" v-model="unidade"></v-select>
						</v-col>
						<v-col class="col-2">
							<v-select :items="procedimentos" label="Procedimento:" v-model="procedimento"></v-select>
						</v-col>
						<v-col>
							<v-text-field v-model="procedimentoNumero"></v-text-field>
						</v-col>
						<v-col>
							<v-text-field label="Processo nº:" v-model="processo"></v-text-field>
						</v-col>
					</v-row>
					<v-spacer></v-spacer>
					<v-row>
						<v-col>
							<v-textarea
								label="Endereço do local do crime (e/ou coordenadas)"
								v-model="endereco"
								hint="Cep, Rua, Número, Bairro, etc."
								persistent-hint
								no-resize
							></v-textarea>
						</v-col>
						<v-col>
							<v-textarea label="Descrição do vestígio/vítima/suspeito:" v-model="vestigio" no-resize></v-textarea>
						</v-col>

						<v-col>
							<v-textarea
								label="Localização do vestígio no local de crime/vítima/suspeito:"
								v-model="localizacao"
								no-resize
							></v-textarea>
						</v-col>
					</v-row>
				</v-card-text>
			</v-card>
			<v-card class="ma-2">
				<v-card-title class="subtitle-1">Responsável pelo lacre (1º custodiante)</v-card-title>
				<v-card-text>
					<span>Nome: {{ usuarioLogado.nome }}</span>

					<span class="ml-10">Matricula: {{ usuarioLogado.matricula }}</span>

					<span class="ml-10">Lotação: {{ usuarioLogado.lotacao }}</span>

					<span class="ml-10">Cargo: {{ usuarioLogado.cargo }}</span>
				</v-card-text>
			</v-card>
		</v-card>
	</div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
	data: () => ({
		title: "Novo formulário de cadeia de custódia",
		menu2: false,
		menu1: false,
		hora: null,
		date: null,
		dataFormatada: "",
		unidades: [
			"Unidade Regional de Perícia de Ponta Pora",
			" Segunda delegacia de polícia de ponta pora",
		],
		lacre: {
			valor: "",
			regras: [
				(value) => !!value || "Campo obrigatório!",
				(value) => (value || "").length <= 20 || "Máx. 20 caracteres",
			],
		},
		registro: "",
		unidade: "",
		procedimento: "",
		procedimentoNumero: "",
		processo: "",
		endereco: null,
		vestigio: null,
		localizacao: null,
		procedimentos: ["BO", "TCO", "IP", "IPM", "AAAI"],
	}),

	methods: {
		...mapMutations(["setFormularios", "setMensagem"]),

		parseDate(date) {
			if (!date) return null;

			const [day, month, year] = date.split("/");
			return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
		},

		formatDate (date) {
			if (!date) return null

			const [year, month, day] = date.split('-')
			return `${day}/${month}/${year}`
    },

		salvar() {
			if (!this.lacre.valor) {
				this.setMensagem({
					cor: "error",
					texto: "O campo número do lacre é obrigatório!",
					mostrar: true,
				});

				return;
			}

			//todo gerar id randomicamente
			const id = Math.floor(Math.random() * 10000 + 1);

			const formularios = [];
			formularios.push({
				id,
				lacre: this.lacre.valor,
				dataHora: this.dataFormatada + " " + this.hora,
				registro: this.registro,
				unidade: this.unidade,
				procedimento: this.procedimento + " - " + this.procedimentoNumero,
				processo: this.processo,
				endereco: this.endereco,
				vestigio: this.vestigio,
				localizacao: this.localizacao,
				status: "CADASTRADO",
				custodiante: this.usuarioLogado,
				cadeia: []
			});

			this.setFormularios(formularios);

			this.$router.push({
				name: "EnviarFCC",
				params: {
					id,
				},
			});
		},
	},

	computed: {
		...mapState(["usuarioLogado", "formularios"]),
	},

	created() {
		this.data = new Date().toISOString().substr(1,10);
		this.dataFormatada = this.formatDate(new Date().toISOString().substr(0, 10));

		const d =  new Date();
		let min = d.getMinutes();
		if (min < 10)
			min = "0" + min;

		this.hora = `${d.getHours()}:${min}`;
	},

	watch: {
		date (val) {
			this.dataFormatada = this.formatDate(val)
		},
	},
};
</script>

<style>
</style>