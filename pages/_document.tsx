import Document, {Html, Head, Main, NextScript} from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return {...initialProps}
    }

    render() {
        return (
            <Html>
                <Head>
                    <script src="https://kit.fontawesome.com/aeb9fcb31a.js" crossOrigin="anonymous"/>
                    <link rel="stylesheet" href="https://rsms.me/inter/inter.css"/>
                    <link rel="icon" href="/logo.svg" type="image/svg"/>
                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        )
    }
}

export default MyDocument