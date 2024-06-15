const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
app.use(express.json());
const observacoesPorLembreteId = {};

app.post('/lembretes/:id/observacoes', (req,res) => {
// Gerar um novo identificador para a observação a ser inserida.
    const idObs = uuidv4();
//  Extrair, do corpo da requisição, o texto da observação.
    const { texto } = req.body;
// Verificar se o id de lembrete existente na URL já existe na base e está
// associado a uma coleção. Em caso positivo, prosseguir utilizando a coleção
// existente. Caso contrário, criar uma nova coleção.
    const observacoesDoLembrete = observacoesPorLembreteId[req.params.id] || [];
//  Adicionar a nova observação à coleção de observações recém obtida/criada.
   observacoesDoLembrete.push({ id: idObs, texto}); 
//  Fazer com que o identificador do lembrete existente na URL esteja associado
// a essa nova coleção alterada, na base de observações por id de lembrete.
    observacoesPorLembreteId[req.params.id] = observacoesDoLembrete // Aqui vai colocar o objeto que criamos na linha 17 dentro de um nova ID (lacuna) vazia na qual não possui nenhuma observação dentro dela ou seja um lembrete sem observações, essa linha de código fica responsável para quando não tiver nenhuma observação [] a criação do objeto na linha de código anterior 17 vai agora ser a primeira observação do array de observaçõesPorLembretesId.
    res.status(201).send(observacoesDoLembrete);
});

app.get('/lembretes/:id/observacoes', (req,res) => {
    res.send(observacoesPorLembreteId[req.params.id] || []);
});

app.listen(5000, () => {
    console.log('Observações. Porta 5000.')
}); 


