import Head from 'next/head'
import Image from 'next/image'
import { Container, MainSection, Title, LinkTitle, Paragraph, Code, Grid, GridCard, Footer, Logo } from '../../styles/pokemon_info'

export default function Home({ pokemon_info }) {

    const keyStr =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

    const triplet = (e1, e2, e3) =>
        keyStr.charAt(e1 >> 2) +
        keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
        keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
        keyStr.charAt(e3 & 63)
    const rgbDataURL = (r, g, b) =>
        `data:image/gif;base64,R0lGODlhAQABAPAA${triplet(0, r, g) + triplet(b, 255, 255)
        }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`
    return (
        <Container >
            <Head>
                <title>{`Dados do Pokemon ${pokemon_info.name}`}</title>
                <meta name="description" content={`Dados do Pokemon ${pokemon_info.name} vindo PokeAPI`} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MainSection>
                <Title>
                    {pokemon_info.name}
                </Title>
                <Image placeholder={'blur'} alt={`imagem do pokemon ${pokemon_info.name}`} src={`${pokemon_info.sprites.front_default}`} width={500} height={500} blurDataURL={`${rgbDataURL(200, 200, 200)}`} />
            </MainSection>
        </Container>

    )
}

export async function getStaticPaths() {
    let pokemon_list = await fetch(`${process.env.APP_URL}/api/pokemon_list`)
    pokemon_list = await pokemon_list.json()
    return {
        paths: pokemon_list.map((pokemon) => {
            return {
                params: {
                    pokemon_name: pokemon.name
                }
            }
        }),
        fallback: 'blocking'
    }
}

export async function getStaticProps({ params }) {
    let pokemon_info = {}
    pokemon_info = await fetch(`${process.env.APP_URL}/api/pokemon/${params.pokemon_name}`)
    pokemon_info = await pokemon_info.json()
    return {
        props: {
            pokemon_info
        }
    }
}