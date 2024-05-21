# Asymptotic Notation

## Big-O Notation

We use $T(n)$, a function of input size $n$, to represent the bound on the worst-case running time of an algorithm. The meaning of $T(n) = O(f(n))$ for some canonical function $f(n)$ like $n$, $nlogn$, or $n^2$ can be expressed as:

:::tip[Big-O Notation]

- **English Definition:**

  $T(n) = O(f(n))$ if and only if $T(n)$ is eventually bounded above by a constant multiple of $f(n)$. 

- **Mathematical Definition:**

  $T(n) = O(f(n))$ if and only if there exist positive constants $c$ and $n_0$ such that $T(n) \le c \cdot f(n)$ for all $n \ge n_0$.
:::

Mathematical definition is a direct translation of the English definition. The inequality in mathematical definition expresses that $T(n)$ should be bounded above by a multiple of $f(n)$ (with the constant $c$ specifying the multiple). The "for all $n \ge n_0$" expresses that the inequality only needs to hold eventually, once $n$ is sufficiently large (with the constant $n_0$ specifying how large).

If big-O notation is analogous to `less than or equal to` ($\le$), then big-omega and big-theta are analogous to `greater than or equal to` ($\ge$) and `equal to` ($=$) respectively.

## Big-Omega Notation

:::tip[Big-Omega Notation]

- **Mathematical Definition:**

  $T(n) = \Omega(f(n))$ if and only if there exist positive constants $c$ and $n_0$ such that $T(n) \ge c \cdot f(n)$ for all $n \ge n_0$.
:::

## Big-Theta Notation

:::tip[Big-Theta Notation]

- **Mathematical Definition:**

  $T(n) = \Theta(f(n))$ if and only if there exist positive constants $c_1$, $c_2$ and $n_0$ such that 
  
  $c_1 \cdot f(n) \le T(n) \le c_2 \cdot f(n)$ for all $n \ge n_0$.
:::

Saying $T(n) = \Theta(f(n))$ is equivalent to saying that both $T(n) = \Omega(f(n))$ and $T(n) = O(f(n))$.
