FROM denoland/deno:alpine-2.2.4

WORKDIR /app

COPY deno.json .

RUN DENO_FUTURE=1 deno install

COPY . .

CMD [ "run", "--allow-env", "--allow-net", "--watch", "app-run.js" ]