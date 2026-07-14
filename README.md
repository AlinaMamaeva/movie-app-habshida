# Movie App

A movie search application built with Next.js and TypeScript, powered by the TMDB API. Users can search for movies, view details, and rate movies.

## 🚀 Live Demo

[Open the app](https://movie-app-habshida-zepf.vercel.app)

## Features

- Search for movies by title
- View movie details (poster, overview, rating, release date)
- Rate movies
- Responsive design (mobile, tablet, desktop)

## Tech Stack

- [Next.js](https://nextjs.org/)
- TypeScript
- [TMDB API](https://www.themoviedb.org/documentation/api)
- ESLint

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/AlinaMamaeva/movie-app-habshida.git
cd movie-app-habshida
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory and add:

```
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
TMDB_BASE_URL=https://api.themoviedb.org/3
API_KEY=your_tmdb_bearer_token
```

You can get these values from your [TMDB account settings](https://www.themoviedb.org/settings/api).

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Linting

To check code quality:

```bash
npm run lint
```

## Deployment

This project is deployed on [Vercel](https://vercel.com). Environment variables must be added in **Vercel → Settings → Environment Variables** before deploying.

## License

This project is for educational purposes.
