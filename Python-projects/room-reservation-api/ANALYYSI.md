# Analyysi tekoälyn käytöstä projektissa


## 1. Mitä tekoäly teki hyvin?

Tekoäly toimi tehokkaasti koko projektin perusrungon luomisessa. Annoin sille alusta asti selkeät ja tarkat ohjeet tehtävänannon pohjalta sekä rajasin teknologiat (Python + FastAPI) ja määritin tavoitetason (proof-of-concept). Näiden reunaehtojen ansiosta tekoäly pystyi tuottamaan nopeasti lähes valmiin ja toimivan FastAPI-sovelluksen.

**Tekoäly onnistui erityisen hyvin seuraavissa asioissa:**

* **Projektirakenteen luomisessa:** FastAPI-sovelluksen selkeä kerrosarkkitehtuuri (controllers, services, repositories, models) syntyi nopeasti ja noudatti hyviä käytäntöjä
* **Pydantic-mallien ja validointien generoinnissa:** Perusvalidoinnit ja tyyppitarkistukset toimivat heti alusta asti
* **HTTP-statuskoodien loogisessa käytössä:** Tekoäly osasi ehdottaa oikeita statuskoodeja eri tilanteisiin (200, 201, 204, 400, 404, 409)
* **Testikattavuuden ehdottamisessa:** Loi noin 20 testitapausta, joista suurin osa toimi sellaisenaan, mukaan lukien rajatapaukset
* **README.md-dokumentaation tuottamisessa:** Selkeä ja kattava dokumentaatio API-endpointeista, käyttöesimerkeistä ja virhetilanteista
* **Arkkitehtuurikeskusteluissa:** Toimi hyvänä sparrauskumppanina, kun pohdimme async-funktioiden tarvetta, thread-safetya ja validointilogiikan sijoittamista
* **Refaktoroinnin ohjaamisessa:** Kun tunnistin ongelmia (esim. validointilogiikka väärässä paikassa), tekoäly osasi selittää parempia vaihtoehtoja ja niiden perustelut
* **Aikavyöhyke- ja datetime-käsittelyssä:** Kun ilmeni ongelmia naive vs. timezone-aware datetime kanssa, tekoäly osasi diagnosoida ja ohjeistaa ratkaisun löytämiseen

Erityisen arvokasta oli se, että tekoäly osasi perustella tekemiään ehdotuksia ja selittää, miksi jokin ratkaisu oli parempi kuin toinen. Tämä auttoi oppimaan parhaita käytäntöjä FastAPI:n ja Pythonin kanssa.


## 2. Mitä tekoäly tei huonosti?

Vaikka kokonaisuus oli laadukas, tekoäly ei aina arvioinut ratkaisuja käytännön näkökulmasta tai huomannut hienovaraisempia ongelmia:

* **Liian nopea ratkaisujen ehdottaminen:** Ensimmäisissä iteraatioissa tekoäly ehdotti monimutkaisia ratkaisuja (esim. orjson-serialisoinnin käsittely main.py:ssä) sen sijaan, että olisi kyseenalaistanut koko lähestymistavan
* **Validointilogiikan sijoitus:** Aluksi validointilogiikka ehdotettiin main.py tiedostoon, joka rikkoi Single Responsibility -periaatetta. Vasta kun itse kyseenalaistin ratkaisun, tekoäly ohjeisti paremman tavan eli validointi Pydantic-malleissa
* **Kirjoitusvirheiden huomaaminen:** Tekoäly teki pieniä kirjoitusvirheitä (esim. "ser_name" → "user_name", "user_id contains invalid" kun pitäisi olla "user_name"), jotka jäivät huomaamatta alkuun
* **Optimointiehdotukset ilman mittauksia:** Ehdotti optimointeja ilman että olisi ensin mitattu, onko optimoinnista todellista hyötyä
* **Async-funktioiden automaattinen ehdottaminen:** Lisäsi async-määreet automaattisesti, vaikka POC-sovelluksessa ei ollut I/O-painotteista kuormaa

Yleisesti tekoäly tekee täsmällisesti sen, mitä siltä pyydetään, mutta ei kyseenalaista vaatimuksia tai tee itsenäisiä suunnittelupäätöksiä ilman erillistä ohjausta. Se myös luottaa siihen, että kehittäjä tunnistaa arkkitehtuuriset ongelmat ja kysyy niistä.


## 3. Tärkeimmät parannukset tekoälyn tuottamaan koodiin ja miksi

Tein useita tietoisia parannuksia tekoälyn tuottamaan koodiin projektia kehittäessäni:

### Arkkitehtuuriset parannukset

* **Validointilogiikan siirto Pydantic-malleihin:** Poistin domain-logiikan main.py:stä ja siirsin sen BookingCreate-malliin. Tämä paransi koodin ylläpidettävyyttä, testattavuutta ja noudatti Single Responsibility -periaatetta. Nyt jokainen kerros vastaa vain omasta tehtävästään.

* **HTTPException-poikkeusten käyttö suoraan validaattoreissa:** Sen sijaan että validointivirheet olisi käsitelty monimutkaisella poikkeuskäsittelijällä, nostetaan nyt HTTPException suoraan validaattorissa oikealla statuskoodilla (400, 404). Tämä teki virheenkäsittelystä läpinäkyvämpää ja yksinkertaisempaa.

* **Async-funktioiden poistaminen:** Poistin async-määreet validointipoikkeuskäsittelijöistä ja muualta, missä niistä ei ollut todellista hyötyä. Tämä yksinkertaisti koodia ja paransi suorituskykyä tässä POC-kontekstissa, jossa ei ole asynkronista I/O:ta.

### Liiketoimintalogiikan parannukset

* **Aikarajoitukset varauksille:** Lisäsin 15 minuutin aikablokit ja vähimmäiskeston, koska ilman rajoituksia varauksia olisi voinut tehdä epärealistisiin aikaväleihin (esim. 3 minuutin varauksia). Tämä paransi järjestelmän käytännöllisyyttä ja vastasi paremmin todellista käyttötapausta.

* **UTC-aikavyöhykkeen pakottaminen:** Muutin kaikki datetime-vertailut käyttämään timezone-aware UTC-aikoja. Tämä korjasi "can't compare offset-naive and offset-aware datetimes" -virheen ja teki koko sovelluksesta ennustettavamman. Naive datetimes hylätään nyt 400 Bad Request -virheellä selkeällä virheilmoituksella.

### Validoinnin parannukset

* **user_name-kentän validoinnin laajennus:** Muutin kentän tukemaan todellista API-käyttöä, jossa user_name todennäköisesti tulisi tietokannasta käyttäjän yksilöivänä tunnisteena (user ID, email tai username) - ei pelkkänä näyttönimenä. Lisäsin tuen erikoismerkeille (@, ., _, -, +), koska käytännön API:ssa user_name voisi olla esim. "john.doe@company.com", "user_id_12345" tai tietokannasta tuleva UUID "550e8400-e29b-41d4-a716". Alkuperäinen validointi salli vain kirjaimia, välilyöntejä ja yhdysmerkkejä, mikä olisi tehnyt API:sta käyttökelvottoman todellisessa järjestelmässä, jossa käyttäjät tunnistetaan sähköpostiosoitteella tai käyttäjätunnuksella. Tämä muutos teki API:sta joustavamman ja käytännöllisemmän tuotantokäyttöön.

* **min_length-rajoituksen poisto Pydanticista:** Pydanticin min_length palautti 422-virheen, kun halusin 400 Bad Request -virheen. Poistin sen ja toteutin tarkistuksen omassa validaattorissa, joka nostaa oikean HTTPException-poikkeuksen.

* **Virheilmoitusten yhtenäistäminen ja parantaminen:** Muutin virheviestit informatiivisemmiksi ja yhtenäisemmiksi. Esimerkiksi:
  - "user_name contains invalid characters: '@#$'. Allowed: letters, numbers, @, ., _, -, +, space"
  - "Invalid datetime format. All datetime values must include timezone information (e.g., '2026-01-19T12:00:00Z' or '2026-01-19T12:00:00+00:00')."
  
  Nämä kertovat käyttäjälle tarkalleen mitä on väärin ja miten korjata se.

### Dokumentoinnin parannukset

* **README.md:n laajentaminen:** Lisäsin esimerkkejä eri user_name-formaateista (email, username, display name), timezone-käsittelystä ja validointivirheistä. Tämä teki API:n käytöstä selkeämpää uusille käyttäjille.

* **HTTP-statuskoodien selkeyttäminen:** Dokumentoin tarkasti, milloin API palauttaa 400, 404 tai 409, ja mitä jokainen virheviesti tarkoittaa. Tämä teki API:sta itsedokumentoivan.

### Suorituskyvyn ja laadun parannukset

* **Thread-safety lisääminen:** Vaikka tekoäly mainitsi sen "assumption"-listassa, toteutin sen oikein käyttämällä `RLock`:ia repositoriossa. Tämä varmisti että sovellus toimii oikein samanaikaisissa pyynnöissä.

* **Frozenset-optimointi validoinnissa:** Käytin `frozenset`:iä sallittujen merkkien tarkistuksessa, mikä on tehokkaampi kuin lista tai string. Tämä oli pieni mutta hyvä käytäntö.

* **Kirjoitusvirheiden korjaaminen:** Korjasin pienet kirjoitusvirheet ja epäjohdonmukaisuudet, jotka olisivat aiheuttaneet hämmennystä myöhemmin.


## Yhteenveto

Käytin tekoälyä tehokkaana työkaluna ja sparrauskumppanina, mutta säilytin vastuun arkkitehtuurista, suorituskyvystä ja liiketoimintalogiikasta. Parhaita tuloksia syntyi, kun:

1. **Kyseenalaistin tekoälyn ehdotuksia:** "Onko tämä oikea paikka tälle logiikalle?"
2. **Kysyin käytännön näkökulmasta:** "Pitäisikö huoneiden lukumäärä olla konfiguroitavissa vai riittääkö kovakoodattu 1-5?"
3. **Tein tietoisia teknisiä päätöksiä:** UTC-pakotus, 15 min blokit, thread-safety
4. **Iteroin ratkaisuja:** Ensimmäinen versio harvoin oli paras, vaan paransin sitä vähitellen

Tekoäly on erinomainen kumppani mekaanisen koodin tuottamisessa, dokumentoinnissa ja vaihtoehtojen ehdottamisessa. Lopullinen laatu syntyi kuitenkin siitä, että arvioin kriittisesti tuotettua koodia, tunsin sovelluksen todellisen kontekstin ja tein harkittuja suunnittelupäätöksiä. Tämä vastaa omaa toimintatapaani käytännönläheisenä kehittäjänä, joka käyttää tekoälyä työkaluna - ei korvikkeena ajattelulle.