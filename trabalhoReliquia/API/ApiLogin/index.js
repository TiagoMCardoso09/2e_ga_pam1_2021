const express = require('express');//constante para permitir criar o servidor para pode importar os modulos
const server = express(); // costante de conexao com o servidor
const bp = require('body-parser'); // permite receber dados externos"informaçoes"
const mysql = require('mysql2'); // permite estabelecer a conexao com o banco
const banco = mysql.createPool({  // configurar banco de dados
    host: "localhost",
    database: "Login",
    user: "root",
    password: ""
});

server.use(bp.urlencoded({ extended: false}));
server.use(bp.json()); // permite arquivos json



//estabelecer conexao
server.get("/conectar", (req, res)=>{
    banco.getConnection(
        (erro,con) =>{
            if(erro){
                return res.status(500).send({
                    mensagem: "Erro ao conectar como banco",
                    erro: erro
                })
            }

            return res.status(200).send({
                mensagem:"Conexão estabecida com sucesso!"
            });
        }
    )
});


// cadastar veicuos
server.post("/cliente", (req, res)=>{
    const c = req.body
    //template string
    const SQL = `INSERT INTO cliente (IDcliente, Usuario, email, Senha) VALUE ('${null}', '${c.Usuario}', '${c.email}', ${c.senha})`

    banco.getConnection((erro,con)=>{
        if(erro){
            return res.status(500).send({
                mensagem: 'Erro de conexão',
                detalhes: erro
            });
        }

        con.query(SQL, (erro, result) =>{
            con.release();

            if(erro){
                return res.status(500).send({
                    mensagem: 'Erro na SQL',
                    detalhes: erro,
                    sql: SQL
                });
            }

            return res.status(200).send({
                mensagem: 'Cadastro realizado com sucessp!'
            })
        })
    })
});

// texte de execução
server.listen(3000,() =>{
    console.log('Servidor funcionado!');
});
