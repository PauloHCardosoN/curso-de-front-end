//Adicionar animação no formulário de registro
addFormInputEvent = ()=>{
    //Variavels dos inputs e checkbox
    var inputs = document.querySelectorAll('form.register-form .input-single input');
        checkBox = document.querySelectorAll('form.register-form [type=checkbox]');

    //Adicionar eventos
    for(i = 0;i < inputs.length;i++){
        //Quando focar
        inputs[i].onfocus = function(){
            //Variavel do index
            var index;

            //Achar e definir index
            for(i = 0;i < inputs.length;i++){
                //Definir index
                if(inputs[i] == this){
                    index = i;
                };
            };

            //Marcar checkbox de acordo com o input
            checkBox[index].checked = true;
        };

        //Quando desfocar
        inputs[i].onblur = function(){
            for(var i = 0;i < inputs.length;i++){
                //Caso o input esteja vazio, restaure sua cor
                if(inputs[i].value == ''){
                    checkBox[i].checked = false;
                };
            };
        };
    };
};
addFormInputEvent();


//Adicionar rolagem no botão de voltar ao topo
addTopButtonScrollEvent = ()=>{
    //Variavel do botão
    var button = document.querySelector('.back-to-the-top');


    //Adicionar evento ao clicar no botão
    button.onclick = function(){
        scroll(0,0);
    }
}
addTopButtonScrollEvent();


//Adicionar verificação no formúlario
RegisterFormVerification = ()=>{
    //Configurando variavel dos inputs, do formulário e do caixa de erro
    var input = document.querySelectorAll('form.register-form .input-single input');
        form = document.querySelector('form.register-form');
        nameInput = input[0];
        emailInput = input[1];
        cellphoneInput = input[2];
        nodeBoxs = document.querySelectorAll('form.register-form errobox p');

    var cleave = new Cleave(cellphoneInput, {
        phone: true,
        phoneRegionCode: 'BR'
    });

    //Adicionar verificações
    addVerifications = ()=>{
        //Mostrar o erro
        showErroMessage = (erro,index)=>{
            //Definir erro
            nodeBoxs[index].textContent = erro;

            //Mostrar erro
            nodeBoxs[index].className = 'appearing';

            //Quando terminar a animação
            nodeBoxs[index].addEventListener('animationend',function(){
                this.className = 'moved';
                this.textContent = erro;
            });
        };

        //Esconder o erro
        hideErroMessage = (index)=>{
            //Classe é da animação de desaparecer
            nodeBoxs[index].setAttribute('class','disappearing');


            //Quando a animação acabar
            nodeBoxs[index].addEventListener('animationend',function(){
                this.className = "";
                this.textContent = "";
            });
        };

        //Conferir se o erro já existe
        showErroVerification = (erro,index)=>{
            //Se for diferente, esconda-o
            if(nodeBoxs[index].textContent != erro)
                showErroMessage(erro,index);
        }

        //Verificar se ele é vazio
        hideErroVerification = (index)=>{
            if(nodeBoxs[index].textContent != "")
                hideErroMessage(index);
        }

        //Adicionar vefiricação para o nome
        verifyName = ()=>{
            //Definir index e o erro
            var index = 0;
                erro = "O campo de nome é obrigatório";

            //Se não for vazio
            if(nameInput.value.length > 0){
                //Definir o erro que aparecerá
                erro = 'O nome precisa ter pelo menos 2 caracteres';


                //Se o nome tiver pelo menos 2 caracteres
                if(nameInput.value.length > 1){
                    hideErroVerification(index);
                    nameInput.accept = true;
                }else{
                    showErroVerification(erro,index);
                    nameInput.accept = false;
                }
            }else{
                showErroVerification(erro,index);
                nameInput.accept = false;
            }
        };

        //Adicionar vefiricação para o email
        verifyEmail = ()=>{
            //Definir index e o erro
            var index = 1;
            erro = "Preencha o campo do email";

            //Se for diferente de vazio
            if(emailInput.value.length > 0){
                erro = "Digite um email valido. Ex: exemplo@exem";
                if(emailInput.value.indexOf('@') != -1){
                    //Separe o email em um vetor
                    var splitedEmail = emailInput.value.split("@");
    
    
                    //Se os dois valores tiveres pelo mais de 1 caractere
                    if(splitedEmail[0].length > 1 && splitedEmail[1].length > 1){
                        hideErroVerification(index);
                        emailInput.accept = true;
                    }else{
                        showErroVerification(erro,index);
                        emailInput.accept = false;
                    }
                }else{
                    showErroVerification(erro,index);
                    emailInput.accept = false;
                }
            }else{
                emailInput.accept = false;
                showErroVerification(erro,index);
            }
        };

        //Adicionar vefiricação para o telefone
        verifyPhone = ()=>{
            //Definir index e o erro
            var index = 2;
            var erro;

            //Se não tiver 11 caracteres
            if(cellphoneInput.value < 11){
                erro = "Numero de telefone muito curto";
                showErroVerification(erro,index);
                cellphoneInput.accept = false;
            }else if(cellphoneInput.value > 11){
                erro = "Numero de telefone muito longo";
                showErroVerification(erro,index);
                cellphoneInput.accept = false;
            }else{
                cellphoneInput.accept = true;
                hideErroVerification(index);
            }
        };
    }
    
    addVerifications();

    //Quando o formulário for disparado
    form.onsubmit = function(){

        verifyName();
        verifyEmail();
        verifyPhone();


        //Verificar todos os valores
        for(var i = 0;i < input.length;i++){
            if(input[i].accept != 'true'){
                event.preventDefault();
            }else if(i == input.length - 1){
                //Requisição aqui
                alert('Deu tudo certo, seu email vai ter enviado');
            }
        }
    }
}
RegisterFormVerification();