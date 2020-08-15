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
					<v-btn x-small class="mr-5"						
						@click="verItem(item)">
						<v-icon small>
							mdi-text-box-search-outline
						</v-icon>						
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
					width: 50
				},
				{
					text: "status",
					value: "status",
					width: 80
				},
				{
					text: "Lacre",
					value: "lacre",
					width: 120
				},
				{
					text: "Local",
					value: "localAtual"
				},
				{
					text: "Data/Hora",
					value: "dataHora",
					width: 150
				},				
				{
					value: "actions",
					width: 40
				}
			];
		},
	},

	methods: {
		verItem( item ){
			this.$router.push({
				name: "VerFCC",
				params: {
					id: item.id
				}
			})
		},
		enviarItem( item ){
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