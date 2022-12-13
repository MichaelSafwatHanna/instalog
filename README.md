# InstaLog

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000/instatus](http://localhost:3000/instatus) with your browser to see the result.

## Problem statement

Our customers want to see who’s doing what in their team.
Who logged in? Who created an incident? Who deleted that teammate?!

We need to develop an activity log tab so that IT admins can check their team’s activity.

We need to make it a general solution that can be used by any other product (not only Instatus)
Maybe it’s the start of a new product: instalog !

Events contain information relevant to actions taken by users in the application. 
For example, when a user logs in, we use the system to create a new login_succeeded event.
We can add information about the actor, action, target, date, etc.

### Backend endpoints

* POST /events
Feel free to set body parameters you find appropriate

* GET /events
Feel free to set query parameters you find appropriate

### Required functionality

* Pagination
* Search
* Filters based on actor_id, target_id, action_id and/or name

### Frontend functionality

* Listing
* Details
* Load more
* Search

## Stack

* API
  * Typescript
  * Prisma
  * Next.js
  * MySQL

* Frontend
  * Next.js
  * TailwindCSS
  * SWR
