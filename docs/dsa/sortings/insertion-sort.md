# Insertion Sort

Insertion sort iterates the items and insert each item into the proper place among the items that are already sorted. In iteration $i$, exchange `a[i]` with each entry to the left of $i$ that is larger than `a[i]`. To check if the entry to the left of $i$ is larger than `a[i]`, we need another index $j$ starting from $i$ to keep track of `a[i]` (`a[i]` is now pointed by `a[j]`) and the entry to the left of `a[i]` (i.e., `a[j-1]`). After `a[i]` exchanges with the larger entry, $j$ should decrease by $1$ so that $j$ still points to `a[i]`.

**Algorithm invariants:**

- Entries to the left of $i$ including $i$ is sorted in ascending order.
- Entries to the right of $i$ have yet been seen.

**Implementations:**
[Code snippet](https://github.com/Fan-55/Algorithms/blob/main/src/Insertion.java)

```jsx showLineNumbers
import edu.princeton.cs.algs4.StdIn;
import edu.princeton.cs.algs4.StdOut;

public class Insertion {
  public static void sort(Comparable[] a) {
    for (int i = 0; i < a.length; i++) {
      for (int j = i; j > 0; j--) {
        if (less(a[j], a[j-1])) {
          exchange(a, j, j-1);
        } else {
          break;
        }
      }
    }
  }

  private static boolean less(Comparable a, Comparable b) {
    return a.compareTo(b) < 0;
  }

  private static void exchange(Comparable[] a, int i, int j) {
    Comparable temp = a[i];
    a[i] = a[j];
    a[j] = temp;
  }

  public static boolean isSorted(Comparable[] a) {
    for (int i = 1; i < a.length; i++) {
      /**
       * If the item with higher index is less than the item with lower
       * index, it is not sorted.
       */
      if (less(a[i], a[i - 1])) {
        return false;
      }
    }
    return true;
  }

  private static void show(Comparable[] a) {
    /// Print the array, on a single line.
    for (Comparable comparable : a) {
      StdOut.print(comparable + " ");
    }
    StdOut.println();
  }

  public static void main(String[] args) {
    String[] a = StdIn.readAllStrings();
    sort(a);
    assert isSorted(a);
    show(a);
  }
}
```

**Performance:**
The cost model of sorting algorithms is the number of **compares** and **exchanges**. Unlike selection sort, the running time of insertion sort depends on the initial order of the items in the input. If the array is already in order or nearly in order, insertion sort is much faster than if the entries is randomly ordered or in reverse order.

- **Time complexity**: $O(N^2)$
- **Space complexity**: $O(1)$

:::tip[Hypothesis]
**Proposition:** Insertion sort uses:
1. $\sim{N^2}/4$ compares and $\sim{N^2}/4$ exchanges to sort an **randomly** ordered array of length $N$ with **distinct key**, on average.
2. $\sim{N^2}/2$ compares and $\sim{N^2}/2$ exchanges to sort an array at worst case.
3. exactly $N-1$ compares and $0$ exchanges to sort an array at best case.

**Proof:**

- At worst case (array in reverse order)

  i = 0, j = 0 → $0$ compares and $0$ exchanges

  i = 1, j = 1 → $1$ compares and $1$ exchanges

  i = 2, j = 2 to 1 → $2$ compares and $2$ exchanges

  ...

  i = N-1, j = N-1 to 1 → $N-1$ compares and $N-1$ exchanges


  Number of compares = $0 + 1 + 2 + ... + (N - 1) = N(N-1)/2\sim{N^2}/2$

  Number of exchanges = $0 + 1 + 2 + ... + (N - 1) = N(N-1)/2\sim{N^2}/2$

- At best case (array is already sorted)

  At each iteration except the first ($i = 0$), the current item is larger than the entries to the left of current item , so there are $1$ compares and $0$ exchanges for each iteration. Note that $j$ is not greater than $0$ at first iteration so there is no compare and no exchange. To sum up, the number of compares is $N-1$ and the number of exchanges is $0$.

- On average (array is randomly ordered)

  It is expected that each item goes about halfway back, on average, so the number of exchanges on average is one-half of the number of exchanges at the worst case (each item goes all the way back to the beginning). Hence, the number of exchanges $\sim{N^2}/4$.
  
  As for the number of compares, it will be the number of exchanges plus $1$ when the item is not the smallest among the left entries (i.e., the not worst case) at each iteration.
  
  For example, there is an array `a = [5, 8, 6, 7, 4]`. At $i = 2$ iteration, the left entry `a[1] = 8` is larger than the current item `a[2] = 6` (one compare), and thus one exchange is performed. Now, `a=[5, 6, 8, 7, 4]`. The inner loop keeps going to check if the left entry `a[0] = 5` is greater than `a[1] = 6`, which it is not and the inner loop stops, so there is only one more compare but no exchange. Given this example, we can conclude that the number of compares is the number of exchanges plus $1$ if the current item is not the smallest among the left entries.

  Thus, the total number of compares is equal to the number of exchanges plus $N$ minus the times that the inserted item is the smallest (no extra compare for the worst case), which would be a constant that is negligible in relation to the total. As a result, the number of compares
  is also $\sim{N^2}/4$.
:::

**Partially sorted array**

An inversion is a pair of entries that are out of order in the array. For example, `E X A M P L E` has 11 inversions: `E-A`, `X-A`, `X-M`, `X-P`, `X-L`, `X-E`, `M-L`, `M-E`, `P-L`, `P-E`, and `L-E`. If the number of inversions is less than or equal to a constant multiple of the array size, the array is said to be **partially sorted** (number of inversions $\le cN$ ). Insertion sort is efficient for this kind of arrays when the number of inversions is low.

:::tip[Hypothesis]
**Proposition:** The number of exchanges used by insertion sort is equal to the number of inversions in the array, and the number of compares is at least equal to the number of inversions and at most equal the number of inversions plus the array size minus $1$.

**Proof:** Every exchange of insertion sort involves two inverted adjacent items and thus reduce the number of inversions by 1. For example, the exchange of `X-A` reduces the inversions by 1. Every exchange corresponds to a compare, and an additional compare might happen for each value of i from 1 to N-1 (when a[i] does not reach the left end of the array).
:::
