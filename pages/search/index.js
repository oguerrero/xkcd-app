import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import { Layout } from 'components/Layout'
import { search } from 'services/search.js'
import { useI18N } from 'context/i18n'

export default function Search({ query, results }) {
  const t = useI18N()

  return (
    <>
      <Head>
        <title>XKCD - Search</title>
        <meta name='description' content={`Search Results for ${query}`} />
      </Head>
      <Layout>
        <h1>{t('SEARCH_RESULTS_TITLE', results.length, query)}</h1>
        {results.map((result) => {
          return (
            <Link key={result.id} href={`/comic/${result.id}`}>
              <a className='flex flex-row content-center justify-start bg-slate-300 hover:bg-slate-50'>
                <Image
                  src={result.img}
                  alt={result.alt}
                  className='rounded-full'
                  width='50'
                  height='50'
                />
                <div>
                  <h2>{result.title}</h2>
                </div>
              </a>
            </Link>
          )
        })}
      </Layout>
    </>
  )
}

export async function getServerSideProps(context) {
  const { query } = context
  const { q = '' } = query

  const { results } = await search({ query: q })

  return {
    props: {
      query: q,
      results: results
    }
  }
}
