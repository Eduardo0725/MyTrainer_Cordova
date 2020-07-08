//A classe "Redirect" cria um form vazio para poder trocar de página.
class Redirect
{
    redirect;
    constructor(){
        this.redirect = document.createElement("form");
    }
    submit(action, method = 'GET'){
        this.redirect.setAttribute('action', action);
        this.redirect.setAttribute('method', method);
        this.redirect = document.body.appendChild(this.redirect);
        this.redirect.submit();
    }
}
