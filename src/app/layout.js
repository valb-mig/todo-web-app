import { Varela_Round } from 'next/font/google'
import '@/app/styles/page.scss';

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
    <html lang="en">
      <body className="dark">
        <div className={varela_round.className}>
          { children }
        </div>
      </body>
    </html>
  );
}