import "@/styles/globals.scss";
import "@/styles/variables.scss"
import type {AppProps} from "next/app";
import {Montserrat, K2D} from '@next/font/google'
import classNames from "classnames";

const montserrat = Montserrat({
    subsets: ["latin"]
})
const k2d = K2D({
    subsets: ["latin"],
    weight: "600"
})

export default function App({Component, pageProps}: AppProps) {
    return (
        <main className={classNames(montserrat.className, k2d.className)}>
            <Component {...pageProps} />
        </main>
    )
}
