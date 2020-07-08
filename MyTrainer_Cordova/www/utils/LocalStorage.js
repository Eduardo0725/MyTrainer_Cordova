class LocalStorage {
    id;
    tipo;
    email;

    constructor(){
        this.id = localStorage.getItem("usuario_id");
        this.tipo = localStorage.getItem("usuario_tipo");
        this.email = localStorage.getItem("usuario_email");
    }

    checkUser() {
        // verifica se o usuário já foi logado antes.
        if (this.id && this.email && this.tipo)
            return {
                id: this.id, 
                email: this.email, 
                tipo: this.tipo
            };

        return false;
    }

    addUser(id, email, tipo) {
        try {
            localStorage.setItem("usuario_id", id);
            localStorage.setItem("usuario_email", email);
            localStorage.setItem("usuario_tipo", tipo);

            this.id = localStorage.getItem("usuario_id");
            this.email = localStorage.getItem("usuario_email");
            this.tipo = localStorage.getItem("usuario_tipo");

            if(!this.id || !this.email || !this.tipo){
                this.removeUser();
                throw new Error('');
            }

            return true
        } catch (e) {
            return false;
        }
    }

    removeUser() {
        try {
            if(this.checkUser()){
                localStorage.removeItem("usuario_id");
                localStorage.removeItem("usuario_email");
                localStorage.removeItem("usuario_tipo");
                
                this.id = false;
                this.email = false;
                this.tipo = false;
                
                return true
            }
            return false;
        } catch (e) {
            return false;
        }
    }
}
