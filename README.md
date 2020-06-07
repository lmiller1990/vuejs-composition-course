+----------------------------------+
| Authentication and Authorization |
+----------------------------------+

Authentication -> Can you access the system?
  - sign in, sign up, sign out
Authorization -> What you can do once you access the system

- Front-end only
  - Change the Navbar depending when authenticated
  - Router guards:
    - /posts/new (authenticated users)
    - /posts/4/edit (authorized users)

- Authentication/Authorization will depend on your application and use case
- BIG and IMPORTANT topic. Topic for a future course?
  - Regular bug -> bad user experience
  - Authentication/Authorization bug -> potentially a crime
  - I'll mention some strategies. JWT (JSON Web Token)

- improving the `useModal` to support different modals
- dynamic components
- reactivity optimizations
