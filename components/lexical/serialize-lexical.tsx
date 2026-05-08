import { JSX } from 'react'

interface LexicalNode {
  type: string
  version: number
  [key: string]: any
}

interface LexicalRoot {
  root: LexicalNode
}

interface SerializedTextNode extends LexicalNode {
  type: 'text'
  text: string
  format: number
  style: string
  detail: number
  mode: string
}

interface SerializedElementNode extends LexicalNode {
  type: 'element'
  tag: string
  children: LexicalNode[]
  format: string
  direction: string
}

interface SerializedLinkNode extends LexicalNode {
  type: 'link'
  url: string
  children: LexicalNode[]
}

interface SerializedUploadNode extends LexicalNode {
  type: 'upload'
  value: {
    id: string
    url: string
    alt: string
    width: number
    height: number
  }
}

interface SerializedHeadingNode extends LexicalNode {
  type: 'heading'
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  children: LexicalNode[]
}

interface SerializedQuoteNode extends LexicalNode {
  type: 'quote'
  children: LexicalNode[]
}

interface SerializedListNode extends LexicalNode {
  type: 'list'
  listType: 'bullet' | 'number'
  start: number
  children: LexicalNode[]
}

interface SerializedListItemNode extends LexicalNode {
  type: 'listitem'
  children: LexicalNode[]
}

function TextNode({ text, format, style }: SerializedTextNode): JSX.Element {
  let content: React.ReactNode = text

  const Bold = ({ children }: { children: React.ReactNode }) => (
    <strong className="font-bold">{children}</strong>
  )
  const Italic = ({ children }: { children: React.ReactNode }) => (
    <em className="italic">{children}</em>
  )
  const Underline = ({ children }: { children: React.ReactNode }) => (
    <u className="underline">{children}</u>
  )
  const Strikethrough = ({ children }: { children: React.ReactNode }) => (
    <span className="line-through">{children}</span>
  )
  const Code = ({ children }: { children: React.ReactNode }) => (
    <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
      {children}
    </code>
  )

  if (format & 1) content = <Bold>{content}</Bold>
  if (format & 2) content = <Italic>{content}</Italic>
  if (format & 4) content = <Underline>{content}</Underline>
  if (format & 8) content = <Strikethrough>{content}</Strikethrough>
  if (format & 16) content = <Code>{content}</Code>

  if (style) {
    return <span style={JSON.parse(style)}>{content}</span>
  }

  return <>{content}</>
}

function serializeNodes(nodes: LexicalNode[]): JSX.Element {
  return (
    <>
      {nodes.map((node, index) => {
        if (!node) return null

        switch (node.type) {
          case 'text':
            return <TextNode key={index} {...(node as SerializedTextNode)} />

          case 'paragraph': {
            const element = node as SerializedElementNode
            if (element.children.length === 0) {
              return <br key={index} />
            }
            return (
              <p key={index} className="mb-4 leading-relaxed">
                {serializeNodes(element.children)}
              </p>
            )
          }

          case 'heading': {
            const heading = node as SerializedHeadingNode
            const Tag = heading.tag
            const sizeClasses: Record<string, string> = {
              h1: 'text-4xl font-bold mb-6 mt-8',
              h2: 'text-3xl font-bold mb-4 mt-6',
              h3: 'text-2xl font-semibold mb-3 mt-5',
              h4: 'text-xl font-semibold mb-3 mt-4',
              h5: 'text-lg font-semibold mb-2 mt-4',
              h6: 'text-base font-semibold mb-2 mt-4',
            }
            return (
              <Tag
                key={index}
                className={sizeClasses[heading.tag] || ''}
              >
                {serializeNodes(heading.children)}
              </Tag>
            )
          }

          case 'quote': {
            const quote = node as SerializedQuoteNode
            return (
              <blockquote
                key={index}
                className="border-l-4 border-gold pl-6 py-4 my-6 italic text-lg text-muted-foreground"
              >
                {serializeNodes(quote.children)}
              </blockquote>
            )
          }

          case 'list': {
            const list = node as SerializedListNode
            const ListTag = list.listType === 'number' ? 'ol' : 'ul'
            return (
              <ListTag
                key={index}
                className={`mb-4 ${
                  list.listType === 'number'
                    ? 'list-decimal'
                    : 'list-disc'
                } pl-6`}
              >
                {serializeNodes(list.children)}
              </ListTag>
            )
          }

          case 'listitem': {
            const item = node as SerializedListItemNode
            return (
              <li key={index} className="mb-2">
                {serializeNodes(item.children)}
              </li>
            )
          }

          case 'link': {
            const link = node as SerializedLinkNode
            return (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:underline"
              >
                {serializeNodes(link.children)}
              </a>
            )
          }

          case 'upload': {
            const upload = node as SerializedUploadNode
            if (!upload.value?.url) return null
            return (
              <figure key={index} className="my-8">
                <img
                  src={upload.value.url}
                  alt={upload.value.alt || ''}
                  className="w-full rounded-lg"
                  width={upload.value.width}
                  height={upload.value.height}
                />
                {upload.value.alt && (
                  <figcaption className="text-sm text-muted-foreground mt-2 text-center italic">
                    {upload.value.alt}
                  </figcaption>
                )}
              </figure>
            )
          }

          case 'horizontalrule':
            return <hr key={index} className="my-8 border-border" />

          default:
            return null
        }
      })}
    </>
  )
}

export function serializeLexical(data: LexicalRoot | null): JSX.Element | null {
  if (!data || !data.root) {
    return null
  }

  return serializeNodes(data.root.children || [])
}
