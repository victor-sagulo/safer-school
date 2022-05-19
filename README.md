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
		"id": "863a5291-d6c8-4869-8461-db0dcf4f176b",
		"name": "Rafael Ricciardi",
		"birth_date": "1997-07-01T11:35:18.768Z",
		"address": "Lorem ipsum dolor emet",
		"classroom_id": "863a5291-d6c8-4869-8461-db0dcf4f176b",
		"entered_at": "2020-11-30T18:40:08.316Z",
		"left_at": "2020-11-30T18:40:08.316Z",
		"created_at": "2020-11-30T18:40:08.316Z",
		"relatives": [
			{
				"id": "863a5291-d6c8-4869-8461-db0dcf4f176b",
				"name": "Rafael Ricciardi",
				"email": "rafael@gmail.com",
				"phone": "9999999999999"
			},
			{
				"id": "863a5291-d6c8-4869-8461-db0dcf4f176b",
				"name": "Rafael Ricciardi",
				"email": "rafael@gmail.com",
				"phone": "9999999999999"
			}
		]
	},
	{
		"id": "863a5291-d6c8-4869-8461-db0dcf4f176b",
		"name": "Victor Sagulo",
		"birth_date": "1997-07-01T11:35:18.768Z",
		"address": "Lorem ipsum dolor emet",
		"classroom_id": "863a5291-d6c8-4869-8461-db0dcf4f176b",
		"entered_at": "2020-11-30T18:40:08.316Z",
		"left_at": "2020-11-30T18:40:08.316Z",
		"created_at": "2020-11-30T18:40:08.316Z",
		"relatives": [
			{
				"id": "863a5291-d6c8-4869-8461-db0dcf4f176b",
				"name": "Rafael Ricciardi",
				"email": "rafael@gmail.com",
				"phone": "9999999999999"
			},
			{
				"id": "863a5291-d6c8-4869-8461-db0dcf4f176b",
				"name": "Rafael Ricciardi",
				"email": "rafael@gmail.com",
				"phone": "9999999999999"
			}
		]
	},
	{
		"id": "863a5291-d6c8-4869-8461-db0dcf4f176b",
		"name": "Marcos Mafei",
		"birth_date": "1997-07-01T11:35:18.768Z",
		"address": "Lorem ipsum dolor emet",
		"classroom_id": "863a5291-d6c8-4869-8461-db0dcf4f176b",
		"entered_at": "2020-11-30T18:40:08.316Z",
		"left_at": "2020-11-30T18:40:08.316Z",
		"created_at": "2020-11-30T18:40:08.316Z",
		"relatives": [
			{
				"id": "863a5291-d6c8-4869-8461-db0dcf4f176b",
				"name": "Rafael Ricciardi",
				"email": "rafael@gmail.com",
				"phone": "9999999999999"
			},
			{
				"id": "863a5291-d6c8-4869-8461-db0dcf4f176b",
				"name": "Rafael Ricciardi",
				"email": "rafael@gmail.com",
				"phone": "9999999999999"
			}
		]
	}
]
```

Acessa um estudante específico a partir do id utilizando o endpoint:

```
Get /students/:id - FORMATO DA RESPOSTA - status 200
```

```json
{
	"id": "863a5291-d6c8-4869-8461-db0dcf4f176b",
	"name": "Rafael Ricciardi",
	"birth_date": "1997-07-01T11:35:18.768Z",
	"address": "Lorem ipsum dolor emet",
	"classroom_id": "863a5291-d6c8-4869-8461-db0dcf4f176b",
	"entered_at": "2020-11-30T18:40:08.316Z",
	"left_at": "2020-11-30T18:40:08.316Z",
	"created_at": "2020-11-30T18:40:08.316Z",
	"relatives": [
		{
			"id": "863a5291-d6c8-4869-8461-db0dcf4f176b",
			"name": "Rafael Ricciardi",
			"email": "rafael@gmail.com",
			"phone": "9999999999999"
		},
		{
			"id": "863a5291-d6c8-4869-8461-db0dcf4f176b",
			"name": "Rafael Ricciardi",
			"email": "rafael@gmail.com",
			"phone": "9999999999999"
		}
	]
}
```

Lista todos os responsáveis por um determinado aluno utilizando o endpoint:

```
Get students/relatives/:id - FORMATO DA RESPOSTA - status 200
```

```json
{
    "id": "863a5291-d6c8-4869-8461-db0dcf4f176b",
    "name": "Rafael Ricciardi",
    "email": "rafael@gmail.com",
    "phone": "9999999999999"
},
{
    "id": "863a5291-d6c8-4869-8461-db0dcf4f176b",
    "name": "Rafael Ricciardi",
    "email": "rafael@gmail.com",
    "phone": "9999999999999"
}
```

Lista todos os professores utilizando o endpoint:

```
Get /teachers - FORMATO DA RESPOSTA - status 200
```

```json
[
	{
		"id": "863a5291-d6c8-4869-8461-db0dcf4f176b",
		"name": "Rafael Ricciardi",
		"email": "rafael@gmail.com"
	},
	{
		"id": "863a5291-d6c8-4869-8461-db0dcf4f176b",
		"name": "Rafael Ricciardi",
		"email": "rafael@gmail.com"
	},
	{
		"id": "863a5291-d6c8-4869-8461-db0dcf4f176b",
		"name": "Rafael Ricciardi",
		"email": "rafael@gmail.com"
	}
]
```

Acessa um professor específico a partir do id utilizando o endpoint:

```
Get /teachers/:id - FORMATO DA RESPOSTA - status 200
```

```json
{
	"id": "863a5291-d6c8-4869-8461-db0dcf4f176b",
	"name": "Rafael Ricciardi",
	"email": "rafael@gmail.com"
}
```

Lista todas as turmas cadastradas utilizando o endpoint:

```
Get /classroom - FORMATO DA RESPOSTA - status 200
```

```json
[
	{
		"id": "863a5291-d6c8-4869-8461-db0dcf4f176b",
		"name": "5º ano C",
		"teacher_id": "863a5291-d6c8-4869-8461-db0dcf4f176b"
	},
	{
		"id": "863a5291-d6c8-4869-8461-db0dcf4f176b",
		"name": "5º ano C",
		"teacher_id": "863a5291-d6c8-4869-8461-db0dcf4f176b"
	},
	{
		"id": "863a5291-d6c8-4869-8461-db0dcf4f176b",
		"name": "5º ano C",
		"teacher_id": "863a5291-d6c8-4869-8461-db0dcf4f176b"
	}
]
```

Acessa uma turma específica a partir do id utilizando o endpoint:

```
Get /classroom/:id - FORMATO DA RESPOSTA - status 200
```

```json
{
	"id": "863a5291-d6c8-4869-8461-db0dcf4f176b",
	"name": "5º ano C",
	"teacher_id": "863a5291-d6c8-4869-8461-db0dcf4f176b"
}
```

Lista todos os responsáveis cadastrados utilizando o endpoint:

```
Get /relatives - FORMATO DA RESPOSTA - status 200
```

```json
[
	{
		"id": "863a5291-d6c8-4869-8461-db0dcf4f176b",
		"name": "Rafael Ricciardi",
		"email": "rafael@gmail.com",
		"phone": "9999999999999"
	},
	{
		"id": "863a5291-d6c8-4869-8461-db0dcf4f176b",
		"name": "Rafael Ricciardi",
		"email": "rafael@gmail.com",
		"phone": "9999999999999"
	},
	{
		"id": "863a5291-d6c8-4869-8461-db0dcf4f176b",
		"name": "Rafael Ricciardi",
		"email": "rafael@gmail.com",
		"phone": "9999999999999"
	}
]
```

Acessa um responsável específico a partir do id utilizando o endpoint:

```
Get /relatives/:id - FORMATO DA RESPOSTA - status 200
```

```json
{
	"id": "863a5291-d6c8-4869-8461-db0dcf4f176b",
	"name": "Rafael Ricciardi",
	"email": "rafael@gmail.com",
	"phone": "9999999999999"
}
```

## Rotas de criação (Post)

Cadastra um novo estudante:

```
Post /students - FORMATO DA REQUISIÇÃO
```

```json
{
	"name": "Rafael Ricciardi",
	"birth_date": "1997-07-01T11:35:18.768Z",
	"address": "Lorem ipsum dolor emet"
}
```

Caso tudo dê certo, a resposta será assim:

```
Post /students - FORMATO DA RESPOSTA - status 201
```

```json
{
	"id": "863a5291-d6c8-4869-8461-db0dcf4f176b",
	"name": "Rafael Ricciardi",
	"birth_date": "1997-07-01T11:35:18.768Z",
	"address": "Lorem ipsum dolor emet",
	"classroom_id": null,
	"entered_at": null,
	"left_at": null,
	"created_at": "2020-11-30T18:40:08.316Z"
}
```

Cadastra um novo responsável:

```
Post /relatives - FORMATO DA REQUISAÇÂO
```

```json
{
	"name": "Rafael Ricciardi",
	"email": "rafael@gmail.com",
	"phone": "9999999999999"
}
```

Caso tudo dê certo, a resposta será assim:

```
Post /relatives - FORMATO DA RESPOSTA - status 201
```

```json
{
	"id": "863a5291-d6c8-4869-8461-db0dcf4f176b",
	"name": "Rafael Ricciardi",
	"email": "rafael@gmail.com",
	"phone": "9999999999999"
}
```

Cadastra uma nova turma:

```
Post /classroom - FORMATO DA REQUISAÇÂO
```

```json
{
	"name": "5º ano C",
	"teacher_id": "863a5291-d6c8-4869-8461-db0dcf4f176b"
}
```

Caso tudo dê certo, a resposta será assim:

```
Post /classroom - FORMATO DA RESPOSTA - status 201
```

```json
{
	"id": "863a5291-d6c8-4869-8461-db0dcf4f176b",
	"name": "5º ano C",
	"teacher_id": "863a5291-d6c8-4869-8461-db0dcf4f176b"
}
```

Cadastra um novo professor:

```
Post /teachers - FORMATO DA REQUISAÇÂO
```

```json
{
	"name": "Rafael Ricciardi",
	"email": "rafael@gmail.com"
}
```

Caso tudo dê certo, a resposta será assim:

```
Post /teachers - FORMATO DA RESPOSTA - status 201
```

```json
{
	"id": "863a5291-d6c8-4869-8461-db0dcf4f176b",
	"name": "Rafael Ricciardi",
	"email": "rafael@gmail.com"
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
	"address": "Lorem ipsum dolor emet"
}
```

Caso tudo dê certo, a resposta será assim:

```
Patch /students/:id - FORMATO DA RESPOSTA - status 209
```

```json
{
	"message": "Student data successfully updated",
	"data": {
		"id": "863a5291-d6c8-4869-8461-db0dcf4f176b",
		"name": "Rafael Ricciardi",
		"birth_date": "1997-07-01T11:35:18.768Z",
		"address": "Lorem ipsum dolor emet",
		"classroom_id": "863a5291-d6c8-4869-8461-db0dcf4f176b",
		"entered_at": "2020-11-30T18:40:08.316Z",
		"left_at": "2020-11-30T18:40:08.316Z",
		"created_at": "2020-11-30T18:40:08.316Z",
		"relatives": [
			{
				"id": "863a5291-d6c8-4869-8461-db0dcf4f176b",
				"name": "Rafael Ricciardi",
				"email": "rafael@gmail.com",
				"phone": "9999999999999"
			},
			{
				"id": "863a5291-d6c8-4869-8461-db0dcf4f176b",
				"name": "Rafael Ricciardi",
				"email": "rafael@gmail.com",
				"phone": "9999999999999"
			}
		]
	}
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
	"message": "Updated check-in time",
	"data": {
		"id": "863a5291-d6c8-4869-8461-db0dcf4f176b",
		"name": "Rafael Ricciardi",
		"birth_date": "1997-07-01T11:35:18.768Z",
		"address": "Lorem ipsum dolor emet",
		"classroom_id": "863a5291-d6c8-4869-8461-db0dcf4f176b",
		"entered_at": "2020-11-30T18:40:08.316Z",
		"left_at": "2020-11-30T18:40:08.316Z",
		"created_at": "2020-11-30T18:40:08.316Z",
		"relatives": [
			{
				"id": "863a5291-d6c8-4869-8461-db0dcf4f176b",
				"name": "Rafael Ricciardi",
				"email": "rafael@gmail.com",
				"phone": "9999999999999"
			},
			{
				"id": "863a5291-d6c8-4869-8461-db0dcf4f176b",
				"name": "Rafael Ricciardi",
				"email": "rafael@gmail.com",
				"phone": "9999999999999"
			}
		]
	}
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
	"message": "Updated check-out time",
	"data": {
		"id": "863a5291-d6c8-4869-8461-db0dcf4f176b",
		"name": "Rafael Ricciardi",
		"birth_date": "1997-07-01T11:35:18.768Z",
		"address": "Lorem ipsum dolor emet",
		"classroom_id": "863a5291-d6c8-4869-8461-db0dcf4f176b",
		"entered_at": "2020-11-30T18:40:08.316Z",
		"left_at": "2020-11-30T18:40:08.316Z",
		"created_at": "2020-11-30T18:40:08.316Z",
		"relatives": [
			{
				"id": "863a5291-d6c8-4869-8461-db0dcf4f176b",
				"name": "Rafael Ricciardi",
				"email": "rafael@gmail.com",
				"phone": "9999999999999"
			},
			{
				"id": "863a5291-d6c8-4869-8461-db0dcf4f176b",
				"name": "Rafael Ricciardi",
				"email": "rafael@gmail.com",
				"phone": "9999999999999"
			}
		]
	}
}
```

Atualiza as informações de um professor

```
Patch /teachers/:id - FORMATO DA REQUISAÇÂO
```

```json
{
	"name": "Rafael Ricciardi",
	"email": "rafael@gmail.com"
}
```

```
Patch /teachers/:id - FORMATO DA RESPOSTA - status 209
```

```json
{
	"message": "Teacher's data successfully updated",
	"data": {
		"id": "863a5291-d6c8-4869-8461-db0dcf4f176b",
		"name": "Rafael Ricciardi",
		"email": "rafael@gmail.com"
	}
}
```

Atualiza as informações de uma turma

```
Patch /classroom/:id - FORMATO DA REQUISAÇÂO
```

```json
{
	"name": "5º ano C",
	"teacher_id": "863a5291-d6c8-4869-8461-db0dcf4f176b"
}
```

```
Patch /classroom/:id - FORMATO DA RESPOSTA - status 209
```

```json
{
	"message": "Classroom's data successfully updated",
	"data": {
		"id": "863a5291-d6c8-4869-8461-db0dcf4f176b",
		"name": "5º ano C",
		"teacher_id": "863a5291-d6c8-4869-8461-db0dcf4f176b"
	}
}
```

Atualiza as informações de um responsável

```
Patch /relatives/:id - FORMATO DA REQUISAÇÂO
```

```json
{
	"name": "Rafael Ricciardi",
	"email": "rafael@gmail.com",
	"phone": "9999999999999"
}
```

```
Patch /relatives/:id - FORMATO DA RESPOSTA - status 209
```

```json
{
	"message": "Relative's data successfully updated",
	"data": {
		"id": "863a5291-d6c8-4869-8461-db0dcf4f176b",
		"name": "Rafael Ricciardi",
		"email": "rafael@gmail.com",
		"phone": "9999999999999"
	}
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
