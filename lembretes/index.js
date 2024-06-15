const express = require('express');
const app = express();
app.use(express.json());
const pedidos = {};
contadorpedidos = 0;

app.listen(4000, () => {
    console.log('Pedidos. Porta 4000.')
});

app.post('/pedidos', (req,res) => {
    contadorpedidos++;
    const { pedido } = req.body;
    pedidos[contadorpedidos] = {
        contadorpedidos, pedido
    };
    res.status(201).send(pedidos[contadorpedidos]);
});

app.get('/pedidos', (req,res) => {
//Adicionar filtro para os pedidos com situação igual a 1.
    res.send(pedidos);
});

app.get('/pedidos/atualizarsituacao', (req,res) => {
    let { id } = req.body;
    console.log("id = " + id);
    pedidos[id].pedido.situacao = 2;
    res.status(200).send(pedidos[id]);    
});



