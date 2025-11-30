# NaijaFix - Community Reporter Platform 🇳🇬

A full-stack web application for reporting and tracking community issues across Nigeria's 36 states and Federal Capital Territory. Empowering citizens to report infrastructure problems and track their resolution.

## 🌟 Features

### Frontend (React)
- **Interactive Dashboard** with statistics and quick actions
- **Report Management** - Create, view, and track community issues
- **Multi-language Support** - English, Hausa, Igbo, and Yoruba
- **Responsive Design** - Works on desktop, tablet, and mobile devices
- **Real-time Updates** - Live status tracking for reports
- **Category-based Reporting** - Roads, Electricity, Water, Sanitation, Security, Healthcare, Education

### Backend (Node.js/Express)
- **RESTful API** for all frontend operations
- **MongoDB Database** for efficient data storage
- **Authentication System** (if implemented)
- **Data Analytics** for reporting statistics
- **File Upload** support for report evidence
- **Email Notifications** (if configured)

## 🚀 Tech Stack

### Frontend
- **React 19** - Modern React with latest features
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React i18next** - Internationalization
- **Axios** - HTTP client for API calls
- **Vite** - Fast build tool and dev server

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure
naijafix-project/
├── frontend/ # React frontend application
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Page components
│ │ ├── locales/ # Translation files
│ │ ├── lib/ # API and utilities
│ │ └── assets/ # Images and static files
│ ├── public/ # Public assets
│ └── package.json
│
└── backend/ # Node.js backend API
├── models/ # Database models
├── routes/ # API routes
├── controllers/ # Business logic
├── middleware/ # Custom middleware
├── config/ # Configuration files
└── package.json

text

## 🛠 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Git

### Frontend Setup

# Navigate to frontend directory
cd naijafix-frontend

# Install dependencies
npm install
# Start development server
npm run dev

# Build for production
npm run build
Backend Setup
bash
# Navigate to backend directory
cd naijafix-backend

# Install dependencies
npm install

# Set environment variables
cp .env.example .env
# Edit .env with your MongoDB URI and other settings

# Start development server
npm run dev

# Start production server
npm start
Environment Variables
Frontend (.env)

env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=NaijaFix
Backend (.env)

env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/naijafix
JWT_SECRET=your-jwt-secret
NODE_ENV=development

### 📊 API Endpoints
##Reports
- **GET /api/reports - Get all reports

- **GET /api/reports/:id - Get single report

- **POST /api/reports - Create new report

- **PUT /api/reports/:id - Update report

- **DELETE /api/reports/:id - Delete report

- **GET /api/reports/stats - Get reporting statistics


### Categories
## GET /api/categories - Get all categories

#🎨 Features in Detail
- **For Citizens
- **Easy Reporting: Simple form to report community issues

- **Track Progress: Monitor report status from pending to resolved

- **Location-based: Reports tagged with specific areas and LGAs

- **Multiple Categories: Various issue categories for better organization

- **For Administrators
- **Dashboard Analytics: Overview of all reports and statistics

- **Status Management: Update report progress and priorities

- **Geographic Coverage: Reports from all 36 states + FCT

### 🌐 Deployment
- **Frontend Deployment (Vercel/Netlify)
- **bash
# Build the project
- **npm run build

# Deploy the dist folder to your preferred platform
- **Backend Deployment (Railway/Render/Heroku)
- **Set environment variables in deployment platform

- **Connect your MongoDB database

- **Deploy your backend code

### 🤝 Contributing
- **Fork the repository

- **Create your feature branch (git checkout -b feature/AmazingFeature)

- **Commit your changes (git commit -m 'Add some AmazingFeature')

- **Push to the branch (git push origin feature/AmazingFeature)

- **Open a Pull Request

### 📝 License
- **This project is licensed under the MIT License - see the LICENSE.md file for details.

### 🙏 Acknowledgments
- **Nigerian citizens for community engagement

- **PLP Academy for guidance and support

- **Open source community for amazing tools and libraries

### 📞 Support
- **For support, email support@naijafix.ng or create an issue in this repository.

### 🗺️ Coverage
- **Currently serving all 36 Nigerian states plus the Federal Capital Territory (FCT) with plans to expand to local government area-level tracking.

- **Built with ❤️ for Nigerian Communities
- **Currently serving all 36 Nigerian states plus the Federal Capital Territory (FCT) with plans to expand to local government area-level tracking.

- **Built with ❤️ for Nigerian Communities
