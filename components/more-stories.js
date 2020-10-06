import PostPreview from '../components/post-preview'
import { useRouter } from 'next/router'
import JSON_LD_Script from '../lib/JSON_LD_Script'

function createPostListSchema(posts, router) {
  console.log("posts", posts);
  console.log("router", router);
  return {
    "@context": "https://schema.org/",
    "@type": "Blog list",
    url: router.asPath,
    inLanguage: "en-US",
    description: "list of all blogs",
    list: posts.map((post) => {
      return {
        "@type": "Blog",
        author: {
          "@type": "Person",
          name: post.author.name
        },
        title: post.title,
        image: post.coverImage
      }
    })
  }
}

export default function MoreStories({ posts }) {
  const router = useRouter();
  console.log("json", createPostListSchema(posts, router));
  return (
    <section>
      <Head>
        {JSON_LD_Script(posts, createPostListSchema, router)}
      </Head>
      <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
        More Stories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:col-gap-16 lg:col-gap-32 row-gap-20 md:row-gap-32 mb-32">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  )
}
