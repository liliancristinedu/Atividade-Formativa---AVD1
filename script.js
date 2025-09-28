const form = document.getElementById('form-endereco');
const cepInput = document.getElementById('cep');
const logradouroInput = document.getElementById('logradouro');
const numeroInput = document.getElementById('numero');
const ufInput = document.getElementById('uf');

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
    if (logradouroInput.value.trim().length < 5) {
        alert('Logradouro deve ter no mínimo 5 caracteres.');
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