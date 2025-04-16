# ACME Backend

This repository contains the backend services for the ACME project.

## Environment Variables

The following environment variables need to be configured for the application to run. Replace the placeholder values with your actual configuration.

### Database Configuration
- `DATABASE_URL`: Connection string for the PostgreSQL database.  
    Example: `postgresql://<username>:<password>@<host>/<database>?sslmode=require`

### Firebase Configuration
- `NEXT_PUBLIC_FIREBASE_API_KEY`: Firebase API key.  
    Example: `AIzaSy...`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`: Firebase Auth domain.  
    Example: `your-project.firebaseapp.com`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`: Firebase project ID.  
    Example: `your-project-id`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`: Firebase storage bucket.  
    Example: `your-project.appspot.com`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`: Firebase messaging sender ID.  
    Example: `1234567890`
- `NEXT_PUBLIC_FIREBASE_APP_ID`: Firebase app ID.  
    Example: `1:1234567890:web:abcdef123456`

### Application Configuration
- `NEXT_PUBLIC_BASE_URL`: Base URL for fetch requests / API Calls 
    Example: `http://yourapp.vercel.app`
- `NEXT_PUBLIC_SHORT_NAME`: Short name of the application.  
    Example: `"ACME"`
- `NEXT_PUBLIC_LONG_NAME`: Full name of the application.  
    Example: `"ACME Flow Control"`

## Documentation

For more details on configuring Prisma, refer to the [Prisma documentation](https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema).  
For connection string options, refer to the [Prisma connection strings documentation](https://pris.ly/d/connection-strings).

## Getting Started

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Configure the environment variables in a `.env` file.
4. Run the application using `npm start`.

## License

This project is licensed under the MIT License.  