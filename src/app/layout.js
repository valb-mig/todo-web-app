import { Varela_Round }    from 'next/font/google'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './style/globals.scss'

const varela_round = Varela_Round({ 
  weight:  '400',
  subsets: ['latin'] 
});

export const metadata = {
  title:       'Todo.sh',
  description: 'Your todo management web page',
  icons: {
    icon: '/static/favicon.ico',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        <main className={varela_round.className}>
          {children}
        </main>
      </body>
    </html>
  )
}
