# Phone Book Project

## Description

This project is developed with TypeScript, Next.js 12 (Create Next App), and Next-PWA for main frontend framework. GraphQL Apollo Client and GraphQL Codegen for GraphQL backend client integration. CSS-in-JS Emotion for styling. Jest & React Testing Library for unit testing. And additional libraries such as React Hook Form, React Hot Toast, and Headless UI for supplementary.

Available features:

- **Contact list**, view favorite contacts on top and pagination for regular contacts with 10 initial displayed in ascending order. Pure pagination (page 1 until end) is implemented on regular contacts query with param offset and limit within a context. Contact list queries make use of Apollo Client caching system after the first load and attempt to optimize the call as few as possible. For data persistence, favorite ids are stored in localStorage (client-based because no fav attribute from backend), and pagination state is stored in sessionStorage for better user experience. Unfortunately initial SSR configuration for better SEO is not yet working.
- **Add/remove contact to favorite**, by clicking star icon on a contact to add or remove favorite and receive toast feedback. List query will then forcefully refetch to maintain pagination consistency in every interaction. Favorite and regular contacts are queried by its boolean value in FAV map object localStorage. Room for improvement for displaying favorite contact list by local state management or setting a more complicated caching configuration as it is fully on client-side so no refetch needed (assuming favorite contact list is not paginated).
- **Delete contact**, by clicking on garbage icon on a contact, instantly mutate delete the contact, receive toast feedback, and refetch current page contact list to keep pagination consistency.
- **Search contact**, by using the search text input at the top. When entered it will run the same query as get favorite and regular contact list, with another parameter string of searched word to compare to contacts' first and last name. Contacts with the searched term present on its name is displayed with the same pagaination system, also this search state also persists on sessionStorage.
- **Add new contact**, using button from main page onto a simple form page. Filling first name, last name, and phone number with additional addable phone number field(s). Validation required and some additional configuration such as limited to type phone number only, non-special character name, min-max length, and name uniqueness checking by querying to GraphQL server on submit. When error stay in form page and displayed error feedback, when success redirect to main contact list page.
- **Edit contact**, clicking on a contact card opens a modal with form to edit contact's name. Added simple validation and unique name checking from querying to GraphQL server on submit.

Run development with:

```bash
# generate graphql-codegen
npm run gen

# run server
npm run dev

# run test
npm run test
```

## Additional Info

- App is downloadable from browser as a working simple PWA and its configured manifest. Could possibly be built to an actual mobile app, better with more improved offline handling configuration, connecting to a specific mobile API, etc. for more native capability.
- Next.js 12 is used because of more familiarity in working especially with Apollo Client than the new Next.js 13 integration, also more opportunity to optimize more easily for future commercial use such as SEO, SSR/ISR/SSG feature, static handling, lazy/dynamic loading.
- Tests include unit testing apollo client hook, displayed component, form handling, with data, component, or necessary function mocking. Although some utility functions, components, and functional/integration testing between different components and more realistic user interaction are still open to improvement.
- Development is with UI/UX considered but with limited capability. Most noticable room for improvement could be on the form layout. However app is responsive to be used on mobile first and also quite pleasant on desktop.

## Deployment

Deployed on http://phone-book-antoniusanggito.vercel.app/
