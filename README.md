# Movie & TV Explorer (React + TMDB)

A clean and responsive web application to explore **movies** and **TV shows**, built with **React**, **Material Tailwind**, and the **TMDB API**.

Users can search, filter, and view detailed information about media content such as genres, release dates, ratings, and more.

---

## Features

- 🔍 Search for movies and TV shows  
- 🎬 Filter by category (Popular, Top Rated, Now Playing, …)  
- 📖 Detailed modals with technical info (genres, language, status, runtime…)  
- 📱 Fully responsive design  
- 🎨 Material Tailwind + Heroicons for UI  
- 🌍 Data fetched from [TMDB API](https://developers.themoviedb.org/3)

---

## Tech Stack

- **React** (Hooks & Components)  
- **Vite** (fast dev server & bundler)  
- **Material Tailwind**  
- **Tailwind CSS**  
- **Heroicons**  
- **TMDB API**

---

## Getting Started

### 1) Clone the repository
```bash
git clone https://github.com/your-username/movie-tv-explorer.git
cd movie-tv-explorer
```

### 2) Install dependencies
```bash
npm install
```

### 3) Environment variables (`.env`)

Create a `.env` file in the **root** of the project:

```
# v3 API key (recommended for client)
VITE_TMDB_API_KEY=your_api_key_v3

```

**Usage in code (Vite):**

```js
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
```

**Fetch example:**

```js
const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US`;
const res = await fetch(url);
const data = await res.json();
```

### 4) Run dev server
```bash
npm run dev
```

---

## API Usage (examples)

- Popular movies  
  ```
  https://api.themoviedb.org/3/movie/popular?api_key=YOUR_KEY&language=en-US
  ```

- Search TV shows  
  ```
  https://api.themoviedb.org/3/search/tv?api_key=YOUR_KEY&query=breaking+bad
  ```

---

## Component Overview

### `MovieCard` / `SeriesCard`
- Display poster, rating, title, and release/air date  
- Clicking opens a modal with full details

### `MovieModal` / `TvModal`
- Display genres, language, runtime/seasons, popularity, status, vote count, and description

---

## Live Demo

You can access a live demo of this project here:  
[Movie & TV Explorer Live Demo](https://movie-search-engine-five-rho.vercel.app/dashboard/movies)

---

## To Do

- [ ] Add trailers using TMDB `videos` endpoint  
- [ ] Show cast & crew  
- [ ] Add loading skeletons  
- [ ] Improve API error handling  

---

## Troubleshooting

- **401 Unauthorized**: Check if the environment variable (`VITE_TMDB_API_KEY` or `VITE_TMDB_READ_TOKEN`) exists in both your `.env` file and deployment environment, then redeploy.  
- **Variables not loading**: After changing them, you must redeploy.  
- **Images**: Use TMDB image base URLs (e.g., `https://image.tmdb.org/t/p/w500` + `poster_path`).  

---

## Author

Made by **José Luis García Andreu**
