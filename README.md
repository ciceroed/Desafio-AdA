# Desafio Anfitriões de Aluguel

Sistema para listar acomodações utilizando **FastAPI**, **React** e **SQLite**.

## Configuração e Execução

### Clonar o Repositório
```bash
git clone https://github.com/ciceroed/Desafio-AdA
cd Desafio-AdA
```

### Executar a Aplicação com Docker
```bash
docker-compose up --build
```

### Acesso aos Serviços
- **Frontend**: [localhost:3000](http://localhost:3000)
- **Backend**: [localhost:8000/docs](http://localhost:8000/docs)

### Executar Manualmente

#### Backend
```bash
cd accommodation-app-backend
```

Instalar dependências:
```bash
poetry shell
poetry install
```

Executar o servidor com Uvicorn:
```bash
poetry run uvicorn src.app.app:app --reload
```

#### Frontend
```bash
cd React/accommodation-app
```

Instalar dependências e executar o projeto:
```bash
npm install
npm start
```

