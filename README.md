## Relatório

### Backend

O **Backend** foi desenvolvido com a linguagem C# como descrito requisito.<br><br>
Foi desenvolvido com o com o **Net Framework 6.0**.<br><br>
A estrutura foi desenvolvida no padrão **DDD** (_Domain Driven Design_) utilizando os princípios **SOLID**.<br><br>
Na estrutura foi desenvolvida uma forma de manipular todas as exceções geradas pela aplicação de forma global.<br><br>
O banco de dados foi desenvolvido com **SQL Server**.<br><br>
Foi utilizado a biblioteca **FluentMigrator** para ajuda com as validações de requisições.<br><br>
Também foi utilizado a biblioteca **AutoMapper** para automatizar as requisições. No sistema de autenticação foi usado o padrão **JWT** utilizando a biblioteca **System.IdentityModel.Tokens.Jwt**, **System.Security.Claims** e **Microsoft.IdentityModel.Tokens**.<br><br>
**OBS**: O sistema de autenticação foi desenvolvido com login e senha estática.

---

### Frontend: 

O **Frontend** foi desenvolvido com o framework **Angular CLI** na versão **16.0.4**.<br><br>
Foram utilizados alguns frameworks como **gerador-nome** para facilitar o desenvolvimento de dados fakes, **ng-mask** para formatar o CPF, **bootstrap** para estilização do **CSS**, **NgBootstrap** para manipular o modal do **bootstrap**, **Font Awesome** para icones customizados. 

---

## Instalação

### Instalação Backend

1. Faça o download
2. Mudar os valores do banco de dados no arquivo `appsetings.json` do projeto **HEXAGON.Api**
3. Executar a **HEXAGON.Api**

---

### Instalação Frontend

1. Faça o download
2. Dentro da pasta do **Frontend** digite `npm install`
3. Digite `npm run start` para iniciar a aplicação
4. Caso precise mudar a URL padrão da API basta ir no diretório do **frontend/enviroment** e editar o arquivo **enviroment.ts**

---

**OBS**:  Caso precise executar o comando para criar as tabelas:
```bash
CREATE TABLE hexagon (
    id BIGINT IDENTITY(1,1) NOT NULL,
    created_at DATETIME NOT NULL,
    name VARCHAR(100) NOT NULL,
    age SMALLINT NOT NULL,
    civil_status VARCHAR(50) NOT NULL,
    document VARCHAR(11) NOT NULL,
    city VARCHAR(50) NOT NULL,
    state VARCHAR(2) NOT NULL
);
  
ALTER TABLE hexagon
  ADD CONSTRAINT PK_hexagon PRIMARY KEY (id);
```

---

## Informações Adicionais

Na se seção de registrar usuário foi feito 1 método para gerar usuários aleatórios afins de agilizar os testes.

### Credênciais de login

```bash
    Login: hexagon
    Senha: hexagon
```

