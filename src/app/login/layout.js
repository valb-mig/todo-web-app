import {Varela_Round} from 'next/font/google'

import 'src/app/styles/page.scss';
import 'src/app/styles/global.scss';

const varela_round = Varela_Round({ 
  weight:  '400',
  subsets: ['latin'] 
});

export const metadata = {
  title:       'Login.sh',
  description: 'Your todo management web page',
  icons: {
    icon: '/static/favicon.ico',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="dark">
        <main className={varela_round.className}>
          { children }
        </main>
      </body>
    </html>
  );
}