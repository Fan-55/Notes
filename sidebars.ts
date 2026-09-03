import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  notes: [
    {
      type: 'doc',
      label: 'README',
      id: 'readme',
    },
    {
      type: 'category',
      label: 'Data structures and Algorithms',
      link: {
        type: 'generated-index',
        slug: '/dsa'
      },
      items: [
        {
          type: 'doc',
          id: 'dsa/asymptotic-notation',
          label: 'Asymptotic Notation',
        },
        {
          type: 'doc',
          id: 'dsa/binary-search-tree',
          label: 'Binary Search Tree',
        },
        {
          type: 'doc',
          id: 'dsa/heap',
          label: 'The Heap Data Structure',
        },
        {
          type: 'doc',
          id: 'dsa/insertion-sort',
          label: 'Insertion Sort',
        },
        {
          type: 'doc',
          id: 'dsa/selection-sort',
          label: 'Selection Sort',
        },
        {
          type: 'doc',
          id: 'dsa/mergesort',
          label: 'Mergesort',
        },
        {
          type: 'doc',
          id: 'dsa/quicksort',
          label: 'Quicksort',
        },
        {
          type: 'doc',
          id: 'dsa/probability-review',
          label: 'Probability Review',
        },
        {
          type: 'doc',
          id: 'dsa/undirected-graph',
          label: 'Undirected Graph',
        },
        {
          type: 'doc',
          id: 'dsa/directed-graph',
          label: 'Directed Graph',
        }
      ],
    },
    {
      type: 'category',
      label: 'C',
      link: {
        type: 'generated-index',
        slug: '/C'
      },
      items: [
        {
          type: 'doc',
          id: 'C/C-style-string',
          label: 'C style string',
        }],
    },
    {
      type: 'category',
      label: 'Docker',
      link: {
        type: 'generated-index',
        slug: '/docker'
      },
      items: [
        {
          type: 'doc',
          id: 'docker/basic-commands',
          label: 'Basic Commands',
        }],
    },
    {
      type: 'category',
      label: 'Computer Architecture',
      link: {
        type: 'generated-index',
        slug: '/computer-architecture'
      },
      items: [
        {
          type: 'doc',
          id: 'computer-architecture/big-and-little-endian',
          label: 'Big and Little Endian',
        },
        {
          type: 'doc',
          id: 'computer-architecture/instruction-set-architecture',
          label: 'Instruction Set Architecture',
        },
      ],
    },
    {
      type: 'category',
      label: 'Operating Systems',
      link: {
        type: 'generated-index',
        slug: '/operating-systems'
      },
      items: [
        {
          type: 'doc',
          id: 'operating-systems/chapter-1',
          label: 'Chapter 1',
        }],
    },
    {
      type: 'category',
      label: 'Design Patterns',
      link: {
        type: 'generated-index',
        slug: '/design-patterns'
      },
      items: [
        {
          type: 'doc',
          id: 'design-patterns/strategy-pattern',
          label: 'Strategy Pattern',
        }],
    },
    {
      type: 'category',
      label: 'Computer Networking',
      link: {
        type: 'generated-index',
        slug: '/computer-networking'
      },
      items: [
        {
          type: 'doc',
          id: 'computer-networking/computer-networks-and-internet',
          label: 'Computer Networks and the Internet',
        }],
    },
  ],
};

export default sidebars;
