<h1 align="center">
   
dev.Chat
</h1>
<p align="center">
  O objetivo do projeto é simular um simples sistema de bate bapo semelhante ao Bate Bapo da UOL.
</p>


https://user-images.githubusercontent.com/59948274/208255234-5a16474e-e7b9-48db-b2ba-395d23c6827e.mp4

## 🚀 Technologies

Tecnologias utilizadas no frondend

- [Nextjs](https://vitejs.dev)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCss](https://tailwindcss.com)
- [Eslint](https://eslint.org/)
- [axios](https://axios-http.com/docs/intro)
- [nookies](https://www.npmjs.com/package/nookies)

Tecnologias utilizadas no backend

- [NodeJs](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [PrismaORM](https://www.prisma.io)
- [SQLite](https://www.postgresql.org)
- [Jwt](https://jwt.io)
- [express](https://www.docker.com)

 **Clone o projeto e acesse a pasta**

```bash
$ git clone https://github.com/ganimedes96/dev.Chat && cd dev.Chat
```
**Siga as etapas abaixo para instalar as dependências necessárias**

```bash
# Install the dependencies web
# Aplicacao web esta rodando na porta 3000
$ npm install

# Install the dependencies server
# Aplicacao server esta rodando no porta 3001
$ npm install

$ Depois rode os comandos `npm run dev` para inicar a aplicacao `web` e o mesmo comando vale para iniciar o `server`
```

<h2 align="center">BACK-END</h2>

<h3>Rota de registro</h3>
- <p>Nessa rota e esperado um JSON no seguinte formato</p>

```bash
#Rota POST http://localhost:3001/users/register  
{
  "username": "John Doe",
  "password": "Jhondoe@123"
}

```

<h3>Rota de Login</h3>
- <p>Nessa rota e esperado um JSON no seguinte formato</p>

```bash
#Rota POST http://localhost:3001/login  
{
  "username": "John Doe",
  "password": "123456"
}

```
 Usuário pré-cadastrados para o acesso:

| Nome               |    Senha    |
| ------------------ | :---------: |
| Felix              |   123456    |


<h3>Rota das categorias</h3>
- <p>Nessa rota e retornado um JSON no seguinte formato</p>

```bash
#Rota GET http://localhost:3001/category
[
	{
		"id": "clbqu9ryf0000i0qfk0wzgn8g",
		"category": "python"
	}
]

```
<h3>Rota para criar uma categoria</h3>
- <p>Nessa rota e esperado um JSON no seguinte formato</p>

```bash
#Rota POST http://localhost:3001/category/register
{
	
	"category":"mysql"
}

```

<h3>Rota para fazer a filtragem das mensagens</h3>
- <p>Nessa rota e retornado um JSON no seguinte formato</p>

```bash
#Rota GET http://localhost:3001/transactions/filter
[
	{
		"id": "clbs4d8oq0001i0p2bi8j6g6s",
		"content": "Ola",
		"User": {
			"username": "Felix",
			"img_url": "https://github.com/Felix.png"
		}
	},
	{
		"id": "clbs0lgmm0000i0vp5a0h49qy",
		"content": "Como utilizar o useReducer no React",
		"User": {
			"username": "Felix",
			"img_url": "https://github.com/Felix.png"
		}
	},
	{
		"id": "clbqza90v0004i0gqflniv262",
		"content": "Como utilizar o useContext no react com typescript",
		"User": {
			"username": "ganimedes96",
			"img_url": "https://github.com/ganimedes96.png"
		}
	}
]

```

