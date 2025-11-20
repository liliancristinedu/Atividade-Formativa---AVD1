const form = document.getElementById('form-endereco');
const cepInput = document.getElementById('cep');
const logradouroInput = document.getElementById('logradouro');
const bairroInput = document.getElementById('bairro');
const cidadeInput = document.getElementById('cidade');
const ufInput = document.getElementById('uf');
const numeroInput = document.getElementById('numero');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (cepInput.value.trim() === '') {
        alert('O campo do CEP é obrigatório.');
        return;
    }
    const cepRegex = /^\d{5}-\d{3}$/;
    if (!cepRegex.test(cepInput.value)) {
        alert('CEP inválido. O formato deve ser 00000-000.');
        return; 
    }

    if (logradouroInput.value.trim() === '') {
        alert('O campo Logradouro é obrigatório.');
        return;
    }
    if (logradouroInput.value.trim().length < 3) {
        alert('Logradouro deve ter no mínimo 3 caracteres.');
        return; 
    }

    if (numeroInput.value.trim() === '') {
        alert('O campo Número é obrigatório.');
        return; 
    }
    const numeroRegex = /^\d+$/;
    if (!numeroRegex.test(numeroInput.value)) {
        alert('O campo Número deve conter apenas dígitos.');
        return; 
    }

    if (ufInput.value.trim() === '') {
        alert('O campo UF é obrigatório.');
        return; 
    }
    const ufRegex = /^[A-Z]{2}$/;
    if (!ufRegex.test(ufInput.value)) {
        alert('UF inválida. Deve conter exatamente 2 letras maiúsculas.');
        return; 
    }

    alert('Endereço cadastrado com sucesso');
    
    form.reset();
});

cepInput.addEventListener('input', (event) => {
    let value = event.target.value.replace(/\D/g, '');

    value = value.replace(/^(\d{5})(\d+)/, '$1-$2');

    event.target.value = value;
});

ufInput.addEventListener('input', (event) => {
    event.target.value = event.target.value.toUpperCase();
});

cepInput.addEventListener('blur', async () => {
    const cep = cepInput.value.replace(/\D/g, '');

    if (cep.length === 8) {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            
            if (!response.ok) {
                throw new Error('Erro na conexão com a API');
            }

            const data = await response.json();

            if (data.erro) {
                alert('CEP não encontrado na base de dados.');
                limparCamposEndereco();
                return;
            }

            logradouroInput.value = data.logradouro;
            bairroInput.value = data.bairro;
            cidadeInput.value = data.localidade;
            ufInput.value = data.uf;

            numeroInput.focus();
        }

        catch (error) {
            console.error('Erro:', error);
            alert('Não foi possível buscar o endereço. Verifique sua conexão.');
        }
    }   else if (cepInput.value !== '') {
        alert('Formato de CEP inválido.');
    }
});

