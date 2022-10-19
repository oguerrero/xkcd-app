import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'

export function Header() {
  const [results, setResults] = useState([])
  const searchRef = useRef()
  const { locale, locales } = useRouter()

  const handleChange = () => {
    const q = searchRef.current.value

    fetch(`/api/search?q=${q}`)
      .then((res) => res.json())
      .then((searchResults) => {
        setResults(searchResults.results)
      })
  }

  const restOfLocales = locales.filter((l) => l !== locale)

  return (
    <header className='flex items-center justify-between max-w-xl p-4 m-auto'>
      <h1 className='font-bold'>
        <Link href='/'>
          <a className='transition hover:opacity-80'>
            Next<span className='font-light'>xkcd</span>
          </a>
        </Link>
      </h1>
      <nav>
        <ul className='flex flex-row gap-2'>
          <li>
            <Link href='/'>
              <a className='text-sm font-bold'>Home</a>
            </Link>
          </li>

          <li>
            <input
              className='px-4 py-1 text-xs border border-gray-400 rounded-3xl'
              onChange={handleChange}
              ref={searchRef}
              type='search'
              placeholder='Search'
            />
            <div className='relative'>
              {Boolean(results.length) && (
                <div className='absolute top-0 left-0 z-10 '>
                  <ul className='w-full border rounded-lg shadow-2xl border-gray-50 overflow-hidden bg-slate-50'>
                    <li key='all-results' className='m-0'>
                      <Link href={`/search?q=${searchRef.current.value}`}>
                        <a className='block px-2 py-1 text-sm font-semibold text-gray-400 italic hover:bg-slate-200 truncate'>
                          Ver {results.length} resultados
                        </a>
                      </Link>
                    </li>
                    {results.map((result) => {
                      return (
                        <li key={result.id} className='m-0'>
                          <Link href={`/comic/${result.id}`}>
                            <a className='block px-2 py-1 text-sm font-semibold hover:bg-slate-200 truncate'>
                              {result.title}
                            </a>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}
            </div>
          </li>

          <li>
            <Link href='/' locale={restOfLocales[0]}>
              <a className='text-sm font-bold'>{restOfLocales[0]}</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
