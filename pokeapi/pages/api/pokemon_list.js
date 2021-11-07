// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  let pokemon_list = await fetch(`${process.env.POKEMON_API}/pokemon/?limit=2000`, { headers: { method: 'GET', 'Content-Type': 'application/json' } })
  pokemon_list = await pokemon_list.json()
  res.status(200).send(pokemon_list.results)
}
