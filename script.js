const form = document.getElementById('form-endereco');
const cepInput = document.getElementById('cep');
const logradouroInput = document.getElementById('logradouro');
const numeroInput = document.getElementById('numero');
const ufInput = document.getElementById('uf');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const cepRegex = /^\d{5}-\d{3}$/;
    if (!cepRegex.test(cepInput.value)) {
        alert('CEP inválido. O formato deve ser 00000-000.');
        return;
    }

    if (logradouroInput.value.trim().length < 5) {
        alert('Logradouro é obrigatório e deve ter no mínimo 5 caracteres.');
        return;
    }

    const numeroRegex = /^\d+$/;
    if (!numeroRegex.test(numeroInput.value)) {
        alert('O campo Número é obrigatório e deve conter apenas dígitos.');
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

