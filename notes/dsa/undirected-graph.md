---
toc_min_heading_level: 2
toc_max_heading_level: 5
---

# Undirected Graph

## 1. Glossary

| Keyword                | Description                                                                                                        |
|----------------------- |------------------------------------------------------------------------------------------------------------------- |
| **subgraph**           | A subset of a graph's edges with associated vertices that constitutes a graph.                                     |
| **adjacent**           | The vertices are adjacent to one another if there is an edge incident to both vertices.                            |
| **degree of a vertex** | The number of edges incident to it.                                                                                |
| **path***              | A sequence of vertices connected by edges.                                                                         |
| **simple path**        | A path with no repeated vertices.                                                                                  |
| **cycle**              | A path with at least one edge whose first and last vertices are the same.                                          |
| **simple cycle**       | A cycle with no repeated edges or vertices (except the requisite repetition of the first and last vertices).       |
| **length**             | The length of a path or a cycle is its number of edges.                                                            |
| **connected**          | A vertex is connected to another vertex if there exists a path that contains both of them.                         |
| **connected graph**    | A graph is connected if there is a path from every vertex to every other vertex in the graph. In other words, if, for every pair of vertices in the graph, there exists a path between them.|
| **connected component**| A graph that is not connected consists of a set of connected components, which are the maximal connected subgraphs.|
| **acyclic graph**      | A graph without cycles.                                                                                            |
| **tree**               | A tree is a acyclic connected graph.                                                                               |
| **forest**             | A disjoint set of trees is a forest.                                                                               |
| **spanning tree**      | A spanning tree of a connected graph is a subgraph that contains all of that graph’s vertices and is a single tree.|
| **spanning forest**    | A spanning forest of a graph is the union of spanning trees of its connected components.                           |

*It's assumed that paths are simple unless this assumption is specifically relaxed by referring to specific repeated vertices or to general paths.

<div style={{ textAlign: 'justify' }}>

## 2. Graph Representations

### 2.1 Graph API 

```
public class Graph
-------------------------------------------------------------------------------------------
                  Graph(int V)          # create a V-vertex graph with no edges
                  Graph(In in)          # read a graph from input stream in
                  int V()               # number of vertices
                  int E()               # number of edges
             void addEdge(int v, int w) # add edge v-w
Iterable<Integer> adj(int v)            # vertices adjacent to v
           String toString()            # string representation
```

The graph API is the abstract data type of a graph which defines the fundamental graph operations that allow us to address the graph-processing tasks.
The graph representation is the data structure that implements the graph API. A graph representation has two requirements:

- It must have space to accommodate graphs of different size and structure that may be encountered in the applications.
- The operations of the graph API must be time-efficient.

### 2-2 Adjacency list
For the graphs that are not dense, we will use the **adjacency list** data structure. It is implemented with a vertex-indexed array of lists which is an array
where each index corresponds to a specific vertex in a graph and each entry of the array is a list of vertices adjacent to the vertex corresponding to that
entry's index.
[[See the implementation here]](https://github.com/Fan-55/Algorithms/blob/main/src/UndirectedGraph.java)

### 2-3 Adjacency matrix

An adjacency matrix is a V by V boolean array with the entry of row v and column w marked as `true` if there is an edge between vertex v and w and as `false` otherwise.
However, the space cost of $V^2$ is prohibitive when there are a large number of vertices in the graph.

### 2-4 Array of edges

The graph can be represented by an array of edges where each edge is an instance of Edge class that has two instance fields of int type for the vertices connected by the edge.
The `adj` operation of this representation requires scanning through all the edges, which fails the 2nd requirement.

## 3. Graph processing algorithms

### 3.1 Design pattern for the implementation of graph processing algorithm

The implementation of a graph processing algorithm is decoupled from the graph representation.
A graph processing algorithm processes a graph and then generate some results from which we can get useful information such as the connectivity of a graph
or the connectivity between specified vertices. Each graph processing algorithm is implemented using a class so that the clients can perform the graph processing
task by instantiating the class. More specifically, the constructor of the class takes a graph as input and processes the graph to build a data structure that can
efficiently respond to the client query. The client program would typically build the graph and pass that graph to the constructor of graph processing algorithm
class and then call the methods of the class to get the information that the client needs. For example, the API of a search graph processing algorithm:

### 3.2 Search API

```
public class Search
-------------------------------------------------------------------------------------------
        Search(Graph G, int s) # find vertices connected to a source vertex s
boolean marked(int v)          # is v connected to s
    int count()                # number of vertices connected to s
```

#### 3.2.1 Depth-first Search

Depth-first search (DFS) is a data type that implements the Search API. [[See the implementation here]](https://github.com/Fan-55/Algorithms/blob/main/src/DepthFirstSearch.java)


### 3.3 Path API

**Single-source paths problem.** Given a graph and a source vertex s, support queries of the form:
- Is there a path from s to v?
- If so, find such a path.

```
public class Path
-------------------------------------------------------------------------------------------
                  Path(Graph G, int s)    # find path in G from source s
          boolean hasPathTo(int v)        # is there a path from s to v
Iterable<Integer> pathTo(int v)           # path from s to v; null if no such path
```

#### 3.3.1 Depth-first search to find paths in a graph

[[See the implementation here]](https://github.com/Fan-55/Algorithms/blob/main/src/DepthFirstPath.java)


#### 3.3.2 Breadth-first search to find paths in a graph

For any vertex v reachable from s, the path from s to v computed by BFS is the shortest path, meaning the path has the least edges than all the other paths.

[[See the implementation here]](https://github.com/Fan-55/Algorithms/blob/main/src/BreadthFirstPath.java)


### 3.4 Connected components API

```
public class CC
-------------------------------------------------------------------------------------------
        Path(Graph G)            # preprocessing constructor
boolean connected(int v, int w)  # are v and w connected?
    int count()                  # number of connected components
    int id(int v)                # component identifier for v ranging from 0 to count() - 1
```

#### 3.4.1 Depth-first search to find connected components in a graph

[[See the implementation here]](https://github.com/Fan-55/Algorithms/blob/main/src/ConnectedComponents.java)

</div>
