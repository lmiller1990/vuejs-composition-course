0. Introduction and Overview of Template

1.1 Creating the Timeline component

- Render a basic component with three tabs
- Define the TimePeriod type

1.2 Our first test

Test that the three tabs are rendered with data-test

1.3 Reactive updates using ref

Use ref and setActiveTab to update the active tab

1.4 Testing the Active Tab Feature

Test the active tab feature, and delete the previous tests

1.5 Getting Started with TDD

Create mocks.ts and the Post interface. Write a failing test.

1.6 Decoupling Business Logic from UI Logic

Write a utility method to filter the post, apply it with computed.

1.7 Refactoring with Confidence 

Creating a TimelineItem component, run the tests.

2.0 Load States With Suspense

Make Timeline's setup async and create the Progress component.

2.1 An (un) Suspenseful Test

Test the three different states of the Timeline component.

2.2 Data Structures an Designin a Flux Store

Design the interface for the Flux store.

2.3 Updating the Store's State

Implement getState and fetchPosts using mockPost

2.4 Fetching Data with the Axios HTTP Client

Use axios to fetch data and discuss axios.mock

2.5 Bringing it together with useStore in the Timeline

Use the store in the Timeline component. Mock out axios in `main.ts`

2.6 Mocking modules with jest.mock