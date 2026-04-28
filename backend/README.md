# JanConnect Backend (Base Architecture)

Node.js (Express) + PostgreSQL backend scaffold with modular architecture and AI-ready extension points.

## Implemented Modules

- Auth Module
- User & Role Management
- Need Intelligence Engine
- Volunteer Matching Engine
- Task Management System
- Geo & Heatmap Module
- Impact Analytics Module
- File Upload & OCR Processing Module

## Tech Stack

- Express REST API
- Sequelize ORM + PostgreSQL
- JWT auth + RBAC
- Joi request validation
- Winston logging + centralized error middleware
- Multer uploads with OCR and AI hook placeholders

## Folder Structure

```text
src/
  app.js
  server.js
  config/
    database.js
    logger.js
  constants/
    roles.js
  middlewares/
    auth.middleware.js
    error.middleware.js
    upload.middleware.js
    validate.middleware.js
  modules/
    auth/
      controller.js
      routes.js
      service.js
      validation.js
    userRole/
      controller.js
      models.js
      routes.js
      service.js
    needIntelligence/
      controller.js
      models.js
      routes.js
      service.js
    volunteerMatching/
      controller.js
      models.js
      routes.js
      service.js
    taskManagement/
      controller.js
      models.js
      routes.js
      service.js
    geoHeatmap/
      controller.js
      models.js
      routes.js
      service.js
    impactAnalytics/
      controller.js
      models.js
      routes.js
      service.js
    fileProcessing/
      controller.js
      models.js
      routes.js
      service.js
  routes/
    index.js
  utils/
    aiHooks.js
    asyncHandler.js
    ocrService.js
```

## Quick Start

1. Copy `.env.example` to `.env` and update credentials.
2. Install dependencies:
   - `npm install`
3. (Optional) Run without Postgres using SQLite:
   - Set `DB_DIALECT=sqlite` in `.env`
   - (Optional) set `DB_STORAGE=janconnect.sqlite`
   - Seed sample data: `npm run seed`
   - Seeded login:
     - `superadmin@janconnect.local` / `Password@123`
3. Start development server:
   - `npm run dev`
4. API base URL:
   - `http://localhost:5000/api/v1`

## RBAC Roles

- Super Admin
- NGO Admin
- Field Coordinator
- Volunteer
- Survey Collector
- Verifier
- Partner Organization
- Donor

## AI / OCR Integration Notes

- `src/utils/aiHooks.js` contains stubs for classification and matching score.
- `src/utils/ocrService.js` contains OCR placeholder output.
- Replace these stubs with real services (OpenAI, custom models, Tesseract, cloud OCR) without changing module boundaries.
