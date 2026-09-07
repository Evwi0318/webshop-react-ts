# Soul Shoez

En webbshop för skor byggd med React, TypeScript och Mantine. Frontend hämtar
och sparar all data via ett eget REST-API skrivet i TypeScript med Express och
SQLite, där typerna delas mellan klient och server.

Butiken har en startsida med samtliga produkter, en detaljsida per produkt, en
kassasida med kundvagn och leveransformulär, en bekräftelsesida med unikt
ordernummer samt en adminsida där produkter kan skapas, ändras och tas bort.

Grupp: Evan, Isak och Arnell.

## Teknik

- React 19 + TypeScript + Vite
- React Router för klientsidans routing
- Mantine som designsystem
- Express 5 + SQLite (`node:sqlite`) i backend
- Delade typer i `shared/types.ts`

## Så bygger och kör du projektet

Kräver Node 24 eller senare.

Installera beroenden:

```bash
cd api
npm install
cd ../web
npm install
```

Starta backend i en terminal:

```bash
cd api
npm run dev
```

API:et körs på http://localhost:3000 och skapar databasen `api/data/webshop.db`
automatiskt första gången med tolv produkter.

Starta frontend i en andra terminal:

```bash
cd web
npm run dev
```

Sidan körs på http://localhost:5173.

Bygga för produktion:

```bash
cd web
npm run build
```

## Dokumentation för designsystemet

Mantine: https://mantine.dev

## Krav för Godkänt

- [x] Git & GitHub har använts
- [x] Projektmappen innehåller en README.md fil
- [ ] Uppgiften lämnas in i tid!
- [x] Ett designsystem/komponentbibliotek används nästintill helt uteslutande för att bygga sidan (Mantine)

**Home**

- [x] Ska ha en övergripande layout med header, main & footer.
- [ ] Startsidan ska lista samtliga produkter.
- [ ] Det ska gå att lägga till produkter i kundvagnen (header + toast + ls).
- [ ] Det ska gå att klicka på en produkt och komma till en detaljsida.
- [ ] Sidan ska vara responsiv och gå att använda på mobil, tablet & desktop.

**Produkt**

- [x] Ska ha en övergripande layout med header, main & footer.
- [ ] Detaljsidan ska visa all info om en produkt.
- [ ] Det ska gå att lägga till produkten i kundvagnen (header + toast + ls).
- [ ] Sidan ska vara responsiv och gå att använda på mobil, tablet & desktop.

**Kundvagn & Checkout**

- [x] Ska ha en övergripande layout med header, main & footer.
- [x] Det ska gå att gå till checkoutsidan och se innehållet i kundvagnen (knapp & url).
- [ ] Det ska gå att se det totala priset i kundvagnen.
- [ ] Det ska gå att ändra produkterna i kundvagnen (header + vyn + pris + ls).
- [ ] Det ska gå att ange leveransuppgifter i ett formulär.
- [ ] Samtliga fält för checkoutsidans formulär ska ha valideringsregler.
- [ ] Formulären vid utcheckningen ska gå att automatiskt fyllas i.
- [ ] Bekräftelsesidan ska visa orderdetaljer och leveransuppgifter

**Admin**

- [ ] Det finns en admin-sida för produkthantering
- [ ] Det ska gå att se alla produkter på admin sidan
- [ ] Det går att lägga till produkter via admin sidan
- [ ] Det går att ta bort produkter via admin sidan
- [ ] Det går att redigera produkter via admin sidan
- [ ] Samtliga fält för adminsidans formulär ska ha valideringsregler
