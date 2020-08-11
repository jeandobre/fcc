<template>
	<div>
		<v-data-table :headers="headers" :items="desserts" :items-per-page="5" class="elevation-1"></v-data-table>
	</div>
</template>

<script>
import { mapState } from "vuex";
export default {

	computed: {
		...mapState(["formularios"]),
		headers() {
			return [{
				text: "#",
				value: "id"
			}, {
				text: "Lacre",
				value: "lacre"
			}, {
				
			}]
		}
	}

};
</script>

<style>
</style>