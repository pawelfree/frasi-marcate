export const I18n = (() => {
  const messages: Record<string, Record<string, string>> = {
    pl: {
      pageTitle: "Frasi marcate — laboratorium włoskiego",
      adminTitle: "Panel administracyjny — Frasi marcate",
      navExplore: "Esplora",
      navAnalyze: "Analizza",
      navQuiz: "Mettiti alla prova",
      navAdmin: "Panel admina ↗",
      navUser: "← Widok użytkownika",
      heroEyebrow: "LABORATORIUM JĘZYKA WŁOSKIEGO",
      heroLine1: "Zdanie ma więcej",
      heroLine2: "niż jeden",
      heroEm: "porządek.",
      heroLead:
        "Odkrywaj włoskie konstrukcje, obserwuj ich segmenty i sprawdzaj, jak kontekst wpływa na interpretację.",
      heroExplore: "Poznaj konstrukcje",
      heroQuiz: "Sprawdź się",
      heroArt: "MAŁA ZMIANA, NOWE ZNACZENIE",
      exploreEyebrow: "01 / ODKRYWAJ",
      exploreTitle: "Esplora le strutture",
      exploreLead:
        "Ręcznie opracowane przykłady. Kliknij fragment zdania, by zobaczyć jego funkcję.",
      construction: "Konstrukcja",
      all: "Wszystkie",
      example: "Przykład",
      analyzeEyebrow: "02 / EKSPERYMENTUJ",
      analyzeTitle: "Analizza una frase",
      analyzeLead:
        "Wpisz własne zdanie i opcjonalny kontekst. Wynik automatyczny wymaga konfiguracji API na serwerze.",
      italianSentence: "Zdanie po włosku",
      contextOptional: "Kontekst (opcjonalnie)",
      contextPlaceholder: "Co padło wcześniej w rozmowie?",
      analyzeButton: "Analizuj zdanie ↗",
      aiCaution:
        "Wynik AI jest hipotezą; poprawny JSON nie oznacza poprawnej analizy językoznawczej.",
      quizEyebrow: "03 / ĆWICZ",
      quizTitle: "Mettiti alla prova",
      quizLead:
        "Rozpoznaj konstrukcję i jej kluczowy składnik. Odpowiedź porównasz z zatwierdzoną anotacją.",
      yourTask: "TWOJE ZADANIE",
      keySegment: "Kluczowy segment",
      choose: "Wybierz…",
      checkAnswer: "Sprawdź odpowiedź",
      nextSentence: "Kolejne zdanie →",
      footer:
        "Prototyp dydaktyczny — przykłady skonstruowane, bez przypisania do korpusu.",
      adminEyebrow: "PANEL ADMINISTRACYJNY",
      adminHeading: "Przykłady i anotacje",
      adminIntroBefore: "Wklej rekord JSON zgodny ze ",
      adminSchemaLink: "schematem JSON",
      adminIntroAfter:
        ". Zakresy segmentów liczone są w punktach kodowych Unicode. Publicznie widać tylko rekordy ze statusem reviewed.",
      adminPassword: "Hasło administratora",
      login: "Zaloguj",
      load: "Odśwież listę",
      newRecord: "Nowy rekord",
      recordJson: "Rekord JSON",
      validate: "Waliduj JSON",
      save: "Zapisz rekord",
      delete: "Usuń",
      schemaEyebrow: "DOKUMENTACJA REKORDU",
      schemaTitle: "Schemat JSON",
      closeSchema: "Zamknij schemat",
      schemaDescription:
        "Pełny schemat rekordu referencyjnego. Pola required są obowiązkowe; segmenty muszą dodatkowo pasować do tekstu zdania.",
      schemaLoading: "Wczytywanie schematu…",
      copySchema: "Kopiuj schemat",
      passwordNotConfigured: "Hasło nie jest skonfigurowane",
      passwordDisabledHint:
        "Ustaw ADMIN_PASSWORD w pliku .env, aby włączyć logowanie administratora.",
      loggedIn: "Administrator zalogowany.",
      notLoggedIn: "Zaloguj się, aby zapisywać i usuwać rekordy.",
      loginUnavailable:
        "Logowanie jest niedostępne — ustaw ADMIN_PASSWORD w pliku .env.",
      loginSuccess: "Zalogowano administratora.",
      left_dislocation: "Dislocazione a sinistra",
      right_dislocation: "Dislocazione a destra",
      cleft: "Frase scissa",
      none: "Brak konstrukcji z zakresu",
      ambiguous: "Niejednoznaczne",
      high: "wysoka",
      medium: "średnia",
      low: "niska",
      dislocated_object: "Element dyslokowany",
      dislocated_indirect_object: "Element dyslokowany",
      resumptive_clitic: "Zaimek klityczny",
      predicate: "Orzeczenie",
      time_adjunct: "Okolicznik czasu",
      copula: "Kopuła",
      cleft_focus: "Element fokusowy",
      relative_clause: "Człon zdaniowy",
      fetchExamplesError: "Nie udało się pobrać przykładów.",
      noExamples: "Brak zatwierdzonych przykładów dla tego filtra.",
      sentenceAnalysis: "ANALIZA ZDANIA",
      legendDislocated: "Element dyslokowany",
      legendClitic: "Klityk",
      legendFocus: "Fokus",
      legendOther: "Pozostałe",
      neutralHeading: "SZYK NIENACECHOWANY / PARAFRAZA",
      noProposal: "Brak propozycji",
      noVariant: "Nie zaproponowano wariantu.",
      infoHeading: "INFORMACJA I KONTEKST",
      unknownInterpretation: "Interpretacja nieustalona",
      syntaxHeading: "Struktura składniowa",
      context: "Kontekst",
      notProvided: "nie podano",
      source: "Źródło",
      constructed: "przykład skonstruowany",
      sourceMetadata: "metadane źródła",
      certainty: "Pewność",
      noProsody: "Brak danych prozodycznych.",
      selectedElement: "Wybrany element",
      relatedTo: "Powiązany z",
      analyzing: "Trwa analiza…",
      analysisError: "Błąd analizy",
      automaticResult: "Wynik automatyczny",
      quizCorrect: "Dobrze! ",
      quizRetry: "Jeszcze raz przyjrzyj się zdaniu. ",
      noneShort: "brak",
      loadedRecord: "Wczytano rekord",
      loadedRecords: "Wczytano {count} rekordów.",
      newRecordHint: "Uzupełnij rekord, następnie uruchom walidację.",
      jsonSyntaxError: "Niepoprawna składnia JSON",
      recordValid: "Rekord poprawny.",
      savedRecord: "Zapisano rekord",
      selectRecordFirst: "Najpierw wybierz zapisany rekord.",
      deleteConfirm: "Usunąć rekord {id}?",
      recordDeleted: "Rekord usunięty.",
      schemaLoadError: "Nie udało się wczytać schematu",
      copied: "Skopiowano.",
      copyError: "Nie udało się skopiować schematu.",
      serverError: "Żądanie nie powiodło się.",
      unauthorized: "Podaj poprawne hasło administratora.",
      aiUnavailable:
        "Analiza AI wymaga konfiguracji klucza i modelu na serwerze.",
      aiConnectionError: "Nie udało się połączyć z usługą AI.",
      aiInvalid: "Odpowiedź AI ma niepoprawny format.",
      badInput: "Podaj poprawne zdanie i opcjonalny kontekst.",
    },
    it: {
      pageTitle: "Frasi marcate — laboratorio di italiano",
      adminTitle: "Amministrazione — Frasi marcate",
      navExplore: "Esplora",
      navAnalyze: "Analizza",
      navQuiz: "Mettiti alla prova",
      navAdmin: "Amministrazione ↗",
      navUser: "← Vista studente",
      heroEyebrow: "LABORATORIO DI LINGUA ITALIANA",
      heroLine1: "Una frase ha più",
      heroLine2: "di un solo",
      heroEm: "ordine.",
      heroLead:
        "Esplora le costruzioni italiane, osserva i loro segmenti e scopri come il contesto orienta l’interpretazione.",
      heroExplore: "Esplora le strutture",
      heroQuiz: "Mettiti alla prova",
      heroArt: "UN PICCOLO CAMBIAMENTO, UN NUOVO SIGNIFICATO",
      exploreEyebrow: "01 / ESPLORA",
      exploreTitle: "Esplora le strutture",
      exploreLead:
        "Esempi annotati manualmente. Seleziona un segmento della frase per scoprirne la funzione.",
      construction: "Costruzione",
      all: "Tutte",
      example: "Esempio",
      analyzeEyebrow: "02 / SPERIMENTA",
      analyzeTitle: "Analizza una frase",
      analyzeLead:
        "Inserisci una frase e, se vuoi, il contesto. Per l’analisi automatica occorre configurare l’API sul server.",
      italianSentence: "Frase in italiano",
      contextOptional: "Contesto (facoltativo)",
      contextPlaceholder: "Che cosa è stato detto prima?",
      analyzeButton: "Analizza la frase ↗",
      aiCaution:
        "Il risultato dell’AI è un’ipotesi: un JSON valido non garantisce un’analisi linguistica corretta.",
      quizEyebrow: "03 / ESERCITATI",
      quizTitle: "Mettiti alla prova",
      quizLead:
        "Riconosci la costruzione e il segmento chiave. Confronta la risposta con l’annotazione verificata.",
      yourTask: "IL TUO ESERCIZIO",
      keySegment: "Segmento chiave",
      choose: "Seleziona…",
      checkAnswer: "Verifica la risposta",
      nextSentence: "Frase successiva →",
      footer:
        "Prototipo didattico — esempi costruiti, non tratti da un corpus.",
      adminEyebrow: "AREA AMMINISTRATIVA",
      adminHeading: "Esempi e annotazioni",
      adminIntroBefore: "Inserisci un record JSON conforme allo ",
      adminSchemaLink: "schema JSON",
      adminIntroAfter:
        ". Gli intervalli dei segmenti sono espressi in punti di codice Unicode. Sono visibili al pubblico solo i record con stato reviewed.",
      adminPassword: "Password amministratore",
      login: "Accedi",
      load: "Aggiorna elenco",
      newRecord: "Nuovo record",
      recordJson: "Record JSON",
      validate: "Valida JSON",
      save: "Salva record",
      delete: "Elimina",
      schemaEyebrow: "DOCUMENTAZIONE DEL RECORD",
      schemaTitle: "Schema JSON",
      closeSchema: "Chiudi lo schema",
      schemaDescription:
        "Schema completo del record di riferimento. I campi required sono obbligatori; i segmenti devono inoltre corrispondere al testo della frase.",
      schemaLoading: "Caricamento dello schema…",
      copySchema: "Copia lo schema",
      passwordNotConfigured: "Password non configurata",
      passwordDisabledHint:
        "Imposta ADMIN_PASSWORD nel file .env per attivare l’accesso amministratore.",
      loggedIn: "Amministratore autenticato.",
      notLoggedIn: "Accedi per salvare ed eliminare i record.",
      loginUnavailable:
        "Accesso non disponibile: imposta ADMIN_PASSWORD nel file .env.",
      loginSuccess: "Accesso amministratore effettuato.",
      left_dislocation: "Dislocazione a sinistra",
      right_dislocation: "Dislocazione a destra",
      cleft: "Frase scissa",
      none: "Nessuna costruzione prevista",
      ambiguous: "Ambiguo",
      high: "alta",
      medium: "media",
      low: "bassa",
      dislocated_object: "Elemento dislocato",
      dislocated_indirect_object: "Elemento dislocato",
      resumptive_clitic: "Clitico di ripresa",
      predicate: "Predicato",
      time_adjunct: "Complemento di tempo",
      copula: "Copula",
      cleft_focus: "Elemento focale",
      relative_clause: "Proposizione relativa",
      fetchExamplesError: "Impossibile caricare gli esempi.",
      noExamples: "Nessun esempio verificato per questo filtro.",
      sentenceAnalysis: "ANALISI DELLA FRASE",
      legendDislocated: "Elemento dislocato",
      legendClitic: "Clitico",
      legendFocus: "Focus",
      legendOther: "Altri elementi",
      neutralHeading: "ORDINE NON MARCATO / PARAFRASI",
      noProposal: "Nessuna proposta",
      noVariant: "Non è stata proposta una variante.",
      infoHeading: "INFORMAZIONE E CONTESTO",
      unknownInterpretation: "Interpretazione non determinata",
      syntaxHeading: "Struttura sintattica",
      context: "Contesto",
      notProvided: "non indicato",
      source: "Fonte",
      constructed: "esempio costruito",
      sourceMetadata: "metadati della fonte",
      certainty: "Certezza",
      noProsody: "Dati prosodici non disponibili.",
      selectedElement: "Elemento selezionato",
      relatedTo: "In relazione con",
      analyzing: "Analisi in corso…",
      analysisError: "Errore di analisi",
      automaticResult: "Risultato automatico",
      quizCorrect: "Esatto! ",
      quizRetry: "Osserva di nuovo la frase. ",
      noneShort: "nessuno",
      loadedRecord: "Record caricato",
      loadedRecords: "Caricati {count} record.",
      newRecordHint: "Completa il record, poi esegui la validazione.",
      jsonSyntaxError: "Sintassi JSON non valida",
      recordValid: "Record valido.",
      savedRecord: "Record salvato",
      selectRecordFirst: "Seleziona prima un record salvato.",
      deleteConfirm: "Eliminare il record {id}?",
      recordDeleted: "Record eliminato.",
      schemaLoadError: "Impossibile caricare lo schema",
      copied: "Copiato.",
      copyError: "Impossibile copiare lo schema.",
      serverError: "Richiesta non riuscita.",
      unauthorized: "Inserisci la password corretta dell’amministratore.",
      aiUnavailable:
        "Per l’analisi AI occorre configurare chiave e modello sul server.",
      aiConnectionError: "Impossibile collegarsi al servizio AI.",
      aiInvalid: "La risposta dell’AI ha un formato non valido.",
      badInput: "Inserisci una frase valida e, facoltativamente, il contesto.",
    },
  };
  let language: "pl" | "it" =
    localStorage.getItem("frasi-language") === "it" ? "it" : "pl";
  const t = (key, vars = {}) =>
    (messages[language][key] || key).replace(/\{(\w+)\}/g, (_, name) =>
      String(vars[name] ?? ""),
    );
  function apply() {
    document.documentElement.lang = language;
    document
      .querySelectorAll<HTMLElement>("[data-i18n]")
      .forEach((node) => (node.textContent = t(node.dataset.i18n)));
    document
      .querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
        "[data-i18n-placeholder]",
      )
      .forEach((node) => (node.placeholder = t(node.dataset.i18nPlaceholder)));
    document
      .querySelectorAll<HTMLElement>("[data-i18n-aria]")
      .forEach((node) =>
        node.setAttribute("aria-label", t(node.dataset.i18nAria)),
      );
    document.title = t(document.body.dataset.titleKey || "pageTitle");
    document.querySelectorAll<HTMLElement>("[data-lang]").forEach((node) => {
      node.setAttribute("aria-pressed", String(node.dataset.lang === language));
      node.classList.toggle("active", node.dataset.lang === language);
    });
    document.dispatchEvent(
      new CustomEvent("languagechange", { detail: { language } }),
    );
  }
  document.querySelectorAll<HTMLElement>("[data-lang]").forEach((node) =>
    node.addEventListener("click", () => {
      language = node.dataset.lang === "it" ? "it" : "pl";
      localStorage.setItem("frasi-language", language);
      apply();
    }),
  );
  const api = {
    t,
    apply,
    get language() {
      return language;
    },
  };
  apply();
  return api;
})();
