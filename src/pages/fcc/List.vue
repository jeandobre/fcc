<template>
	<div>
		<v-card class="mx-auto">
			<v-card-title class="title font-weight-regular justify-space-between">
				<span>Fccs cadastrados</span>

				<v-spacer></v-spacer>
				
			</v-card-title>
			<v-data-table :headers="headers" 
				:items="formularios" 
				:items-per-page="50" 
				dense
				class="elevation-1">
				<template v-slot:item.actions="{ item }">
					<v-btn x-small icon 
						v-if="item.status === 'ENVIADO'"
						@click="verItem(item)">
						<v-icon small>
							mdi-arrow-bottom-left-thick
						</v-icon>
						Receber
					</v-btn>
					<v-btn x-small icon color="primary"
						v-else
						@click="verItem(item)">
						<v-icon small>
							mdi-arrow-top-right-thick
						</v-icon>
						Enviar
					</v-btn>
				</template>
			</v-data-table>
		</v-card>
	</div>
</template>

<script>
import { mapState } from "vuex";
export default {
	computed: {
		...mapState(["formularios"]),
		headers() {
			return [
				{
					text: "#",
					value: "id",
				},
				{
					text: "Lacre",
					value: "lacre",
				},
				{
					text: "Data/Hora",
					value: "dataHora",
				},
				{
					text: "status",
					value: "status",
				},
				{
					value: "actions"
				}
			];
		},
	},

	methods: {
		verItem( item ){
			this.$router.push({
				name: "EnviarFCC",
				params: {
					id: item.id
				}
			})
		}
	}
};
</script>

<style>
</style>