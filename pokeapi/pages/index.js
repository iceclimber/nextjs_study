import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Container, MainSection, Title, SearchInput, Paragraph, Code, Grid, GridCard, Footer, Logo } from '../styles/pokemon_list'
import { useState } from 'react'
export default function PokemonList({ pokemon_list, locale }) {
    const [search, setSearch] = useState('')
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

                <Grid withWidth>
                    <SearchInput placeholder="Digite um termo para filtar a lista" onChange={(ev) => setSearch(ev.target.value)} />
                </Grid>
                <Grid>
                    {pokemon_list.map((pokemon) => {
                        return search.length ? pokemon.name.indexOf(search) > -1 && <GridCard key={`GridCard_${pokemon.name}`}><Link href={`/pokemon/${pokemon.name}`} passHref={true} key={pokemon.name} locale={locale}>
                            <h2>{pokemon.name}</h2>
                        </Link></GridCard> : <GridCard key={`GridCard_${pokemon.name}`}><Link href={`/pokemon/${pokemon.name}`} passHref={true} key={pokemon.name} locale={locale}>
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

export async function getStaticProps({ locale }) {
    let pokemon_list = []
    pokemon_list = await fetch(`${process.env.APP_URL}/api/pokemon_list`)
    pokemon_list = await pokemon_list.json()
    return {
        props: {
            pokemon_list,
            locale
        }
    }
}