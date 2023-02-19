# App for preparation for tech certifications

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
