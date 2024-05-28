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
          type: 'category',
          label: 'Sortings',
          items: [
            {
              type: 'doc',
              id: 'dsa/sortings/insertion-sort',
              label: 'Insertion Sort',
            },
            {
              type: 'doc',
              id: 'dsa/sortings/selection-sort',
              label: 'Selection Sort',
            },
            {
              type: 'doc',
              id: 'dsa/sortings/mergesort',
              label: 'Mergesort',
            },
            {
              type: 'doc',
              id: 'dsa/sortings/quicksort',
              label: 'Quicksort',
            }
          ],
        },
        {
          type: 'doc',
          id: 'dsa/probability-review',
          label: 'Probability Review',
        },
      ],
    },
  ],
};

export default sidebars;
