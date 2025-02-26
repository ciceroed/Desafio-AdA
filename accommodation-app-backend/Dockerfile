FROM python:3.13

WORKDIR /app

COPY pyproject.toml poetry.lock ./
COPY src ./src

RUN pip install poetry && poetry install

EXPOSE 8000

CMD ["poetry", "run", "uvicorn", "src.app.app:app", "--host", "0.0.0.0", "--port", "8000"]
