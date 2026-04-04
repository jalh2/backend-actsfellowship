# Acts Fellowship International Project – Plan
 
 ## Context
 - **Organization:** Acts Fellowship International (pastoral training program / school website and CMS).
 - **Current Phase:** Backend architecture is already created. The next phase is connecting the backend to the frontend and building both the public website and the CMS/admin interface.
 - **Reference Projects:**
   - `firebasecmstest/backend` for backend architecture and API behavior.
   - `firebasecmstest/frontend` for frontend file separation, route/layout structure, auth context, API utilities, and styled-components setup.
 - **Design Direction:** Use the provided home page and subpage screenshots as structural/layout reference. Preserve the overall section ordering, spacing rhythm, and clean ministry/education presentation style, but do not reuse the blue-heavy palette. Keep white sections where appropriate and use a different professional accent palette.
 - **Style Rule:** Use `styled-components`, and keep styles in separate files from page/component logic.
 - **Storage Rule:** Images remain Base64 strings stored in Firestore documents.

 ## Current Project Status
 
 ### Completed: Backend Architecture
 - [x] Express + Firestore backend scaffolded in `actsfellowship/backend`.
 - [x] Firebase Admin setup aligned with `firebasecmstest/backend`.
 - [x] Session-based auth and role middleware implemented.
 - [x] Models/controllers/routes created for Home, About, Fellowship Pages, Contact, and Users.
 - [x] Seed scripts created for admin user and starter content.
 - [x] `actsfellowshipprofile.md` mapped into seeded About content.
 
 ### Remaining Backend Validation
 - [ ] Add the Firebase service account JSON referenced by `GOOGLE_APPLICATION_CREDENTIALS`.
 - [ ] Manually verify all backend endpoints before wiring the frontend.
 - [ ] Confirm seeded content shape matches frontend rendering needs.
 
 ## Backend Content Model (already implemented)
 
 ### Home (`homeContent` singleton)
 - `heroTitle`
 - `heroDescription`
 - `heroImages[]`
 - `title`
 - `description`
 - `createdAt`, `updatedAt`
 
 ### About (`aboutContent` singleton)
 - `title`
 - `description`
 - `sections[]`
   - `key`
   - `title`
   - `description`
   - `items[]`
   - `images[]`
 - `createdAt`, `updatedAt`
 
 ### Fellowship Pages (`fellowshipPages` collection)
 - `slug`
 - `title`
 - `description`
 - `images[]`
 - `menuLabel`
 - `isPublished`
 - `sortOrder`
 - `createdAt`, `updatedAt`
 
 ### Contact (`contactPage` singleton + `contactMessages` collection)
 - `title`
 - `description`
 - `address`
 - `email`
 - `phone`
 - `socialLinks[]`
 - public contact messages
 
 ### Users (`users` collection)
 - `username`
 - `password` (hashed)
 - `role`
 - `isActive`
 - `createdAt`, `updatedAt`
 
 ## Backend API Surface To Consume From Frontend
 
 ### Auth / Users `/api/users`
 - `POST /login`
 - `POST /logout`
 - `GET /me`
 - `POST /`
 - `GET /`
 - `PUT /:id`
 - `DELETE /:id`
 
 ### Home `/api/home`
 - `GET /`
 - `PUT /`
 
 ### About `/api/about`
 - `GET /`
 - `PUT /`
 - `POST /sections`
 - `PUT /sections/:key`
 - `DELETE /sections/:key`
 
 ### Fellowship Pages `/api/fellowship-pages`
 - `GET /`
 - `POST /`
 - `GET /:idOrSlug`
 - `PUT /:id`
 - `DELETE /:id`
 - `DELETE /:id/image/:idx`
 
 ### Contact `/api/contact`
 - `GET /`
 - `PUT /`
 - `POST /messages`
 - `GET /messages`
 
 ## Screenshot-Derived UI Requirements

 ### Homepage structure observed from the screenshot
 - Top header with logo on the left, horizontal navigation in the center, and a distinct login/action block on the right.
 - Hero area with a centered ministry/school message, supporting text, and a primary call-to-action section.
 - Prominent callout cards/quick links near the top of the page.
 - A mission/introduction section using a dark content block paired with supporting media.
 - A progress/statistics section presenting multiple numeric metrics in a compact grid.
 - A testimonial or highlight band presented on a contrasting dark background.
 - Multiple stacked promotional/content sections such as Enrol a Group, Online Program, Outcomes, Testimonies, Partner With Us, and Newsletter.
 - A latest-news/newsletter area with image-based cards.
 - Footer with logo, grouped navigation links, login/action entry, and social/contact utility items.

 ### Inner/subpage structure observed from the screenshot
 - Reuse the same top navigation/header system as the homepage.
 - Large dark banner/title strip near the top of the content area.
 - Main content area presented on a light gray background.
 - Content modules rendered as clean white cards/panels with generous spacing.
 - FAQ/accordion-style rows are a strong reference pattern for subpages that present structured text content.
 - Footer uses a dark full-width block with multi-column links and social icons.

 ### Mobile behavior observed from the screenshot
 - Homepage content stacks vertically into a single-column flow.
 - Navigation compresses into a mobile-friendly header treatment.
 - CTA blocks, cards, and media sections become vertically stacked with centered emphasis.
 - Statistic items and content promos must remain legible in narrow widths without overcrowding.
 - Footer remains compact but still exposes essential navigation and quick actions.

 ## Frontend Application Scope
 
 ### 1) Public-Facing Website
 Create a polished public website that consumes CMS-managed content from the backend.
 
 Planned public pages:
 - `Home`
 - `About`
 - `Acts Fellowship International` dropdown pages driven by `fellowshipPages`
 - `Contact`
 
 Public site requirements:
 - Keep white sections where they fit the design.
 - Replace the original blue-heavy color scheme with a different professional palette.
 - Build reusable content sections/components where practical.
 - Render fellowship branch pages dynamically from backend data.
 - Ensure header navigation can expose the dropdown pages from CMS data.
 - Preserve the homepage's long-form landing-page feel with multiple stacked content bands rather than a short minimal layout.
 - Treat the FAQ screenshot as the reference for subpage banner + content-card composition.
 - Include a strong footer with grouped links, branding, and social/action items.

 ### Public page composition guidance
 - `Home` should be assembled from reusable sections that can support: hero, quick-callout cards, mission/introduction, progress metrics, testimonial/highlight block, program/promotional content blocks, newsletter/news cards, and footer CTAs.
 - Fellowship branch pages and other informational subpages should follow the inner-page pattern: consistent header, bold page-title/banner band, light main background, structured white content blocks, and dark footer.
 - Navigation should support both primary links and an expandable dropdown for Acts Fellowship branch pages.

 ### 2) CMS / Admin Interface
 Build an admin area where logged-in admins can manage the front-facing content.
 
 Planned admin pages:
 - `Admin/Login`
 - `Admin/Dashboard`
 - `Admin/EditHome`
 - `Admin/EditAbout`
 - `Admin/ManageFellowshipPages`
 - `Admin/EditContact`
 - `Admin/ManageUsers`
 
 Admin requirements:
 - Login against the backend session auth endpoints.
 - Persist auth/user state through an auth context.
 - Protect admin routes.
 - Provide forms for editing text and uploading/removing Base64-backed images.
 - Support create/update/delete for fellowship branch pages.
 - Allow About section management in a way that matches the backend section model.

 ## Styling & UX Rules
 - Use `styled-components` throughout the frontend.
 - Keep styles separate from page/component logic.
 - Maintain a centralized `Theme.js` and `GlobalStyles.js` pattern.
 - Prefer reusable layout primitives, section wrappers, buttons, cards, and form styles.
 - Keep the visual direction professional, clean, and suitable for an educational / ministry organization.
 - Keep the visual density and section sequencing similar to the screenshots, especially on the homepage.
 - Use clear contrast between dark feature bands and light content areas.
 - Preserve strong spacing, readable typography, and simple card-based grouping on inner pages.
 - Ensure the mobile layout remains intentional rather than merely shrinking desktop sections.

 ## Data Flow / Integration Requirements
 - Frontend should consume the existing backend instead of hardcoding content.
 - Public pages should fetch and render CMS-managed page content.
 - Admin pages should map closely to backend resource boundaries:
   - Home editor ↔ `/api/home`
   - About editor ↔ `/api/about`
   - Fellowship page manager ↔ `/api/fellowship-pages`
   - Contact editor / messages ↔ `/api/contact`
   - Auth/users ↔ `/api/users`
 - Navigation for fellowship branch pages should be data-driven from backend results.
 
 ## Constraints / Risks
 - Firestore document size is limited to **1 MB**.
 - Base64 increases payload size significantly.
 - Multiple image uploads must be managed conservatively.
 - Frontend forms should avoid unnecessary oversized payloads where possible.
 - Backend endpoint verification should happen before or during frontend hookup to avoid debugging UI issues caused by API mismatches.
 
 ## Next Implementation Phases
 
 ### Phase 1: Backend Verification & Frontend Foundation
 - [ ] Verify the existing backend endpoints manually.
 - [ ] Confirm CORS/session behavior works with the frontend origin.
 - [ ] Review the current Acts Fellowship frontend scaffold and dependencies.
 - [ ] Set up frontend folder structure to mirror `firebasecmstest/frontend`.
 - [ ] Establish `ThemeProvider`, `GlobalStyles`, layout shells, auth context, and API utility layer.
 
 ### Phase 2: Public Website Shell
 - [ ] Build `MainLayout` with header, footer, and data-driven navigation.
 - [ ] Create the public route tree.
 - [ ] Recreate the screenshot-inspired homepage section order and overall content rhythm.
 - [ ] Recreate the screenshot-inspired inner-page pattern for informational pages and branch pages.
 - [ ] Implement the Home page using backend content.
 - [ ] Implement the About page using backend content and sections.
 - [ ] Implement fellowship branch detail pages driven by slug.
 - [ ] Implement the Contact page and public contact form behavior.
 
 ### Phase 3: CMS / Admin Shell
 - [ ] Implement admin login flow.
 - [ ] Protect admin routes using auth context.
 - [ ] Build `AdminLayout` and dashboard.
 - [ ] Add shared admin form patterns for loading/error/success states.
 
 ### Phase 4: CMS Content Editors
 - [ ] Implement Home editor.
 - [ ] Implement About editor with section management.
 - [ ] Implement Fellowship Pages manager.
 - [ ] Implement Contact editor and messages view.
 - [ ] Implement Users manager.
 
 ### Phase 5: Polish, QA, and Delivery
 - [ ] Refine responsive behavior to match screenshot structure across screen sizes.
 - [ ] Validate all CRUD flows end to end.
 - [ ] Check image upload/remove flows carefully.
 - [ ] Review color palette consistency and typography.
 - [ ] Prepare final cleanup and deployment readiness review.
 
 ## Immediate Next Build Priority
 1. Verify the backend endpoints and service account setup.
 2. Review the current Acts Fellowship frontend scaffold and installed dependencies.
 3. Recreate the `firebasecmstest/frontend` architecture pattern in the Acts Fellowship frontend.
 4. Build the public website first, then wire the CMS/admin editing interface.
