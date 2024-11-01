# PickupNYC

**CodePath WEB103 Final Project**

**Designed and developed by:** Jawad Rada, Mubarak Odufade, Patrick Lisiecki

**Link to deployed app:**

## About

### Description and Purpose

PickupNYC is a community-driven platform transforming how soccer enthusiasts in New York City connect, organize, and participate in pickup games and soccer-related discussions. Our mission is to make soccer more accessible across NYC's five boroughs by creating a vibrant, inclusive digital community.

Additionally, it includes a news feed to keep users informed on the latest updates about teams and players.

### Inspirations

In New York City's diverse soccer landscape, many enthusiasts face challenges in finding and organizing local games. PickupNYC bridges this gap by providing a unified platform where players can easily create, discover, and join games in their neighborhood, while engaging with fellow soccer lovers through discussions and community features.

## Tech Stack

**Frontend:** React, Tailwind CSS

**Backend:** Node.js, Express.js, (Flask or AWS Lambda), PostgreSQL

**Machine Learning:** Python, NumPy, Pandas, Matplotlib, Seaborn, Scikit-learn

**Developer Tools:** Git, GitHub, Figma, Postman

## Core Features

### 🤝 Community Engagement
- **User Profiles**
  - Customizable profile with game history
  - Authentication via email or Google sign-in
  - Profile picture customization
  
- **Social Interactions**
  - Create and participate in soccer discussions
  - Like and comment on posts
  - Connect with local players

### ⚽ Pickup Game Organization
- **Game Creation**
  - Host games in any NYC borough
  - Set custom rules and skill levels
  - Specify player capacity and time slots
  - Get updates about games

- **Game Discovery**
  - Browse games by borough and location
  - Filter by date, time, and skill level
  - View game details and player count
  - Get location directions

- **Game Management**
  - Register for upcoming games
  - Track registered players
  - Receive game updates

### 🎯 Equipment Rental Service
- **Available Equipment**
  - Soccer balls
  - Team pinnies/bibs
  - Cones and markers
  - Portable goal posts

- **Rental Features**
  - Convenient delivery to game location
  - On-site support during games
  - Secure deposit system
  - Damage protection insurance

### 📱 Platform Features

- **Search & Discovery**
  - Advanced game search
  - Player and organizer search
  - Borough-specific browsing

- **Live Updates**
 - Transfer news and updates
 - League standings
 - Team and player statistics

- **Coverage**
 - Major leagues and tournaments 
 - Match highlights and recaps
 - Breaking news and announcements

## Video Demo

## Container Diagram
<img width="1425" alt="Screenshot 2024-10-22 at 11 03 05 PM" src="https://github.com/user-attachments/assets/13bd92e9-60a2-429c-931e-de9f2ad761f9">


## Installation Instructions

### 1. **Clone the repository from GitHub:**

```bash
git clone <repository-url>
```
Replace `<repository-url>` with the URL of the repository.

### 2. **Navigate into the project folder:**

```bash
cd <project-folder>
```
Replace `<project-folder>` with the name of the folder that was cloned.

### 3. **Install dependencies for both React (frontend) and Node.js (backend):**

**For the frontend:**

Navigate into the React folder:
```bash
cd client
```

Install dependencies:

```bash
npm install
```

**For the backend:**

Navigate into the backend folder:

```bash
cd ../server
```

Install backend dependencies:

```bash
npm install
```

### 4. **Set up environment variables (if required):**

Check for a `.env.example` file in the root, backend, or frontend folder. Copy it to create your own `.env` file:

```bash
cp .env.example .env
```
Then, fill in any required environment variables.


### 5. **Run the backend server:**

```bash
cd server
npm start
```

### 6. **Run the frontend client:**

```bash
cd client
npm run dev
```
