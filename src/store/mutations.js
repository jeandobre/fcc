import { set } from "./utils";

export default {

	setUsuarios: set("usuarios"),
	setUsuarioLogado: set("usuarioLogado"),
	setMensagem: set("mensagem"),
	addFormulario(state, formulario) {
		state.formularios.push(formulario);
	},
	setUnidades: set("unidades")
};