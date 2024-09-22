# Instruction Set Architecture

Software communicates to hardware via a vocabulary. The words of the vocabulary (all the words that exist in a particular language) are called **instructions**, and the vocabulary itself is called the **instruction set architecture**, or simply **architecture**, of a computer.

The **instruction set architecture** includes anything programmers need to know to make a binary machine language program work correctly, including instructions, I/O devices, and so on.

The words of a computer’s language are called instructions, and its vocabulary is called an **instruction set**.

## RISC-V Instruction Set

[List of pseudoinstructions](https://github.com/riscv-non-isa/riscv-asm-manual/blob/main/riscv-asm.md#pseudoinstructions)

### Arithmetic

Each RISC-V **arithmetic instruction** performs only one operation like addition and must always have exactly 3 variables(operands).

- **Addition:**

    The instruction below adds variables `b` and `c` and put the sum in `a`.

    ```
    add a, b, c
    ```

    Suppose there are more than 2 variables to add up, say 4 variables – `b`, `c`, `d`, and `e`, and we want to store the result to variable `a`. It requires a sequence of instructions:

    ```
    add a, b, c // store the sum of b and c to a
    add a, a, d // store the sum of b, c, and d to a
    add a, a, e // store the sum of b, c, d, and e to a
    ```

- **Register:**

    The operands of arithmetic instructions are from a limited number of special locations built directly in hardware called **registers**. The size of a register in the RISC-V architecture is 32 bits.


    The difference between a programming language's variable and the operands(registers) of instruction is that the number of  registers is limited, typically 32 on current computers. The number of registers is limited because more registers leads to higher clock cycle time (time per clock cycle) due to the fact that electronic signals must travel farther.

    The name of the registers starts with `x` followed by the number of the register. For example, `x2`, `x6`, etc. It's compiler's job to associate the variables with the registers. For example,

    $f = (g+h)-(i+j)$;

    The variable `f`, `g`, `h`, `i`, and `j` are assigned to registers `x19`, `x20`, `x21`, `x22`, and `x23` respectively. The compiled RISC-V instructions will look like:

    ```
    add x5, x20, x21 // store the temp result of g + h to register x5
    add x6, x22, x23 // store the temp result of i + j to register x6
    sub x19, x5, x6
    ```
    RISC-V dedicates register `x0` to be hard-wired to the value zero since 0 offers useful variations that simplify the instruction set. For example, a value in register can be negated by using the `sub` instruction with zero for the first operand.
    
- **Add immediate:**

    When writing a program, we often need to use constants in operations. For example, the increment of an array's index. In order to perform operations on a constant, we first need to load a constant from memory to the register. For example, assuming that the address of constant 4 is `x3 + AddrConstant4`, and we would like to add constant 4 to the whatever content that register `x22` holds.
    
    ```
    lw x9, AddrConstant4(x3)
    add x22, x22, x9
    ```
    
    An alternative way is to offer another arithmetic instruction that one of its operand is a constant. This instruction is called **add immediate** or **addi**.
    
    ```
    addi x22, x22, 4
    ```
    Including constants inside arithmetic instructions results to faster and less energy-consumed operations since it doesn't require to load data from memory.

### Data transfer

The instructions for transferring data between memory and the registers are called **data transfer instructions**.

- **word:** a natural unit of access in a computer, usually a group of 32 bits which corresponds to the size of a register in the RISC-V architecture.

- **doubleword:** another natural unit of access in a computer, usually a group of 64 bits.

- **memory**
    Since the memory is byte addressable (each byte has its own address), the addresses of sequential words differ by 4. To access a word in memory, the instruction must supply the memory address which acts as the index to the array of memory, starting from 0.
    
    The memory address is a number in binary form (i.e., a binary number). The size of the binary number for addresses depends on the architecture. Modern computers commonly use 32-bits or 64-bits memory addressing.

- **load**
    The data transfer instruction for **copying content from memory to a register** is called **load**. For RISC-V, the name is **lw** which stands for **load word**.
    
    The format of the load instruction is the name of operation, followed by the register to be loaded, then the **base register** and a constant (**offset**) used to access the memory. The sum of the content of the base register (**starting address** or **base address**) and the offset (index of the word multiplied by the number of bytes per word) forms the memory address.

    - **Example:**

        Let's say `A` is a memory consists of an array of 100 words. The compiler associates variables `g` and `h` with registers `x20` and `x21` respectively. The starting address (or base address) of `A` is stored in `x22` (base register). The C statement $g=h+A[8];$ in RISC-V instructions would be:

        ```
        lw x9, 32(x22)
        add x20, x21, x9
        ```

        The operand $A[8]$ is in memory so we need to transfer it to a temporary register `x9`. The address of $A[8]$ is the sum of the base of $A$ (stored in `x22`) plus the offset which is $8 * 4 = 32$.
    
- **store**
    The data transfer instruction for **copying data from a register to memory** is called **store**. For RISC-V, the name is `sw` which stands for **store word**.
    
    The format of the store instruction is the name of operation, followed by the register to be stored, then the base register and the offset to select the memory array element.
    
    - **Alignment restriction:** words must start at the addresses that are multiples of 4. RISC-V and x86 doesn't have this restriction while MIPS does.
    - **Example:**
        Assume variable `h` is associated with register`x21`. The base address of array `A` is stored in `x22`. The RISC-V assembly code for C statement $A[12] = h + A[8];$ would be:
        
        ```
        lw x9, 32(x22)
        add x9, x9, x21
        sw x9, 48(x22)
        ```
- **load byte**
    
    Suppose a binary number is represented by certain number of bits that is smaller than the size of the register, we need special instructions that perform the **sign extension** and then load the extended content to the register. The special instructions are **load byte(lb)** and **load byte unsigned(lbu)**. As the name suggested, `lbu` treats the byte as an unsigned number and thus extends the leftmost bit by filling $0$s while `lb` fills the empty bits with the copies of sign bit.
    
    Since C programs use bytes to represent characters rather than using bytes to store very short signed integers, `lbu` is used practically exclusively for the byte loads.

### Logical Operations

It is useful to operate on fields of bits within a word or even on individual bits. Hence, operations of the sort are added to the programming languages and instruction set architectures. These operations(instructions) are called logical operations.

- **shift**
    
    shift instructions move the bits in a word to the left or right and then fill the empty bits with 0s. The RISC-V shift instructions are **shift left logical immediate (slli)** and **shift right logical immediate (srli)**.

        - **Example:**
    
            For example, if register `x19` contained

            $00000000\:00000000\:00000000\:00001001_{two} = 9_{ten}$

            and the instruction to shift left by 4 was executed, the new value would be:
    
            $00000000\:00000000\:00000000\:10010000_{two} = 144_{ten}$

            The RISC-V instruction for above operation would be:

            ```
            slli x11, x19, 4
            ```

            if the original value was in register `x19` and the result goes in register `x11`.

    Shifting left by $i$ bits gives the identical result as multiplying by $2^i$, just as shifting a decimal number by $i$ digits is equivalent to multiplying by $10^i$.

    Besides `slli` and `srli`, there is 3rd shift instruction – **shift right arithmetic (srai)**. This instruction is similar to the `srli`, except that it fills the empty bits with the copies of old sign bit. There are also the variants of the above three shift instructions that take the shift amount from a register rather than from an immediate: `sll`, `srl`, and `sra`.

- **AND**

    AND instruction performs a bit-by-bit operation with two operands, that calculates a 1 only if there is a 1 in both operands.

        - **Example:**

            Register `x11` contains
            
            $00000000\:00000000\:00001101\:11000000_{two}$

            and register `x10` contains

            $00000000\:00000000\:00111100\:00000000_{two}$

            then, after executing the AND instruction

            ```
            and x9, x10, x11
            ```
            the value of register `x9` would be

            $00000000\:00000000\:00001100\:00000000_{two}$

    From the above example, we can know that AND can apply a bit pattern to another set of bits to force the bits, where there is a $0$ in the bit pattern, to become $0$s . Such bit pattern is called a **mask**, since it conceals some bits.

- **OR:**
    
    OR instruction performs a bit-by-bit operation with two operands, that calculates a 1 if there is a 1 in either operand.

        - **Example:**

            If the content of `x11` and `x10` are the same as preceding AND example, the result of OR instruction

            ```
            or x9, x10, x11
            ```

            $00000000\:00000000\:00111100\:00000000_{two}$ // x10
            $00000000\:00000000\:00001101\:11000000_{two}$ // x11

            would be

            $00000000\:00000000\:00111101\:11000000_{two}$ //x9

- **NOT:**

    NOT is a logical bit-by-bit operation with on operand, that inverts each bit meaning replace 1 with 0 and vice versa. However, the RISC-V ISA doesn't include NOT instruction since XOR instruction can have same effect as NOT.

- **XOR:**

    XOR is a bit-by-bit operation with two operands, that calculates the exclusive OR of the two operands. It calculates a 1 only if the operands are different. Since XOR results to 0 if the operands are the same and 1 if the operands are different, the NOT operation is equivalent to `XOR 11...111`.


### Condition Branches

Based on the input data and the values created during computation, different instructions execute. RISC-V includes several decision-making instructions similar to the `if` statement with a `go-to` statement in programming languages.

- **beq:**

    `beq` stands for *branch if equal*.

    ```
    beq rs1, rs2, L1
    ```

    This instruction means go to the statement labeled `L1` if the value in register `rs1` is equal to the value in register `rs2`.

- **bne:**

    `bne` stands for *branch if not equal*.

    ```
    bne rs1, rs2, L1
    ```

    This instruction means go to the statement labeled `L1` if the value in register `rs1` is not equal to the value in register `rs2`.

        - **Example:**
            
            The variables f, g, h, i, j correspond to registers x19 through x23. 

            ```cpp
            if (i == j) {
              f = g + h;
            } else {
              f = g - h;
            }
            ```

            The RISC-V instructions for the above C if statement would be

            ```
            bne x22, x23, Else
            add x19, x20, x21
            beq x0, x0, Exit
            Else: sub x19, x20, x21
            Exit:
            ```

            Instead of using `beq`, testing for the opposite condition to branch over the code in else section will be more efficient. (why?? https://stackoverflow.com/a/71642348/13715554)

            The 2nd line of the instructions will be skipped if `i` doesn't equal `j`.

            At the end of the of the if statement, there is another kind of branch called **unconditional branch**. It means the processor should always follow this branch. To express this kind of branch, we use conditional branch and set the condition to be true.

            As for the else portion of the if statement, it should label `Else` to the instruction.

            The `Exit` label indicates that it's the end of the if-then-else statements.

- **blt:**

    `blt` stands for *branch if less than*

    ```
    blt rs1 rs2 L1
    ```

    This instruction means go to the statement labeled `L1` if value of `rs1` is smaller than the value of `rs2` when they are treated as two's complement numbers.

- **bltu:**

    `bltu` stands for *branch if less than, unsigned*

    It's the same as `blt` except that the value in `rs1` and `rs2` are treated as unsigned numbers.

- **bge:**

    `bge` stands for *branch if greater than or equal*

    ```
    bge rs1 rs2 L1
    ```

    This instruction means go to the statement labeled `L1` if value of `rs1` is at least the value of `rs2`.

- **bgeu:**

   `bgeu` stands for *branch if greater than or equal, unsigned*


    It's the same as `bge` except that the value in `rs1` and `rs2` are treated as unsigned numbers.


Decision-making instructions are also the building blocks for the loops besides the if statements.

    - **Example**:

        The variable `i` and `k` correspond to register `x22` and `x24`, and the base of array save is in `x25`.

        ```cpp
        while (save[i] == k) {
          i += 1;
        }
        ```

        To load the $i$ th element in the `save` array to the temporary register `x9`, we need the address of the element. Due to byte-addressing of memory, the offset stored in temporary register `x10` would be index $i$ multiplying by $4$. We perform the multiplication by shifting `x22` to the left by 2 positions and stored the shifted result in register `x10`. Then, adding offset to the base address `x25`. After that, we can load the content of `save[i]` from memory to register `x9`. `Loop` label is added at the beginning so we can loop back to the top.
        
        ```
        Loop: slli  x10, x22, 2
        add x10, x10, x25
        lw x9, 0(x10)
        ```

        The next instruction perform the loop test to check if `save[i]` doesn't equal `k`.

        ```
        bne x9, x24, Exit
        ```

        Add 1 to i if `save[i]` equals `k`.

        ```
        addi x22, x22, 1
        ```

        At the end of the loop, it branches back to the top of the loop using the unconditional branch with `Loop` label.

        ```
        beq x0, x0, Loop
        ```

        `Exit` label is added at the end for the end of while statement.

        ```
        Exit:
        ```       

    - **bne:**

### Procedure

Procedure call:

The jump-and-link instruction branches to the address of a procedure and simultaneously saves the address of the following instruction as the **return address** in a register which usually is `x1` in RISC-V.

```
jal x1, ProcedureAddress
```

Procedure return:



### Instruction format

#### R-type instruction format

- opcode: basic operation of the instruction
- rd: the register destination operand that stores the result of the operation
- funct3: additional opcode field
- rs1: the 1st register source operand
- rs2: the 2nd register source operand
- funct7: addition opcode field

| funct7 | rs2   | rs1   | funct3 | rd    | opcode |
| ------ | ----- | ----- | ------ | ----- | ------ |
| 7bits  | 5bits | 5bits | 3bits  | 5bits | 7bits  |

#### I-type instruction format

- immediate: the 12-bit immediate is interpreted as a two's complement value so it can represent integer between $2^{11} - 1$ to $-2^{11}$.

| immediate | rs1   | funct3 | rd    | opcode |
| --------- | ----- | ------ | ----- | ------ |
| 12bits    | 5bits | 3bits  | 5bits | 7bits  |

When the I-type format is used for load instructions, the immediate represents a byte offset, so the load word instruction can refer to any word within the region of $\pm2^{11}$ or $2048$ bytes of the base address in the base register rs1.

For shift instructions, it is not useful to shift a 32-bit register by more than 31 bits, so only the lower bits of the I-type format's 12-bit immediate are actually used and then the remaining bits are repurposed as additional opcode field, funct7.

#### S-type

| immediate[11:5] | rs2   | rs1    | funct3 | immediate[4:0]    | opcode |
| --------------- | ----- |------- | ------ | ----------------- | ------ |
| 7bits           | 5bits | 5bits  | 3bits  | 5bits             | 7 bits |

