// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'

import Posts from './collections/Posts';
// import Categories from './collections/Categories.ts';
// import Authors from './collections/Authors';

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    // storage-adapter-placeholder
  ],
})
// import { buildConfig } from 'payload/config';
// import Posts from './collections/Posts';
// import Categories from './collections/Categories';
// import Authors from './collections/Authors';

// export default buildConfig({
//   serverURL: 'http://localhost:3000',
//   admin: {
//     user: 'users',
//   },
//   collections: [Posts, Categories, Authors],
// });
