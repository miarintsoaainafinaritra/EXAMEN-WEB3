# Quick Poll — Sondages express

Application Next.js (App Router) permettant de créer, voter et supprimer des sondages en mode très simple, sans authentification ni base de données. Les données sont stockées localement dans un fichier JSON.

## Prérequis

Avant de lancer le projet, vérifiez que votre environnement contient :

- Node.js 20 ou plus
- npm
- Git (optionnel, pour cloner le dépôt)

## Installation

Depuis la racine du projet :

```bash
npm install
```

## Lancer le projet

### Mode développement

```bash
npm run dev
```

Puis ouvrez l’URL suivante dans le navigateur :

```text
http://localhost:3000
```

### Build de production

```bash
npm run build
```

### Démarrage de la version buildée

```bash
npm run start
```

## Structure du projet

| Chemin | Description |
| --- | --- |
| `app/` | Pages de l’application et routes Next.js |
| `app/page.tsx` | Page d’accueil avec la liste des sondages |
| `app/polls/new/page.tsx` | Page de création d’un sondage |
| `app/polls/[id]/page.tsx` | Page détail d’un sondage |
| `app/not-found.tsx` | Page 404 personnalisée |
| `components/` | Composants React utilisés par l’interface |
| `lib/actions.ts` | Server actions (`use server`) pour créer, voter et supprimer |
| `lib/polls.ts` | Lecture et écriture du fichier `data/polls.json` |
| `data/polls.json` | Stockage des sondages et des votes |

## Composants client

Le tableau suivant explique pourquoi chaque composant est un composant client (`"use client"`).

| Composant | Fichier | Raison d’être côté client |
| --- | --- | --- |
| `NewPollForm` | `components/NewPollForm.tsx` | Gère les champs dynamiques (ajout/ suppression de choix), l’état local du formulaire et l’affichage des messages d’erreur. |
| `VoteForm` | `components/VoteForm.tsx` | Gère la sélection du radio button, le choix courant, les erreurs de validation et le rafraîchissement après vote. |
| `DeleteButton` | `components/DeleteButton.tsx` | Utilise `useTransition` pour gérer l’état de chargement et la confirmation navigateur avant suppression. |
| `PollResults` | `components/PollResults.tsx` | Affiche les résultats sous forme de barres avec les pourcentages et les compteurs, en restant un composant UI réactif. |

## Fonctionnalités principales

- Voir la liste des sondages du plus récent au plus ancien
- Créer un sondage avec 2 à 5 choix
- Voter une seule fois par sondage grâce au cookie `voted`
- Voir les résultats immédiatement après un vote
- Supprimer un sondage avec confirmation
- Gérer les validations côté serveur via les actions Next.js

## Règles de gestion implémentées

- RG-01 : la question doit contenir entre 5 et 120 caractères après trim
- RG-02 : un sondage contient entre 2 et 5 choix, non vides et sans doublons
- RG-03 : un vote ne peut cibler qu’un choix appartenant au sondage demandé
- RG-04 : seul l’identifiant du sondage et du choix est transmis par le client
- RG-05 : un même navigateur ne vote qu’une seule fois par sondage via le cookie `voted`
- RG-06 : les pourcentages sont calculés côté serveur
- RG-07 : les mutations passent par des server actions uniquement
- RG-08 : les erreurs de validation sont renvoyées à l’utilisateur
- RG-09 : la suppression d’un sondage supprime aussi ses votes

## Notes

- Le projet utilise l’App Router de Next.js.
- Aucune base de données ni ORM n’est utilisé.
- Le stockage est fait via `fs/promises` dans le fichier JSON `data/polls.json`.
- Les identifiants sont générés côté serveur avec `crypto.randomUUID()`.
