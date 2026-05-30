# Björns Otroliga Casino - Blackjack - *Vanilla JavaScript*

  A browser-based Blackjack game built with vanilla JavaScript using a clean layered architecture. Players register an account, log
  in, deposit funds, place bets, and play a full-featured game of Blackjack against a dealer AI — including splits and double-down.

  ---

  ## Screenshots

  <table>
    <tr>
      <td align="center"><b>Login</b></td>
      <td align="center"><b>Gameplay</b></td>
    </tr>
    <tr>
      <td><img src="https://github.com/user-attachments/assets/9c2ad4fa-4e8e-4eae-8724-33fa430c095c" width="100%"/></td>
      <td><img src="https://github.com/user-attachments/assets/bda82289-54ae-450a-b67b-db97c1df2db4" width="100%"/></td>
    </tr>
    <tr>
      <td align="center"><b>Split Hands</b></td>
      <td align="center"><b>Win Screen</b></td>
    </tr>
    <tr>
      <td><img src="https://github.com/user-attachments/assets/bdeb1f73-ecb2-497d-a919-54c9a2f4fc29" width="100%"/></td>
      <td><img src="https://github.com/user-attachments/assets/c4474e56-b516-4f79-a306-539f8fa811b5" width="100%"/></td>
    </tr>
    <tr>
      <td align="center"><b>Deposit Calculator</b></td>
      <td></td>
    </tr>
    <tr>
      <td><img src="https://github.com/user-attachments/assets/122f19f0-f266-48eb-9f26-371d9143677f" width="100%"/></td>
      <td></td>
    </tr>
  </table>

  ---

  ## Demo

  https://github.com/user-attachments/assets/3fc812f3-a7c3-4c68-8684-eac23676c2b5

  https://github.com/user-attachments/assets/350cfb1b-ad9c-4718-ae06-b8fda6cb1897

  https://github.com/user-attachments/assets/2e94ee9d-290a-46e7-b73b-07da91ffdcdb

  ---

  ## Features

  - **User authentication** — create an account and log in; credentials and balances are stored in `localStorage`
  - **Betting system** — place bets between 5 kr and 500 kr; winnings and losses update your balance in real time
  - **Deposit screen** — top up your balance using an in-game calculator interface
  - **Full Blackjack rules** — proper Ace handling (1 or 11), dealer hits on 16 and stands on 17+, Blackjack pays 2.5x
  - **Split hands** — split pairs into separate hands, each with its own bet and outcome
  - **Double down** — available on hard totals of 9–11; doubles the bet and deals one final card
  - **Animated card dealing** — timed delays and sound effects for a polished feel
  - **Background music and SFX** — toggle-able volume control in-game
  - **Modular CSS** — eleven separate stylesheets imported through a single entry point

  ---

  ## Tech Stack

  | Concern | Technology |
  |---|---|
  | Language | Vanilla JavaScript (ES6 modules) |
  | Markup | HTML5 |
  | Styling | CSS3 (modular, no preprocessor) |
  | Persistence | Browser `localStorage` |
  | Build tools | None — runs directly in the browser |

  ---

  ## Architecture

  The project follows a strict **layered architecture** pattern with no framework dependencies.

  ```
  Blackjack-layered-architecture/
  ├── App.js                       # Entry point — initialises all views
  ├── index.html                   # Single-page shell with view templates
  │
  ├── data/                        # Data layer
  │   ├── stateData.js             # Central gameState object (single source of truth)
  │   ├── deckData.js              # Deck generation (52 cards)
  │   ├── images/                  # Card face PNGs + card back
  │   ├── gifs/                    # Player and dealer animations
  │   └── sounds/                  # Background music and sound effects
  │
  ├── services/                    # Service layer (all business logic)
  │   ├── authService.js           # Login, account creation, localStorage access
  │   ├── gameService.js           # Game flow — deal, draw, dealer AI, outcomes
  │   ├── deckService.js           # Shuffle, draw, card-to-image mapping
  │   ├── rulesService.js          # Double-down and split detection/payout logic
  │   ├── stateService.js          # State persistence and payout calculation
  │   ├── valueService.js          # Hand value calculation, win/loss/push/blackjack
  │   ├── viewService.js           # View switching and clearing
  │   ├── buttonService.js         # Enable/disable game and menu buttons
  │   ├── depositService.js        # Deposit calculator operations
  │   ├── infoService.js           # Result message generation
  │   ├── soundService.js          # Audio playback and volume control
  │   └── flowService.js           # Timed delays for animations
  │
  ├── presentation/                # Presentation layer
  │   ├── views/
  │   │   ├── blackjackView.js     # Main game table — bets, balance, volume, logout
  │   │   ├── loginView.js         # Login form
  │   │   ├── createNewUserView.js # Account creation form
  │   │   └── depositView.js       # Deposit calculator view
  │   └── components/
  │       ├── cardRender.js        # Card rendering and hand initialisation
  │       ├── splitRender.js       # Dynamic hand UI for split scenarios
  │       └── infoRender.js        # Modal overlays and confirmation dialogs
  │
  └── styles/                      # Styling
      ├── index.css                # Imports all other stylesheets
      ├── reset.css
      ├── titlebar.css
      ├── layout.css
      ├── profile.css
      ├── cards.css
      ├── buttons.css
      ├── controls.css
      ├── overlay.css
      ├── deposit.css
      └── login.css
  ```

  ### Layer responsibilities

  | Layer | Responsibility |
  |---|---|
  | **Data** | Single source of truth; no logic, just state and raw data |
  | **Services** | All business logic; pure functions where possible; no DOM access |
  | **Presentation** | DOM manipulation and event binding only; calls into services |

  A custom event system (`CustomEvent`) keeps the layers decoupled — `balanceChanged` and `handValueChanged` events let the UI react
  to state changes without services needing to know about the DOM.

  ---

  ## Getting Started

  No build step is required. Open `index.html` in a modern browser via any static file server:

  ```bash
  # npx
  npx serve .

  # Python
  python -m http.server
  ```

  > **Note:** ES6 modules require a server (even a local one). Opening `index.html` as a `file://` URL will fail due to CORS
  restrictions on module imports.

  ---

  ## How to Play

  1. **Create an account** or log in with an existing one.
  2. **Deposit funds** if your balance is empty.
  3. **Place a bet** (5–500 kr) using the +/- controls.
  4. Click **Deal** to start a round.
  5. Choose **Hit**, **Stand**, **Double Down**, or **Split** as the situation allows.
  6. The dealer reveals their hidden card and draws until reaching 17 or higher.
  7. The result is shown in an overlay — win, lose, push, or Blackjack — and your balance is updated.
  8. Click **New Game** to play another round.

  ---

  ## Payout Table

  | Outcome    | Payout                           |
  |------------|----------------------------------|
  | Blackjack  | 2.5× bet                         |
  | Win        | 2× bet                           |
  | Push (tie) | Bet returned                     |
  | Loss       | Bet lost                         |
  | Split      | Calculated per hand, then summed |
