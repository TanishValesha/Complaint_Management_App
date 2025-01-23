# Complaint Management Application

A full-stack web application built with **Next.js**, **MongoDB**, and **Node.js** for managing complaints. Users can submit complaints, and admins can resolve them. The application includes email notifications for both the user and admin.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [Email Functionality](#email-functionality)
- [MongoDB Setup](#mongodb-setup)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

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
- **State Management**: Zustand, Redux (for different parts of the app)
- **Deployment**: Vercel

---

## Setup Instructions

Follow the steps below to get the application running locally.

### 1. Clone the Repository
Clone the repository to your local machine:
```bash
git clone https://github.com/your-username/complaint-management-app.git
cd complaint-management-app
