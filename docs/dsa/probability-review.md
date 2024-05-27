# Probability Review

## 1. Sample space

The **sample space** $\Omega$ is a set of all possible outcomes of a **random process**. $\Omega$ is usually finite in algorithms. Each **outcome** $i\in\Omega$ has a probability $p(i)\ge 0$ and the sum of the probabilities should be $1$ ($\sum\limits_{i\in\Omega}p(i)=1$).

**Example 1:** 

- Random process: Roll 2 dice. 

  $\Omega=\{(1,1),(2,1),(3,1),...(5,6),(6,6)\}$.

  The sample space contains 36 ordered pairs and $p(i)=\dfrac 1 {36}$ for all $i\in\Omega$.

**Example 2:**

- Random process: Chose a random pivot in outermost quicksort call.

  $\Omega=\{1,2,...,n\}$

  The sample space is every index of input array of length $n$ and $p(i)=\dfrac 1 n$ for all $i\in\Omega$

## 2. Events

An event is a subset of sample space $S\subseteq\Omega$. An event is just a bunch of stuff that might happen. We know the probability of each individual thing that can happen, so we add them up the get the probability of an event. The probability of an event $S$ is $\sum\limits_{i\in S}p(i)$.

**Example 1:** Rolling 2 dice. Consider the subset of outcomes in which the sum of the two dice equals $7$. What is the probability of this event?

$S=\{(1,6),(2,5),(3,4),(4,3),(5,2),(6,1)\}$

Each of the 36 outcomes is equally likely and has the probability of $\dfrac 1 {36}$. We have 6 members of the set, so the probability $Pr[S]=\dfrac 6 {36}=\dfrac 1 6$.

**Example 2:** Consider the event (i.e., the subset of outcomes) in a quicksort call that the chosen pivot will give a 25-75 split or better (both of the subarrays have at least 25% of the elements). What's the probability of this event?

Let's assume the array has 100 elements. We want both subarrays to have at least 25% of the elements, so neither one has more than 75% of the elements. If we choose an element that's 26 or bigger in value, the left subarray will have 25 elements from 1 through 25. If we choose an element that's at most 75, the right subarray will have at least 25 elements from 76 through 100. Hence, everything between 26 and 75 inclusive is going to give us a 25-75 split. More generally, any pivot from the middle 50% of the quantiles is going to give us the desired split.

$S=\{{(\dfrac{n}{4} + 1})^{th}\text{smallest element}, ..., {(\dfrac{3n}{4}})^{th}\text{smallest element}\}$

$Pr[S]={\dfrac{n/2}{n}} =\dfrac12$

## 3. Random Variables

A random variable $X$ is a numerical measurement of the outcome of a random process. It is a real-valued function defined on the sample space $\Omega$. The input $i\in\Omega$ to $X$ is an outcome of a random process, and the output $X(i)$ is a numerical value.

$X:\Omega\rightarrow\mathbb{R}$

**Example 1:**

- Random process: Flip a fair coin twice.

- Random variable: The number of heads.

  $\Omega=\{HH,HT,TH,TT\}$ where $H$ denotes head and $T$ denotes tail.

  $X(HH) = 2$

  $X(HT) = X(TH) = 1$

  $X(TT) = 0$

  The random variable $X$ can **take on** $0$, $1$, or $2$.

**Example 2:** 

- Random process: Roll 2 dice. 

- Random variable: Sum of the two dice.

  The random variable maps the outcomes, pairs $(i,j)$ for all $i,j\in\{1,2,3,4,5,6\}$, in the sample space $\Omega=\{(1,1),(2,1),(3,1),...(5,6),(6,6)\}$ to real numbers according to the map $(i,j)\mapsto i+j$.

  The random variable $X$ can take on $2,3,4,...,11$ or $12$.

  $X((i,j))\in\{2,3,4,...,11,12\}$

**Example 3:** 

- Random process: Outermost call to quicksort on an array of length $n$.

- Random variable: Length of the subarray passed to the first recursive call.

  This random variable maps each outcome (i.e., each choice of the pivot) to an integer between $0$ to $n-1$. It's $0$ if the chosen pivot is the smallest item so no item is passed to the first recursive call. It's $n-1$ if the chosen pivot is the largest item so all the items except the pivot are passed to the recursive call.

  The random variable $X$ can take on $0,1,...,n-2$ or $n-1$.

### Probability based on random variable

When random variable $X$ takes on a value $x$, the input is an event $\omega$ of the sample space. The event can have more than 1 outcome. In example 1, when random variable takes on value $1$, the event is the subset of outcomes that has one head $\omega=\{HT, TH\}$.

We use $x$ to denote the value that a random variable takes on and $\omega$ to denote the event. 

$X(\omega)=x$ is expressed as: random variable $X$ takes on $x$.

Hence, the probability of an event that cause random variable takes on a value can be expressed as:

$Pr[X=x]$


## 4. Expectation

The **expectation** or **expected value** $E[X]$ of a random variable $X$ is its average value over everything that could happen (all the outcomes), weighted appropriately with the possibilities of different outcomes.

The value of random variable depends on the outcome of a random process. We can't predict what would be the outcome of a random process and thus we can't predict the value of a random variable. That's why it's random! That is also the reason why we would like to have a value to represent the value of random variable on average. If the random process occurs repeatedly, $E[X]$ is the long-run average value of random variable $X$.

The mathematical expression of $E[X]$:

$E[X]=\sum\limits_{i\in\Omega}p(i)\cdot X(i)$

where $p(i)$ is the probability of outcome $i\in\Omega$.

**Example 1:** 

- Random process: Roll 2 dice. 

- Random variable: Sum of the two dice.

  There are $6 * 6 = 36$ outcomes in the sample space.

  $\Omega=\{(1,1),(2,1),(3,1),...(5,6),(6,6)\}$

  The probability of each outcome is $\dfrac 1{36}$.

  The expectation of the sum of the two dice:

  $E[X] = 2\cdot\dfrac1{36} + 3\cdot\dfrac1{36} + ... + 12\cdot\dfrac1{36} = 7$

**Example 2:**

- Random process: The outermost call to quicksort on an array of length $n$. A pivot element is chosen randomly.

- Random variable: Length of the subarray passed to the 1st recursive quicksort call.

  There are $n$ outcomes in the sample space.

  $\Omega=\{p_1, p_2, ... ,p_n\}$

  $p_i$ denotes the $i$ th order statistic of input array.

  The length of the subarray passed to the 1st recursive call depends on the order statistic of chosen pivot. For example, if the chosen pivot is 4th order statistic, the length of subarray passed to the 1st recursive call would be 3. The random variable takes on value ranging from $0$ to $n-1$. The probability of each outcome is $\dfrac1n$.

  $E[X] = \underbrace{0\cdot\dfrac1n + 1\cdot\dfrac1n + ... + (n-1)\cdot\dfrac1n}_\text{n items}=\dfrac{(n-1)\cdot\dfrac1n\cdot n}2=\dfrac {n-1}2$


**Example 3:** The random process is to roll a dice. The random variable is the number of the dice. The expected value would be $3.5$.

## 5. Linearity of Expectation

Let $X_1,...,X_n$ be random variables defined on same sample space $\Omega$, and let $a_1, ..., a_n$ be real numbes. Then:

$E[\sum\limits_{j=1}^n a_j\cdot X_j]=\sum\limits_{j=1}^n a_j \cdot E[X_j]$

**Proof:**

$\sum\limits_{j=1}^nE[X_j]
\\= \sum\limits_{j=1}^n \sum\limits_{i\in\Omega} p(i)\cdot X_j(i)
\\= \sum\limits_{i\in\Omega} \sum\limits_{j=1}^n p(i)\cdot X_j(i)
\\= \sum\limits_{i\in\Omega}p(i) (\sum\limits_{j=1}^n X_j(i))
\\= E[\sum\limits_{j=1}^nX_j(i)]$

**Example:** 

- Random process of load balancing: Randomly assign a process to one of the $n$ servers, and there are $n$ processes to be sent to the server.

- Random variable $Y$: The count of processes assigned to any one of the $n$ servers, which is also known as the `server load`. The story is the same for all the servers due to symmetry, so we may just focus on the first server – server 1.

- Goal: Compute the expectation of server load $E[Y]$ (i.e., the average server load).

  Since each process can be assigned to one of the $n$ servers, the sample space has $n^n$ outcomes. Each outcome would look like this:

  $\underset{P_1}{\underset{\_\_\_}{10}}\:\underset{P_2}{\underset{\_\_\_}{5}}\:\underset{...}{}\:\underset{P_n}{\underset{\_\_\_}{79}}\:$

  where $P_i$ denotes process $i$ and the corresponding value is the id of server ranging from $1$ to $n$. In the outcome above, process 1 is assigned to server 10, process 2 is sent to server 5, etc. Given an outcome, we can compute the count of processes that assigned to server 1, which is the value that random variable $Y$ can take on.

  Computing $E[Y]$ using the definition of expectation is impractical since the number of outcomes is too big to handle. Luckily, $Y$ can be expressed as the sum of simpler random variables $X_j$s.

  For the simpler random variable $X_j$,

  - Random process: Randomly assign a process to one of the $n$ servers **once**.

  - Random variable $X_j$: The count of processes assigned to server 1 at $j$th time. $j$ ranges from $1$ to $n$.
  
    Because one process can be assigned to one of the $n$ servers, the sample space $\Omega=\{1,2,...,n\}$. Each outcome is the id of the server that the process is possibly assigned to. Given an outcome, we can compute the count of processes that assigned to server 1, which is either $0$ or $1$.

    $X_j=\begin{cases}
    1 & \text{if the jth process is assigned to server 1}\\
    0 & \text{otherwise}
    \end{cases}$

  Because the total count of processes assigned to server 1 is the sum of the count of processes assigned to server 1 per assignment, we get:

  (1) $Y=\sum\limits_{j=1}^{n}{X_j}$

  Combining the definition of linearity expectation $E[\sum\limits_{j=1}^nX_j]=\sum\limits_{j=1}^nE[X_j]$ and eq(1), we get:

  (2) $E[Y]\stackrel{eq(1)}{=}E[\sum\limits_{j=1}^{n}{X_j}]\stackrel{\text{linearity expectation definition}}{=}\sum\limits_{j=1}^nE[X_j]$

  Unlike computing $E[Y]$, it's easy to compute the expectation of $X_j$. By the definition of expectation:

  (3) $E[X_j] = Pr[X_j=0] \cdot 0 + Pr[X_j=1] \cdot 1 = Pr[X_j=1] = \dfrac 1 n$

  where $Pr[X_j=1]$ is the probability of the event that cause random variable to take on $1$. The probability of assigning a process to server 1 is $\dfrac 1 n$ because there are $n$ servers for one process.

  Putting (2) and (3) together, we have

  $E[Y]=\sum\limits_{j=1}^nE[X_j]=\sum\limits_{j=1}^n\dfrac 1 n = n\cdot\dfrac 1 n = 1$

  To conclude, the expectation of server load is $1$, meaning the average server load is $1$.
