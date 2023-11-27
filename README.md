# Project Name
Kampus

<br>

# Quick Compo
Campus App to welcome new students and help them better manage the campus live (task management, summaries/notes from classes, reach out to relevant people and staff members, control working/studying time). 

<br>

## Description

The app will be used by new students to know the campus and have the tools they need to keep themselves organized, up to date and in contact will all the important parties. 

Staff will have an account that allows them to see their students, add new students, edit them and/or delete them. On the other hand, students will be given the access to the platform when they become a student and will have access to a virtual campus tour, a task management tool, a notepad to take notes and save summaries from classes, a pommodoro timer to help them take the necessary breaks and take the most out of the courses, have access to all the staff, their responsibilities and contacts and also be able to connect with alumnis for tips, recommendations and/or networking.


## User Stories

-  **404:** As a user I get to see a 404 page with a feedback message if I try to reach a page that does not exist so that I know it's my fault.
-  **Login:** As a user I can login to the platform so that I can access my profile and start creating and managing tournaments.
-  **Logout:** As a logged in user I can logout from the platform so no one else can use it.
-  **Profile Page**: As a logged in user I can visit my profile page so that I can access the edit page and see the list of tournaments I have created.
-  **Add Student:** As a staff user I can add students
-  **Edit Student:** As a staff user I can edit students
-  **Delete Student:** As a staff user I can delete students
-  **Add Tasks:** As a logged in user I can add tasks to the todo list
-  **Edit Tasks:** As a logged in user I can edit tasks in the todo list
-  **Delete Tasks:** As a logged in user I can delete tasks from the todo list
-  **Add Notes:** As a user I can add notes to the notepad.
-  **Edit Notes:** As a logged in user I can edit notes in the notepad
-  **Delete Notes:** As a logged in user I can delete notes from the notepad


## Backlog

- Create login page
- Create dashboard for students 
- Create dashboard for staff 
- Add todo list (students dashboard)
- Add Pommodoro timer/system (students dashboard)
- Add a notepad (students dashboard)
- Add student profile edit page (students)
- Add list of students w/CRUD (staff dashboard)


<br>

## Extra features

- Add Virtual Campus Tour
- Add community page to network and reach out with alumnis (students)
- Add list of staff's contact (students dashboard)

<br>

# Client / Frontend

## React Router Routes (React App)

| Path                         | Component            | Permissions                | Behavior                                                  |
| ---------------------------- | -------------------- | -------------------------- | --------------------------------------------------------- |
| `/`                          | LandingPage          | public `<Route>`           | Landing Page navigates to login Page                      |
| `/login`                     | LoginPage            | anon only `<AnonRoute>`    | Login form, navigates to home page after login.           |
| `/dashboard/:userId`         | DashboardPage        | user only `<PrivateRoute>` | Dashboard: students | staff                               |
| `/user-profile/edit`         | ProfilePage          | user only `<PrivateRoute>` | Edit user profile form.                                   |


| `/tour`                      | VirtualTourPage      | user only `<PrivateRoute>` | Meet the campus through a gamification experience         |
| `/community/:userId`         | CommunityPage        | user only `<PrivateRoute>` | Meet & talk with alumni                                   |
| `/campus-contacts/:userId`   | CampusContactsPage   | user only `<PrivateRoute>` | Students get access to staff responsibilities & contacts  |


## Components

Pages:
- LandingPage

- LoginPage

- DashboardPage

- ProfilePage

- VirtualTourPage

- CommunityPage

- CampusContactsPage


Components:

- Navbar
- Pommodoro timer


## Services

- **Auth Service**

  - `authService` :
    - `.login(user)`
    - `.logout()`
    - `.validate()`

- **User Service**

  - `userService` :
    - `.updateCurrentUser(id, userData)`
    - `.getCurrentUser()`
    - `.deleteUser(id)`
    - `.putUser(id)`

- **Task service**

  - `taskService` :
    - `.addTask(taskData)`
    - `.getTasks()`
    - `.putTask(id)`
    - `.deleteTask(id)`


- **Note service**

  - `noteService` :
    - `.addNote(noteData)`
    - `.getNote()`
    - `.putNote(id)`
    - `.deleteNote(id)`

<br>


# Server / Backend


## Models

**User model**

```javascript
{
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  cohort: {type: String, required: true},
  campus: {type: String, reqired: true},
	manager: { type: Schema.Types.ObjectId, ref:'Manager' },
  teacher: [ { type: Schema.Types.ObjectId, ref:'teacher' } ]
}
```

**Task model**

```javascript
 {
   title: { type: String, required: true },
   body: { type: String, required: true },
   deadline: { type: Date, required: true },
   status: { type: Boolean, required: true },
   student: [ { type: Schema.Types.ObjectId, ref:'Student' } ],
 }
```

**Note model**

```javascript
{
  title: { type: String, required: true },
  body: { type: String, required: true },
  student: [ { type: Schema.Types.ObjectId, ref:'Student' } ],
}
```

<br>


## API Endpoints (backend routes)

| HTTP Method | URL                    | Request Body                 | Success status | Error Status | Description                           |
| ----------- | ---------------------- | ---------------------------- | -------------- | ------------ | ------------------------------------- |
| GET         | `/auth/profile    `    | Saved session                | 200            | 404          | user is logged in? return             |
| POST        | `/auth/signup`         | {name, email, password}      | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`          | {username, password}         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST        | `/auth/logout`         |                              | 204            | 400          | Logs out the user                     |
| GET         | `/api/tasks`           |                              |                | 400          | Show all tasks                        |
| GET         | `/api/task/:id`        |                              |                |              | Show specific task                    |
| POST        | `/api/task`            |{ name, body, deadline, status, student }| 201 | 400          | Create and save a new task            |
| PUT         | `/api/task/:id`        |{ name, body, deadline, status, student }200   | 400          | edit task                             |
| DELETE      | `/api/task/:id`        |                              | 201            | 400          | delete task                           |
| GET         | `/api/notes`           |                              |                |              | Show all note                         |
| GET         | `/api/note/:id`        |                              |                |              | Show specific note                    |
| POST        | `/api/note`            | { name, img, tournamentId }  | 200            | 404          | add note                              |
| PUT         | `/api/note/:id`        | { name, img }                | 201            | 400          | edit note                             |
| DELETE      | `/api/note/:id`        |                              | 200            | 400          | delete note                           |

<br>

## API's

<br>

## Packages

<br>


## Links

### Trello/Kanban

https://trello.com/b/AUa8OKmT/project-3-ironhack


### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/screeeen/project-client)

[Server repository Link](https://github.com/screeeen/project-server)

[Deployed App Link](http://heroku.com)


### Slides

[Slides Link](http://slides.com) - The url to your *public* presentation slides

### Contributors

FirstName LastName - <github-username> - <linkedin-profile-link>

FirstName LastName - <github-username> - <linkedin-profile-link>