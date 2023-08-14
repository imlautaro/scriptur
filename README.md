# Scriptur

This app aims to offer a free and open source bible web app, with an easy to use interface, but at the same time with powerful study functionalities. The idea is to take advantage of all the open content within Christianity to provide a universal tool for both casual readers and theologians seeking in-depth study.

There are many applications and software within the niche that are either good but very closed, or open but not so good. As a Christian developer, I think it would be great to have a completely open and accessible project because I think it's the perfect match for the community, and it has a lot of potential.

## Project Status

A project like this requires a lot of work and time, so a production version is still a long way off. Even though, I'm working hard to be able to have a complete and, above all, useful product.

Here is a summary of what we have to take into account when testing the app:

-   While not indicated with a tutorial yet, double-tapping on a verse enters a smart selection mode that allows you to copy verses or highlight them with pretty colors (an account is required for the last one).

-   At the moment, the interface is designed to be used **on mobile** phones. On desktop it's not so intuitive (yet).

-   The landing page is not ready yet, so it redirects directly to the platform.

-   There may be bugs!

## Run Locally

For this project I'm using `pnpm` as our package manager. Also, I'm using the Supabase CLI for local development.

1. Clone the project

> git clone https://github.com/imlautaro/scriptur.git

2. Go to the project directory

> cd scriptur

3. Install dependencies

> pnpm install

4. Disable the Google Auth provider in `~/supabase/config.toml` or configure valid `SUPABASE_AUTH_GOOGLE_CLIENT_ID` and `SUPABASE_AUTH_GOOGLE_SECRET` variables in `.env`.

5. Run the Supabase containers

> supabase start

6. Create a `.env.local` file and setup Supabase variables.

> cp .env.example .env.local

7. Run the project

> pnpm dev

## Environment Variables

`NUXT_PUBLIC_BASE_URL`

`SUPABASE_KEY`

`SUPABASE_SERVICE_KEY`

`SUPABASE_URL`

Optional if you haven't disabled the Google Auth provider:

`SUPABASE_AUTH_GOOGLE_CLIENT_ID`

`SUPABASE_AUTH_GOOGLE_SECRET`

## Tech Stack

### Frontend

-   Nuxt 3
-   TypeScript
-   UnoCSS

### Backend

-   Supabase

## What Supabase features does this project use?

This project uses the authentication system and databases protected by RLS policies.

## License

MIT
