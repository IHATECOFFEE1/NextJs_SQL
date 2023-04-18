import { SessionProvider } from "next-auth/react"
import { BrowserRouter } from "react-router-dom"



export default function App({ Component, pageProps }) {
  return (
    
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
    
  )
}
