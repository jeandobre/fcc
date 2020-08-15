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
					text: "Data",
					value: "data",
				},
				{
					text: "status",
					value: "status",
				},
			];
		},
	},
};
</script>

<style>
</style>