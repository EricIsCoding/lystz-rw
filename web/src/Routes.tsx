// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

import { useAuth } from './auth'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Set wrap={ScaffoldLayout} title="Users" titleTo="users" buttonLabel="New User" buttonTo="newUser">
        <Route path="/users/new" page={UserNewUserPage} name="newUser" />
        <Route path="/users/{id:Int}/edit" page={UserEditUserPage} name="editUser" />
        <Route path="/users/{id:Int}" page={UserUserPage} name="user" />
        <Route path="/users" page={UserUsersPage} name="users" />
      </Set>
      <Set wrap={ScaffoldLayout} title="TodoItems" titleTo="todoItems" buttonLabel="New TodoItem" buttonTo="newTodoItem">
        <Route path="/todo-items/new" page={TodoItemNewTodoItemPage} name="newTodoItem" />
        <Route path="/todo-items/{id:Int}/edit" page={TodoItemEditTodoItemPage} name="editTodoItem" />
        <Route path="/todo-items/{id:Int}" page={TodoItemTodoItemPage} name="todoItem" />
        <Route path="/todo-items" page={TodoItemTodoItemsPage} name="todoItems" />
      </Set>
      <Set wrap={ScaffoldLayout} title="TodoLists" titleTo="todoLists" buttonLabel="New TodoList" buttonTo="newTodoList">
        <Route path="/todo-lists/new" page={TodoListNewTodoListPage} name="newTodoList" />
        <Route path="/todo-lists/{id:Int}/edit" page={TodoListEditTodoListPage} name="editTodoList" />
        <Route path="/todo-lists/{id:Int}" page={TodoListTodoListPage} name="todoList" />
        <Route path="/todo-lists" page={TodoListTodoListsPage} name="todoLists" />
      </Set>
      <Route path="/" page={HomePage} name="home" />
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
