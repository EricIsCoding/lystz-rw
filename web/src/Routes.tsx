// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { PrivateSet, Set, Router, Route } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

import { useAuth } from './auth'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Set wrap={ScaffoldLayout} title="Stores" titleTo="stores" buttonLabel="New Store" buttonTo="newStore">
        <Route path="/stores/new" page={StoreNewStorePage} name="newStore" />
        <Route path="/stores/{id:Int}/edit" page={StoreEditStorePage} name="editStore" />
        <Route path="/stores/{id:Int}" page={StoreStorePage} name="store" />
        <Route path="/stores" page={StoreStoresPage} name="stores" />
      </Set>
      <PrivateSet unauthenticated="login">
        <Set wrap={ScaffoldLayout} title="Groups" titleTo="groups" buttonLabel="New Group" buttonTo="newGroup">
          <Route path="/groups/new" page={GroupNewGroupPage} name="newGroup" />
          <Route path="/groups/{id:Int}/edit" page={GroupEditGroupPage} name="editGroup" />
          <Route path="/groups/{id:Int}" page={GroupGroupPage} name="group" />
          <Route path="/groups" page={GroupGroupsPage} name="groups" />
        </Set>
        <Set wrap={ScaffoldLayout} title="Users" titleTo="users" buttonLabel="New User" buttonTo="newUser">
          <Route path="/users/new" page={UserNewUserPage} name="newUser" />
          <Route path="/users/{id:Int}/edit" page={UserEditUserPage} name="editUser" />
          <Route path="/users/{id:Int}" page={UserUserPage} name="user" />
          <Route path="/users" page={UserUsersPage} name="users" />
        </Set>
        <Set wrap={ScaffoldLayout} title="Items" titleTo="todoItems" buttonLabel="New Item" buttonTo="newTodoItem">
          <Route path="/todo-items/new" page={TodoItemNewTodoItemPage} name="newTodoItem" />
          <Route path="/todo-items/{id:Int}/edit" page={TodoItemEditTodoItemPage} name="editTodoItem" />
          <Route path="/todo-items/{id:Int}" page={TodoItemTodoItemPage} name="todoItem" />
          <Route path="/todo-items" page={TodoItemTodoItemsPage} name="todoItems" />
        </Set>
        <Set wrap={ScaffoldLayout} title="Lists" titleTo="todoLists" buttonLabel="New List" buttonTo="newTodoList">
          <Route path="/todo-lists/new" page={TodoListNewTodoListPage} name="newTodoList" />
          <Route path="/todo-lists/{id:Int}/edit" page={TodoListEditTodoListPage} name="editTodoList" />
          <Route path="/todo-lists/{id:Int}" page={TodoListTodoListPage} name="todoList" />
          <Route path="/todo-lists" page={TodoListTodoListsPage} name="todoLists" />
        </Set>
        <Set wrap={ScaffoldLayout} title="Home Page" titleTo="home" buttonTo="home">
          <Route path="/" page={HomePage} name="home" />
        </Set>
      </PrivateSet>
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
