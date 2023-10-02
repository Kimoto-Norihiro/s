import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ModalProvider } from '@/context/modal_context'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ModalProvider>
      <Component {...pageProps} />
    </ModalProvider>
  )
}
