# Minimum Spanning Tree (MST)

A tree is a acyclic connected graph. 

A spanning tree of a connected graph $G$ is a subgraph that contains all that graph's vertices and is a single tree.

The input of the MST problem is an undirected graph $G = (V,E)$ in which each edge $e$ has a real-valued cost $C_e$. The goal is to compute a spanning tree of the graph $G$ with the minimum-possible sum of edge costs.

By the definition of a spanning tree of $G$, the edges of the spanning tree $T$ should be a subset of the edges $E$ ($T \subseteq E$) and there should be a path between every pair $(v,w) \in V$ of vertices since a spanning tree is connected. Besides, it is reasonable to assume that the graph $G$ is connected because if there is no path of edges in $E$ between a pair of vertices $(v,w) \in V$, then there can be no such path in $T$ either, as $T\subseteq E$.

## Prim's Algorithm


maximum edge cost = bottleneck of a path

Minimum Bottleneck Property (MBP)

For a graph $G=(V,E)$ with real-valued edge costs, an edge $(v,w) \in E$ satisfies the minimum bottleneck property (MBP) if it is a minimum-bottleneck $v-w$ path. In other words, an edge $(v,w)$ of cost $c_{uw}$ satisfies MBP if and only if there is no $v-w$ path consisting solely of edges with cost less than $c_{vw}$

:::
For every connected graph $G=(V,E)$ with real-valued edge costs, every edge chosen by the Prim's algorithm satisfies the MBP.
:::

Let $G=(V,E)$ with distinct real-valued edge costs, and $T$ a spanning tree of $G$. If every edge of $T$ satisfies MBP, $T$ is a minimum spanning tree.
