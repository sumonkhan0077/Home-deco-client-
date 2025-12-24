# DecorNest – Event Decoration Service Marketplace

![DecorNest Banner](https://via.placeholder.com/1200x600/6E48AA/ffffff?text=DecorNest+-+Beautiful+Event+Decoration+Services)

**DecorNest** is a modern full-stack MERN application that connects customers with professional event decorators. Users can easily browse, search, and filter decoration services for weddings, birthdays, parties, corporate events, home setups, office meetings, and more.

**Live Demo**: [https://decor-nest.netlify.app/](https://decor-nest.netlify.app/)  
**Client Repository**: [https://github.com/sumonkhan0077/Home-deco-client-](https://github.com/sumonkhan0077/Home-deco-client-)  
**Server Repository**: [https://github.com/sumonkhan0077/home-deco-server](https://github.com/sumonkhan0077/home-deco-server)

**Author**: Md Sumon Khan  
**Tech Stack**: MERN (MongoDB, Express, React, Node.js)

---

## ✨ Features

### User Features

- Browse decoration services with beautiful card layout
- Advanced search by service name
- Filter by category (Home, Wedding, Party, Seminar, Office, Meeting)
- Budget range filtering (min-max price)
- Pagination for smooth browsing
- Detailed service pages with images, descriptions, pricing, and ratings
- Responsive & mobile-friendly design
- User authentication (login/register)
- Role-based access (user, decorator, admin)

### Admin Dashboard

- Full CRUD operations on services (Create, Read, Update, Delete)
- Manage decorator applications (Accept / Reject)
- View and search all services with filtering
- Display total service count and statistics
- Review management (view reviews)

### Decorator Features

- Apply to become a decorator
- View application status
- Payment history tracking
- Service acceptance and management

### Technical Highlights

- Secure JWT authentication with HTTP-only cookies
- Protected routes using custom `useAxiosSecure` hook
- Efficient data fetching & caching with **Tanstack React Query**
- SweetAlert2 for user-friendly confirmations and alerts
- Smooth animations using AOS and custom components
- Modern UI with Tailwind CSS + DaisyUI

---

## 🛠️ Tech Stack

### Frontend

- **React.js** (Vite)
- **React Router DOM** – Client-side routing
- **Tanstack React Query** – Data fetching & state management
- **Axios** – API communication
- **Tailwind CSS** + **DaisyUI** – Styling & components
- **SweetAlert2** – Alerts & modals
- **React Icons** – Icon library
- **AOS** – Scroll animations

### Backend

- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **JWT Authentication**
- **CORS** & Environment Variables

---

## 💳 Payment Integration with Stripe

DecorNest features a secure and seamless payment system powered by **Stripe**, allowing users to book and pay for decoration services directly on the platform.

### Payment Features
- Users can select a service and proceed to checkout
- Secure card payment processing via Stripe Checkout or Elements
- Support for multiple payment methods (credit/debit cards, etc.)
- Payment success/failure handling with user feedback
- Order confirmation after successful payment
- Payment history visible in user/decorator dashboard
- Admin can view payment records and revenue overview

### How It Works
1. User selects a decoration service and clicks "Book Now" or "Proceed to Payment"
2. Redirected to a secure checkout page (or modal) powered by Stripe
3. User enters card details (handled entirely by Stripe – no card data touches our server)
4. After successful payment, a webhook verifies the transaction on the backend
5. Booking status updated to "Confirmed"
6. User and decorator receive confirmation
7. Payment record saved in MongoDB for history and analytics

### Security
- PCI-compliant (Stripe handles all sensitive card data)
- Webhook verification for secure payment confirmation
- Environment-based Stripe secret keys
- No card information stored on our servers

### Stripe Dashboard Benefits (For Admin)
- View all transactions
- Issue refunds directly from Stripe dashboard
- Track revenue, payouts, and customer details
- Export reports



## 📂 Project Structure
### Client (`client/`)
```
client/
├── src/
│   ├── Components/       # Reusable UI components
│   ├── Hooks/            # Custom hooks (useAuth, useAxiosSecure)
│   ├── Pages/
│   │   ├── Dashboard/    # Admin & decorator dashboard pages
│   │   │   ├── ManageServices.jsx
│   │   │   ├── ManageDecorators.jsx
│   │   │   └── ...
│   │   └── Services/     # Public service listing pages
│   ├── Utility/          # Animation & utility components
│   └── ...
└── ...
```
### Server (`server/`)
```
server/
├── routes/ # API routes
├── controllers/ # Business logic
├── models/ # MongoDB schemas
```
---

## 🔌 Key API Endpoints

| Method | Endpoint         | Description                                 |
| ------ | ---------------- | ------------------------------------------- |
| GET    | `/services`      | Fetch services (search, filter, pagination) |
| POST   | `/services`      | Create new service                          |
| PATCH  | `/services/:id`  | Update a service                            |
| DELETE | `/services/:id`  | Delete a service                            |
| GET    | `/decorators`    | Get all decorator applications              |
| PATCH  | `/decorator/:id` | Accept/Reject decorator application         |

---

## 🚀 Getting Started (Local Setup)

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

### Installation Steps

1. **Clone the repositories**
   ```bash
   git clone https://github.com/sumonkhan0077/Home-deco-client-.git
   git clone https://github.com/sumonkhan0077/home-deco-server.git

   ```
2. **Install dependencies**
   ```bash
   # Client
   cd Home-deco-client-
   npm install
   ```

# Server
 ```bash
cd ../home-deco-server
npm install
```

##  👨‍💻 Author
- Md Sumon Khan
- Full-Stack MERN Developer
- Passionate about building clean, responsive, and scalable web applications.

- GitHub: https://github.com/sumonkhan0077
- Live Project: https://decor-nest.netlify.app/
