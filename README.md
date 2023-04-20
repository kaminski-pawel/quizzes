# App for preparation for tech certifications

## How to start

1. First, create a superuser.

```console
docker-compose run --rm app sh -c "python manage.py createsuperuser"
```

1. Using the superuser credentials log to `http://127.0.0.1:8321/admin/questions/questionset/add/` and create new Question Set. In this example, I create `DVA-C02`.

1. Populate the database using the json files stored in app/data. For example:

```console
docker-compose run --rm app sh -c "python manage.py questions_populate --file '/app/data/DVA-C02_2023-04.json' --exam DVA-C02"
```

## Useful commands

Build service.

```console
docker-compose build
```

Create and start containers. The website should be availabe on `http://127.0.0.1:8000/`.

```console
docker-compose up
```

Run a one-off command on a service. Here: `python manage.py shell`.

```console
docker-compose run --rm app sh -c "python manage.py shell"
```

Create a webpack bundle with `--watch` flag.

```console
npm run build-dev --prefix app/ui
```

Stop and remove containers, networks.

```console
docker-compose down
```
