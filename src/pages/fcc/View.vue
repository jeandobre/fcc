<template>
	<div>
		<v-card class="mx-auto">
			<v-card-title class="title font-weight-regular justify-space-between">
				<span>{{ title }}</span>
				<v-chip class="ml-3">{{ formulario.status }}</v-chip>
				
				<v-spacer></v-spacer>
				<v-btn small class="error" v-if="formulario.status === 'CADASTRADO'" @click="remover()">Excluir</v-btn>
				<v-btn small class="secundary ml-3" v-if="formulario.status === 'CADASTRADO'" @click="alterar()">Alterar</v-btn>
				<v-btn small class="primary ml-3" 
					v-if="formulario.status === 'CADASTRADO'" 
					@click="enviar()">
					<v-icon small>
						mdi-arrow-top-right-thick
					</v-icon>
					Enviar
				</v-btn>

				<v-btn small class="secundary" v-if="formulario.status !== 'CADASTRADO'" @click="imprimir()">
					<v-icon>
						mdi-printer
					</v-icon>
				</v-btn>
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
						<template v-slot:item.icons="{ item }">
							<v-icon v-if="item.enviado">
								mdi-arrow-top-right-thick
							</v-icon>
						</template>
					</v-data-table>
				</v-card-text>
			</v-card>
		</v-card>

		<div style="position: absolute; visibility: hidden;" class="qrcode" ref="qrCodeUrl">
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
import jsPDF from "jspdf";
import QRCode from "qrcodejs2";

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
		}, {
			value: "icons",
			width: 40
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

		this.formulario = frm; 
	},

	methods: {

		enviar() {
			this.$router.push({
				name: "EnviarFCC",
				params: {
					id: this.formulario.id
				}
			})
		},

		async imprimir() {
			const pdfName = "formulario_" + this.formulario.id;
			var doc = new jsPDF('', 'pt', 'a4');
			const dataURL = await this.gerarQRCode();
			doc.addImage(dataURL, 'JPEG', 10, 10, 50, 50);
			doc.text("FORMULÁRIO DE CADEIA DE CUSTÓDIA - FCC", 100, 40);
			doc.save(pdfName + ".pdf");
		},

		gerarQRCode() {
			const canvas = document.createElement("div");
			canvas.id = "id";
			this.$refs.qrCodeUrl.append(canvas);
			
			const text = `https://fcc-keep.herokuapp.com/fcc/ver/${this.formulario.id}`
			new QRCode("id", {
				text,
				width: 128,
				height: 128,
				colorDark: "#000000",
				colorLight: "#ffffff",
				correctLevel: QRCode.CorrectLevel.H
			});
			let div = document.getElementById("id").querySelector("canvas");
			return div.toDataURL();      
		}
	}
};
</script>

<style>
	.label {
		font-weight: 700;
	}
</style>