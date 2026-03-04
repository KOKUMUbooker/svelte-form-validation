# SvelteKit Client-Side Form Validation with Zod

A demo project showcasing **smart client-side form validation** in SvelteKit using Zod and shadcn-svelte UI components.

This project demonstrates how to build a maintainable, schema-based validation system with real-world UX patterns — without relying on heavy form libraries.

---

## Features

- Schema-based validation using Zod
- Field-level validation
- Cross-field validation (Password confirmation)
- Blur-first validation strategy
- Real-time validation after interaction
- Full validation on submit
- Custom error messages
- Numeric coercion with `z.coerce`
- Boolean validation (Terms & Conditions)

---

## Validation Strategy

Instead of validating only on submit or on every keystroke, this project implements a smarter UX pattern:

1. Validate on blur
2. Once a field has been touched → validate on input
3. On submit → mark all fields as touched and validate everything
4. Handle cross-field validation using `superRefine`

This approach:

- Prevents aggressive error messages while typing
- Ensures all fields are validated before submission
- Keeps validation predictable and user-friendly

---

## Tech Stack

- SvelteKit
- TypeScript
- Zod
- TailwindCSS
- shadcn-svelte

---

## Getting Started

### 1. To re-create the project

```bash
npx sv create svelte-form-validation --add tailwindcss
cd svelte-form-validation
```

### 2. Initialize shadcn

```bash
npx shadcn-svelte@latest init
```

### 3. Add components

```bash
npx shadcn-svelte@latest add button
npx shadcn-svelte@latest add input
npx shadcn-svelte@latest add field
npx shadcn-svelte@latest add textarea
npx shadcn-svelte@latest add checkbox
```

### 4. Install Zod

```bash
npm install zod
```

### 5. Run the dev server

```bash
npm run dev
```

---

## Project Structure

```
src/
 ├─ lib/
 │   ├─ components/
 │   ├─ form-configs/
 │   │    └─ form-schema.ts   # Zod schema definitions
 ├─ routes/
 │   └─ +page.svelte      # Form implementation
```

---

## Schema Design

The project separates validation logic into:

- `registerBaseSchema` → Independent field validation
- `registerSchema` → Cross-field validation via `superRefine`

This allows:

- Efficient field-level validation
- Clean separation of dependent validation logic

---

## Key Concepts Demonstrated

- Using `safeParse` for controlled validation
- Validating individual fields using `schema.pick`
- Handling dependent fields (Password & Confirm Password)
- Managing error visibility using a `touched` state object
- Converting string inputs to numbers using `z.coerce.number()`

---

## Preview

## <img src="/readme-assets/screenshot.png">

## Related Article

This repository accompanies the article:

**"How to Build UX-Friendly Form Validation in SvelteKit with Zod"** : https://dev.to/kokumubooker/how-to-build-ux-friendly-form-validation-in-sveltekit-with-zod-130k

---
