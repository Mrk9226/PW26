# Report tecnico di sviluppo del sito “Report di Sostenibilità - Riso Gallo”

## 1. Introduzione

Questo progetto rappresenta la realizzazione di un sito web one-page dedicato alla presentazione del report di sostenibilità di Riso Gallo. L’obiettivo principale non è stato semplicemente pubblicare contenuti informativi, ma costruire una pagina che comunicasse in modo chiaro, elegante e professionale il valore del brand, il suo impegno ambientale, sociale e etico, e la trasparenza verso il pubblico.

Il sito è stato sviluppato con un approccio modulare: una struttura HTML semantica, una logica di stile organizzata in più fogli CSS, e un insieme di script JavaScript per aggiungere interattività, accessibilità e dinamismo. La scelta di separare i contenuti, il design e il comportamento ha reso l’architettura più leggibile, più manutenibile e più facilmente estendibile nel tempo.

## 2. Obiettivi progettuali

Il lavoro è stato orientato a soddisfare una serie di requisiti di fondo:

- presentare i contenuti in modo narrativo e progressivo;
- garantire un’estetica moderna e istituzionale, coerente con il tema della sostenibilità;
- favorire la leggibilità delle informazioni tramite una struttura a blocchi visivi;
- implementare una navigazione semplice e intuitiva;
- rendere la pagina reattiva su dispositivi mobili e desktop;
- aggiungere elementi interattivi leggeri, senza appesantire l’esperienza utente;
- migliorare l’accessibilità attraverso una struttura semantica e controlli accessibili.

## 3. Struttura generale del progetto

Il progetto è organizzato in modo semplice e lineare:

- il file principale HTML contiene la struttura della pagina;
- il foglio CSS principale gestisce il tema visivo generale, i reset, la tipografia e il layout di base;
- i fogli CSS secondari gestiscono componenti specifici come i pulsanti, la griglia bento, il carosello e gli stili di scorrimento;
- i file JavaScript aggiungono comportamento interattivo e animazioni;
- la cartella img contiene immagini e grafiche di supporto;
- la cartella docs conserva il report PDF e la documentazione.

Questa organizzazione consente di separare chiaramente responsabilità differenti: il contenuto è in HTML, l’aspetto è in CSS, il comportamento è in JavaScript.

## 4. Analisi del file HTML

Il file HTML è il cuore della pagina. È il punto di partenza da cui si costruisce tutta l’esperienza utente. Il documento inizia con la dichiarazione del tipo di documento e con l’impostazione della lingua italiana, un dettaglio importante per garantire compatibilità e correttezza semantica.

### 4.1 Head e integrazione dei file esterni

Nella sezione head vengono dichiarati:

- i meta tag essenziali, tra cui il charset e la viewport, fondamentali per il corretto rendering su dispositivi diversi;
- il titolo della pagina, che descrive il contenuto in modo chiaro;
- il collegamento ai font esterni, impiegati per conferire alla pagina un carattere più raffinato e istituzionale;
- i fogli CSS, ciascuno con una funzione specifica;
- i file JavaScript, caricati in modo da non bloccare la visualizzazione iniziale della pagina;
- l’icona del sito, che contribuisce a rendere l’esperienza più completa e professionale.

Questa parte è essenziale perché definisce la base tecnica su cui si innesta l’intera UI. I CSS vengono caricati prima del corpo della pagina per assicurare che gli stili siano già disponibili all’atto della visualizzazione, mentre gli script vengono inclusi in modo da non interrompere il caricamento del contenuto principale.

### 4.2 Struttura del body

Il body contiene una sequenza di blocchi ben organizzati, con un ordine narrativo preciso:

1. Header principale
2. Hero section
3. Sezione Visione
4. Sezione Progressi
5. Sezione Impegno sociale
6. Sezione Trasparenza e correttezza
7. Sezione Report
8. Footer

Questa divisione consente di presentare il messaggio in fasi progressive. L’utente incontra prima un contesto generale, poi i dati, quindi il valore etico e infine il documento completo del report.

### 4.3 Header e navigazione

L’header è stato progettato come elemento di accesso rapido alla pagina. È posizionato in alto e contiene:

- il logo del brand;
- una navigazione principale con link interni alle sezioni;
- un pulsante per il menu mobile.

La struttura è stata resa semantica con l’uso di header, nav e button. La presenza di attributi ARIA, come aria-expanded, aria-controls e aria-label, migliora l’accessibilità e la comprensione dei controlli da parte delle tecnologie assistive.

### 4.4 Sezioni contenutistiche

Le sezioni principali sono costruite con un ordine logico e con un linguaggio di impaginazione coerente. Ogni blocco è organizzato per parlare di un tema preciso, ad esempio:

- la visione aziendale;
- i progressi ambientali e sociali;
- la trasparenza e le certificazioni;
- il report finale scaricabile in PDF.

In particolare, la pagina usa una struttura a “bento” per i contenuti numerici. Questa scelta visiva aiuta a rendere più leggibile l’informazione, trasformando i dati in unità grafiche indipendenti ma collegate tra loro. Ogni elemento del bento contiene un titolo, un valore, e un testo descrittivo.

### 4.5 Componenti interattivi

Nel markup sono presenti anche elementi speciali:

- card con valori animati, riconoscibili grazie alla classe animate-number;
- un carosello di certificazioni, inizializzato tramite un attributo data-flickity;
- collegamenti che puntano a sezioni interne o al PDF del report;
- immagini con lazy loading per ottimizzare il caricamento.

Questi elementi non sono semplicemente decorativi: rappresentano il punto di raccordo tra contenuto e comportamento, perché il lato HTML fornisce i dati e i riferimenti mentre CSS e JavaScript si occupano di renderizzarli e gestirli dinamicamente.

## 5. Il ruolo del CSS nella costruzione del sito

Il design è stato suddiviso in più fogli di stile per evitare che un unico file diventasse troppo lungo e difficile da gestire. Questa scelta è coerente con un approccio professionale di sviluppo front-end.

### 5.1 style.css: base del sistema visivo

Il foglio principale è responsabile delle fondamenta del progetto. Qui vengono definiti:

- i colori del tema tramite variabili CSS;
- i reset generali;
- la tipografia di base;
- le dimensioni dei contenitori;
- gli stili generali per il corpo, il main, i titoli e i paragrafi;
- la struttura dell’header, del menu mobile e delle sezioni principali.

Le variabili CSS sono un elemento molto importante perché permettono di centralizzare i valori cromatici e i parametri di design. Se in futuro si desidera modificare il colore principale o il raggio degli elementi, sarà sufficiente aggiornare la variabile anziché cercare ogni singolo valore nel codice.

Inoltre, il file definisce l’aspetto dell’hero, della sezione di visione, del pannello report e dei contenitori generali. È il punto di riferimento per tutto ciò che riguarda il linguaggio visivo dell’intera pagina.

### 5.2 bento-structure.css: layout a blocchi

Questo foglio è dedicato alla struttura del layout a bento. È qui che si definisce la griglia dei contenuti e la disposizione delle card. Le classi come bento-container, bento-item, col-span-2, row-span-2 e col-span-3 permettono di creare una struttura visiva interessante senza dover scrivere layout complessi direttamente nel markup.

Il vantaggio di questa scelta è duplice:

- il markup rimane più pulito e leggibile;
- il layout può essere facilmente modificato o esteso, ad esempio aggiungendo nuove card o cambiando la disposizione delle colonne.

Il CSS include anche regole responsive: su schermi piccoli, la griglia viene trasformata in una singola colonna, preservando la leggibilità e evitando sovrapposizioni.

### 5.3 btn-gallo.css: componenti CTA con animazione

Il pulsante principale è stato progettato come un componente indipendente. Il file btn-gallo.css definisce lo stile del bottone e il comportamento hover, creando un effetto di riempimento e cambio di colore che rende il CTA più dinamico.

Il componente usa pseudo-elementi, gradienti e transizioni per simulare un movimento elegante senza introdurre elementi extra nel DOM. Questo è un esempio di come il CSS possa aggiungere valore visivo con un impatto tecnico ridotto.

### 5.4 scroller.css: stile del carosello di certificazioni

Il carosello delle certificazioni è stato stilizzato separatamente per mantenere il componente isolato. Questo file gestisce:

- il contenitore del carosello;
- le card delle certificazioni;
- l’immagine associata;
- i dettagli nascosti che compaiono in hover o in selezione;
- il comportamento visivo delle pagine del carousel.

La logica di presentazione è stata strutturata in modo che il contenuto resti leggibile e ordinato, anche quando il componente è visualizzato in uno spazio ridotto.

### 5.5 flickity.css: libreria di carosello

Il file flickity.css non è stato scritto ad hoc ma è una libreria esterna, usata per dare al carosello le funzionalità di base. In questo caso è il motore che consente looping, autoplay, dots di navigazione e transizioni fluide. Il rapporto con il progetto è quindi di supporto: il CSS dedicato del progetto definisce l’aspetto, mentre la libreria fornisce il comportamento.

## 6. Il ruolo di JavaScript nell’interazione

Il JavaScript è stato usato in modo mirato, per aggiungere interattività senza appesantire il sito. Le due componenti principali sono script.js e counter.js.

### 6.1 script.js: menu mobile, focus e animazioni di entrata

Il file script.js gestisce i comportamenti più importanti dell’interfaccia.

#### Menu mobile

Il menu mobile viene controllato tramite una funzione che alterna lo stato del pannello, aggiungendo o rimuovendo una classe open. In parallelo vengono aggiornati attributi ARIA, la visibilità del body e lo stato del pulsante toggle. Questo permette di ottenere un’esperienza coerente sia su desktop che su mobile.

#### Focus trap

Per migliorare l’accessibilità, il menu mobile implementa il cosiddetto focus trap: quando il pannello è aperto, il focus viene mantenuto all’interno degli elementi interattivi. Questo evita che l’utente si perda nella pagina e rende la navigazione da tastiera più controllata.

#### Chiusura del menu su click e su Esc

Il menu si chiude automaticamente in risposta a:

- click su un link interno;
- click fuori dal pannello;
- pressione del tasto Esc.

Questa logica è importante perché evita che il pannello resti aperto in modo inatteso e riduce la frustrazione dell’utente.

#### Animazioni di entrata basate su Intersection Observer

Le card del layout bento vengono animate quando entrano nel viewport. Il codice impiega Intersection Observer, una soluzione moderna e performante che evita l’uso di listener di scroll continui. Il risultato è un effetto di comparsa più elegante e meno costoso in termini di prestazioni.

#### Indicatore attivo nella navigazione principale

Un secondo comportamento consente di evidenziare il link del menu corrispondente alla sezione attualmente visibile nello schermo. L’algoritmo osserva le sezioni con un id e aggiorna lo stato attivo in tempo reale, migliorando l’orientamento dell’utente sulla pagina.

### 6.2 counter.js: animazione dei KPI

Il secondo script si occupa dei valori numerici presenti nelle card. Ogni elemento con la classe animate-number contiene dati specifici come target e suffisso. Il comportamento è il seguente:

- il valore iniziale viene letto dall’HTML;
- il target viene recuperato da un attributo data-target;
- il contatore viene animato da zero o da un valore iniziale fino al valore finale;
- la formattazione viene applicata in modo locale, con il separatore decimale italiano;
- l’animazione viene attivata solo quando il contatore entra nel viewport.

Questa scelta migliorai l’impatto visivo del sito, rendendo i numeri più “vivi” e più memorabili, senza sacrificare la leggibilità.

## 7. Come HTML, CSS e JavaScript si collegano tra loro

La collaborazione tra i tre livelli è il punto chiave dello sviluppo. Il progetto non è stato pensato come una raccolta separata di file, ma come un sistema integrato.

### 7.1 Collegamento tramite classi e attributi

Il markup HTML definisce gli elementi e assegna classi e attributi. Ad esempio:

- una card bento ha classi come bento-item e reveal;
- un contatore ha la classe animate-number e attributi data-target e data-suffix;
- il carosello usa data-flickity per specificare il comportamento;
- il menu mobile usa classi e id per essere controllato da JavaScript.

Questi elementi diventano il punto di aggancio tra contenuto, stile e logica.

### 7.2 Funzione del CSS come interprete visivo

Il CSS riceve queste classi e produce l’aspetto finale. Ad esempio:

- bento-item riceve il bordo, il padding, lo sfondo e gli effetti hover;
- reveal aggiunge l’animazione iniziale di comparsa;
- active attiva la transizione finale;
- btn-gallo imposta il design del pulsante e il suo effetto interattivo;
- logo-carousel definisce l’aspetto del carosello e delle singole card.

Il CSS non “sa” cosa il contenuto rappresenta, ma sa come renderizzarlo in modo coerente.

### 7.3 Funzione di JavaScript come attivatore di comportamento

JavaScript legge gli elementi del DOM e interviene su di essi. Ad esempio:

- se un elemento ha la classe animate-number, il codice lo anima;
- se è presente un menu mobile, il codice ne gestisce l’apertura e la chiusura;
- se un elemento entra nella viewport, il codice aggiunge o rimuove classi per attivare l’animazione.

Questa separazione garantisce una buona manutenzione: se si desidera cambiare il design, si lavora sul CSS; se si desidera cambiare il comportamento, si lavora sul JavaScript; se si desidera cambiare il contenuto, si modifica l’HTML.

## 8. Accessibilità e usabilità

L’implementazione non si è limitata alla resa estetica. Sono state considerate anche le esigenze di accessibilità e fruibilità.

- il sito usa titoli e strutture semantiche per rendere il contenuto comprensibile;
- il menu mobile include attributi ARIA e supporto per la navigazione da tastiera;
- il focus visibile è stato evidenziato per migliorare l’esperienza con tastiera;
- i link e i pulsanti hanno stati chiari e leggibili;
- le immagini sono accompagnate da testi alternativi;
- il caricamento delle immagini è stato ottimizzato con lazy loading;
- l’uso di media query consente un adattamento al dispositivo.

Questi accorgimenti rendono il sito più inclusivo e più vicino agli standard web contemporanei.

## 9. Performance e ottimizzazione

La pagina è stata progettata con attenzione anche alle performance. Gli accorgimenti applicati includono:

- caricamento differito dei file JavaScript tramite defer;
- immagini caricate in modo non invasivo, con lazy loading;
- uso di Intersection Observer invece di listener di scroll intensivi;
- separazione dei fogli CSS per mantenere il progetto ordinato e scalabile;
- utilizzo di formati immagine ottimizzati, dove disponibile.

Questi dettagli contribuiscono a ridurre il carico computazionale e a garantire una navigazione più rapida ed efficiente.

## 10. Dettaglio tecnico dei componenti e del flusso di esecuzione

Per comprendere meglio il funzionamento del sito, è utile osservare il percorso esecutivo del progetto da un punto di vista tecnico.

### 10.1 Flusso di caricamento della pagina

Quando un utente apre il sito, il browser esegue una sequenza molto precisa:

1. legge il file HTML principale;
2. interpreta la struttura del documento e riconosce i blocchi semantici;
3. individua i collegamenti ai fogli CSS e ai file JavaScript;
4. scarica gli asset esterni, come font e immagini;
5. applica gli stili definiti nei file CSS;
6. esegue gli script JavaScript una volta che il DOM è pronto o che il caricamento è stato differito.

Questa sequenza è importante perché spiega il motivo per cui i file vengono collegati in un ordine ben definito. Se il CSS non fosse caricato prima della visualizzazione, il layout apparirebbe incompleto; se gli script venissero eseguiti troppo presto, potrebbero non trovare gli elementi a cui si riferiscono.

### 10.2 Ruolo preciso di ogni file nel progetto

#### index.html

Il file HTML è il punto centrale del progetto. Non è solo una pagina statica, ma il contenitore semantico in cui vengono definiti:

- la struttura delle sezioni;
- il contenuto testuale e informativo;
- le classi che attivano lo stile;
- gli attributi che consentono l’interazione dinamica;
- i riferimenti agli asset multimediali.

Ogni elemento della pagina è costruito in modo che possa essere facilmente interpretato sia dagli utenti sia dai browser. Le sezioni sono separate in modo logico, e i blocchi come header, main e footer aiutano a dare ordine all’informazione.

#### css/style.css

Questo foglio rappresenta la base del sistema di design. Contiene anche i selettori che influenzano l’intera pagina. Ad esempio, i reset globali eliminano margini e spazi inconsistenti tra browser, mentre le variabili CSS centralizzano i valori estetici. Da qui derivano anche le regole generali per il corpo, l’header, il titolo principale e il layout delle sezioni.

Il file non si occupa solo di apparire bello, ma di stabilire le regole generali del linguaggio visivo utilizzato in tutto il sito. È il riferimento principale nel quale si definiscono i colori, i margini, le forme, le proporzioni e i comportamenti base di responsività.

#### css/bento-structure.css

Questo foglio è dedicato al layout a bento. Il suo scopo è trasformare una semplice sequenza di blocchi testuali in una composizione visiva più complessa e articolata. La griglia è stata costruita in modo da poter ospitare diversi tipi di contenuto, come dati numerici, immagini e testi descrittivi, con una distribuzione variabile.

Il dettaglio tecnico più importante è che le classi di espansione come col-span-2 e row-span-2 permettono di creare un’organizzazione visiva più interessante rispetto alla semplice griglia uniforme. In questo modo il layout diventa più espressivo senza complicare eccessivamente il markup.

#### css/btn-gallo.css

Il file per il pulsante è stato separato perché rappresenta un componente autonomo e riutilizzabile. La sua struttura è costruita con pseudo-elementi e transizioni. Il pulsante non cambia semplicemente colore, ma modifica la sua forma interna e il contrasto del testo, creando un effetto visivo più sofisticato senza aggiungere elementi HTML aggiuntivi.

#### css/scroller.css

Questo foglio definisce il comportamento estetico del carosello. È responsabile di dare dimensioni, margini, bordo, stato hover e animazione alle singole card. La sua funzione è quindi di controllare la presentazione visiva del componente senza entrare nella sua logica di navigazione, che invece viene fornita dalla libreria Flickity.

#### js/script.js

Il file JavaScript principale è forse il più importante dal punto di vista dell’esperienza utente. Gestisce quasi tutti gli aspetti dinamici della pagina, in particolare:

- apertura e chiusura del menu mobile;
- gestione del focus all’interno del menu aperto;
- chiusura del menu al clic su un link o alla pressione del tasto Esc;
- attivazione delle animazioni delle card in base alla loro comparsa nel viewport;
- aggiornamento del link attivo della navigazione principale in base alla sezione visibile.

La sua logica è basata su eventi del browser, come click, keydown e osservazione del viewport. Questa scelta garantisce una risposta immediata e una buona qualità dell’interazione.

#### js/counter.js

Questo script è dedicato all’animazione dei KPI. Si occupa di prendere i valori presenti nel markup, trasformarli in numeri e animarli gradualmente fino al valore desiderato. La sua funzione è più specifica rispetto a script.js, ma altrettanto importante, perché permette di rendere i dati più coinvolgenti e più immediati per l’utente.

### 10.3 Relazione tra HTML e CSS

L’HTML definisce la struttura dei contenuti, ma non li rende visivamente “belli” da solo. È il CSS che, leggendo le classi assegnate agli elementi, applica regole di stile. Questo rapporto è molto forte e diretto.

Ad esempio, una sezione del sito può avere un markup semplice, come una serie di div con classi specifiche. Il CSS, però, sa come trasformare quella struttura in una griglia elegante, con spazi, colori e forme appropriate. In altre parole, il markup fornisce “la forma” e il CSS “la veste”.

### 10.4 Relazione tra HTML e JavaScript

Il JavaScript lavora sul DOM, cioè sull’albero degli elementi HTML già costruito. Quando lo script viene eseguito, cerca elementi specifici tramite selettori, come classi e id, e applica loro comportamenti.

Questo significa che l’HTML è il punto di accesso per il comportamento. Se un elemento non è presente nel DOM o se la classe è diversa, lo script non può agirvi. Per questo motivo la struttura del markup è fondamentale anche per l’interattività.

### 10.5 Relazione tra CSS e JavaScript

Anche CSS e JavaScript collaborano in modo molto concreto. JavaScript può aggiungere o rimuovere classi agli elementi, e queste classi possono attivare determinate regole di stile. Un esempio chiaro è il menu mobile: lo script aggiunge la classe open al pannello, e il CSS reagisce a questa classe modificando visibilità, trasparenza e posizione del componente.

Allo stesso modo, le card del layout bento ricevono la classe reveal e poi active, che fanno comparire l’elemento con un’animazione definita nel CSS. In questo modo CSS e JavaScript non sono separati, ma si influenzano a vicenda in modo elegante e modulare.

## 11. Valutazione complessiva dello sviluppo

Il progetto si presenta come un esempio efficace di sviluppo front-end basato su architettura chiara e modularità. HTML, CSS e JavaScript lavorano in sinergia per produrre una pagina che è allo stesso tempo informativa, estetica e interattiva.

La scelta di una struttura semantica, di componenti CSS separati e di logiche JavaScript mirate ha permesso di ottenere un risultato professionale e facilmente estendibile. In particolare, il sito mostra come sia possibile trasformare contenuti aziendali e dati di sostenibilità in un’esperienza utente moderna, leggibile e coinvolgente.

## 11. Conclusione

Il sito è stato sviluppato come una pagina web completa e coesa, in cui ogni livello di implementazione svolge un ruolo precisi. L’HTML definisce i contenuti e la semantica, il CSS ne determina l’aspetto, JavaScript aggiunge interazione e dinamismo. La loro integrazione ha reso possibile realizzare una esperienza digitale efficace, elegante e funzionale, capace di comunicare un messaggio istituzionale con chiarezza e impatto visivo.
