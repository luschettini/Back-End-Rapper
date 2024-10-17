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
        const { nome, idade, descricao_fisica, atividade_suspeita} = req.body

//Validação dos campos nome e idade para efetuação do cadastro
        if(!nome || !idade || !atividade_suspeita) {
            return res.status(400).send({
                message: "Os campos nome, idade atividade suspeita são obrigatórias para o cadastro" 
            })
        }

//Validação se o rapper é suspeito ou não
        if(atividade_suspeita != "sim" && atividade_suspeita!= "não"){
            return res.status(400).send({
                message: "Digite sim ou não" 
        })
        }

//Validação para que tenha apenas números inteiros
        if(Number.isInteger(idade) == false){
            return res.status(400).send({
                message: "A idade do suspeito deve ser em números inteiros"
        })
        }

//Criação de um novo suspeito
        const novoSuspeitos = {
            id: Number(Math.floor(Math.random() * 99) + 1),
            nome,
            idade,
            descricao_fisica, 
            atividade_suspeita
        }
        
//Adiciona o suspeito ao array de suspeitos
        suspeitos.push(novoSuspeitos);

        return res.status(201).send({message: "Suspeito cadastrado!",
            novoSuspeitos,
    })
        })

//Rota para buscar um suspeito pelo id  
suspeitosRoutes.get("/:id", (req, res) => {
    const { id } = req.params

//Busca um suspeito pelo id no array de suspeitos
    const suspeito = suspeitos.find((suspect) => 
        suspect.id == id
    )

 //Verificação se o suspeito foi encontrado
    if (!suspeito) {
        return res.status(404).send({ message: "Suspeito não encontrado!" })
    }

    return res.status(200).send(suspeito)
})

// Rota para atualizar um suspeito pelo id
suspeitosRoutes.put("/:id", (req, res) => {
    const { id } = req.params
    const suspeito = suspeitos.find((suspect) => 
        suspect.id === Number(id)
    )

 //Verificação se o suspeito foi encontrado
    if (!suspeito) {
        return res.status(404).send({message: "Suspeito não não encontrado!" })
    }

    const {nome, idade, descricao_fisica, atividade_suspeita} = req.body
    
    suspeito.nome = nome
    suspeito.idade = idade
    suspeito.descricao_fisica = descricao_fisica
    suspeito.atividade_suspeita = atividade_suspeita

    return res.status(201).send({
        message: "Suspeitos atualizados!",
        suspeito,
    })
})

// Rota para deletar um suspeito
suspeitosRoutes.delete("/:id", (req, res) => {
    const { id } = req.params;

// Busca um suspeito pelo id no array de suspeitos
const suspeito = suspeitos.find((suspect) => suspect.id == id);

// Verifica se o suspeito foi encontrado
if (!suspeito) {
    return res
    .status(404)
    .json({ message: `Suspeito com id ${id} não encontrado!` });
  }

// Remove o suspeito do array de suspeito
  suspeitos = suspeitos.filter((suspect) => suspect.id != id);

  return res.status(200).json({
    message: "Suspeito removido com sucesso!",
    suspeito,
  });
});

  export default suspeitosRoutes;

