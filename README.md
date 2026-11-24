# 🏠 RentRadar – Rental Property Finder

RentRadar is a web-based rental property platform that helps tenants find suitable rental properties and allows property owners to manage their listings, inquiries, and visit requests.

## 🚀 Features

### 👤 Tenant Features
- Browse available rental properties.
- Search and filter properties by location, property type, and rent.
- View detailed property information.
- Save favorite properties.
- Compare up to 3 properties.
- Send inquiries to property owners.
- Request property visits.
- Track visit request status through the Tenant Dashboard.

### 🏡 Owner Features
- Owner registration and login.
- Add new rental properties.
- View and manage personal property listings.
- Edit and delete property listings.
- View dashboard statistics.
- Manage tenant inquiries.
- Approve or reject property visit requests.

### 🔐 Authentication & Access Control
- User authentication.
- Tenant and Owner roles.
- Protected routes based on user roles.
- Login and registration pages.

### 📱 Responsive Design
- Mobile-friendly interface.
- Tablet and desktop support.
- Responsive property cards, forms, and dashboards.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| Vite | Development server and build tool |
| JavaScript | Application logic |
| HTML5 | Page structure |
| CSS3 | Styling and responsive design |
| React Router | Navigation and routing |
| JSON Server | Mock REST API |
| Git & GitHub | Version control |

## 📂 Project Structure

```text
RentRadar/
│
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── data/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
│
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/srideviboini123/Rentradar.git
```

### 2. Navigate to the project folder

```bash
cd Rentradar
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure JSON Server

RentRadar uses JSON Server as its backend.

The local `db.json` development database is intentionally excluded from this public repository.

To run the application, provide a compatible local `db.json` file in the project root containing the required collections:

- properties
- users
- inquiries
- visitRequests

### 5. Start JSON Server

```bash
npx json-server db.json --port 3000
```

### 6. Start the React application

Open another terminal and run:

```bash
npm run dev
```

### 7. Open in browser

```text
http://localhost:5173/
```

## 🔗 API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/properties` | Get properties |
| POST | `/properties` | Add property |
| PATCH | `/properties/:id` | Update property |
| DELETE | `/properties/:id` | Delete property |
| GET | `/inquiries` | Get tenant inquiries |
| POST | `/inquiries` | Create inquiry |
| GET | `/visitRequests` | Get visit requests |
| POST | `/visitRequests` | Create visit request |
| PATCH | `/visitRequests/:id` | Update visit request |

## 🧪 Testing

The application was tested for:

- Tenant and Owner login workflows.
- Property listing and filtering.
- Property details.
- Save and compare functionality.
- Owner property management.
- Tenant inquiries.
- Property visit requests.
- Protected route access.
- Mobile, tablet, and desktop responsiveness.

## 🔮 Future Enhancements

- Integration with a production backend.
- Secure authentication and authorization.
- Real-time notifications.
- Map-based property search.
- Deployment to a cloud hosting platform.

## 👩‍💻 Developer

**Sridevi Boini**

GitHub: [srideviboini123](https://github.com/srideviboini123)

Project Repository: [RentRadar](https://github.com/srideviboini123/Rentradar)

---

⭐ If you find this project interesting, feel free to explore the repository!
