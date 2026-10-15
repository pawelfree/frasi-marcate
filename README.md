# Frasi marcate

Działający prototyp NestJS oparty na koncepcji z `fc.md`. Ma dwa obszary: publiczny interfejs ucznia oraz panel redakcyjny do wprowadzania i sprawdzania anotacji JSON.

## Uruchomienie

Wymagany Node.js 20+.

```sh
npm install
cp .env.example .env
```

Ustaw silne `ADMIN_PASSWORD` w `.env`, następnie:

```sh
npm run start:dev
```

Otwórz `http://127.0.0.1:3000/` i `http://127.0.0.1:3000/admin.html`. Lista zdań w panelu ładuje się automatycznie i nie wymaga hasła. Walidacja JSON również jest publiczna. Zapis i usuwanie są dostępne dopiero po zalogowaniu poprawnym `ADMIN_PASSWORD`. Bez tej zmiennej pole hasła, logowanie oraz przyciski zapisu i usuwania pozostają nieaktywne. Serwer nasłuchuje wyłącznie na komputerze lokalnym.

Przełącznik **PL / IT** znajduje się w nagłówku obu stron. Wybór jest zapamiętywany w przeglądarce. Opisy przykładów są zapisane w obu językach w polu `translations`; nowy rekord przygotowany w panelu zawiera miejsce na obie wersje.
Wcześniej dodane własne rekordy bez pola `translations` trzeba uzupełnić o wersje PL i IT przed ponownym zapisem w panelu.

Kod aplikacji znajduje się w `src`: backend NestJS w `src/api`, a interfejs w `src/web`. Logika interfejsu jest napisana w TypeScript, a style w SCSS. Polecenia `npm run build`, `npm start` i `npm run start:dev` kompilują je do `dist/api` i `dist/web`. Plików w `dist/` nie należy edytować ręcznie.

## Moduły

- **Esplora le strutture:** filtr konstrukcji, segmenty i ich relacje, kontekst, źródło, wariant porównawczy, struktura informacyjna i jawny brak danych prozodycznych.
- **Analizza una frase:** formularz zdania i kontekstu. Po ustawieniu `OPENAI_API_KEY` i `OPENAI_MODEL` backend wywołuje Chat Completions w trybie JSON, sprawdza typy i offsety odpowiedzi. Bez konfiguracji API zwraca czytelną informację o braku usługi. Wyniki nie trafiają do zbioru referencyjnego.
- **Mettiti alla prova:** rozpoznanie klasy i kluczowego segmentu z informacją zwrotną opartą na zatwierdzonym rekordzie.
- **Panel administratora:** lista rekordów oraz dwa zsynchronizowane sposoby edycji: surowy JSON i formularz interaktywny. Formularz oznacza pola wymagane i opcjonalne, pozwala dodawać i usuwać segmenty oraz funkcje pragmatyczne, a także uzupełniać treści polskie i włoskie. Techniczne identyfikatory rekordu i segmentów oraz wersja schematu są generowane i ukryte w formularzu. Panel udostępnia schemat w oknie aplikacji, walidację, zapis, usuwanie i status `draft`/`reviewed`. API administracyjne wymaga hasła HTTP Basic z `.env`.

## Dane

Schemat znajduje się w [`schema/example.schema.json`](schema/example.schema.json). Walidator sprawdza również zakresy `[start,end)` w punktach kodowych Unicode, unikalność identyfikatorów segmentów, poprawność relacji oraz obecność opisów PL/IT każdego segmentu. Przy pierwszym uruchomieniu [`data/seed.json`](data/seed.json) jest kopiowany do `data/examples.json`. Plik roboczy jest ignorowany przez Git; zapis odbywa się przez plik tymczasowy i zmianę nazwy. Przy kilku równoległych instancjach serwera potrzebna byłaby baza z blokowaniem transakcyjnym.

Seed zawiera **cztery skonstruowane przykłady dydaktyczne**, a nie cytaty z korpusu. Nie przedstawiają zbioru 60 ręcznie zweryfikowanych przykładów planowanego w `fc.md`; ten trzeba opracować osobno wraz ze źródłami i prawem wykorzystania. Zbiór testowy do ewaluacji AI powinien być odrębny od `data/examples.json`.

## Granice prototypu

Klasy główne: `left_dislocation`, `right_dislocation`, `cleft`; schemat dopuszcza też `none` i `ambiguous`. Pseudoscissa i konstrukcje prezentatywne pozostają poza MVP zgodnie z `fc.md`. Automatyczne odpowiedzi są hipotezami i nie zastępują weryfikacji językoznawczej. Brak tu rejestru eksperymentu i obliczania metryk; to kolejny etap badań, wymagający zamrożonego zestawu testowego i promptu. Lokalny panel z jednym hasłem jest odpowiedni do prototypu na własnym komputerze, nie do publicznego wdrożenia.
