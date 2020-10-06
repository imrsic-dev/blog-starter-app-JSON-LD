import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPosts } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import { useRouter } from 'next/router'
import JSON_LD_Script from '../lib/JSON_LD_Script'

function createPostListSchema(posts, router) {
  console.log("posts", posts);
  console.log("router", router);
  return {
    "@context": "https://schema.org/",
    "@type": "BreadcrumbList",
    itemListElement: posts.map((post, i) => {
      return {
        "@type": "ListItem",
        position: i + 1,
        name: post.title,
        item: `${router.asPath}posts/${post.slug}`
      }
    })
  }
}


export default function Index({ allPosts }) {
  const router = useRouter()
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)
  return (
    <>
      <Layout>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
          {JSON_LD_Script(allPosts, createPostListSchema, router)}
        </Head>
        <Container>
          <Intro />
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ])

  return {
    props: { allPosts },
  }
}
