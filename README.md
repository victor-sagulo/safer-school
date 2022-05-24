# safer-school

Este é o backend da aplicação safer-school - Uma forma de controlar as entradas e saídas dos alunos de uma determinada instituição de ensino, onde cada aluno possui um responsável que pode retirá-lo da escola ao final das aulas.

## Listagem (Get)

Lista todos os estudantes cadastrados utilizando o endpoint:

```
Get /students - FORMATO DA RESPOSTA - status 200
```

```json
[
	{
		"name": "Luke Fuerth Sagulo",
		"birthDate": "2027-07-07T03:00:00.000Z",
		"address": "Av. Edson Passos, 1054",
		"classroomId": null,
		"id": "7c0fc495-5797-4f55-81e5-7211a99eef6b",
		"enteredAt": null,
		"leftAt": null,
		"createdAt": "2022-05-23T13:54:33.994Z"
	},
	{
		"name": "Rafael",
		"birthDate": "2027-07-07T03:00:00.000Z",
		"address": "Av. Edson Passos, 1054",
		"classroomId": null,
		"id": "9c196d1b-b52f-45c1-8e43-42fb2e2374f2",
		"enteredAt": null,
		"leftAt": null,
		"createdAt": "2022-05-23T14:03:00.014Z"
	},
	{
		"name": "Gabriel",
		"birthDate": "2027-07-07T03:00:00.000Z",
		"address": "Av. Edson Passos, 1054",
		"classroomId": null,
		"id": "7eecaa3f-a12b-437a-bba9-d054f713801e",
		"enteredAt": null,
		"leftAt": null,
		"createdAt": "2022-05-23T14:03:05.611Z"
	}
]
```

Acessa um estudante específico a partir do id utilizando o endpoint:

```
Get /students/:id - FORMATO DA RESPOSTA - status 200
```

```json
{
	"name": "Luke Fuerth Sagulo",
	"birthDate": "2027-07-07T03:00:00.000Z",
	"address": "Av. Edson Passos, 1054",
	"classroomId": null,
	"id": "7c0fc495-5797-4f55-81e5-7211a99eef6b",
	"enteredAt": null,
	"leftAt": null,
	"createdAt": "2022-05-23T13:54:33.994Z"
}
```

Lista todos os responsáveis por um determinado aluno utilizando o endpoint:

```
Get students/relatives/:id - FORMATO DA RESPOSTA - status 200
```

```json
{
	"student": {
		"name": "Luke Fuerth Sagulo",
		"birthDate": "2027-07-07T03:00:00.000Z",
		"address": "Av. Edson Passos, 1054",
		"classroomId": null,
		"id": "7c0fc495-5797-4f55-81e5-7211a99eef6b",
		"enteredAt": null,
		"leftAt": null,
		"createdAt": "2022-05-23T13:54:33.994Z"
	},
	"relatives": [
		{
			"relative": {
				"name": "Yohanna Fuerth",
				"email": "yohanna@gmail.com",
				"phone": "21995848401",
				"id": "b1a49044-4a46-4123-8fbb-f0389e1d4066"
			},
			"parentLevel": "Father"
		}
	]
}
```

Lista todos os professores utilizando o endpoint:

```
Get /teachers - FORMATO DA RESPOSTA - status 200
```

```json
[
	{
		"name": "Matheus Rocha",
		"email": "rocha@ball.com.br",
		"id": "56a93234-fd46-4e25-be25-560b417d7775"
	},
	{
		"name": "Victor Sagulo",
		"email": "victor@ball.com.br",
		"id": "3d99c361-41e7-41cc-aaa6-6b7e43f7a5c9"
	}
]
```

Acessa um professor específico a partir do id utilizando o endpoint:

```
Get /teachers/:id - FORMATO DA RESPOSTA - status 200
```

```json
{
	"name": "Victor Sagulo",
	"email": "victor@ball.com.br",
	"id": "3d99c361-41e7-41cc-aaa6-6b7e43f7a5c9"
}
```

Lista todas as turmas cadastradas utilizando o endpoint:

```
Get /classroom - FORMATO DA RESPOSTA - status 200
```

```json
[
	{
		"name": "1ª série A",
		"teacherId": null,
		"id": "0d13007e-29ed-4af0-a5a0-e2cd7a32aad2"
	},
	{
		"name": "2ª série B",
		"teacherId": null,
		"id": "cd16c72a-89a5-4cf7-839f-2f6f14773ad2"
	}
]
```

Acessa uma turma específica a partir do id utilizando o endpoint:

```
Get /classroom/:id - FORMATO DA RESPOSTA - status 200
```

```json
{
	"name": "1ª série A",
	"teacherId": null,
	"id": "0d13007e-29ed-4af0-a5a0-e2cd7a32aad2"
}
```

Lista todos os alunos matriculados em uma turma específica a partir do id utilizando o endpoint:

```
Get /classroom/students/:id - FORMATO DA RESPOSTA - status 200
```

```json
[
	{
		"name": "Luke Fuerth Sagulo",
		"birthDate": "2027-07-07T03:00:00.000Z",
		"address": "Av. Edson Passos, 1054",
		"classroomId": {
			"name": "1ª série A",
			"teacherId": null,
			"id": "0d13007e-29ed-4af0-a5a0-e2cd7a32aad2"
		},
		"id": "7c0fc495-5797-4f55-81e5-7211a99eef6b",
		"enteredAt": null,
		"leftAt": null,
		"createdAt": "2022-05-23T13:54:33.994Z"
	}
]
```

Lista todos os responsáveis cadastrados utilizando o endpoint:

```
Get /relatives - FORMATO DA RESPOSTA - status 200
```

```json
[
	{
		"name": "Yohanna Fuerth",
		"email": "yohanna@gmail.com",
		"phone": "21995848401",
		"id": "b1a49044-4a46-4123-8fbb-f0389e1d4066"
	},
	{
		"name": "Rafael Ricciardi",
		"email": "rafael@gmail.com",
		"phone": "21995848401",
		"id": "769f7526-aa54-4eb4-ab7b-274f9ffba45a"
	}
]
```

Acessa um responsável específico a partir do id utilizando o endpoint:

```
Get /relatives/:id - FORMATO DA RESPOSTA - status 200
```

```json
{
	"name": "Rafael Ricciardi",
	"email": "rafael@gmail.com",
	"phone": "21995848401",
	"id": "769f7526-aa54-4eb4-ab7b-274f9ffba45a"
}
```

## Rotas de criação (Post)

Cadastra um novo estudante:

```
Post /students - FORMATO DA REQUISIÇÃO
```

```json
{
	"name": "Gabriel",
	"birth_date": "07/07/2027",
	"address": "Av. Edson Passos, 1054"
}
```

Caso tudo dê certo, a resposta será assim:

```
Post /students - FORMATO DA RESPOSTA - status 201
```

```json
{
	"name": "Gabriel",
	"birthDate": "2027-07-07T03:00:00.000Z",
	"address": "Av. Edson Passos, 1054",
	"enteredAt": null,
	"leftAt": null,
	"id": "7eecaa3f-a12b-437a-bba9-d054f713801e",
	"createdAt": "2022-05-23T14:03:05.611Z"
}
```

Cadastra um novo responsável para o estudante:

```
Post /students/relatives - FORMATO DA REQUISIÇÃO
```

```json
{
	"studentId": "1170c56e-c8c5-4278-a11c-779c467d54df",
	"relativeId": "b0cf7ce1-fedc-4f9d-8d25-448522a6bf4c",
	"parentLevel": "Father"
}
```

Caso tudo dê certo, a resposta será assim:

```
Post /students/relatives - FORMATO DA RESPOSTA - status 201
```

```json
{
	"studentId": {
		"name": "Luke Fuerth Sagulo",
		"birthDate": "2027-07-07T03:00:00.000Z",
		"address": "Av. Edson Passos, 1054",
		"classroomId": null,
		"id": "7c0fc495-5797-4f55-81e5-7211a99eef6b",
		"enteredAt": null,
		"leftAt": null,
		"createdAt": "2022-05-23T13:54:33.994Z"
	},
	"relativeId": {
		"name": "Yohanna Fuerth",
		"email": "yohanna@gmail.com",
		"phone": "21995848401",
		"id": "b1a49044-4a46-4123-8fbb-f0389e1d4066"
	},
	"parentLevel": "Father",
	"id": "0d6195a2-48a2-44c6-844d-e28d6e3a6094"
}
```

Cadastra um novo responsável:

```
Post /relatives - FORMATO DA REQUISAÇÂO
```

```json
{
	"name": "Yohanna Fuerth",
	"email": "yohanna@gmail.com",
	"phone": "21995848401"
}
```

Caso tudo dê certo, a resposta será assim:

```
Post /relatives - FORMATO DA RESPOSTA - status 201
```

```json
{
	"name": "Yohanna Fuerth",
	"email": "yohanna@gmail.com",
	"phone": "21995848401",
	"id": "b1a49044-4a46-4123-8fbb-f0389e1d4066"
}
```

Cadastra uma nova turma:

```
Post /classroom - FORMATO DA REQUISAÇÂO
```

```json
{
	"name": "1ª série A"
}
```

Caso tudo dê certo, a resposta será assim:

```
Post /classroom - FORMATO DA RESPOSTA - status 201
```

```json
{
	"name": "1ª série A",
	"id": "0d13007e-29ed-4af0-a5a0-e2cd7a32aad2"
}
```

Cadastra um novo professor:

```
Post /teachers - FORMATO DA REQUISAÇÂO
```

```json
{
	"name": "Matheus Rocha",
	"email": "rocha@ball.com.br"
}
```

Caso tudo dê certo, a resposta será assim:

```
Post /teachers - FORMATO DA RESPOSTA - status 201
```

```json
{
	"name": "Matheus Rocha",
	"email": "rocha@ball.com.br",
	"id": "56a93234-fd46-4e25-be25-560b417d7775"
}
```

### Possíveis erros

Email já cadastrado:

```
Post /relatives - FORMATO DA RESPOSTA - status 409
```

```json
{
	"status": "err",
	"statusCode": 409,
	"message": "This email is already being used"
}
```

Esta turma já existe:

```
Post /classroom - FORMATO DA RESPOSTA - status 409
```

```json
{
	"status": "err",
	"statusCode": 409,
	"message": "This classroom already exists in our database"
}
```

Este email já foi cadastrado:

```
Post /teachers - FORMATO DA RESPOSTA - status 409
```

```json
{
	"status": "err",
	"statusCode": 409,
	"message": "This email already exists"
}
```

## rotas de atualização de dados (Patch)

Pode atualizar todos os dados de um estudante, exceto enteredAt e leftAt

```
Patch /students/:id - FORMATO DA REQUISAÇÂO
```

```json
{
	"name": "Rafael Ricciardi",
	"address": "Av. Edson Passos, 1054"
}
```

Caso tudo dê certo, a resposta será assim:

```
Patch /students/:id - FORMATO DA RESPOSTA - status 209
```

```json
{
	"id": "9c196d1b-b52f-45c1-8e43-42fb2e2374f2",
	"name": "Rafael Ricciardi",
	"birthDate": "2027-07-07T03:00:00.000Z",
	"address": "Av. Edson Passos, 1054"
}
```

Altera o horário de entrada

```
Patch /students/entry/:id - FORMATO DA REQUISAÇÂO
```

```
Não é necessário um corpo de requisição
```

```
Patch /students/entry/:id - FORMATO DA RESPOSTA - status 209
```

```json
{
	"message": "Rafael Ricciardi entered at 5/23/2022"
}
```

Altera o horário de saída

```
Patch /students/leave/:id - FORMATO DA REQUISAÇÂO
```

```
Não é necessário um corpo de requisição
```

```
Patch /students/leave/:id - FORMATO DA RESPOSTA - status 209
```

```json
{
	"message": "Rafael Ricciardi left at 5/23/2022"
}
```

Adiciona o aluno em uma turma a partir do aluno usando o endpoint:

```
Patch /students/classroom/:id - FORMATO DA REQUISAÇÂO
```

```json
{
	"classroomId": "0d13007e-29ed-4af0-a5a0-e2cd7a32aad2"
}
```

```
Patch /students/classroom/:id - FORMATO DA RESPOSTA - status 209
```

```json
{
	"id": "7c0fc495-5797-4f55-81e5-7211a99eef6b",
	"name": "Luke Fuerth Sagulo",
	"birthDate": "2027-07-07T03:00:00.000Z",
	"address": "Av. Edson Passos, 1054",
	"classroomId": {
		"name": "1ª série A",
		"teacherId": null,
		"id": "0d13007e-29ed-4af0-a5a0-e2cd7a32aad2"
	}
}
```

Atualiza as informações de um professor

```
Patch /teachers/:id - FORMATO DA REQUISAÇÂO
```

```json
{
	"name": "Sueli Silva Marques",
	"email": "sueli@email.com"
}
```

```
Patch /teachers/:id - FORMATO DA RESPOSTA - status 209
```

```json
{
	"id": "3d99c361-41e7-41cc-aaa6-6b7e43f7a5c9",
	"name": "Sueli Silva Marques",
	"email": "sueli@email.com"
}
```

Atualiza as informações de uma turma

```
Patch /classroom/:id - FORMATO DA REQUISAÇÂO
```

```json
{
	"name": "5ª série B",
	"teacherId": "3d99c361-41e7-41cc-aaa6-6b7e43f7a5c9"
}
```

```
Patch /classroom/:id - FORMATO DA RESPOSTA - status 209
```

```json
{
	"id": "cd16c72a-89a5-4cf7-839f-2f6f14773ad2",
	"name": "5ª série B",
	"teacherId": "3d99c361-41e7-41cc-aaa6-6b7e43f7a5c9"
}
```

Atualiza as informações de um responsável

```
Patch /relatives/:id - FORMATO DA REQUISAÇÂO
```

```json
{
	"name": "Rafael Ricciardi",
	"email": "rafael@email.com",
	"phone": "9999999999999"
}
```

```
Patch /relatives/:id - FORMATO DA RESPOSTA - status 209
```

```json
{
	"id": "769f7526-aa54-4eb4-ab7b-274f9ffba45a",
	"name": "Rafael Ricciardi",
	"email": "rafael@email.com",
	"phone": "9999999999999"
}
```

### Possíveis erros

```
Patch /students/:id - FORMATO DA RESPOSTA - status 404
```

```json
{
	"status": "err",
	"statusCode": 404,
	"message": "Student not found or doesn't exists"
}
```

```
Patch /students/entry/:id - FORMATO DA RESPOSTA - status 404
```

```json
{
	"status": "err",
	"statusCode": 404,
	"message": "Student not found or doesn't exists"
}
```

```
Patch /students/leave/:id - FORMATO DA RESPOSTA - status 404
```

```json
{
	"status": "err",
	"statusCode": 404,
	"message": "Student not found or doesn't exists"
}
```

```
Patch /teachers/:id - FORMATO DA RESPOSTA - status 404
```

```json
{
	"status": "err",
	"statusCode": 404,
	"message": "Teacher not found or doesn't exists"
}
```

```
Patch /classroom/:id - FORMATO DA RESPOSTA - status 404
```

```json
{
	"status": "err",
	"statusCode": 404,
	"message": "Classroom not found or doesn't exists"
}
```

```
Patch /relatives/:id - FORMATO DA RESPOSTA - status 404
```

```json
{
	"status": "err",
	"statusCode": 404,
	"message": "Relative not found"
}
```

## Rotas de deleção (delete)

Exclui um estudante

```
Delete /students/:id - FORMATO DA REQUISAÇÂO
```

```
Não é necessário um corpo de requisição
```

```
Delete /students/:id - FORMATO DA RESPOSTA - status 209
```

```json
{
	"message": "Student successfully deleted"
}
```

Exclui um Responsável

```
Delete /relatives/:id - FORMATO DA REQUISAÇÂO
```

```
Não é necessário um corpo de requisição
```

```
Delete /relatives/:id - FORMATO DA RESPOSTA - status 209
```

```json
{
	"message": "Relative successfully deleted"
}
```

Exclui um professor

```
Delete /teachers/:id - FORMATO REQUISAÇÂO
```

```
Não é necessário um corpo de requisição
```

```
Delete /teachers/:id - FORMATO DA RESPOSTA - status 209
```

```json
{
	"message": "Teacher successfully deleted"
}
```

Exclui uma turma

```
Delete /classroom/:id - FORMATO DA REQUISAÇÂO
```

```
Não é necessário um corpo de requisição
```

```
Delete /classroom/:id - FORMATO DA RESPOSTA - status 209
```

```json
{
	"message": "Classroom successfully deleted"
}
```

### Possíveis erros

```
Patch /students/:id - FORMATO DA RESPOSTA - status 404
```

```json
{
	"status": "err",
	"statusCode": 404,
	"message": "Student not found or doesn't exists"
}
```

```
Patch /relatives/:id - FORMATO DA RESPOSTA - status 404
```

```json
{
	"status": "err",
	"statusCode": 404,
	"message": "Relative not found"
}
```

```
Patch /teachers/:id - FORMATO DA RESPOSTA - status 404
```

```json
{
	"status": "err",
	"statusCode": 404,
	"message": "Teacher not found or doesn't exists"
}
```

```
Patch /classroom/:id - FORMATO DA RESPOSTA - status 404
```

```json
{
	"status": "err",
	"statusCode": 404,
	"message": "Classroom not found or doesn't exists"
}
```

cawawdad
