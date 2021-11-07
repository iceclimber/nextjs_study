import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Container, MainSection, Title, LinkTitle, Paragraph, Code, Grid, GridCard, Footer, Logo } from '../../styles/pokemon_list'

export default function PokemonList({ pokemon_list }) {
    return (
        <Container >
            <Head>
                <title>Listagem de Pokemons</title>
                <meta name="description" content="Lista contendo os Pokemons da PokeAPI" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <MainSection>
                <Title>
                    Clique na lista abaixo para ver as informações de um Pokemon
                </Title>


                <Grid>
                    {pokemon_list.map((pokemon) => {
                        return <GridCard key={`GridCard_${pokemon.name}`}><Link href={`/pokemon/${pokemon.name}`} passHref={true} key={pokemon.name}>
                            <h2>{pokemon.name}</h2>
                        </Link></GridCard>
                    })}
                </Grid>
            </MainSection>

            <Footer>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <Logo>
                        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
                    </Logo>
                </a>
            </Footer>
        </Container >
    )
}

export async function getStaticProps() {
    let pokemon_list = []
    pokemon_list = await fetch(`${process.env.APP_URL}/api/pokemon_list`)
    pokemon_list = await pokemon_list.json()
    return {
        props: {
            pokemon_list
        }
    }
}