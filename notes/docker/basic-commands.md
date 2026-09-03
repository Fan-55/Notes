# Basic Commands

1. Download the image, create and run the container with the command that the user provides. 
If the command is omitted, it will use the default command defined in the `Dockerfile` of image.

    ```
    docker run <image name> [command] [args...]
    ```

2. List all the **running** containers.
    ```
    docker ps
    ```

3. List all the containers including those that are already exited.
    ```
    docker ps --all
    ```

4. Create a container without running it.
    ```
    docker create <image name>
    ```

5. Start the container that was already created with its container id.

    ```
    docker start -a <container id>
    ```
    `-a`: attach to the container so that we can see the output of the program on the console.

    Note that We cannot start an existing container with a new command.

6. Delete all the cache, images and stopped containers.
    ```
    docker system prune
    ```

7. Get the logs from a container without restarting it.
    ```
    docker logs <container id>
    ```

8. Gracefully stop a container.
    ```
    docker stop <container id>
    ```

9. Kill a container immediately
    ```
    docker kill  <container id>
    ```

10. When a container is already running and we would like to execute another command in the container:
    ```
    docker exec -it <container id> <command>
    ```
    `-exec`: Execute additional command in a container. Like executing another command in another shell.

    `-i`: Allow user to provide input to the container.

    `-t`: Beautify the stdout, stderr, stdin.

    For example:
    ```
    docker exec -it <container id> sh
    ```

    `-sh`: Open a sh shell that is attached to the container.

11. Create a container and overwrite the default command with `sh` so that the we get a container that we can interact with and **not having any other process running**.

    ```
    docker run -it <image name> sh
    ```

