import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { APIProvider } from '@vis.gl/react-google-maps'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from 'src/App.tsx'
import Lotties from 'src/lottiesAnimation/Lotties'
import { store } from 'src/store'
// import './i18n'
import { ClerkProvider } from '@clerk/clerk-react'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('../public/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope)
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error)
    })
}
if (typeof window !== 'undefined') { // Check if we're running in the browser.
  const mq = window.matchMedia('(prefers-color-scheme: dark)')
  if (!localStorage.getItem('theme')) {
    if (mq.matches) {
      document.documentElement.classList.add('dark')
    }
  }
}
// const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

// if (!PUBLISHABLE_KEY) {
//   throw new Error('Missing Publishable Key')
// }

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <APIProvider
      apiKey={import.meta.env.VITE_MAPS_PLATFORM}
      onLoad={() => console.log('Maps API has loaded.')}
    >
      <Provider store={store}>
        <QueryClientProvider
          client={
            new QueryClient({
              defaultOptions: {
                queries: {
                  suspense: true,
                  // notifyOnChangeProps: 'all',
                },
              },
            })
          }
        >
          <Suspense fallback={<Lotties />}>
            <App />
      {/* <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          </ClerkProvider> */}
          </Suspense>
        </QueryClientProvider>
      </Provider>
    </APIProvider>
  </React.StrictMode>,
)