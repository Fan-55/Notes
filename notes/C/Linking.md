compiler driver
- language preprocessor
- compiler
- assembler
- linker

For example, the GNU compilation system (gcc).
1. cpp: the C preprocessor that translates the C source file main.c into ASCII intermediate file main.i.
2. cc1: the C compiler that translates the main.i into ASCII assembly-language file main.s.
3. as: the assembler that translates the main.s into a binary relocatable object file main.o.

The sections of ELF object file
.data
  - initialized global variables
  - initialized static variables 
  - local variables are not stored here but on stack during run time
.symtab
  - functions
  - global variables
  - no local variables in symbol table

Symbols kinds for linker:
- Global symbols defined by module m and can be referenced by other modules. **Global linker symbols** correspond to:
    - nonstatic C functions
    - nonstatic global variables

- Global symbols that are referenced by module m but defined by some other module. We call such symbols **externals**. The externals correspond to
    - nonstatic C functions
    - nonstatic global variables
    that are defined in other modules.

- Local symbols defined and referenced exclusively by module m. Theses correspond to
    - static C functions
    - static global variables
  These symbols cannot be referenced by other modules.
  The `local` is more like local to its own module instead of local to the procedure (function scope). Hence, its still global to its own module but not global to other modules.
