#  😎🚀 Our Mini Media - Mr Kumar <img src="https://raw.githubusercontent.com/MrKuldeep01/megaBlog_React/main/public/icon.svg" alt="Logo sample" width="50" height="50"> 

Welcome to **Our Mini Media - Mr Kumar**, a comprehensive media management application developed to provide a smooth and efficient user experience. This project showcases a variety of functionalities aimed at creating, managing, and viewing posts, all wrapped up in a user-friendly interface.

## Features

- **User Signup:** New users can create an account to start using the application.
- **User Login:** Existing users can log in to access their posts and create new ones.
- **Post Creation:** Users can create new posts with an image, title, slug, status, and content from a real-time text editor.
- **Post Editing:** Owners can edit their posts.
- **Post Deletion:** Owners can delete their posts.
- **Public Posts:** All users can view public posts.
- **Private Posts:** Only owners can see their private posts.
- **Smooth Interface:** A user-friendly and responsive interface.
- **Well-Structured Code:** Code follows best practices for maintainability and readability.

### Single Post Contains:
- **Image:** An image to represent the post.
- **Title:** The title of the post.
- **Slug:** A URL-friendly slug generated based on the title.
- **Status:** The visibility status of the post (private/public).
- **Content:** Rich text content from a real-time text editor built with TinyMCE.

## Tech Stack

- **Frontend:**
  - React.js
  - Redux Toolkit
  - React Router DOM
  - React Hook Form
  - TailwindCSS
- **Backend:**
  - Appwrite (Backend as a Service)
- **Deployment:**
  - Vercel

## Project Timeline

This project took approximately two weeks to complete, including around four nights dedicated to debugging. During this period, around 7.5k requests were handled by the Appwrite server. Notably, AI tools like ChatGPT were used for debugging assistance only 3 or 4 times.

## Pages Included

- **Signup**
- **Login**
- **Home**
- **All Posts**
- **Post Page**
- **Add Post**
- **Edit Post**

## Learning Source

This project is taught by Hitesh Sir on the YouTube channel "Chai aur Code" in the playlist "Chai aur React" as a major project.

#### post data lool like : 
```js
{
    "title": "At the end",
    "content": "",
    "featuredimage": "669de9e60019bc369d95",
    "status": "active",
    "userid": "669d6a49002b88119523",
    "$id": "at-the-end",
    "$tenant": "161677",
    "$createdAt": "2024-07-22T05:11:07.621+00:00",
    "$updatedAt": "2024-07-22T05:11:07.621+00:00",
    "$permissions": [
        "read(\"user:669d6a49002b88119523\")",
        "update(\"user:669d6a49002b88119523\")",
        "delete(\"user:669d6a49002b88119523\")"
    ],
    "$databaseId": "66863068000c2c478e26",
    "$collectionId": "6686311b0009ccd8edfa"
}
```


 #### user json is look like : 
```js
{
    "$id": "669d6a49002b88119523",
    "$createdAt": "2024-07-21T20:06:34.931+00:00",
    "$updatedAt": "2024-07-21T20:06:34.931+00:00",
    "name": "Kuldeep",
    "registration": "2024-07-21T20:06:34.930+00:00",
    "status": true,
    "labels": [],
    "passwordUpdate": "2024-07-21T20:06:34.930+00:00",
    "email": "kuldeep@gmail.com",
    "phone": "",
    "emailVerification": false,
    "phoneVerification": false,
    "mfa": false,
    "prefs": {},
    "targets": [
        {
            "$id": "669d6a4aecdf5a6e9009",
            "$createdAt": "2024-07-21T20:06:34.970+00:00",
            "$updatedAt": "2024-07-21T20:06:34.970+00:00",
            "name": "",
            "userId": "669d6a49002b88119523",
            "providerId": null,
            "providerType": "email",
            "identifier": "kuldeep@gmail.com"
        }
    ],
    "accessedAt": "2024-07-21T20:06:34.930+00:00"
}

```

## Credits 🎖

This project is a result of the guidance and teaching provided by Hitesh Sir on the YouTube channel **"Chai aur Code"** 📺🥇. 

---
