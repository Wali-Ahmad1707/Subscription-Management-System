# Development Rules
## Subscription Management System

These rules must be followed throughout the development of this project by developers and AI coding assistants.

## 1. General Development Rules

- Follow the requirements documented in PRD.md.
- Follow the architecture described in ARCHITECTURE.md.
- Keep the code clean, readable, and maintainable.
- Build the application module by module.
- Do not generate the entire application in one step.
- Explain major changes before implementing them.
- Do not remove existing working functionality without approval.

## 2. Frontend Rules

- Use React with TypeScript.
- Use functional React components.
- Use reusable components wherever practical.
- Use Tailwind CSS for styling.
- Keep components small and focused.
- Use meaningful names for components, functions, and variables.
- Avoid unnecessary duplication.
- Ensure the interface is responsive on desktop, tablet, and mobile.
- Provide loading, error, empty, and success states where appropriate.
- Do not place secret credentials in frontend code.

## 3. Backend Rules

- Use Python with Django.
- Use Django REST Framework for APIs.
- Separate business logic from API views where practical.
- Validate user input on the backend.
- Use appropriate HTTP status codes.
- Follow secure authentication practices.
- Never rely only on frontend role checks for authorization.

## 4. Database Rules

- Use PostgreSQL as the primary database.
- Define clear relationships between database entities.
- Use appropriate constraints and indexes.
- Avoid duplicate records where uniqueness is required.
- Use database transactions for critical financial operations.
- Do not delete important financial history without an approved policy.

## 5. Authentication and Authorization

- Support Admin, Staff, and Customer roles.
- Only Admin can create staff accounts.
- Enforce permissions on the backend.
- Store passwords using secure password hashing.
- Never store plain-text passwords.
- Protect private customer and financial information.

## 6. Subscription Rules

- Support daily, weekly, monthly, and yearly plans.
- Respect minimum quantities and plan availability dates.
- Apply configured pause, closure, and renewal policies.
- Follow the defined subscription lifecycle:

  Draft → Quotation → Confirmed → Active → Closed

- Validate every subscription status transition.

## 7. Invoice and Billing Rules

- Generate invoices according to subscription billing dates.
- Prevent duplicate invoice generation.
- Prevent skipped billing cycles.
- Calculate taxes and discounts according to configured rules.
- Maintain invoice history.
- Follow the invoice lifecycle:

  Draft → Confirmed → Paid

- Link payments to their corresponding invoices.

## 8. Discount Rules

- Support fixed and percentage discounts.
- Validate minimum purchase or quantity requirements.
- Respect validity dates and usage limits.
- Apply only eligible discounts.
- Ensure discount calculations are performed consistently.

## 9. Security Rules

- Store secrets in environment variables.
- Never commit .env files.
- Validate and sanitize user input.
- Use role-based access control.
- Protect sensitive API endpoints.
- Avoid exposing sensitive information in error messages.
- Keep dependencies reasonably updated.

## 10. Git and GitHub Rules

- Use meaningful commit messages.
- Commit after completing logical development tasks.
- Do not upload node_modules.
- Do not upload environment secrets.
- Push stable and tested changes.
- Keep README.md updated when project setup changes.

Example commit messages:

- feat: add dashboard layout
- feat: create product management page
- fix: correct subscription status display
- docs: update project architecture
- style: improve responsive navigation

## 11. Testing Rules

- Test every feature after implementation.
- Check form validation.
- Test role-based access.
- Test responsive layouts.
- Verify important workflows.
- Fix errors before moving to the next module.

## 12. AI Coding Assistant Rules

When using Antigravity or another AI coding assistant:

1. Read README.md, PRD.md, ARCHITECTURE.md, and RULES.md before making major changes.
2. Work on one module at a time.
3. Inspect existing files before editing them.
4. Explain which files will be created or modified.
5. Do not install unnecessary packages.
6. Do not overwrite existing files without checking their contents.
7. Do not invent backend APIs that have not been implemented.
8. Ask for clarification when requirements are unclear.
9. Explain important code changes in beginner-friendly language.
10. Run appropriate checks after making changes.

## 13. Code Quality

- Use consistent formatting.
- Avoid unused variables and imports.
- Avoid unnecessary complex logic.
- Use TypeScript types instead of excessive use of any.
- Keep functions focused on one responsibility.
- Write comments for complex business logic.

## 14. Development Principle

Build a working, understandable, and maintainable application step by step.

Correctness, security, reliability, and clarity are more important than generating code quickly.
