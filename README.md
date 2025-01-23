Complaint Management System

This repository contains a Complaint Management System built with Next.js, MongoDB, and Node.js. The application allows users to submit complaints, and admins to manage and resolve them. Email notifications are integrated to inform users and admins about the complaint status.

Table of Contents

Setup Instructions

Application Usage

Email Functionality

MongoDB Setup

Setup Instructions

Prerequisites

Node.js (v16 or higher)

MongoDB Atlas account or a local MongoDB instance

Steps

Clone the Repository

git clone https://github.com/your-repo/complaint-management-system.git
cd complaint-management-system

Install Dependencies

npm install

Configure Environment Variables
Create a .env.local file in the root directory and add the following variables:

DATABASE_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password
FRONTEND_URL=http://localhost:3000

Run the Development Server

npm run dev

Open http://localhost:3000 in your browser to view the application.

Build and Start for Production

npm run build
npm start

Application Usage

For Users:

Submit a Complaint:

Navigate to the "Submit Complaint" page.

Fill out the form with details including title, description, category, and priority.

Submit the form to register a complaint.

View Complaint Status:

Go to the "My Complaints" section.

Check the status of complaints (Pending, In Progress, Resolved).

For Admins:

Manage Complaints:

Log in as an admin.

View all complaints in the "Admin Dashboard".

Update complaint status or resolve them.

Email Notifications:

Automatic email notifications are sent to users when complaints are resolved.

Email Functionality

Configuring SMTP

The application uses an SMTP server to send emails. You can configure the SMTP settings in the .env.local file:

EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password

How It Works

When a Complaint is Resolved:

The user receives an email notification about the resolution.

When a Complaint is Posted:

The admin receives an email about the new complaint.

Using a Service Like SendGrid or Mailgun

Replace EMAIL_HOST, EMAIL_PORT, EMAIL_USER, and EMAIL_PASS with the credentials provided by your email service provider.

Example for SendGrid:

EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASS=your-sendgrid-api-key

MongoDB Setup

Using MongoDB Atlas

Create an Account at MongoDB Atlas.

Create a Cluster and set up your database.

Whitelist Your IP Address:

Go to "Network Access" and add your current IP address.

Get Connection String:

Navigate to "Database > Connect > Connect Your Application".

Copy the connection string and update the DATABASE_URL in your .env.local file:

DATABASE_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>

Using a Local MongoDB Instance

Install MongoDB:

Follow the installation guide.

Run MongoDB Locally:

mongod

Update the Connection String:

DATABASE_URL=mongodb://localhost:27017/<dbname>

Additional Notes

Ensure all dependencies and environment variables are correctly set up before running the application.

Check the logs (Vercel Logs or console.log) if you encounter errors.

Feel free to open issues or contribute to this project!

