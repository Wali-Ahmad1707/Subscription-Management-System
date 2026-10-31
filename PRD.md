# Product Requirements Document (PRD)
## Subscription Management System

**Project Status:** In Development  
**Version:** 1.0  
**Document Type:** Product Requirements Document

---

## 1. Product Overview

The Subscription Management System is a web-based platform that enables businesses to manage products, subscription plans, customers, quotations, invoices, discounts, and payments from a centralized application.

The system aims to simplify subscription operations, reduce manual work, automate recurring billing, and provide clear financial insights.

## 2. Product Objectives

- Centralize subscription-related business operations.
- Simplify customer and product management.
- Support flexible subscription plans.
- Automate invoice generation on billing dates.
- Prevent duplicate or missed billing.
- Manage discounts, taxes, and payments.
- Provide accurate revenue and outstanding-payment reports.
- Support thousands of subscriptions efficiently.

## 3. User Roles

### 3.1 Admin
- Manage all system operations.
- Create and manage staff accounts.
- Add, update, and delete products and plans.
- Manage discounts and tax settings.
- View all subscriptions, invoices, payments, and reports.

### 3.2 Staff
- Access authorized operational features.
- Manage customer-related operations.
- Create quotations and manage assigned subscriptions.
- View relevant invoices and payment information.

### 3.3 Customer
- Register and log in.
- View available products and subscription plans.
- View quotations and subscriptions.
- Access invoices and payment information.

**Restriction:** Only Admin can create staff accounts.

## 4. Functional Requirements

### 4.1 Authentication and Authorization
- User registration and login.
- Password reset functionality.
- Role-based access control.
- Restrict access to unauthorized pages and operations.

### 4.2 Product Management
- Add, edit, view, and manage products.
- Support multiple variants of a product.
- Store product prices and costs.

### 4.3 Subscription Plan Management
- Support daily, weekly, monthly, and yearly plans.
- Configure minimum subscription quantities.
- Configure plan availability dates.
- Define pause, closure, and renewal policies.

### 4.4 Quotation Management
- Create and manage quotation templates.
- Generate quotations for customers.
- Track quotation status.
- Support conversion of confirmed quotations into subscriptions.

### 4.5 Subscription Management

The subscription lifecycle must support:

Draft → Quotation → Confirmed → Active → Closed

The system should:
- Create and update subscriptions.
- Track subscription status.
- Apply selected plans and quantities.
- Support configured pause, close, and renewal policies.

### 4.6 Invoice Management
- Generate invoices automatically on billing dates.
- Calculate applicable taxes.
- Maintain invoice records.
- Track invoice status.

Invoice lifecycle:

Draft → Confirmed → Paid

The system must prevent duplicate invoices and avoid skipped billing cycles.

### 4.7 Discount Management
- Admin can create fixed-value discounts.
- Admin can create percentage-based discounts.
- Configure minimum purchase or quantity requirements.
- Configure discount validity dates.
- Configure usage limits.
- Apply eligible discounts automatically.

### 4.8 Payment Management
- Link payments with invoices.
- Record payment details.
- Track paid, outstanding, and overdue invoices.

### 4.9 Dashboard and Reports
Display:
- Total active subscriptions.
- Total revenue.
- Paid invoices.
- Outstanding invoices.
- Overdue invoices.

Provide useful reporting for business operations.

## 5. Non-Functional Requirements

### Performance
- Important pages should respond within 2 seconds under expected operating conditions.
- Support thousands of subscription records efficiently.

### Security
- Secure authentication.
- Role-based authorization.
- Protect sensitive customer and financial information.
- Never expose secret credentials in frontend code or public repositories.

### Reliability
- Prevent duplicate invoice generation.
- Avoid skipped billing cycles.
- Maintain consistent subscription and payment records.

### Usability
- Provide a clear, responsive, and easy-to-use interface.
- Make important information accessible through dashboards.

## 6. Subscription Business Workflow

1. Admin creates products and subscription plans.
2. Customer or staff initiates a subscription request.
3. A quotation is generated.
4. Quotation is confirmed.
5. Subscription becomes active.
6. The system generates invoices on billing dates.
7. Payments are recorded against invoices.
8. Subscription is eventually renewed or closed according to its policy.

## 7. Technology Stack

### Frontend
- React.js
- TypeScript
- Tailwind CSS

### Backend
- Python
- Django
- Django REST Framework

### Database
- PostgreSQL

### Planned Automation
- Celery
- Redis

## 8. Scope of Development

### Phase 1 — Frontend
- Project setup.
- Authentication screens.
- Dashboard.
- Product and plan interfaces.
- Subscription management screens.
- Invoice and payment interfaces.

### Phase 2 — Backend
- API development.
- Authentication and authorization.
- Business logic.
- Subscription and invoice management.

### Phase 3 — Database
- Database design.
- Model relationships.
- Data persistence.

### Phase 4 — Automation
- Recurring invoice generation.
- Billing cycle management.
- Discount calculations.
- Notifications and overdue tracking.

### Phase 5 — Testing and Deployment
- Functional testing.
- Security testing.
- Performance testing.
- Production deployment.

## 9. Success Criteria

- All three user roles can access only their authorized features.
- Products and subscription plans can be managed.
- Subscriptions follow the defined lifecycle.
- Invoices are generated correctly.
- Duplicate and skipped billing cycles are prevented.
- Discounts and taxes are calculated correctly.
- Payments are linked to the correct invoices.
- Dashboard reports display accurate information.

## 10. Future Enhancements

- Payment gateway integration.
- Email and SMS notifications.
- Advanced revenue analytics.
- Subscription usage analytics.
- Exportable financial reports.
