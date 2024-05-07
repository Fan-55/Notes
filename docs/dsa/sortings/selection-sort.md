# Selection Sort

First, find the smallest item in the array and exchange it with the first entry. If the first entry is the smallest, it should exchange itself. Then, find the next smallest item and exchange it with the second entry. Continue in this way until the whole array is sorted.

**Algorithm invariants:**

- Entries to the left of $i$ (including $i$) are fixed and in ascending order.
- No entry to right of $i$ is smaller than any entry to the left of $i$ (including $i$).

**Implementations:** 
[Code snippet](https://github.com/Fan-55/Algorithms/blob/main/src/Selection.java)

```jsx
import edu.princeton.cs.algs4.StdIn;
import edu.princeton.cs.algs4.StdOut;

public class Selection {
  public static void sort(Comparable[] a) {
    for (int i = 0; i < a.length; i++) {
      int min_item_index = i;
      /// Find the minimum item from the remaining array
      for (int j = i + 1; j < a.length; j++) {
        if (less(a[j], a[min_item_index])) {
          min_item_index = j;
        }
      }
      /// Exchange minimum item with the ith item
      exchange(a, i, min_item_index);
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

  private static void show(Comparable[] a) {
    /// Print the array, on a single line.
    for (Comparable comparable : a) {
      StdOut.print(comparable + " ");
    }
    StdOut.println();
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

  public static void main(String[] args) {
    String[] a = StdIn.readAllStrings();
    sort(a);
    assert isSorted(a);
    show(a);
  }
}
```

**Performance:**
The cost model of sorting algorithms is the number of **compares** and **exchanges**. If the algorithms don't use exchanges, we count **array accesses**.

- **Time complexity**: $O(N^2)$
- **Space complexity**: $O(1)$

:::tip[Hypothesis]
**Proposition:** Selection sort uses $\sim{N^2}/2$ compares and $N$ exchanges to sort an array of length $N$.

**Proof:** For each $i$ from $0$ to $N-1$, there is $1$ exchange and $N-1-i$ compares, so the totals are $N$ exchanges and $(N-1) + (N-2) + ...+2+1+0 = N(N-1)/2 \sim{N^2/2}$ compares.
:::
