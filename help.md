# Lify Project Help Documentation

## Project Overview
Lify is a full-stack web application with a React frontend and a Node.js/Express backend.
The project aims to provide a platform for blogs, tools, and tutorials.

## Recent Updates (2026-02-24)

### Content Creation Enhancements (2026-02-24)
- **Word Document Import**:
  - **Feature**: Direct import of `.docx` files into the blog editor.
  - **Implementation**: 
    - Automatically converts Word content to Markdown using `mammoth` (HTML parsing) and `turndown` (Markdown conversion).
    - **Smart Image Extraction**: Extracts images embedded in Word documents, saves them to the server, and automatically inserts them into the Markdown content.
  - **Backend**: Added `word-parser.ts` with custom `turndown` rules to preserve image tags.
  - **Frontend**: Integrated `importWord` service in `BlogForm.tsx`.
- **Enhanced File Uploads**:
  - **Capacity**: Increased file upload size limit to **200MB** (backend `upload-middleware.ts` and frontend validation).
  - **Formats**: Added support for `.doc` and `.docx` file types alongside images.
  - **Infrastructure**: Configured frontend proxy (`vite.config.ts`) and backend static serving (`app.ts`) to ensure uploaded images are correctly displayed in the editor (`/uploads` path).
- **Standards Compliance**: Refactored to follow `CODING_STANDARDS.md` for API response format and file structure.

### Connectivity & Access Fixes
- **Cross-Origin Resource Sharing (CORS)**:
  - Fixed `Access-Control-Allow-Origin` error by adding `http://localhost:8080` to the allowed origins list in `backend/src/middleware/cors-middleware.ts`.
  - Updated frontend `apiClient.ts` to use relative path `/api/v1` instead of absolute URL, leveraging Vite's proxy configuration to avoid cross-origin issues.
- **Data Integrity**:
  - Added `tags` column support to `blog_posts` table in `backend/src/config/database.ts`.
  - Updated `BlogModel` and `BlogService` to correctly handle `tags` array <-> string conversion, ensuring tags are properly saved and retrieved.

### Unified Content Pages (2026-02-24)
- **Goal**: Create a unified, beautiful, and consistent UI for Blog, Tool, and Tutorial pages, matching the "Google Gemini" aesthetic.
- **New Components**:
  - `ContentCard`: A reusable, minimalist card component with hover effects and blue accents, replacing disparate card implementations across lists.
  - `PageLayout`: Refactored to use a consistent dark background (`#0b0b0f`) and removed distracting ambient light effects.
  - `PageSidebar`: Updated to be transparent on desktop with subtle blue accent for active items, blending seamlessly with the page background.
- **Refactoring**:
  - `BlogList`, `ToolList`, `TutorialList`: Now all use `ContentCard` for consistent item rendering.
  - `ListContainer`: Updated loading spinners, empty states, and titles to use the new color palette (Blue-500 accent, gray text).
  - **Design System**: Standardized on a dark theme with blue accents (`text-blue-400`, `bg-blue-500`), removing vague `primary` color usage in favor of explicit styling.
- **Navbar Update**:
  - `Navbar`: Updated to display the "Lify" logo on all pages (previously only on Homepage), ensuring consistent branding across the site.

### Previous Fixes (2026-02-24)
- **Blog Detail Page Fix**: 
  - Fixed a critical crash in `BlogDetail.tsx` caused by invalid imports and missing hooks (`useBlog`).
  - Rewrote the component to use `blogService` directly for data fetching.
  - Implemented proper loading and error states consistent with the new design system.
  - Updated to use `DetailContainer` for consistent layout with Tool and Tutorial detail pages.
- **Database Migration**:
  - Implemented automatic column detection in `backend/src/config/database.ts`.
  - Added logic to automatically add missing columns (`image` for tutorials, `category` for tools) to existing SQLite tables on startup.
  - Fixed `SQLITE_ERROR: table tutorials has no column named image` crash when creating new tutorials.
- **API Compatibility**:
  - Updated `BlogService` and `validation-utils` to accept `tags` as either a comma-separated string or an array of strings, fixing `ValidationError: 标签必须是字符串`.

### Homepage Redesign (Gemini Style)
- **New Layout**: Full-screen, minimalist, dark-themed "Gemini-style" homepage.
- **Top Navigation**: Replaced sidebar with a transparent, sticky top navigation bar (`Navbar`).
- **Visual Effects**: 
  - **Particles**: Interactive background particle system (`Particles.tsx`).
  - **Beams**: Animated gradient beams and glowing orbs.
- **Hero Section**: Centered content with large gradient text and clear call-to-action buttons.

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Running the Project

#### Frontend
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies (if not already done):
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:8080` (or `8081` if port is busy).

#### Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm run dev
   ```
   The API will be available at `http://localhost:3000`.

## Project Structure
- **frontend/**: React application using Vite, Tailwind CSS, and React Router.
  - `src/pages/HomePage.tsx`: Main landing page (Gemini style).
  - `src/routes/AppRoutes.tsx`: Main routing configuration using `Navbar` and full-width layout.
  - `src/components/common/`: Shared components like `Navbar`, `Particles`.
- **backend/**: Node.js Express server with SQLite database.

## Troubleshooting
- **Port Conflicts**: If port 8080 is in use, Vite will automatically try the next available port (e.g., 8081). Check the terminal output for the actual URL.
- **Routing Issues**: Ensure `AppRoutes.tsx` structure maintains the correct nesting for `Outlet` to work properly with `AppLayout`.
- **API Errors**: If frontend shows "Network Error", ensure backend is running on port 3000 and CORS is configured for your frontend port (default 8080).
