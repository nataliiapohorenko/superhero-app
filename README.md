Superhero Management App

This is a full-stack web application for managing superheroes and their images. It includes features for creating, updating, listing, deleting heroes, and uploading images to Cloudinary.

🧩 Technologies Used

    React 18+
    
    TypeScript
    
    TailwindCSS
    
    React Query (TanStack Query)
    
    Axios
    
    Vitest & React Testing Library for unit testing

💻 Frontend Setup

1. Install dependencies:

    npm install

2. Set up environment variables in .env:

    VITE_API_URL=https://superhero-api-4bji.onrender.com

3. Start the development server:

    npm run dev

4. Run frontend tests:

    npx vitest run

🧪 Frontend Test Coverage:

useHero, useHeroes, useCreateHero, useUpdateHero, useDeleteHero

useUploadImages, useDeleteImage

Tests written with React Testing Library and QueryClientProvider wrapper

✅ Features Implemented
1. Hero List

Fetches a paginated list of superheroes from the backend.

Displays hero cards in a responsive grid.

Shows nickname and first image preview.

🔍 2. Hero Details Modal

Clicking a card opens a modal with:

Full hero details (real name, origin description, superpowers, catch phrase).

Carousel-like navigation for multiple images.

➕ 3. Create Hero

Form to create a new superhero.

Inputs for nickname, real name, description, superpowers (comma-separated), catch phrase.

File input for uploading multiple images.

Image previews shown before submission.

After successful creation, the app navigates back to the home page.

✏️ 4. Edit Hero

Loads existing hero data into form fields.

Allows editing of any fields.

Supports adding new images.

Allows removing existing images (removal only finalized on Save).

After saving, navigates back to the home page.

🗑 5. Delete Hero

Each card has a delete button with a confirmation modal.

Upon confirming deletion:

Hero is deleted from the backend.

Associated images are deleted.

React Query cache is invalidated.

📄 6. Pagination

5 heroes per page.

Prev/Next controls.

Disabled buttons at boundaries.


