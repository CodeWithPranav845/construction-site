# BuildCraft — Construction Business Website

A full-stack website for a construction/contracting business, built as a portfolio project to demonstrate real-world, freelance-ready development skills.

> **Note:** This is a demo/portfolio project (not built for an actual registered business). All company details, images, and content are placeholders meant to showcase the build quality for future freelance clients.

---

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite), React Router, Tailwind CSS, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose ODM) |
| Auth | JWT (JSON Web Tokens) for admin login |
| File/Image Uploads | Multer + Cloudinary (or local `/uploads` for dev) |
| Deployment (suggested) | Frontend → Vercel/Netlify, Backend → Render/Railway, DB → MongoDB Atlas |

---

## 📌 Project Overview

A marketing + lead-generation website for a construction company with:

- Public pages: Home, About, Services, Projects/Portfolio, Testimonials, Contact/Get-a-Quote
- An **Admin Dashboard** (protected) to manage services, projects, testimonials, team members, and incoming quote requests
- A REST API backing all dynamic content so the frontend never hardcodes data

---

## ✨ Features

- Fully responsive marketing site (Home, About, Services, Projects, Contact)
- Dynamic content — services, projects, testimonials, team pulled from the API, not hardcoded
- Project portfolio with category filtering (Residential / Commercial / Industrial)
- Quote/inquiry form with server-side validation
- Admin dashboard (JWT-protected) to manage all content and view incoming leads
- Image uploads for project galleries and team photos
- Clean, reusable component structure on the frontend for easy client rebranding later

---

## 🗂️ File Structure

### Root

```
buildcraft/
├── client/                 # React frontend
├── server/                 # Node/Express backend
├── .gitignore
├── README.md
└── docker-compose.yml      # optional, for local dev
```

### Frontend (`client/`)

```
client/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/                 # images, icons, logos
│   ├── components/
│   │   ├── common/              # Navbar, Footer, Button, Loader, Modal
│   │   ├── home/                 # Hero, WhyChooseUs, ServicesPreview, CTA
│   │   ├── services/             # ServiceCard, ServiceDetail
│   │   ├── projects/             # ProjectCard, ProjectGallery, ProjectFilter
│   │   ├── testimonials/         # TestimonialCard, TestimonialSlider
│   │   ├── contact/              # ContactForm, QuoteForm
│   │   └── admin/                 # Sidebar, DataTable, AdminNavbar
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   ├── ServiceDetail.jsx
│   │   ├── Projects.jsx
│   │   ├── ProjectDetail.jsx
│   │   ├── Contact.jsx
│   │   ├── NotFound.jsx
│   │   └── admin/
│   │       ├── AdminLogin.jsx
│   │       ├── Dashboard.jsx
│   │       ├── ManageServices.jsx
│   │       ├── ManageProjects.jsx
│   │       ├── ManageTestimonials.jsx
│   │       └── Inquiries.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── hooks/
│   │   └── useFetch.js
│   ├── services/                  # API call wrappers (axios instances)
│   │   ├── api.js
│   │   ├── serviceApi.js
│   │   ├── projectApi.js
│   │   ├── testimonialApi.js
│   │   └── contactApi.js
│   ├── routes/
│   │   ├── AppRoutes.jsx
│   │   └── ProtectedRoute.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
├── package.json
└── vite.config.js
```

### Backend (`server/`)

```
server/
├── src/
│   ├── config/
│   │   ├── db.js                 # MongoDB connection
│   │   └── cloudinary.js
│   ├── models/
│   │   ├── Service.js
│   │   ├── Project.js
│   │   ├── Testimonial.js
│   │   ├── TeamMember.js
│   │   ├── Inquiry.js
│   │   └── Admin.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── serviceController.js
│   │   ├── projectController.js
│   │   ├── testimonialController.js
│   │   ├── teamController.js
│   │   └── inquiryController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── serviceRoutes.js
│   │   ├── projectRoutes.js
│   │   ├── testimonialRoutes.js
│   │   ├── teamRoutes.js
│   │   └── inquiryRoutes.js
│   ├── middleware/
│   │   ├── authMiddleware.js      # verifies JWT, protects admin routes
│   │   ├── errorMiddleware.js
│   │   └── uploadMiddleware.js
│   ├── utils/
│   │   ├── generateToken.js
│   │   └── validators.js
│   └── app.js
├── server.js                      # entry point
├── .env.example
└── package.json
```

---

## 🔗 REST API Contract

Base URL (dev): `http://localhost:5000/api`

All responses follow this envelope:

```json
{
  "success": true,
  "data": {},
  "message": ""
}
```

Error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": []
}
```

### 1. Auth (Admin only)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/auth/login` | ❌ | Admin login |
| GET | `/auth/me` | ✅ | Get logged-in admin profile |

**POST `/auth/login`**
Request:
```json
{
  "email": "admin@buildcraft.com",
  "password": "SecurePass123"
}
```
Response:
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "admin": {
      "id": "665f1c2e2a1b2c3d4e5f6789",
      "name": "Admin User",
      "email": "admin@buildcraft.com"
    }
  },
  "message": "Login successful"
}
```

---

### 2. Services

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/services` | ❌ | List all services |
| GET | `/services/:id` | ❌ | Get single service |
| POST | `/services` | ✅ Admin | Create service |
| PUT | `/services/:id` | ✅ Admin | Update service |
| DELETE | `/services/:id` | ✅ Admin | Delete service |

**Service object:**
```json
{
  "_id": "665f1c2e2a1b2c3d4e5f0001",
  "title": "Residential Construction",
  "slug": "residential-construction",
  "shortDescription": "End-to-end home building services.",
  "fullDescription": "We handle everything from foundation to finishing...",
  "icon": "home-icon.svg",
  "image": "https://res.cloudinary.com/.../residential.jpg",
  "featured": true,
  "createdAt": "2026-01-10T10:00:00.000Z"
}
```

**POST `/services`** Request:
```json
{
  "title": "Commercial Construction",
  "shortDescription": "Office and retail space builds.",
  "fullDescription": "Full text here...",
  "icon": "building-icon.svg",
  "image": "<uploaded-file-url>",
  "featured": false
}
```

---

### 3. Projects (Portfolio)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/projects` | ❌ | List all projects (supports query params below) |
| GET | `/projects/:id` | ❌ | Get single project |
| POST | `/projects` | ✅ Admin | Create project |
| PUT | `/projects/:id` | ✅ Admin | Update project |
| DELETE | `/projects/:id` | ✅ Admin | Delete project |

**Project object:**
```json
{
  "_id": "665f1c2e2a1b2c3d4e5f0002",
  "title": "Green Valley Apartments",
  "category": "Residential",
  "location": "Dehradun, UK",
  "clientName": "Green Valley Developers",
  "completionDate": "2025-11-01",
  "coverImage": "https://res.cloudinary.com/.../cover.jpg",
  "gallery": [
    "https://res.cloudinary.com/.../img1.jpg",
    "https://res.cloudinary.com/.../img2.jpg"
  ],
  "description": "A 40-unit residential complex...",
  "createdAt": "2026-01-12T10:00:00.000Z"
}
```

**Query params for `GET /projects` and `GET /services`:**

| Param | Example | Description |
|---|---|---|
| `category` | `?category=Residential` | Filter projects by category |
| `featured` | `?featured=true` | Only featured services |
| `page` | `?page=2` | Pagination page number (default 1) |
| `limit` | `?limit=9` | Items per page (default 9) |
| `search` | `?search=apartments` | Basic text search on title |

**Paginated list response shape:**
```json
{
  "success": true,
  "data": {
    "items": [ /* array of project/service objects */ ],
    "page": 1,
    "totalPages": 4,
    "totalItems": 34
  },
  "message": ""
}
```

---

### 4. Testimonials

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/testimonials` | ❌ | List all testimonials |
| POST | `/testimonials` | ✅ Admin | Add testimonial |
| PUT | `/testimonials/:id` | ✅ Admin | Update testimonial |
| DELETE | `/testimonials/:id` | ✅ Admin | Delete testimonial |

**Testimonial object:**
```json
{
  "_id": "665f1c2e2a1b2c3d4e5f0003",
  "clientName": "Rohan Mehta",
  "clientCompany": "Mehta Builders Pvt. Ltd.",
  "message": "BuildCraft delivered our project on time and within budget.",
  "rating": 5,
  "avatar": "https://res.cloudinary.com/.../avatar.jpg"
}
```

---

### 5. Team

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/team` | ❌ | List team members |
| POST | `/team` | ✅ Admin | Add team member |
| PUT | `/team/:id` | ✅ Admin | Update team member |
| DELETE | `/team/:id` | ✅ Admin | Remove team member |

**Team member object:**
```json
{
  "_id": "665f1c2e2a1b2c3d4e5f0004",
  "name": "Ankit Sharma",
  "designation": "Site Engineer",
  "photo": "https://res.cloudinary.com/.../ankit.jpg",
  "bio": "8+ years of experience in structural engineering."
}
```

---

### 6. Inquiries / Quote Requests

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/inquiries` | ❌ | Submit contact/quote request |
| GET | `/inquiries` | ✅ Admin | List all inquiries |
| PATCH | `/inquiries/:id` | ✅ Admin | Mark as resolved/contacted |
| DELETE | `/inquiries/:id` | ✅ Admin | Delete inquiry |

**POST `/inquiries`** Request:
```json
{
  "name": "Priya Nair",
  "email": "priya@example.com",
  "phone": "+91-9876543210",
  "projectType": "Residential",
  "budgetRange": "10L-20L",
  "message": "Looking to build a 2BHK house on a 1200 sqft plot."
}
```

**Inquiry object (response):**
```json
{
  "_id": "665f1c2e2a1b2c3d4e5f0005",
  "name": "Priya Nair",
  "email": "priya@example.com",
  "phone": "+91-9876543210",
  "projectType": "Residential",
  "budgetRange": "10L-20L",
  "message": "Looking to build a 2BHK house on a 1200 sqft plot.",
  "status": "new",
  "createdAt": "2026-01-15T09:30:00.000Z"
}
```

### HTTP Status Codes Used

| Code | Meaning |
|---|---|
| 200 | Success (GET, PUT, PATCH, DELETE) |
| 201 | Resource created (POST) |
| 400 | Validation error / bad request |
| 401 | Missing or invalid auth token |
| 403 | Valid token but insufficient permissions |
| 404 | Resource not found |
| 409 | Conflict (e.g. duplicate slug/email) |
| 500 | Server error |

---

## 🗃️ Database Schema (MongoDB Collections)

| Collection | Key Fields |
|---|---|
| `admins` | name, email, password (hashed), createdAt |
| `services` | title, slug, shortDescription, fullDescription, icon, image, featured |
| `projects` | title, category, location, clientName, completionDate, coverImage, gallery[], description |
| `testimonials` | clientName, clientCompany, message, rating, avatar |
| `teammembers` | name, designation, photo, bio |
| `inquiries` | name, email, phone, projectType, budgetRange, message, status |

---

## 👥 Work Split (2 Teammates)

### Teammate A — Frontend (React)
- Set up Vite + React project, Tailwind config, routing (`react-router-dom`)
- Build all public pages: Home, About, Services, Service Detail, Projects, Project Detail, Contact
- Build reusable components: Navbar, Footer, Cards, Forms, Sliders/Carousel
- Integrate API calls via Axios (`services/*Api.js`) once backend contracts are ready
- Handle form validation (Contact/Quote form) and loading/error states
- Responsive design (mobile-first) and basic animations (Framer Motion optional)
- Admin UI: login page, dashboard layout, CRUD tables/forms for services, projects, testimonials, inquiries
- Deploy frontend (Vercel/Netlify)

### Teammate B — Backend (Node/Express + MongoDB)
- Set up Express server, project structure, MongoDB connection (Atlas)
- Design and implement Mongoose models (Service, Project, Testimonial, TeamMember, Inquiry, Admin)
- Build all REST API routes/controllers per the contract above
- Implement JWT-based admin authentication + `authMiddleware` for protected routes
- Implement image upload handling (Multer + Cloudinary)
- Input validation, error handling middleware, and consistent response envelope
- Write basic API documentation/Postman collection for the frontend dev to consume
- Deploy backend (Render/Railway) + connect MongoDB Atlas

### Shared / Sync Points
- Agree on the JSON contracts above **before** frontend starts integration (already drafted here)
- Weekly sync to confirm any schema/endpoint changes
- Both contribute to final README polish, testing, and demo deployment

---

## ⚙️ Environment Variables

**`server/.env.example`**
```
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx
CLIENT_URL=http://localhost:5173
```

**`client/.env.example`**
```
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone <repo-url>
cd buildcraft

# Backend
cd server
npm install
cp .env.example .env   # fill in your values
npm run dev

# Frontend (new terminal)
cd client
npm install
cp .env.example .env
npm run dev
```

---

## 🌿 Git Workflow

- `main` — stable, deployable branch
- `dev` — integration branch, merge feature branches here first
- Feature branches: `feature/frontend-services-page`, `feature/backend-auth`, etc.
- Commit convention: `feat: add project filter`, `fix: correct inquiry status update`, `chore: update env example`
- Open a PR into `dev`, review each other's code before merging, merge `dev` → `main` only when stable

---

## 🧪 Testing (suggested)

- **Backend:** Jest + Supertest for API route/controller tests (auth, CRUD, validation errors)
- **Frontend:** React Testing Library for key components (ContactForm validation, ProjectFilter, ProtectedRoute)
- Manually test all endpoints with Postman before frontend integration — export and commit a `postman_collection.json` to the repo root once ready

---

## 🗺️ Future Improvements (post-MVP)

- Blog/News section for company updates
- Email notifications on new inquiry (Nodemailer)
- Multi-language support
- Analytics dashboard (inquiry trends, popular services)
- SEO optimization (meta tags, sitemap, structured data for local business)
- Dark mode toggle

---

## 📸 Screenshots

_Add screenshots or a live demo link here once the UI is ready._

---

## 📄 License

This project is for educational/portfolio purposes.
