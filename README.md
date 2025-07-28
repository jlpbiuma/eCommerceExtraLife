# E-Commerce Board Games Platform

A modern e-commerce platform specialized in board games, built with Next.js, Prisma, and Supabase.

## Database Commands

### Prisma Commands

```bash
# Push schema changes to the database
npx prisma db push
```
This command synchronizes your Prisma schema with the database. It:
- Creates new tables defined in your schema
- Adds new fields to existing tables
- Updates field types and constraints
- Creates indexes and unique constraints

```bash
# Generate Prisma Client
npx prisma generate
```
This command:
- Generates the Prisma Client based on your schema
- Updates TypeScript types for your models
- Must be run after any schema changes

```bash
# Seed the database
npm run prisma:seed
```
This command:
- Populates the database with initial data
- Creates default roles (admin, customer)
- Adds sample categories and products
- Creates test users
- Adds sample reviews

```bash
# Open Prisma Studio
npx prisma studio
```
This launches a visual database browser where you can:
- View and edit data in your database
- Add new records
- Delete existing records
- Filter and sort data

### Development Commands

```bash
# Install dependencies
npm install
```
Installs all necessary packages defined in package.json

```bash
# Run development server
npm run dev
```
Starts the development server with:
- Hot reloading
- Error reporting
- Development environment settings

```bash
# Build for production
npm run build
```
Creates an optimized production build:
- Minifies JavaScript
- Optimizes images
- Generates static pages where possible

```bash
# Start production server
npm run start
```
Runs the application in production mode

```bash
# Run linter
npm run lint
```
Checks code for:
- Style consistency
- Potential errors
- Best practices

## Environment Variables

The application requires the following environment variables:

```env
# Database connection (Supabase)
DATABASE_URL="postgres://postgres.[project-id]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres"
DIRECT_URL="postgres://postgres.[project-id]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres"

# Supabase API
SUPABASE_URL="your-project-url"
SUPABASE_API_KEY="your-api-key"
```

## Database Schema

The database includes the following models:

- **Users**: Store customer and admin information
- **Roles**: Define user permissions (admin, customer)
- **Products**: Board game details including:
  - Basic info (name, description, price)
  - Game specifics (players, play time, age rating)
  - Physical attributes (weight, dimensions)
- **Categories**: Organize games by type
- **Inventory**: Track product stock levels
- **Orders**: Track customer purchases
- **Order Items**: Individual items in orders
- **Reviews**: Customer feedback and ratings

## Initial Data

The seeder creates:
- 2 roles (admin, customer)
- 5 game categories
- 2 sample products (Catan, Monopoly)
- 2 users (admin and customer)
- Sample inventory and review data

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
