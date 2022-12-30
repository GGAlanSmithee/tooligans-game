import "use-cardano/styles/use-cardano.css"
import "../styles/styles.css"

import { CardanoProvider, CardanoToaster, UseCardanoOptions } from "use-cardano"

import type { AppProps } from "next/app"

const options: UseCardanoOptions = {
  node: {
    provider: "blockfrost-proxy",
    proxyUrl: "/api/blockfrost",
  },
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CardanoProvider options={options}>
      <Component {...pageProps} />

      <CardanoToaster />
    </CardanoProvider>
  )
}
