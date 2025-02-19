# ATV_REVISAO

# Prestador de Serviço API

Este é um projeto de uma API simples desenvolvida em Node.js com Express.js para gerenciar prestadores de serviço.

## Tecnologias Utilizadas

- Node.js
- Express.js
- Dotenv

## Instalação

1. Clone este repositório:
   ```sh
   git clone <URL_DO_REPOSITORIO>
   ```

2. Acesse a pasta do projeto:
   ```sh
   cd nome-do-projeto
   ```

3. Instale as dependências:
   ```sh
   npm install
   ```

4. Crie um arquivo `.env` na raiz do projeto e defina a porta:
   ```env
   PORTA=3000
   ```

5. Inicie o servidor:
   ```sh
   npm start
   ```

## Endpoints

### 1. Listar todos os prestadores de serviço
   - **Rota:** `GET /prestadorServico`
   - **Resposta de Sucesso:**
     ```json
     {
       "bancoDados": [
         {
           "id": "1",
           "nome": "João Silva",
           "especialidade": "Eletricista",
           "telefone": "(11) 98765-4321",
           "email": "joao@email.com",
           "disponibilidade": "Segunda a Sexta"
         }
       ]
     }
     ```
   - **Caso não haja prestadores cadastrados:**
     ```json
     {"msg": "Banco de dados vazio"}
     ```

### 2. Buscar um prestador de serviço por ID
   - **Rota:** `GET /prestadorServico/:id`
   - **Exemplo de Resposta:**
     ```json
     {
       "id": "1",
       "nome": "João Silva",
       "especialidade": "Eletricista",
       "telefone": "(11) 98765-4321",
       "email": "joao@email.com",
       "disponibilidade": "Segunda a Sexta"
     }
     ```
   - **Caso não encontrado:**
     ```json
     {"msg": "Prestador de serviço não encontrado."}
     ```

### 3. Cadastrar um novo prestador de serviço
   - **Rota:** `POST /prestadorServico`
   - **Body (JSON):**
     ```json
     {
       "id": "2",
       "nome": "Maria Oliveira",
       "especialidade": "Encanadora",
       "telefone": "(11) 99876-5432",
       "email": "maria@email.com",
       "disponibilidade": "Todos os dias"
     }
     ```
   - **Resposta:**
     ```json
     {"msg": "Prestador de serviço cadastrado com sucesso!"}
     ```
   - **Caso faltem dados:**
     ```json
     {"msg": "Todos os dados devem ser preenchidos!"}
     ```

### 4. Atualizar dados de um prestador de serviço
   - **Rota:** `PUT /prestadorServico/:id`
   - **Body (JSON):**
     ```json
     {
       "novoNome": "Maria Souza",
       "novoEspecialidade": "Encanadora e Eletricista",
       "novoTelefone": "(11) 99999-9999",
       "novoEmail": "maria.souza@email.com",
       "novoDisponibilidade": "Segunda a Sábado"
     }
     ```
   - **Resposta de Sucesso:**
     ```json
     {"msg": "Dados do prestador de serviço atualizado com sucesso!"}
     ```
   - **Caso o ID não seja encontrado:**
     ```json
     {"msg": "Prestador de serviço não encontrado!"}
     ```

### 5. Deletar um prestador de serviço
   - **Rota:** `DELETE /prestadorServico/:id`
   - **Resposta de Sucesso:**
     ```json
     {"msg": "Prestador de serviço deletado com sucesso"}
     ```
   - **Caso o ID não seja encontrado:**
     ```json
     {"msg": "Prestador de serviço não encontrado!"}
     ```


## Autor
Desenvolvido por [Francisco Batista].

