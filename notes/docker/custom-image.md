# Custom Image

Create an image that runs redis-server.


```jsx title="Dockerfile"
FROM alpine // base image

RUN apk add --update redis // install application

CMD ["redis-server"] // command to run when starting the container
```

```
docker build <path to Dockerfile>
```


