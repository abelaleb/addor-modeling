import type { CollectionConfig } from 'payload'

export const Authors: CollectionConfig = {
  slug: 'authors',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'updatedAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly identifier (auto-generated if empty)',
      },
      hooks: {
        beforeValidate: [
          async ({ data, operation }) => {
            if (operation === 'create' && data?.name && !data?.slug) {
              return data.name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '')
            }
            return data?.slug
          },
        ],
      },
    },
    {
      name: 'bio',
      type: 'richText',
      required: true,
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Author profile photo',
      },
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Editor', value: 'editor' },
        { label: 'Writer', value: 'writer' },
        { label: 'Contributor', value: 'contributor' },
        { label: 'Photographer', value: 'photographer' },
      ],
      defaultValue: 'writer',
      required: true,
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: [
            { label: 'Instagram', value: 'instagram' },
            { label: 'Twitter/X', value: 'twitter' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Website', value: 'website' },
          ],
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'email',
      type: 'email',
      admin: {
        description: 'Contact email (not public)',
      },
    },
  ],
}
