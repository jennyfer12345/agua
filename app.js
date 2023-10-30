const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const app = express();
const port = 3040;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dbConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "acesso123",
  database: "agua",
});

dbConnection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados: " + err.stack);
    process.exit(1);
  }
  console.log("Conexão bem-sucedida com o banco de dados MySQL");
});

app.get("/hidratacao", (req, res) => {
  dbConnection.query("SELECT * FROM hidratacao", (error, results) => {
    if (error) {
      console.error("Erro na consulta: " + error);
      res.status(500).json({ error: "Erro ao buscar dados de hidratação" });
    } else {
      res.json(results);
    }
  });
});

app.post("/adicionar_hidratacao", (req, res) => {
  const { data, quantidade, nome } = req.body;

  if (!data || !quantidade || !nome) {
    res
      .status(400)
      .json({
        error: "Campos de data, quantidade e nome não podem estar vazios",
      });
    return;
  }

  const query =
    "INSERT INTO hidratacao (data, quantidade, nome) VALUES (?, ?, ?)";
  dbConnection.query(query, [data, quantidade, nome], (error) => {
    if (error) {
      console.error("Erro na inserção: " + error);
      res.status(500).json({ error: "Erro ao adicionar dados de hidratação" });
    } else {
      res.json({ message: "Dados de hidratação registrados com sucesso" });
    }
  });
});

app.listen(port, () => {
  console.log(`API está rodando na porta ${port}`);
});
