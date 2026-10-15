# Koncepcja pracy licencjackiej

## Tytuł

**Le frasi marcate nell'italiano contemporaneo: progettazione di uno strumento digitale per l'analisi linguistica e valutazione delle analisi generate dall'intelligenza artificiale**

**Zdania nacechowane we współczesnym języku włoskim – projekt narzędzia cyfrowego do analizy językoznawczej i oceny analiz generowanych przez sztuczną inteligencję**


## 1. Streszczenie projektu

Praca ma zbadać, jak można opisać wybrane włoskie konstrukcje o nacechowanym szyku lub rozczłonkowanej strukturze, przedstawić ich składnię i funkcje dyskursywne w narzędziu cyfrowym oraz ocenić, jak trafnie model językowy je analizuje. Rezultatem praktycznym będzie **projekt funkcjonalny** aplikacji z trzema modułami: przeglądem sprawdzonych przykładów, analizą zdania przez AI i ćwiczeniami. W zakresie pracy nie zakłada się implementacji ani wdrożenia aplikacji.

Punktem wyjścia jest pula około 60 przykładów opatrzonych analizą językoznawczą, zebranych ze wskazanych źródeł internetowych i udokumentowanych wraz z kontekstem oraz pochodzeniem. Osobny, nieujawniany modelowi zbiór testowy posłuży do ewaluacji. Każda analiza będzie reprezentowana jako dane strukturalne, m.in. z dokładnymi zakresami znaków (offsetami) dla segmentów zdania. Model będzie otrzymywał instrukcję i ograniczony schemat odpowiedzi JSON. Zgodność ze schematem ułatwia przetwarzanie, ale sama nie potwierdza poprawności językoznawczej.

**Rekomendowany zakres:** zbudować projekt badania wokół *dislocazione a sinistra*, *dislocazione a destra* i *frase scissa*. *Frase pseudoscissa* i *frase presentativa* opisać w przeglądzie teoretycznym i rozważyć jako rozszerzenia lub kontrolowane przypadki brzegowe. Nie należy z góry zakładać, że wszystkie pięć zjawisk ma ten sam status w klasyfikacji *frasi marcate*. Wariant pięcioelementowy jest możliwy tylko wtedy, gdy promotorka zaakceptuje kryteria odróżniające te konstrukcje i pozwoli na to termin.

## 2. Problem, cel i pytania badawcze

### Problem badawczy

Opisy wybranych konstrukcji włoskich łączą własności składniowe z organizacją informacji, prozodią i kontekstem. Kształt zdania sam w sobie nie zawsze przesądza o jego funkcji: np. przesunięty składnik nie musi w każdym użyciu być tematem, a interpretacja pragmatyczna może zależeć od poprzedzającego dyskursu i intonacji. Badania korpusowe nad dyslokacją lewostronną zwracają uwagę, że jej funkcji nie można sprowadzić do jednego niezmiennego odczytania „temat–komentarz” [Cimmino i Saccone 2025](https://typologyatcrossroads.unibo.it/article/view/21835), [Cimmino 2023](https://benjamins.com/catalog/slcs.227.12cim). Z tego powodu narzędzie powinno prezentować analizę jako uzasadnioną hipotezę, oddzielać obserwowalną formę od interpretacji i pokazywać rolę kontekstu.

### Cel główny

Opracować i uzasadnić projekt niewielkiego narzędzia cyfrowego do wizualizacji wybranych włoskich konstrukcji oraz przeprowadzić ograniczone, powtarzalne badanie jakości analiz generowanych przez AI na odrębnym materiale testowym.

### Cele szczegółowe

1. Zdefiniować operacyjnie wybrane konstrukcje i określić cechy pozwalające je rozpoznawać.
2. Zaprojektować schemat anotacji, który rozdziela opis składniowy, interpretację informacyjną/pragmatyczną i dane źródłowe.
3. Zgromadzić i ręcznie zweryfikować mały zbiór przykładów ze współczesnego włoskiego.
4. Zaprojektować trzy moduły aplikacji oraz przepływ danych między interfejsem, usługą AI i bazą przykładów.
5. Zmierzyć trafność modelu na przykładach spoza zbioru referencyjnego i opisać typy błędów.

### Pytania badawcze

- Jakie formalne cechy pozwalają odróżniać wybrane konstrukcje od szyku neutralnego, konstrukcji sąsiednich i przypadków niejednoznacznych?
- Jakie informacje o składni, kontekście i strukturze informacyjnej są niezbędne do przejrzystego opisu oraz wizualizacji przykładu?
- Jak trafnie badany model rozpoznaje typ konstrukcji i wskazuje jej segmenty na małym, kontrolowanym zbiorze testowym?
- Jakie błędy pojawiają się w interpretacji funkcji informacyjnej, pragmatycznej i w tworzeniu wariantu neutralnego?

Pytania można zawęzić do jednego pytania głównego i 2–3 pomocniczych po uzgodnieniu z promotorką. Nie należy formułować hipotezy, że AI „rozumie” konstrukcję; badanie mierzy zgodność konkretnych odpowiedzi z anotacją referencyjną.

## 3. Zakres językoznawczy i decyzja o MVP

### Rozważane konstrukcje

| Konstrukcja | Wstępna charakterystyka do operacjonalizacji | Miejsce w projekcie |
|---|---|---|
| *Dislocazione a sinistra* | Składnik poza lewą krawędzią klauzy, często powiązany z elementem klitycznym wewnątrz klauzy; trzeba odróżniać m.in. od *tema sospeso*, antepozycji kontrastywnej i zwykłego szyku. | Zakres główny MVP. |
| *Dislocazione a destra* | Składnik występuje na prawo od klauzy, a odpowiedni element (często klityczny) pojawia się wcześniej w klauzie; prozodia i kontekst pomagają odróżnić ją od dopowiedzenia/naprawy. | Zakres główny MVP. |
| *Frase scissa* | Konstrukcja rozczłonkowana z kopulą i członem względnym/zdaniem podrzędnym, np. schemat *è X che…*; wymaga rozpoznania elementu fokusowego oraz treści presuponowanej. | Zakres główny MVP. |
| *Frase pseudoscissa* | Często konstrukcja typu *quello che… è X* / *chi… è X*, z własnym rozkładem informacji i wariantami formalnymi. Nie jest po prostu odmianą *frase scissa* w każdej analizie. | Rozszerzenie; można uwzględnić jako kontrolę, jeśli klasyfikacja będzie jasna. |
| *Frase presentativa* | Rodzina konstrukcji wprowadzających uczestnika/zdarzenie do dyskursu. Nie jest jednoznacznie równoważna *frase scissa* ani prostą kategorią „nacechowanego szyku”; praca o włoskim *ci presentativo* argumentuje za odrębnym opisem konstrukcji prezentatywnej [Cruschina 2018](https://benjamins.com/catalog/catalog/bjl.00016.cru). | Tło teoretyczne lub rozszerzenie; nie włączać do głównej ewaluacji bez wyraźnych kryteriów. |

Tabela przedstawia robocze hipotezy definicyjne, a nie pełne rozstrzygnięcia sporów terminologicznych. Podstawę definicji należy oprzeć na literaturze, a następnie spisać testy diagnostyczne i przypadki wykluczające. Szczególnie ważne jest odróżnienie formy składniowej od etykiety funkcjonalnej.

### Zalecany zakres

**MVP badawcze:** trzy konstrukcje: *dislocazione a sinistra*, *dislocazione a destra*, *frase scissa*, a ponadto etykieta kontrolna „brak konstrukcji z zakresu” oraz etykieta „niejednoznaczne / za mało kontekstu”. Pozostałe dwa typy omawia część teoretyczna i projekt dalszego rozwoju.

**Wariant rozszerzony:** dołączyć *frase pseudoscissa* dopiero po zdefiniowaniu zestawu jej wariantów i odróżnień. *Frase presentativa* dołączyć jedynie jako oddzielną, uzasadnioną kategorię — nie jako automatycznie równorzędny typ w tej samej taksonomii.

To zawężenie ogranicza ryzyko pomieszania kategorii, ułatwia anotację i pozostawia miejsce na rzetelne sprawdzenie modelu. W pracy należy wyjaśnić, dlaczego wybrane zjawiska są porównywane, a które są tylko tłem.

### Granice analizy

- Opracowanie dotyczy współczesnego włoskiego w ograniczonym zestawie źródeł, nie wszystkich odmian regionalnych ani całego repertuaru włoskiej składni.
- Zapis interpunkcyjny nie jest wystarczającym dowodem na granice prozodyczne, szczególnie w transkrypcjach mowy.
- Funkcje *tema*, *rema*, *focus*, *given/new* powinny być anotowane osobno i tylko przy podanym kontekście. Nie należy wymuszać ich pełnego przypisania, gdy materiał na to nie pozwala.
- „Wariant neutralny” jest kontrolowaną parafrazą analityczną, nie jedyną poprawną transformacją. Należy opisać kryterium jej tworzenia i akceptować warianty równoważne.

## 4. Podstawa teoretyczna i literatura

Rozdział teoretyczny powinien łączyć składnię włoską z badaniami nad strukturą informacyjną i dyskursem. Nie powinien być katalogiem definicji oderwanych od późniejszej anotacji.

1. **Włoska składnia i konstrukcje.** Podstawowym punktem odniesienia może być *Grande grammatica italiana di consultazione* pod redakcją Lorenzo Renzi, Giampaolo Salvi i Anny Cardinaletti; uzupełniająco prace o lewym obrzeżu włoskiej klauzy i klitycznej dyslokacji, m.in. Mara Frascarelli (2000) oraz Giuliano i Ippolito (2016). Opis *frasi scisse* i pseudoclefts warto oprzeć na pracach analizujących składnię, prozodię i dyskurs łącznie [Frascarelli 2000](https://link.springer.com/book/10.1007/978-94-015-9500-1), [Frascarelli i Ramaglia 2013](https://benjamins.com/catalog/la.208.04fra), [Giuliano i Ippolito 2016](https://benjamins.com/catalog/la.226.10gio).
2. **Struktura informacyjna.** Rozróżnić syntaktyczne funkcje składników od kategorii dyskursywnych (temat/komentarz, fokus, informacja dana/nowa). Warto korzystać z Lambrechta (1994), Frascarelli (2000) i badań korpusowych. Nie przyjmować prostego odwzorowania „element na początku = temat” jako uniwersalnej reguły.
3. **Ujęcie korpusowe.** Prace Cimmino pokazują pożytek z łączenia poziomu składniowego, informacyjnego i tekstowego oraz ostrożność przy wyprowadzaniu funkcji z samej postaci. Badanie 2025 opiera się na korpusach mowy spontanicznej, co wzmacnia uzasadnienie dla dokumentowania kontekstu i gatunku [Cimmino i Saccone 2025](https://typologyatcrossroads.unibo.it/article/view/21835); odrębny rozdział książkowy porównuje odmiany mówione i pisane [Cimmino 2023](https://benjamins.com/catalog/slcs.227.12cim).
4. **Konstrukcje prezentatywne i pseudocleft.** Należy sprawdzić, czy zakres „*frase presentativa*” odpowiada konkretnemu zjawisku, np. *ci presentativo*, i nie mieszać go z konstrukcjami egzystencjalnymi czy cleftami. Dla pseudocleftów w interakcji współczesnej przydatny jest opis korpusowy [Pseudo-clefts in Italian talk-in-interaction… (2022)](https://www.sciencedirect.com/science/article/abs/pii/S0024384121001996); dla prezentatywnego *ci* [Cruschina 2018](https://benjamins.com/catalog/catalog/bjl.00016.cru).
5. **Językoznawstwo korpusowe i anotacja.** Zdefiniować jednostkę analizy, metadane, politykę niepewności i procedurę kontroli anotacji. Przydatnym punktem odniesienia dla włoskiej mowy jest KIParla; dla współczesnego pisma CORIS/CODIS. Nie trzeba pobierać ich danych do pracy, ale mogą służyć do odkrywania materiału i orientacji w gatunkach. Warunki KIParla ograniczają konsultację do celów naukowych, wymagają cytowania i zakazują włączania danych do innego zasobu bez zgody administratorów; dostęp do nagrań audio podlega odrębnej procedurze [KIParla: warunki i dostęp](https://kiparla.it/en/search/). Dla CORIS/CODIS sprawdzić aktualne warunki konkretnego interfejsu i materiału [CORIS/CODIS](https://corpora.ficlit.unibo.it/coris_eng.html).
6. **Ewaluacja modeli językowych.** Oceniać rozpoznanie klas, segmentów i uzasadnień osobno; publikować prompt, identyfikator/wariant modelu, datę, parametry i surowe odpowiedzi. Structured Outputs może wymuszać format zgodny ze schematem, ale nie waliduje prawdziwości treści [dokumentacja OpenAI Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs?api-mode=responses).

### Bibliografia robocza do rozwinięcia

- Cardinaletti, Anna. 2020. “Left- and Right-Dislocation and the Speaker’s Perspective.” W: *Brazilian Portuguese, Syntax and Semantics: 20 Years of Núcleo de Estudos Gramaticais*, 87–106. John Benjamins. [Opis i DOI](https://benjamins.com/catalog/la.260.03car).
- Cimmino, Doriana. 2023. “On the Topic-Marking Function of Left Dislocations and Preposings: Variation across Spoken and Written Italian and English.” W: *Discourse Phenomena in Typological Perspective*, 337–368. John Benjamins. [Opis i DOI](https://benjamins.com/catalog/slcs.227.12cim).
- Cimmino, Doriana i Valentina Saccone. 2025. “Beyond the Topic-Marking Discourse Function of Left Dislocations. Evidence from Italian, Spanish, and English Spoken Corpora.” *Linguistic Typology at the Crossroads* 5(1): 181–234. [Pełny opis i tekst](https://typologyatcrossroads.unibo.it/article/view/21835).
- Cruschina, Silvio. 2018. “Setting the Boundaries: Presentational *ci*-Sentences in Italian.” W: *Non-prototypical Clefts*, 63–90. John Benjamins. [Opis i DOI](https://benjamins.com/catalog/catalog/bjl.00016.cru).
- De Stefani, Elwys. 2022. “Pseudo-clefts in Italian talk-in-interaction and in interaction-as-represented.” *Lingua* 271: 103227. [Opis i DOI](https://doi.org/10.1016/j.lingua.2021.103227).
- Frascarelli, Mara. 2000. *The Syntax-Phonology Interface in Focus and Topic Constructions in Italian*. Dordrecht: Kluwer. [Opis książki](https://link.springer.com/book/10.1007/978-94-015-9500-1).
- Frascarelli, Mara i Francesca Ramaglia. 2013. “(Pseudo)Clefts at the Syntax-Prosody-Discourse Interface.” W: *Cleft Structures*, red. Katharina Hartmann i Tonjes Veenstra, 97–138. John Benjamins. [Opis i DOI](https://doi.org/10.1075/la.208.04fra).
- Giuliano, Patrizia i Michela Ippolito. 2016. “Clitic Left Dislocation and Hanging Topic: Discourse and the Syntax of the Left Periphery.” W: *Discourse-Oriented Syntax*, 229–250. John Benjamins. [Opis i DOI](https://benjamins.com/catalog/la.226.10gio).
- Lambrecht, Knud. 1994. *Information Structure and Sentence Form: Topic, Focus, and the Mental Representations of Discourse Referents*. Cambridge: Cambridge University Press.
- Mauri, Caterina, Silvia Ballarè, Eugenio Goria, Massimo Cerruti i Francesco Suriano. 2019. “KIParla Corpus: A New Resource for Spoken Italian.” W: *Proceedings of the Sixth Italian Conference on Computational Linguistics*. [ACL Anthology](https://aclanthology.org/2019.clicit-1.37/).
- Renzi, Lorenzo, Giampaolo Salvi i Anna Cardinaletti (red.). 1988–1995. *Grande grammatica italiana di consultazione*. Bologna: il Mulino. (W bibliografii końcowej podać tomy/rozdziały faktycznie wykorzystane).

To bibliografia startowa, nie zamknięta. Przed złożeniem pracy należy zweryfikować pełne dane bibliograficzne, numery stron, wydanie oraz dostępność źródeł w bibliotece SWPS. Wybór literatury powinien objąć także konkretne rozdziały o dyslokacji, cleftach, pseudocleftach, prozodii i anotacji.

## 5. Korpus i materiał badawczy

### 5.1. Zbiór referencyjny aplikacji

Zbiór około **60 przykładów** jest materiałem dydaktycznym i bazą zweryfikowanych analiz do modułu *Esplora le strutture*. Dla MVP z trzema klasami proponowany układ startowy to 15–20 przykładów na klasę, uzupełniony o przypadki negatywne i brzegowe; ostateczne liczebności wynikną z dostępności dobrych, licencjonowanych fragmentów. Nie trzeba sztucznie doprowadzać liczby do 60 kosztem jakości. Jeśli uwzględnione będą dwie konstrukcje dodatkowe, zmniejszyć liczbę przykładów na klasę albo wydłużyć harmonogram.

Możliwe źródła internetowe:

- **RAI / RaiNews / RaiPlay:** reportaże, wywiady, programy i — gdy są dostępne — transkrypcje lub opisy z identyfikacją wypowiedzi. Oddzielać transkrypcję rzeczywistej wypowiedzi od redakcyjnego opisu strony. Do mowy potrzebny jest kontekst i najlepiej znacznik czasu nagrania.
- **Korpusy naukowe włoskiego:** KIParla (mowa, metadane społeczne i sytuacyjne; dane pobrane przez platformę NoSketch Engine są oznaczone CC BY-NC-SA 4.0) oraz CORIS/CODIS (włoski pisany, dostęp do zapytań w celach naukowych). Sprawdzić licencję i warunki dla konkretnego pliku/fragmentu, zanim zostanie skopiowany, opublikowany lub włączony do aplikacji.
- **Prasa i serwisy informacyjne:** teksty artykułów, wywiady i komentarze, z zachowaniem daty, gatunku, autora/instytucji i linku. Strony prasowe mogą ograniczać dalsze rozpowszechnianie.
- **Materiały audiowizualne z publicznie dostępnymi napisami/transkrypcjami:** używać tylko tam, gdzie można zweryfikować tekst z nagraniem i kontekstem. Napisy automatyczne oznaczać jako niezweryfikowane, dopóki nie zostaną sprawdzone.
- **Przykłady z literatury gramatycznej i artykułów naukowych:** przydatne do wyjaśnienia konstrukcji, ale oznaczyć je jako przykłady literaturowe, nie jako spontaniczne użycia korpusowe.

Strony internetowe są przede wszystkim źródłem identyfikacji materiału; nie oznacza to automatycznie zgody na masowe pobieranie czy ponowne publikowanie tekstu. Najbezpieczniejszy protokół dla pracy to przechowywanie krótkiego cytatu niezbędnego do analizy, adresu, daty dostępu, lokalizacji w materiale i własnej anotacji. Sprawdzić wymagania prawa cytatu, regulaminów korpusów i zasad uczelni; rozważyć udostępnienie w aplikacji metadanych i linku zamiast pełnego tekstu. Nie przedstawiać krótkiego cytatu jako rozwiązania wszystkich kwestii licencyjnych.

### 5.2. Odrębny zbiór testowy

Zbiór testowy służy wyłącznie do oceny modelu i **nie może być częścią promptu, przykładów few-shot ani bazy, którą model przeszukuje**. Rekomendacja dla MVP: 30–40 zdań/fragmentów, dobranych w miarę możliwości tak, by znalazły się w nim przykłady każdej z trzech klas, przypadki „brak konstrukcji” i przypadki niejednoznaczne. Przy tak małej próbie wynik jest eksploracyjny i opisowy; nie uzasadnia twierdzeń o ogólnej jakości AI dla całego języka włoskiego.

Zbiór testowy powinien być tworzony lub odłożony po ustaleniu schematu anotacji; najlepiej pozyskać go z innych materiałów/źródeł lub innego okresu niż część referencyjna. Zapisać reguły doboru i unikać niemal identycznych zdań między zbiorami. Każde zdanie anotuje człowiek przed uruchomieniem modelu, a sporne przypadki trafiają do kategorii niejednoznacznej albo są wyłączane według wcześniej podanej reguły. Jeżeli druga osoba może pomóc, poprosić ją o niezależne oznaczenie podzbioru; w przeciwnym razie wykonać ponowną anotację po przerwie i jawnie opisać ograniczenie.

### 5.3. Jednostka i kontekst

Jednostka może być pojedynczym zdaniem, ale dla interpretacji informacyjnej często konieczny jest poprzedzający (a czasem następujący) fragment dyskursu. Rekord powinien zatem obejmować zdanie docelowe i ograniczony kontekst, np. poprzednią wypowiedź oraz minimalny fragment następujący, jeśli jest potrzebny. Dla nagrań zachować identyfikator rozmówcy, gatunek, medium i znacznik czasu. Ustalić z góry zasady segmentacji wypowiedzi i zachowania pauz/napraw.

### 5.4. Procedura gromadzenia i anotacji

1. Określić kryteria włączenia: współczesny włoski, dające się zweryfikować źródło, wystarczający kontekst, czytelny fragment i możliwość legalnego wykorzystania w pracy.
2. Prowadzić dziennik wyszukiwania: źródło, data, zapytanie/ścieżka odnalezienia, kandydat, decyzja i powód odrzucenia.
3. Wykonać próbę na 8–10 przykładach, sprawdzić definicje i poprawić instrukcję anotacji przed anotowaniem reszty.
4. Anotować w pierwszej kolejności formę i relacje składniowe; dopiero potem strukturę informacyjną i interpretację pragmatyczną.
5. Zachować alternatywne odczytania i stopień pewności; nie zamieniać niepewności w pozornie jednoznaczną etykietę.
6. Ostatecznie zweryfikować każdy przykład ręcznie, z linkiem i kontekstem, oraz zapisać wersję schematu i historię korekt.

## 6. Schemat anotacji i JSON

### 6.1. Zasady modelu danych

- **Rekord referencyjny i odpowiedź AI są osobnymi obiektami.** Nie nadpisywać anotacji człowieka wynikiem AI.
- Używać stabilnych identyfikatorów klas, np. `left_dislocation`, `right_dislocation`, `cleft`, `pseudo_cleft`, `presentative`, `none`, `ambiguous`.
- Każdy fragment w zdaniu zapisywać przez offsety `[start, end)` oraz tekst. Przyjąć offsety w punktach kodowych Unicode, indeksowane od zera, i nie zmieniać normalizacji tekstu po wyznaczeniu offsetów. Przed wdrożeniem uzgodnić tę konwencję z używanym językiem/środowiskiem, ponieważ indeksy JavaScript (UTF-16) i Pythona mogą różnić się dla niektórych znaków. Walidator ma sprawdzać `sentence.slice(start,end) == text` w wybranej reprezentacji indeksów.
- Osobno opisywać funkcję składniową (np. obiekt, argument przyimkowy, zaimek klityczny) i funkcję informacyjną (np. temat, fokus, tło). Te kategorie nie są synonimami.
- Kontekst, źródło, typ medium i daty to metadane; komentarz analityczny nie powinien ich zastępować.
- Gdy funkcja nie jest rozstrzygalna, użyć `null`/`unknown` i opisać powód, zamiast zgadywać.

### 6.2. Przykładowy rekord referencyjny

Poniższy przykład jest **konstruowanym przykładem schematu**, a nie cytatem przypisanym do rzeczywistego źródła.

```json
{
  "id": "ref-001",
  "schema_version": "1.0",
  "sentence": "Questo libro, l'ho comprato ieri.",
  "context": {
    "preceding": "Che cosa hai fatto con il libro che ti ho consigliato?",
    "following": null,
    "context_note": "Przykład ilustracyjny; kontekst skonstruowany."
  },
  "source": {
    "source_type": "constructed",
    "publisher": null,
    "title": null,
    "url": null,
    "accessed_at": null,
    "published_at": null,
    "speaker": null,
    "timestamp": null,
    "license_note": "Przykład niepochodzący z publikacji."
  },
  "annotation": {
    "construction": "left_dislocation",
    "certainty": "high",
    "spans": [
      {
        "id": "s1",
        "text": "Questo libro",
        "start": 0,
        "end": 12,
        "syntactic_role": "dislocated_object",
        "information_role": "topic",
        "relation_to": "s2"
      },
      {
        "id": "s2",
        "text": "l'",
        "start": 14,
        "end": 16,
        "syntactic_role": "resumptive_clitic",
        "information_role": null,
        "relation_to": "s1"
      }
    ],
    "neutral_variant": {
      "text": "Ho comprato questo libro ieri.",
      "status": "proposed_paraphrase",
      "note": "Wariant porównawczy; nie jedyna możliwa parafraza."
    },
    "pragmatic_function": ["topic_continuity"],
    "pragmatic_note": "Funkcja interpretowana na podstawie kontekstu.",
    "evidence_note": "Element lewostronny jest podjęty klitykiem dopełnieniowym.",
    "annotator_id": "annotator-1",
    "review_status": "reviewed"
  }
}
```

W tym przykładzie spacje i przecinek są zachowane, a zakres `Questo libro` ma 12 punktów kodowych. Implementacja powinna wyznaczać offsety automatycznie na podstawie tekstu, nie ręcznie przepisywać indeksów. Przykład pokazuje też, dlaczego tekst źródłowy nie może być „poprawiany” po anotacji bez ponownego przeliczenia zakresów.

### 6.3. Minimalny kontrakt odpowiedzi AI

Wejściem modelu powinno być: zdanie, jawnie przekazany kontekst, krótkie definicje klas i kryteria diagnostyczne, dopuszczalne wartości pól oraz instrukcja, aby model mógł zwrócić brak rozstrzygnięcia. Nie wysyłać modelowi referencyjnej anotacji ocenianego przykładu. Nie podawać mu odpowiedzi z testu przez wyszukiwarkę ani ukryty kontekst.

Przykładowa odpowiedź modelu ma zwracać następujące pola. Poniższy JSON Schema jest schematem roboczym; przed użyciem z konkretnym API trzeba sprawdzić obsługiwany podzbiór słownika JSON Schema i dopasować nazwy/typy do jego wymagań.

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "construction": {
      "type": "string",
      "enum": ["left_dislocation", "right_dislocation", "cleft", "none", "ambiguous"]
    },
    "certainty": {"type": "string", "enum": ["high", "medium", "low"]},
    "spans": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "text": {"type": "string"},
          "start": {"type": "integer", "minimum": 0},
          "end": {"type": "integer", "minimum": 0},
          "role": {
            "type": "string",
            "enum": ["dislocated_constituent", "resumptive_clitic", "cleft_focus", "copula", "relative_clause", "other"]
          },
          "relation_to": {"type": ["string", "null"]}
        },
        "required": ["text", "start", "end", "role", "relation_to"]
      }
    },
    "information_structure": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "topic_span": {"type": ["string", "null"]},
        "focus_span": {"type": ["string", "null"]},
        "comment": {"type": "string"}
      },
      "required": ["topic_span", "focus_span", "comment"]
    },
    "pragmatic_function": {"type": "array", "items": {"type": "string"}},
    "neutral_variant": {"type": ["string", "null"]},
    "explanation": {"type": "string"},
    "needs_more_context": {"type": "boolean"}
  },
  "required": ["construction", "certainty", "spans", "information_structure", "pragmatic_function", "neutral_variant", "explanation", "needs_more_context"]
}
```

Prompt powinien wymagać, aby `text` dokładnie odpowiadał podanemu wycinkowi zdania, a zakresy były poprawne. Po odpowiedzi backend (w projekcie aplikacji) walidowałby JSON Schema, zgodność offsetów z tekstem i dozwolone etykiety. Błędy walidacji należy oddzielić od błędów merytorycznych. Mechanizm Structured Outputs pozwala ograniczyć błąd formatu; nie gwarantuje poprawnego rozpoznania ani uzasadnienia [dokumentacja](https://developers.openai.com/api/docs/guides/structured-outputs?api-mode=responses). Użycie dowolnego API, modelu, parametrów czy kosztów wymaga decyzji promotorki i dostępności po stronie autora; praca może opisać protokół niezależny od dostawcy.

## 7. Projekt badania i ocena AI

### 7.1. Protokół eksperymentu

1. Zamrozić wersję instrukcji anotacji i schematu; przygotować testowy zestaw z gold standardem przed uruchomieniem AI.
2. Ustalić model/wersję (jeśli dostępna), interfejs, datę, parametry generowania, prompt systemowy, prompt użytkownika i ograniczenia wejścia. Przechować dokładny prompt i surowy wynik dla powtarzalności.
3. Uruchomić każde zdanie w tym samym trybie. Jeżeli model jest niedeterministyczny, z góry zdecydować, czy wykonuje się jeden przebieg czy np. trzy przebiegi na przykład; nie wybierać najlepszego wyniku po fakcie.
4. Zarejestrować odpowiedź, błędy techniczne, odmowy, błędy schematu i czas odpowiedzi. Jeśli używane są Structured Outputs, raportować ich walidację osobno.
5. Porównać z anotacją referencyjną według wcześniej ustalonych reguł; rozstrzygać równoważne parafrazy ręcznie na podstawie rubric.
6. Przeanalizować błędy jakościowo i podać ograniczenia zbioru oraz badania.

### 7.2. Metryki ilościowe

- **Klasyfikacja konstrukcji:** macierz pomyłek, trafność (accuracy), precyzja, czułość i F1 dla każdej klasy; przy niezrównoważonych klasach raportować macro-F1, nie samą accuracy.
- **Segmentacja:** dokładne dopasowanie spanów (exact match) dla kluczowych fragmentów, uzupełnione częściowym dopasowaniem (np. intersection-over-union) i opisem konwencji liczenia. Oddzielić błąd treści segmentu od błędu offsetu.
- **Pola struktury informacyjnej:** zgodność etykiet dla gold spanów, raportowana osobno od klasyfikacji składniowej; nie punktować interpretacji, jeżeli gold oznacza ją jako nieokreśloną.
- **Format:** odsetek odpowiedzi parsowalnych i zgodnych ze schematem; odsetek spanów, których tekst i offsety zgadzają się z wejściem.
- Podać liczebności klas, brakujące odpowiedzi i wyniki per klasa. Przy małym N interpretować metryki opisowo, ewentualnie pokazać przedziały niepewności, bez nadmiernych wniosków statystycznych.

### 7.3. Ocena jakościowa

Oceniać uzasadnienie i pragmatyczną interpretację według krótkiej rubryki, np. 0 = błędne/brak uzasadnienia, 1 = częściowo trafne lub zbyt kategoryczne, 2 = trafne i oparte na cechach widocznych w zdaniu/kontekście. Osobno notować: pomylenie klas, błędne wskazanie klityku/elementu koreferencyjnego, nadinterpretację „tematu”/„fokusu”, nieuwzględnienie kontekstu/prozodii, nienaturalny wariant neutralny, halucynowane informacje o źródle oraz właściwe użycie `ambiguous`/`needs_more_context`.

Ocena jakościowa powinna być wykonana przez autora według opublikowanej rubryki; wskazane jest niezależne sprawdzenie części wyników przez drugą osobę znającą język włoski. Jeśli to niemożliwe, nie deklarować zgodności między anotatorami. Rozważyć ponowną ocenę losowego podzbioru po odstępie czasu.

### 7.4. Co wolno wnioskować

Badanie odpowie, jak wybrany model, prompt, data i mały zbiór wypadają wobec przygotowanej anotacji. Nie odpowie, który dostawca jest „najlepszy”, czy model rozumie pragmatykę jak człowiek, ani jak system będzie działał na wszystkich tekstach, rejestrach i odmianach włoskiego. Jeśli porównywane są dwa modele albo dwa prompty, traktować to jako osobne warunki eksperymentu i nie zmieniać innych elementów protokołu.

## 8. Wstępny projekt aplikacji (bez implementacji)

### 8.1. Użytkownicy i cel

Głównym użytkownikiem jest student/ka włoskiego lub osoba ucząca się analizy językoznawczej. Aplikacja ma pokazywać, z jakich przesłanek wynika analiza, uczyć rozpoznawania konstrukcji i uczciwie sygnalizować miejsca zależne od kontekstu. Nie ma zastępować słownika, pełnego parsera ani oceny eksperckiej.

### 8.2. Moduły

| Moduł | Główne działanie | Zawartość MVP |
|---|---|---|
| **Esplora le strutture** | Przeglądanie przykładów ręcznie opracowanych. | Filtry konstrukcji/gatunku; zdanie i kontekst; wizualne warstwy składni, struktury informacyjnej i prozodii (jeśli dostępna); relacje między dyslokowanym składnikiem a klitykiem; interpretacja z uzasadnieniem; źródło i wariant porównawczy. |
| **Analizza una frase** | Wpisanie zdania i opcjonalnego kontekstu, wywołanie analizy AI. | Wynik z etykietą konstrukcji, spanami, relacjami, ostrożną interpretacją, pewnością/niepewnością i ewentualnym wariantem neutralnym. Wyraźnie oznaczyć wynik jako automatyczny; umożliwić porównanie z regułami ze *Esplora*. |
| **Mettiti alla prova** | Ćwiczenia na wcześniej zweryfikowanych danych. | Rozpoznawanie konstrukcji, wskazywanie kluczowego segmentu/klityku, odróżnianie funkcji składniowej i informacyjnej, informacja zwrotna odwołująca się do anotacji referencyjnej. |

### 8.3. Wspólny język wizualny

To samo zdanie można pokazać w trzech zsynchronizowanych warstwach:

1. **Powierzchnia i segmenty:** składniki wyróżnione nawiasami/kolorami oraz etykietami; selekcja segmentu pokazuje jego tekst i zakres.
2. **Relacje składniowe:** linie łączące składnik dyslokowany z klitykiem lub członem konstrukcji; linia nie sugeruje ruchu syntaktycznego jako bezspornego, jeżeli teoria pozostawia analizę otwartą.
3. **Informacja i kontekst:** odrębne oznaczenia tematu/fokusu tylko tam, gdzie uzasadnia je kontekst; obok krótka nota interpretacyjna i kontekst źródłowy.

Porównanie z wariantem neutralnym powinno być przedstawione jako parafraza do dyskusji, z objaśnieniem, co ulega zmianie w szyku i organizacji informacji. Nie sugerować, że każda para konstrukcja nacechowana–neutralna jest semantycznie identyczna.

### 8.4. Scenariusze użytkownika

- **Nauka:** użytkownik wybiera *dislocazione a sinistra*, czyta przykład z RAI lub korpusu, rozwija warstwę składniową, widzi klityk powiązany z wcześniejszym składnikiem, następnie czyta notę o kontekście i możliwej funkcji.
- **Analiza własnego zdania:** użytkownik wkleja zdanie, opcjonalnie dodaje kontekst; aplikacja zwraca analizę AI, wskazuje niepewność i pokazuje, które fragmenty tekstu odpowiadają poszczególnym polom.
- **Ćwiczenie:** użytkownik oznacza typ i segment; system porównuje wybór z zatwierdzoną anotacją i wyjaśnia różnicę, jeżeli system zachował alternatywną interpretację.

### 8.5. Architektura logiczna

```text
Interfejs
  ├─ katalog przykładów referencyjnych (niezmienny zbiór zatwierdzony)
  ├─ ćwiczenia i informacja zwrotna
  └─ formularz zdania + kontekst
          ↓
Warstwa aplikacyjna
  ├─ walidacja wejścia i zakresów
  ├─ pobranie definicji/instrukcji i schematu
  ├─ wywołanie wybranego modelu przez bezpieczny backend
  └─ walidacja odpowiedzi + zapis metadanych eksperymentu
          ↓
Widok wyniku + ewentualny rejestr odpowiedzi AI odseparowany od gold standardu
```

To opis logiczny, nie wybór konkretnych technologii. Jeśli praca ma zostać wyłącznie koncepcją i ewaluacją, wystarczy prototyp ekranów lub diagramy, o ile promotorka uzna je za odpowiedni rezultat praktyczny. Nie należy przechowywać klucza API po stronie przeglądarki; jeśli integracja zostanie wdrożona, dane wejściowe i retencja wymagają osobnej decyzji.

## 9. Proponowana struktura pracy

1. **Wstęp:** temat, motywacja, cel, pytania, zakres i układ pracy.
2. **Ramy teoretyczne:** *frasi marcate* i rozważane konstrukcje; składnia; struktura informacyjna; pragmatyka, dyskurs i prozodia; granice kategorii.
3. **Projekt cyfrowej pomocy językoznawczej:** potrzeby użytkownika, wymagania, trzy moduły, model danych, wizualizacja i ograniczenia. Wyraźnie zaznaczyć, że aplikacja jest projektem/prototypem, jeśli nie została zaimplementowana.
4. **Materiał i metodologia:** źródła, kryteria doboru, korpus referencyjny i testowy, anotacja, JSON, gold standard, prompt i protokół eksperymentu.
5. **Wyniki ewaluacji:** metryki, wyniki per klasa/pole, analiza jakościowa błędów i przykłady.
6. **Dyskusja:** odpowiedzi na pytania badawcze, znaczenie dla opisu włoskiego i narzędzia, ograniczenia i możliwość rozwoju.
7. **Zakończenie.**
8. **Bibliografia i załączniki:** instrukcja anotacji, schemat JSON, prompt, tabela testowa (z ograniczeniami dostępu do cytatów), mockupy/diagramy, rubryka oceny.

Rozdziały i ich proporcje należy uzgodnić z promotorką i dostosować do zasad dla konkretnego kierunku. Jeżeli aplikacja nie będzie zaimplementowana, praca nadal musi zawierać własny, weryfikowalny wkład badawczy; sam opis pomysłu i makiety byłyby za słabe wobec deklarowanego tytułu obejmującego ocenę AI.

## 10. Krytyczna weryfikacja: SWPS i status pracy

### Co można potwierdzić

Regulamin studiów SWPS opublikowany w BIP opisuje pracę dyplomową jako samodzielne opracowanie zagadnienia naukowego, artystycznego lub praktycznego albo dokonanie techniczne/artystyczne, które prezentuje wiedzę i umiejętności związane z kierunkiem oraz umiejętność samodzielnej analizy i wnioskowania (§ 39). Wskazuje też, że studia pierwszego stopnia przewidują pracę dyplomową, jeśli przewiduje ją program. Regulamin odsyła do szczegółowych zasad dziekana dla danego wydziału, publikowanych w Wirtualnej Uczelni przed rokiem akademickim (§ 38) [Regulamin studiów SWPS, § 38–40](https://bip.swps.pl/attachments/3189/download). To daje **ogólne podstawy** do rozważenia projektu praktycznego połączonego z badaniem.

### Czego nie potwierdzono

Nie udało się na podstawie publicznie znalezionych dokumentów potwierdzić szczegółowych, aktualnych wymogów dla **konkretnego kierunku, wydziału, lokalizacji i rocznika użytkownika** (np. dozwolonej formy praktycznej pracy licencjackiej, wymaganej objętości, obligatoryjnego wdrożenia, szablonu, liczby rozdziałów lub minimalnej liczby przykładów). Publicznie dostępne zasady wydziałowe dotyczące prawa/komunikacji nie mogą być automatycznie przenoszone na italianistykę [przykład zasad dla innego wydziału/kierunku](https://www.swps.pl/images/zasady-dyplomowania-2022-23-WPiKS.pdf). Zatem nie można twierdzić, że ten projekt na pewno spełnia wszystkie wymogi SWPS.

### Ocena dopasowania

Temat ma sens jako praca na styku italianistyki i narzędzia cyfrowego, jeśli część językoznawcza i badawcza pozostaje centralna. Projekt spełni ogólną logikę samodzielnej pracy praktycznej, gdy zawiera: (a) przegląd i krytyczną syntezę literatury, (b) samodzielnie przygotowaną oraz udokumentowaną anotację, (c) przeprowadzoną ewaluację AI, (d) analizę wyników i ograniczeń, (e) konkretny projekt aplikacji. **Sam interfejs bez badań** albo sama lista przykładów bez jawnych kryteriów anotacji osłabiłyby wartość akademicką.

Przed zatwierdzeniem tematu trzeba sprawdzić w Wirtualnej Uczelni/aktualnych zasadach swojego programu, czy profil kierunku dopuszcza projekt cyfrowy jako rezultat, czy praca ma być napisana po polsku czy włosku, jakie są wymogi formalne i kto może promować. Te pytania nie blokują przygotowania koncepcji; są decyzjami do uzyskania od promotorki/koordynacji.

## 11. Czy da się to zrobić w 2–3 miesiące?

**Wariant MVP — warunkowo tak, przy pracy skoncentrowanej i po szybkim zatwierdzeniu zakresu.** W 8–12 tygodni wykonalne wydaje się: przegląd selektywnej literatury, 40–60 przykładów referencyjnych, 30–40 zdań testowych, jedna wersja promptu i jeden model, wizualny projekt trzech modułów oraz analiza wyników. Warunki: brak pełnego wdrożenia produkcyjnego, ograniczone źródła, stały tygodniowy czas pracy, wczesna zgoda promotorki i brak nieoczekiwanych przeszkód w dostępie do danych.

**Wariant pełny — pięć klas plus dopracowana aplikacja i szerokie porównanie modeli — nie jest wiarygodnym planem na 2–3 miesiące.** Zwłaszcza *frase presentativa* i rozróżnienie *scissa/pseudoscissa* zwiększają koszt definicji oraz anotacji; pozyskanie i weryfikacja kontekstu z wielu serwisów również bywa powolna. W pełnym wdrożeniu dochodzą prace techniczne, prywatność danych, obsługa błędów API i testy użyteczności. Jeśli faktycznym wymogiem jest działająca aplikacja, należy albo wydłużyć termin, albo ograniczyć badanie/zakres i potwierdzić to z promotorką.

Szacowanie zakłada gotowość autora do pracy w narzędziach cyfrowych i sprawne uzyskanie dostępu do modelu. Jeśli wymagane jest samodzielne nauczenie się pełnego stosu technicznego, przygotowanie pięciu klas albo pozyskanie i transkrypcja nagrań, 2–3 miesiące mogą nie wystarczyć.

## 12. Harmonogram 10 tygodni (z buforem do 12)

| Tydzień | Zadanie | Rezultat / punkt kontrolny |
|---|---|---|
| 1 | Spotkanie z promotorką; potwierdzenie formy pracy, języka, zakresu i kryteriów SWPS. | Zatwierdzony temat roboczy i MVP 3 klas. |
| 2 | Literatura podstawowa; definicje i diagnostyka; ustalenie kategorii kontrolnych. | Tabela definicji, instrukcja anotacji v0. |
| 3 | Pilotaż na 8–10 przykładach, analiza trudnych przypadków, zamrożenie pierwszego schematu. | Schemat danych v1 i reguły doboru. |
| 4–5 | Zbieranie i weryfikacja zbioru referencyjnego; metadane i anotacja. | Około 40–60 rekordów; rejestr źródeł. |
| 6 | Pozyskanie osobnego test setu, anotacja gold, prompt i walidacja JSON na małej próbce spoza testu. | Zablokowany zbiór testowy i protokół. |
| 7 | Uruchomienie ewaluacji; zapis wyników i wersji modelu/instrukcji. | Surowe odpowiedzi oraz arkusz pomyłek. |
| 8 | Obliczenie metryk i ręczna analiza błędów; ewentualna ponowna anotacja podzbioru. | Tabele wyników i przykłady jakościowe. |
| 9 | Projekt modułów, wizualizacji i przepływu danych; przygotowanie mockupów/diagramu. | Spójny projekt aplikacji, bez implementacji. |
| 10 | Napisanie dyskusji, ograniczeń, redakcja, bibliografia i konsultacja. | Pełny szkic do promotorki. |
| 11–12 (bufor) | Korekty po konsultacji, uzupełnienia literatury, format i finalna kontrola. | Wersja końcowa / bezpieczny zapas. |

Punkt krytyczny: jeżeli po tygodniu 3 definicje i schemat nie są stabilne, ograniczyć zakres do 2–3 konstrukcji i zmniejszyć liczbę typów metadanych, zamiast później nadganiać kosztem rzetelności.

## 13. Ryzyka i sposoby ograniczania

| Ryzyko | Skutek | Ograniczenie |
|---|---|---|
| Nieostre granice kategorii lub różne definicje w literaturze. | Nierzetelne etykiety i nieczytelna macierz pomyłek. | Jawne definicje operacyjne, przypadki brzegowe, pilotaż, kategoria `ambiguous`; MVP 3 klas. |
| Funkcja pragmatyczna zależy od kontekstu/prozodii. | Nadmiernie pewne, błędne etykiety. | Zachować kontekst i medium; pozwolić na `unknown`; osobno oceniać składnię i pragmatykę. |
| Źródła online znikają, zmieniają tekst lub ograniczają wykorzystanie. | Brak możliwości weryfikacji/reprodukcji albo problem prawny. | Zapisać URL, datę dostępu, tytuł, lokalizację/czas; sprawdzić licencję; użyć linku i krótkiego fragmentu zgodnie z zasadami. |
| Zbiór jest mały albo niezrównoważony. | Metryki niestabilne i słabo uogólnialne. | Raportować liczebności per klasa, macro-F1, wyniki opisowe i ograniczenia. |
| Przeciek między zbiorem referencyjnym a testowym. | Sztucznie zawyżona ocena. | Rozdzielić rekordy i źródła, test odłożyć, nie używać testu w przykładach promptu. |
| Model zmienia się lub wynik jest losowy. | Trudna reprodukcja. | Zapisać datę/wariant/parametry/prompt, surowe odpowiedzi i liczbę powtórzeń. |
| Poprawny JSON mylony z poprawną analizą. | Wynik zawyża jakość modelu. | Oddzielić walidację schematu, spanów i treści; audyt merytoryczny. |
| Rozszerzenie projektu do pięciu klas i wdrożenia. | Przekroczenie 2–3 miesięcy. | MVP, bramka decyzyjna w tygodniu 3, implementację potraktować jako osobny etap. |
| Aplikacja przechowuje wklejone dane lub klucz API. | Ryzyko prywatności i bezpieczeństwa. | W projekcie opisać minimalizację danych; przy wdrożeniu klucz wyłącznie na backendzie i jawna polityka retencji. |
| Brak drugiego anotatora. | Nie można oszacować zgodności anotacji. | Jawnie opisać ograniczenie; ponowna anotacja podzbioru po czasie; nie deklarować inter-annotator agreement. |

## 14. Kwestie otwarte i decyzje do uzgodnienia

1. Jaki jest dokładny kierunek, wydział, lokalizacja i rocznik studiów? Jakie aktualne zasady dyplomowania dotyczą tej osoby?
2. Czy praca ma być po polsku czy po włosku i czy SWPS dopuszcza w tym programie projektową pracę licencjacką w formie opisanej powyżej?
3. Czy promotorka zatwierdza MVP obejmujące trzy konstrukcje (*dislocazione a sinistra*, *dislocazione a destra*, *frase scissa*) oraz traktowanie pseudocleftów i prezentatywów jako rozszerzeń/tła?
4. Czy aplikacja ma być wyłącznie zaprojektowana (makiety i model danych), czy program wymaga działającego prototypu? Jeśli prototypu, jaki minimalny poziom działania jest wymagany?
5. Czy zbiór referencyjny ma liczyć około 60 przykładów, a testowy 30–40 nowych jednostek? Czy dostępny jest drugi anotator/ekspert do przeglądu części materiału?
6. Które źródła internetowe i korpusy są akceptowane przez promotorkę? Czy w pracy/aplikacji można przechowywać cytowane fragmenty, czy publikować jedynie metadane i linki?
7. Czy ewaluacja ma dotyczyć jednego modelu i jednego promptu (wariant najprostszy), czy porównać kilka modeli/promptów? Kto finansuje dostęp do API, jeśli będzie potrzebne?
8. Jaka jest wymagana objętość i format pracy, terminy konsultacji/oddania oraz oczekiwany typ rezultatu praktycznego?

## 15. Rekomendacja końcowa

Temat ma potencjał na sensowną pracę licencjacką, jeśli autor ograniczy go do małego, jawnie zdefiniowanego zakresu i potraktuje aplikację jako rezultat wspierający badanie, a nie jego substytut. Najbardziej obronny plan w 2–3 miesiące to **trzy konstrukcje, około 60 ręcznie sprawdzonych przykładów referencyjnych, osobny test set 30–40 przykładów, jeden model/konfiguracja, ilościowa ocena klasyfikacji i segmentacji, jakościowa analiza błędów oraz projekt trzech modułów bez produkcyjnej implementacji**.

Przed rozpoczęciem zbierania materiału należy uzgodnić z promotorką dwie bramki: (1) czy projekt cyfrowy i ewaluacja AI odpowiadają wymogom konkretnego programu SWPS; (2) czy proponowany zakres trzech konstrukcji jest językoznawczo właściwy. Jeżeli odpowiedź na pierwszą kwestię wymaga działającej aplikacji, przygotowany harmonogram i zakres trzeba zrewidować.

## Źródła instytucjonalne i zasoby

- Uniwersytet SWPS, *Regulamin studiów*, § 39–40 (wersja opublikowana w BIP; zasady szczegółowe zależą od programu): [PDF](https://bip.swps.pl/attachments/3189/download).
- Uniwersytet SWPS, przykład zasad dyplomowania dla innego wydziału/kierunku — użyty wyłącznie jako potwierdzenie, że zasady szczegółowe są kierunkowe, nie jako obowiązujące tu wymagania: [PDF](https://www.swps.pl/images/zasady-dyplomowania-2022-23-WPiKS.pdf).
- KIParla, opis zasobu: [strona projektu](https://kiparla.it/en/), [warunki udostępniania i dostępu do audio](https://kiparla.it/en/search/).
- CORIS/CODIS, Corpus of Written Italian: [opis i dostęp](https://corpora.ficlit.unibo.it/coris_eng.html).
- OpenAI, *Structured model outputs*: [dokumentacja](https://developers.openai.com/api/docs/guides/structured-outputs?api-mode=responses).
