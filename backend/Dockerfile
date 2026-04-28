FROM python:3.12-bookworm

WORKDIR /app

ENV PYTHONUNBUFFERED=1 \
PYTHONDONTWRITEBYTECODE=1

COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

COPY pyproject.toml uv.lock* /

RUN uv sync --frozen

COPY . .

EXPOSE 8000
