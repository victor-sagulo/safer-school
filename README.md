# safer-school

Este é o backend da aplicação safer-school - Uma forma de controlar as entradas e saídas dos alunos de uma determinada instituição de ensino, onde cada aluno possui um responsável que pode retirá-lo da escola ao final das aulas.

##Rotas de listagem

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

```
Get /students/me/:id - FORMATO DA RESPOSTA - status 200
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

```
Get /classroom/me/:id - FORMATO DA RESPOSTA - status 200
```

```json
{
	"id": "863a5291-d6c8-4869-8461-db0dcf4f176b",
	"name": "5º ano C",
	"teacher_id": "863a5291-d6c8-4869-8461-db0dcf4f176b"
}
```

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

##Rotas de post

```
Post /students - FORMATO DA RESPOSTA - status 201
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
	"created_at": "2020-11-30T18:40:08.316Z"
}
```

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
