import Link from 'next/link'
import Head from 'next/head'

import Timestamp from './Timestamp'

export default ({children, title = 'This is the default title'}) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet='utf-8'/>
      <meta name='viewport' content='initial-scale=1.0, width=device-width'/>
    </Head>
    <header>
      <nav>
        <Link href='/'><a>Home</a></Link>{' | '}
        <Link href='/about'><a>About</a></Link>
      </nav>
    </header>

    {children}

    <footer>
      <Timestamp>1980-02-26T00:00:00+01:00</Timestamp>
      {'I\'m here to stay'}
    </footer>
  </div>
)
