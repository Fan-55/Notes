# Directed Graph

## 1. Glossary

A directed graph is a set of vertices and a collection of **directed** edges. Each directed edges connects an ordered pair of vertices.

| Keyword                   | Description                                                                             |
| ------------------------- | --------------------------------------------------------------------------------------- |
| **directed edge**         | A directed edge points from the 1st vertex and points to the 2nd vertex.                |
| **outdegree of a vertex** | number of edges going from it                                                           |
| **indegree of a vertex**  | number of edges going to it                                                             |
| **head**                  | 1 st vertex of a directed edge                                                          |
| **tail**                  | 2 nd vertex of a directed edge                                                          |
| **v->w**                  | an edge points from v to w                                                              |
| **directed path***        | a sequence of vertices where each vertex has a directed edge leading to next vertex     |
| **simple directed path**  | a directed path without repeated vertices                                               |
| **directed cycle**        | a directed path with at least one edge whose first and last vertices are the same       |
| **simple cycle**          | a cycle with no repeated edges or vertices except the requisite first and last vertices |
| **reachable**             | w is reachable from v if there is a directed path from v to w                           |
| **DAG**                   | Directed Acyclic Graph is a graph without directed cycles                               |


*We assume that paths are simple unless this assumption is specifically relaxed by referring to specific repeated vertices or to general paths.


```
public class DirectedDFS
-------------------------------------------------------------------------------------------
        DirectedDFS(Graph G, int s)                     # find vertices reachable from s
        DirectedDFS(Graph G, Iterable<Integer> sources) # find vertices reachable from sources
boolean marked(int v)                                   # is v reachable
```

**Single-source reachability.** Given a directed graph and a source vertex s, support queries of the form – Is there a directed path from s to v?
 
**Multiple-source reachability.** Given a directed graph and a set of source vertices, support queries of the form – Is there a directed path from any vertex in the set to v?


## Topological sort

Given a directed graph, put the vertices in order such that all its directed edges point from a vertex earlier in the order to a vertex later in the order or report that doing so is not possible. This order is called **topological order**. A directed graph has a topological order if and only if it is a DAG.

### How to detect a cycle in directed graph
```
public class DirectedCycle
-------------------------------------------------------------------------------------------
                  DirectedCycle(Graph G) # cycle-finding constructor
          boolean hasCycle()             # does G have a directed cycle
Iterable<Integer> cycle()                # vertices on a cycle
```

### 
```
public class Topological
-------------------------------------------------------------------------------------------
                  Topological(Graph G) # topological-sorting constructor
          boolean isDAG()              # Is G a DAG
Iterable<Integer> order()              # vertices in topological order
```

## Strong connectivity in directed graph

Two vertices v and w are **strongly connected** if thy are mutually reachable. In other words, there is a directed path from v to w and a directed path from w to v.

A directed graph is **strongly connected** if each pair of the vertices of the graph is strongly connected.
