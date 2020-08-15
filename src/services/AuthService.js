import jwt from "jsonwebtoken";

const VAR_STORAGE = "Authorization";

const authService = {
	
	VAR_STORAGE,
	
	getId(){
		let token = localStorage.getItem(VAR_STORAGE);
		if (token){
			let decoded = jwt.decode(token);
			return decoded.id;
		}else{
			return null;
		}
	},

	getUsuario(){
		let token = localStorage.getItem(VAR_STORAGE);
		if (token){
			let decoded = jwt.decode(token);
			return {
				id: decoded.id,
				login: decoded.login,
				nome: decoded.nome,
			};
		} else {
			return null;
		}	
	},

	logout(){
		localStorage.removeItem(VAR_STORAGE);
		window.location = "/login";
	},

	isAuthenticated(){
		return (localStorage.getItem(VAR_STORAGE) !== null);
	},
};

export default authService;