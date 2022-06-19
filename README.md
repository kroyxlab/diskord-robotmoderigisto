# Robotmoderigisto

Robotmoderigisto estas robota de diskorda servilo kiu helpas moderigiston de la
servilo a la moderado kaj aŭtomatado de aktivaĵojn kiuj okazas en la servilo.

## Instalado

Klonu la projekton kaj instalu de dependaĵon:

```bash
npm install
```
aŭ
```bash
yarn install
```

Obtenu la Bot token, Client ID, Guild Id kaj enmetu tiun datumojn en la dosiero
`.env.ekzemplo` poste renomu la dosieron al `.env`

enmetu la roboton al via servilo kaj Ŝaltu la roboton en lokala servilo uzu la
komandon:

```bash
npm run dev
```
aŭ
```bash
yarn dev
```

## Registri komandojn

Post krei komandon de la roboto iru al la terminalo kaj uzu la komandon
`node deploy-commands.js` por registri la komandon en la roboto. Oni devas
fari tion nur unu foje po komando kaj nur fari tion denove kiam oni ŝanĝas
iun valuon de la `data` metodo de la komando.

## Kontribuado

Tirpetoj estas bonvenaj. Por grandaj ŝanĝojn, bonvolu malfermu atendidaĵon inue
por pridiskuti kiujn ŝanĝojn vi volus.
