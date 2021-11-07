export default async function handler(req, res) {
    let { pokemon_name } = req.query
    let pokemon_info = await fetch(`${process.env.POKEMON_API}/pokemon/${pokemon_name}`, { headers: { method: 'GET', 'Content-Type': 'application/json' } })
    pokemon_info = await pokemon_info.json()
    res.status(200).send(pokemon_info)
}