//O a função "redirect(action, methods)" cria um form vazio para poder trocar de página.
function redirect(action, method){
    redirecionar = document.createElement("form");
    redirecionar.setAttribute('action', action);
    redirecionar.setAttribute('method', method);
    redirecionar = document.body.appendChild(redirecionar);
    redirecionar.submit();
}