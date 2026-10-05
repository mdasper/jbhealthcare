# JP Hospital - Website Management & Developer Guide

Welcome to the documentation for the **JP Hospital** website. This guide is designed to help both non-technical users and developers understand how to run, update, and manage the website in the future.

---

## 📑 Table of Contents
1. [Prerequisites](#1-prerequisites)
2. [Local Setup (How to run the project)](#2-local-setup-how-to-run-the-project)
3. [Project Structure](#3-project-structure)
4. [How to Edit Content (Text & Images)](#4-how-to-edit-content-text--images)
5. [How to Add a New Page or Service](#5-how-to-add-a-new-page-or-service)
6. [Styling & Colors](#6-styling--colors)
7. [API & Integrations](#7-api--integrations)
8. [Deployment (How to host the website)](#8-deployment-how-to-host-the-website)
9. [Troubleshooting](#9-troubleshooting)

---

## 1. Prerequisites
Before you start making changes, ensure you have the following installed on your computer:
- **Node.js**: [Download here](https://nodejs.org/) (Choose the LTS version).
- **Code Editor**: We recommend [Visual Studio Code (VS Code)](https://code.visualstudio.com/).

---

## 2. Local Setup (How to run the project)
To run the website on your local machine to test changes before making them live:

1. Open the project folder (`JP_HOSPITAL`) in VS Code.
2. Open the terminal inside VS Code (`Ctrl` + `` ` `` or `Terminal -> New Terminal`).
3. Run the following command to install required packages (only needed the first time):
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. You will see a local URL (e.g., `http://localhost:5173/`). `Ctrl` + Click on the link to open the website in your browser. Any changes you make to the code will automatically refresh here!

---

## 3. Project Structure
Here is where you can find different parts of the website:

- `/src/pages/` ➡️ Contains the main pages of the website (e.g., `Home.jsx`, `About.jsx`, `Services.jsx`, `Contact.jsx`).
- `/src/components/` ➡️ Contains reusable parts of the website (e.g., `Navbar.jsx`, `Footer.jsx`, `FloatingWhatsApp.jsx`).
- `/src/assets/` ➡️ Put your images, icons, and logos here.
- `/src/App.jsx` ➡️ The main file that handles navigation (Routing) between different pages.
- `/src/index.css` ➡️ The main file for styling and colors.

---

## 4. How to Edit Content (Text & Images)

**Editing Text:**
If you want to change the text on the Home page:
1. Go to `src/pages/Home.jsx`.
2. Find the text you want to change inside the `<h1>`, `<p>`, or `<div>` tags.
3. Change the text and save the file (`Ctrl` + `S`). The website will update instantly.

**Changing Images:**
1. Add your new image to the `src/assets/` folder.
2. Open the file where you want to change the image (e.g., `Home.jsx`).
3. At the top of the file, import the image: 
   `import newImage from '../assets/my-new-image.jpg';`
4. Use it in the code: `<img src={newImage} alt="Description" />`

---

## 5. How to Add a New Page or Service

**Step 1: Create the new page**
1. Go to `src/pages/` and create a new file, e.g., `Gallery.jsx`.
2. Add a basic React structure:
   ```jsx
   import React from 'react';
   
   const Gallery = () => {
     return (
       <div>
         <h1>Our Gallery</h1>
       </div>
     );
   }
   export default Gallery;
   ```

**Step 2: Add it to the App Routes (`App.jsx`)**
1. Open `src/App.jsx`.
2. Import the new page at the top: `import Gallery from './pages/Gallery';`
3. Add a new `<Route>` inside the `<Routes>` section:
   `<Route path="/gallery" element={<Gallery />} />`

**Step 3: Add it to the Menu (`Navbar.jsx`)**
1. Open `src/components/Navbar.jsx`.
2. Add a new link to the menu list: `<Link to="/gallery">Gallery</Link>`

---

## 6. Styling & Colors
- Global styles and colors are located in `src/index.css`.
- If you need to change the primary brand color, look for CSS variables or standard color codes (like `#ff0000` or `rgb()`) inside this file and update them.

---

## 7. API & Integrations
*(Update this section based on your specific backend)*
- **Contact Form:** If the Contact page (`Contact.jsx`) sends emails, check the function handling the form submission (`onSubmit`). It might be using a service like Web3Forms, EmailJS, or a custom backend API.
- **WhatsApp Integration:** The `FloatingWhatsApp.jsx` component uses a WhatsApp link. To change the phone number, open that file and update the phone number in the `href="https://wa.me/YOUR_NUMBER"` link.

---

## 8. Deployment (How to host the website)

When you are ready to make the website live on the internet, you can use modern hosting platforms like **Vercel** or **Netlify**. They are free and easy to use.

**Using Vercel (Recommended):**
1. Create a free account on [Vercel](https://vercel.com/).
2. Upload this project to a GitHub repository.
3. On Vercel, click **Add New Project** and connect your GitHub account.
4. Select your JP_HOSPITAL repository.
5. Vercel will automatically detect that it's a React/Vite app. Click **Deploy**.
6. Whenever you push new code to GitHub in the future, Vercel will automatically update the live website!

*(If you are using Hostinger or cPanel, you will need to run `npm run build` locally, and then upload the contents of the generated `dist/` folder to your server's `public_html` folder).*

---

## 9. Troubleshooting
- **Website is not starting locally?** Ensure you ran `npm install` first. Check the terminal for any error messages.
- **Changes are not showing?** Make sure you saved the file (`Ctrl` + `S`). Sometimes, restarting the development server (`Ctrl` + `C` to stop, then `npm run dev`) helps.
