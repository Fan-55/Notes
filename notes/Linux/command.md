# Linux command

There are two ways to customize the command's behavior:

1. input
2. option


## Command structure

```
<commandName> [-options] [inputs]
```

The command is a program placed in the shell's search path. We can see all the pathes that the system used to find that command by running `echo $PATH | tr ':' '\n'`.
The command chosen is the first found in the pathes. `which <commandName>` tells such path.

- The command operates on the inputs.

- Not all commands require inputs.

- option can have its own input. e.g. `cal -A 1 7 2026` shows July 2026 and one month after July.


### Command: `history`

1. Apply the command in history:
  
    ```
    !<number of the history>
    ```

2. clear the history:

    ```
    history -c; // clear the history
    history -w; // write those changes to make that permanent
    ```


### Action: close terminal

- shortcut: ctrl + d

- enter `exit`

### Action open terminal

- shortcut: ctrl + alt + t



