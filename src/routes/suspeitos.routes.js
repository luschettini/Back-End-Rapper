import { Router } from "express";

const suspeitosRoutes = Router();

// Array com suspeitos pré-cadastrados
let suspeitos = [
  {
    id: Math.floor(Math.random() * 1000000),
    nome: "Eminem",
    idade: 51,
    descricao_fisica: ["alto", "moreno", "barba"],
    atividade_suspeita: "nao"
  },

{
    id: Math.floor(Math.random() * 1000000),
    nome: "Drake",
    idade: 37,
    descricao_fisica: ["alto", "moreno", "barba", "branco"],
    atividade_suspeita: "nao"
  },

  {
    id: Math.floor(Math.random() * 1000000),
    nome: "Kanye West",
    idade: 47,
    descricao_fisica: ["alto", "moreno", "barba", "negro"],
    atividade_suspeita: "sim"
  },

  {
    id: Math.floor(Math.random() * 1000000),
    nome: "Kendrick Lamar",
    idade: 37,
    descricao_fisica: ["baixo", "moreno", "barba", "negro"],
    atividade_suspeita: "nao"
},
];

// Rota para listar todos os suspeitos
suspeitosRoutes.get("/", (req, res) => {
    return res.status(200).json(suspeitos);
});

// Rota para cadastrar um novo suspeito
suspeitosRoutes.post("/", (req, res) => {
    const { nome, idade, descricao_fisica, atividade_suspeita } = req.body;
  
  // Validação dos campos obrigatórios
  if (!nome || !idade || !atividade_suspeita) {
    return res.status(400).json({
      message: "Os campos nome, idade e atividades suspeitas são obrigatórios!",
    });
  }

   // Validação para identificar se a idade é um número inteiro
  if ((Number.isInteger(idade)) == false) {
    return res.status(400).json({
        message: "O campo nome é obrigatório!",
    });
    }

  // Validação de existência de suspeitos
  if (atividade_suspeita != "sim" && atividade_suspeita != "não") {
    return res.status(400).send({
      message: "Digite 'sim' ou 'não'!",
    });
  }
});

  export default suspeitosRoutes;