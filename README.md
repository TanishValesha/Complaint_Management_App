# Complaint Management Application

A full-stack web application built with **Next.js**, **MongoDB**, and **Node.js** for managing complaints. Users can submit complaints, and admins can resolve them. The application includes email notifications for both the user and admin.

---

## Overview

This web application allows users to submit complaints related to products, services, or support. Admins can view, update, and resolve complaints. The app sends email notifications when:
- A user posts a complaint.
- An admin resolves a complaint.

Built with the **Next.js** framework, **MongoDB** for data storage, and **NodeMailer** for email functionality.

---

## Features

- **User Registration and Authentication**: Users can sign up, log in, and manage their complaints.
- **Complaint Submission**: Users can submit complaints, which are categorized as "Product", "Service", or "Support".
- **Complaint Management by Admin**: Admins can view, update, and resolve complaints.
- **Email Notifications**: Automatic emails are sent to the admin when a complaint is posted and to the user when their complaint is resolved.
- **Responsive Design**: The app works across all devices (mobile, tablet, desktop).
- **Secure**: User data is protected, and only authorized users can access admin features.

---

## Tech Stack

- **Frontend**: Next.js, React, TailwindCSS, ShadCN
- **Backend**: Node.js, Express.js, Next.js API Routes
- **Database**: MongoDB (MongoDB Atlas)
- **Authentication**: JWT (JSON Web Token)
- **Email**: NodeMailer
- **State Management**: Zustand
- **Deployment**: Vercel

---

## Setup Instructions

Follow the steps below to get the application running locally.

### 1. Clone the Repository
Clone the repository to your local machine:
```bash
git clone https://github.com/your-username/complaint-management-app.git
cd complaint-management-app
```
### 2. Install Dependencies
Make sure you have Node.js installed. Then, run:
```bash
npm install
```
### 3. Configure Environment Variables
Create a .env.local file in the root directory and add the following environment variables:
```bash
MONGODB_URL = mongodb+srv://admin:admin30@cluster0.oeitc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET = intern
ADMIN_EMAIL = owner3005@gmail.com
ADMIN_PASS = sdwkxzfaparxlner
```
### 4. Run the Application Locally
```bash
npm run dev
```

## Application User Guide

### User

/auth -> For login and register of users

/complaints -> An route for users to submit a complaint
As soon as the complaint is submitted by the user, an email is send to the admin's gmail regarding the details of the complaint
Currrently, the mail is send by admin to admin itself. We can later maybe create an manager account which will be used to mail the complaints to the admin

Admin Gmail Credentials:
email - owner3005@gmail.com 
password - admin3005

### Admin

# admin account credentials:
email - owner3005@gmail.com
password - 12345678

/admin -> Admin Dashboard
Here, admin can update the status of the complaints which are submitted by users.
Whenever, the admin marks an complaint as "Resolved" a mail is send to user who has submitted that complaint regarding the status of the complaint


### Deployed Link - https://complaint-management-app.vercel.app/

