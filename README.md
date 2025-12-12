# Equinox - Next.js Table Management Application

A modern, full-featured table management application built with Next.js, featuring data visualization, CRUD operations, and comprehensive internationalization support.

## 📋 Project Overview

This project is a technical assessment implementation that demonstrates proficiency in building production-ready web applications with modern technologies. It includes two main sections: **Products** (with full CRUD) and **Berries** (with detail view), both featuring advanced table functionality.

## ✨ Features

### Core Functionality
- **📊 Data Tables**: Interactive tables with sorting, pagination, and search
- **🔍 Live Search**: Real-time filtering as you type
- **📄 Pagination**: Configurable items per page (10, 30, 50)
- **↕️ Sorting**: Ascending sort by name
- **💾 State Persistence**: Maintains page state and search results across refreshes
- **🌐 Multi-language Support**: Full internationalization (English & Indonesian)
- **🎨 Responsive Design**: Mobile-friendly interface with Tailwind CSS

### Products Section
- **CRUD Operations**: Create, Read, Update, Delete products
- **Form Validation**: Comprehensive validation using Zod
- **Toast Notifications**: User feedback for all actions
- **Navigation**: Seamless routing between list, add, and edit pages
- **Data Source**: FakeStore API integration

### Berries Section
- **Table Display**: List all berries with search and pagination
- **Detail View**: Interactive detail dialog with dropdown selector
- **Skeleton Loading**: Loading states for better UX
- **Berry Details**: Comprehensive berry information (growth time, size, flavors, etc.)
- **Data Source**: PokeAPI integration

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) with persistence
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)

## 📁 Project Structure

```
equinox/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── [locale]/          # Internationalization wrapper
│   │   ├── berries/           # Berry table and detail
│   │   └── products/          # Product CRUD pages
│   ├── components/
│   │   ├── dialog/            # Dialog components (BerryDetailDialog)
│   │   ├── form/              # Form components (ProductForm)
│   │   ├── layout/            # Layout components (NavBar, SideBar)
│   │   ├── table/             # Table components (BerryTable, ProductTable)
│   │   └── ui/                # shadcn/ui components
│   ├── stores/                # Zustand stores
│   │   ├── useBerryStore.ts   # Berry table state
│   │   └── useProductStore.ts # Product CRUD state
│   ├── types/                 # TypeScript type definitions
│   │   ├── berry.ts
│   │   └── product.ts
│   └── services/              # API integration
│       └── api.ts
├── messages/                  # i18n translations
│   ├── en.json               # English
│   └── id.json               # Indonesian
└── public/                   # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd equinox
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Run the development server:
```bash
pnpm dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
pnpm build
pnpm start
```

## 📖 API Endpoints

### Products (FakeStore API)
- **Base URL**: `https://fakestoreapi.com/products`
- **Usage**: CRUD operations for product management

### Berries (PokeAPI)
- **Base URL**: `https://pokeapi.co/api/v2/berry/`
- **Usage**: Fetch berry list and details

## 🎯 Key Implementation Details

### State Persistence
- Uses Zustand middleware to persist table state (pagination, search) to localStorage
- Automatic rehydration on page load
- Separate stores for Products and Berries

### Internationalization
- Configured with `next-intl` for seamless language switching
- Translation files in JSON format
- Supports English and Indonesian
- Language selector in navbar

### Form Validation
- Schema-based validation using Zod
- Array-based field configuration for DRY code
- Type-safe form handling with React Hook Form
- Separate handling for text and number inputs

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Responsive tables with horizontal scroll
- Adaptive navigation (sidebar/hamburger menu)
- Flexible layouts for different screen sizes

## 📝 Requirements Checklist

### Question 1 Requirements ✅
- [x] List table page with data from PokeAPI
- [x] Columns: No | Name | Action
- [x] Edit and Delete buttons
- [x] Sorting by Name (Ascending)
- [x] Pagination [10, 30, 50]
- [x] Live Search
- [x] Add button navigation
- [x] Form for adding data (FakeStore API structure)
- [x] Success alerts
- [x] Edit page with pre-filled data
- [x] State persistence after refresh
- [x] Search persistence after refresh
- [x] Detail page with dropdown selector
- [x] "Go" button for detail display
- [x] Skeleton loading states
- [x] Multi-language support
- [x] Navbar navigation

### Question 2 Requirements ✅
- [x] Table with No | Name | Action
- [x] Sorting by Name (Ascending)
- [x] Pagination [10, 30, 50]
- [x] Live Search
- [x] Detail button showing selected data
- [x] Page persistence after refresh (Optional)
- [x] Search persistence after refresh (Optional)
- [x] Multi-language support

## 🎨 UI Components

Built with shadcn/ui and Radix UI primitives:
- Button
- Input
- Table
- Select
- Dialog
- Skeleton
- Label
- Form

## 🔄 Future Enhancements

- [ ] Server-side pagination for large datasets
- [ ] Advanced filtering options
- [ ] Export to CSV/Excel
- [ ] Bulk operations
- [ ] User authentication
- [ ] Dark mode support
- [ ] Unit and E2E tests

## 📄 License

This project is created for technical assessment purposes.

## 👨‍💻 Author

Created with ❤️ using Next.js and modern web technologies.

---

**Note**: This project demonstrates best practices in modern web development including type safety, state management, internationalization, and responsive design.
