# Projektin oletukset ja suunnittelupäätökset

## Sisällysluettelo

- [Tehdyt oletukset (POC-tasolla)](#tehdyt-oletukset-poc-tasolla)
  - [1. Käyttäjätunnistus ja autentikaatio](#1-käyttäjätunnistus-ja-autentikaatio)
  - [2. Tiedon pysyvyys](#2-tiedon-pysyvyys)
  - [3. Huoneiden määrä ja ominaisuudet](#3-huoneiden-määrä-ja-ominaisuudet)
  - [4. Aikavyöhykkeet ja aikamäärittelyt](#4-aikavyöhykkeet-ja-aikamäärittelyt)
  - [5. Varausaikablokit](#5-varausaikablokit)
  - [6. Rinnakkaisuus ja suorituskyky](#6-rinnakkaisuus-ja-suorituskyky)
  - [7. Virheenkäsittely ja validointi](#7-virheenkäsittely-ja-validointi)
  - [8. API-dokumentaatio](#8-api-dokumentaatio)
- [Muutokset Prototype/MVP-tasolla](#muutokset-prototypemvp-tasolla-postgresql-tietokannalla)
  - [1. Tietokantakerros](#1-tietokantakerros)
  - [2. Käyttäjähallinta ja autentikaatio](#2-käyttäjähallinta-ja-autentikaatio)
  - [3. Huoneiden hallinta ja metatiedot](#3-huoneiden-hallinta-ja-metatiedot)
  - [4. Joustavammat varausajat ja toistuvat varaukset](#4-joustavammat-varausajat-ja-toistuvat-varaukset)
  - [5. Lokitus, monitorointi ja analytiikka](#5-lokitus-monitorointi-ja-analytiikka)
  - [6. Suorituskyvyn optimointi ja skaalautuvuus](#6-suorituskyvyn-optimointi-ja-skaalautuvuus)
  - [7. Tietoturva ja compliance](#7-tietoturva-ja-compliance)
- [Yhteenveto: POC vs. MVP/Prototype](#yhteenveto-poc-vs-mvpprototype)

---


## Tehdyt oletukset (POC-tasolla)

### 1. Käyttäjätunnistus ja autentikaatio
**Oletus:** API on luottamuspohjainen ilman autentikointia. `user_name`-kenttä on vapaamuotoinen tunniste, joka voi olla sähköpostiosoite, käyttäjätunnus tai vapaa muotoinen näyttönimi.

**Perustelu:** POC-tasolla yksinkertaisuus on tärkeämpää kuin turvallisuus. Tämä mahdollistaa nopean testauksen ilman token-hallintaa tai käyttäjärekisteriä.

**Rajoitus:** Kuka tahansa voi varata huoneita ja peruuttaa toisten varauksia. Ei ole vastuullisuutta tai auditointia.

### 2. Tiedon pysyvyys
**Oletus:** In-memory tallennustila riittää. Kaikki varaukset katoavat palvelimen uudelleenkäynnistyksessä.

**Perustelu:** Nopea kehitys ilman tietokanta toteutusta. Testaus on yksinkertaisempaa kun tila nollautuu automaattisesti.

**Rajoitus:** Ei sovellu tuotantokäyttöön. Ei skalaudu useaan tapaukseen. Ei varmistuskopiointia.

### 3. Huoneiden määrä ja ominaisuudet
**Oletus:** Järjestelmässä on tasan 5 huonetta (ID:t 1-5), ja ne ovat identtisiä - ei eroja kapasiteetissa, varustelussa tai sijainnissa.

**Perustelu:** Yksinkertaistaa logiikkaa. Kovakoodattu määrä riittää POC:lle demonstroimaan toiminnallisuutta.

**Rajoitus:** Ei joustavuutta. Todellisessa järjestelmässä huoneilla olisi eri ominaisuuksia (koko, AV-välineet, sijainti).

### 4. Aikavyöhykkeet ja aikamäärittelyt
**Oletus:** Kaikki ajat käsitellään UTC-aikavyöhykkeellä. Naive datetimes (ilman aikavyöhyketietoa) hylätään kokonaan.

**Perustelu:** Estää epäselvyydet ja bugit, jotka aiheutuvat aikavyöhykemuunnoksista. UTC on yksiselitteinen ja kansainvälinen standardi.

**Rajoitus:** Käyttäjän täytyy lähettää ajat timezone-tietoisina. Ei paikallista aikavyöhykkeen automaattista tunnistusta.

### 5. Varausaikablokit
**Oletus:** Varaukset alkavat ja päättyvät aina 15 minuutin jaksoissa (:00, :15, :30, :45). Vähimmäiskesto on 15 minuuttia.

**Perustelu:** Yksinkertaistaa kalenterinäkymää ja estää liian lyhyet tai epäkäytännölliset varaukset (esim. 7 minuutin kokous).

**Rajoitus:** Ei joustavuutta. Joskus tarvitaan 10 minuutin pikakokous tai 2,5 tunnin workshop.

### 6. Rinnakkaisuus ja suorituskyky
**Oletus:** Thread-safety toteutettu `RLock`-lukituksella repositoriotasolla. Oletetaan että samanaikaiset pyynnöt ovat mahdollisia mutta määrä on pieni.

**Perustelu:** In-memory datan muokkaus vaatii lukituksen estämään samanaikaiset varaukset. POC-tasolla yksinkertainen lukitus riittää.

**Rajoitus:** Ei optimoitu korkeaan rinnakkaisuuteen. Lukitus voi aiheuttaa pullonkauloja korkeassa kuormassa.

### 7. Virheenkäsittely ja validointi
**Oletus:** Validointi toteutetaan Pydantic-malleissa ja palvelukerroksessa. HTTPException-poikkeukset nostetaan suoraan validaattoreissa oikeilla statuskoodeilla.

**Perustelu:** Selkeä virheenkäsittely ilman monimutkaista middleware-logiikkaa. Virheet ovat itsedokumentoivia ja helppo debugata.

**Rajoitus:** Ei keskitettyä virhelokitusta tai monitorointia. Ei stack traceja tuotanto-ongelmien selvittämiseen.

### 8. API-dokumentaatio
**Oletus:** FastAPI:n automaattinen Swagger UI riittää dokumentaatioksi. README sisältää käyttöesimerkit.

**Perustelu:** Nopea tapa tarjota interaktiivinen dokumentaatio kehittäjille ilman erillistä työtä.

**Rajoitus:** Ei versiohistoriaa, ei yksityiskohtaisia käyttötapausesimerkkejä kaikille skenaarioille.

---


## Muutokset Prototype/MVP-tasolla (PostgreSQL-tietokannalla)

Jos tämä olisi Prototype tai MVP tuotantokäyttöön, tekisin seuraavat muutokset:

### 1. Tietokantakerros

**Muutos:** Ottaisin käyttöön PostgreSQL-tietokannan SQLAlchemy ORM:n kanssa.

**Perustelu:**
- Tietojen pysyvyys palvelimen uudelleenkäynnistysten välillä
- Mahdollistaa varmistuskopioinnit ja tietojen palautuksen
- Skalautuu useaan sovellustapaukseen (load balancing)
- ACID-transaktiot estävät ristiriitaiset varaukset

**Lisäominaisuudet:**
- Database migrations skeemamuutosten hallintaan
- Connection pooling optimaalista suorituskykyä varten
- Read replicas raskaaseen lukukuormaan
- Indeksit nopeisiin kyselyihin (room_id, start_time, user_id)

### 2. Käyttäjähallinta ja autentikaatio

**Muutos:** Lisäisin käyttäjärekisterin ja JWT-pohjaisen autentikaation.

**Perustelu:**
- Tunnetaan varauksen tekijä (vastuullisuus)
- Vain autentikoitu käyttäjä voi varata tai peruuttaa varauksia
- Käyttäjä voi peruuttaa vain omat varauksensa (paitsi admin)
- Auditointiloki: kuka teki mitä ja milloin

**Lisäominaisuudet:**
- Roolipohjainen pääsynhallinta (RBAC): user vs. admin
- Refresh token -mekanismi pitkäaikaisiin sessioihin
- Password reset -toiminnallisuus
- Rate limiting per käyttäjä

### 3. Huoneiden hallinta ja metatiedot

**Muutos:** Loisin dynaamisen huoneiden taulun metatiedoilla.

**Perustelu:**
- Käyttäjä voi valita sopivan huoneen tarpeidensa mukaan
- Eri kokoiset huoneet eri tarpeisiin (2 hengen puhelu vs. 20 hengen workshop)
- Varusteet vaikuttavat valintaan (tarvitaanko AV-laitteita?)
- Mahdollistaa huoneiden dynaamisen lisäämisen/poistamisen

**Lisäominaisuudet:**
- Huoneiden hinnoittelu (jos maksullinen palvelu)
- Kuvat huoneista
- Tarkemmat yksityiskohdat huoneista esim. saavutettavuus, varustelut
- Huonekohtaiset käyttösäännöt

### 4. Joustavammat varausajat ja toistuvat varaukset

**Muutos:** Tukisin toistuvia varauksia (esim. viikoittainen tiimin standup) ja joustavampia aikamäärittelyjä.

**Perustelu:**
- Toistuvat kokoukset ovat yleisiä ja säästävät käyttäjän aikaa
- Eri huoneet voivat sallia eri pituisia varauksia
- Metatieto (otsikko, kuvaus) auttaa ymmärtämään varauksen tarkoitusta
- Osallistujamäärä voidaan validoida huoneen kapasiteettia vastaan

**Lisäominaisuudet:**
- Varauksen muokkaus (ei vain luonti ja peruutus)
- Osallistujalista (kuka kutsuttu, kuka hyväksynyt)
- Integraatio kalentereihin (Google Calendar, Outlook)
- Muistutukset sähköpostilla ennen kokousta

### 5. Lokitus, monitorointi ja analytiikka

**Muutos:** Ottaisin käyttöön strukturoidun lokituksen, audit login ja metriikat.

**Perustelu:**
- Virhetilanteiden debuggaus tuotannossa
- Käyttäjän toimien seuranta (kuka peruutti kenen varauksen?)
- Tietoturva-auditointi
- Liiketoiminta-analytiikka (mitkä huoneet ovat suosituimpia?)

**Lisäominaisuudet:**
- Virheraportointi
- Lokien analysointi
- Real-time dashboardit käyttöasteesta

### 6. Suorituskyvyn optimointi ja skaalautuvuus

**Muutos:** Lisäisin Redis-caching-kerroksen ja background task -käsittelyn.

**Perustelu:**
- Caching vähentää tietokantakuormaa (huonetiedot muuttuvat harvoin)
- Background tasks parantavat responsiivisuutta (sähköpostin lähetys)
- Read replicas skaalaavat lukuoperaatioita
- Async operaatiot parantavat throughput:ia

**Lisäominaisuudet:**
- Load balancer usealle app-instanssille
- Database connection pooling
- API rate limiting per käyttäjä/IP

### 7. Tietoturva ja compliance

**Muutos:** Ottaisin käyttöön perustason tietoturvakäytännöt.

**Perustelu:**
- HTTPS estää man-in-the-middle hyökkäykset
- CORS-rajoitukset estävät luvattoman käytön
- Input sanitization estää XSS-hyökkäykset
- GDPR compliance on lakisääteinen vaatimus EU:ssa

**Lisäominaisuudet:**
- Environment-based configuration (dev, prod)

---

## Yhteenveto: POC vs. MVP/Prototype

| Osa-alue | POC (nykyinen) | MVP/Prototype (PostgreSQL) |
|----------|----------------|---------------------------|
| **Tietokanta** | In-memory dict | PostgreSQL + SQLAlchemy |
| **Autentikaatio** | Ei mitään | JWT + OAuth2 |
| **Käyttäjät** | user_name string | Users-taulu, roolit |
| **Huoneet** | 5 kovakoodattua | Dynaaminen, metatiedot |
| **Varaukset** | Yksittäiset | Toistuvat, muokattavat |
| **Validointi** | Pydantic + HTTP 400 | + Database constraints |
| **Virheenkäsittely** | HTTPException | + Lokitus, monitorointi |
| **Suorituskyky** | Thread-safe, yksittäinen instanssi | Caching, read replicas, load balancing |
| **Tietoturva** | Ei mitään | HTTPS, CORS, input sanitization, GDPR |
| **Deployment** | Lokaali uvicorn | Docker, CI/CD |

POC todistaa konseptin toimivuuden. MVP/Prototype on ensimmäinen versio, joka voidaan julkaista oikeille käyttäjille turvallisesti ja skaalautuvasti.
