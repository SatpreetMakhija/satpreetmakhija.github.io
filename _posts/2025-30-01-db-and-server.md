---
layout: post
title: "Your Codebase Reeks of Database Coupling; Here’s the Fix"
subtitle: "Decoupling your database from your codebase for flexibility and maintainability."
description: "A guide on how to maintain your codebase for easy database switch"
date: 2025-01-29
categories: [Software Engineering, Databases]
tags: [Go, Database, Software Design, Abstraction]
math: false
comments: true
---


**Ask yourself**: *If I had to change the database in my codebase today, do I know what needs to be done?*

Chances are your palms are sweating, and you won’t be able to sleep tonight from such a horrifying question. If not, you don’t need this post. For others, keep reading to sleep better tonight.

We've all been through the arduous journey of building an application. You choose a database and stick with it. You don’t even question what if I need to change the database and for good reasons. The current database’s limitations reveals itself only when your application has high traffic. There are more reads, more writes, more updates that leads to sharding, indexing and what not. Let’s be honest, most of your applications don’t reach that state, if any. So, why bother?

Good programming practices.

Enough attention is paid to decoupling functions, objects, and classes in codebases, yet databases are often treated as immutable choices. Even if your database never changes, structuring your code to allow for such a change brings clarity and maintainability. Wouldn’t it be reassuring to know that you could switch from MySQL to PostgreSQL with minimal effort?

### The North Star: Abstraction

Our goal is to organize the codebase so that switching databases is not impossible. The key is abstractions, spoiler alert. We’ll walk through an example of the proverbial software, a web app, below and see how to avoid decoupling of database with your codebase.

Your web app has a backend written in Go and a PostgreSQL database. You've created a `users` table and defined a corresponding struct:

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    age INT
);
```

```go
type User struct {
    ID    int
    Name  string
    Email string
    Age   int
}
```

A new feature requires offering discounts to users who've been active for six months. You add a `created_at` field to your database schema but fail to update the Go struct. This schema-struct inconsistency is your first mistake. A mismatch between the database schema and its in-memory representation is a ticking time bomb. The `user` struct is to store the idea of a user in memory. Why would you want an inconsistency between what’s stored in the table versus what’s present in memory? You’re asking for trouble when you do that. 

👉 **Always maintain a consistent mapping between table schemas and corresponding data structures.**

### Introducing Abstractions

You have an HTTP handler called `SignInHandler` whose job is to sign in users when they login for the first time. The `SignInHandler` must create users in the database, but it shouldn't know the specific database being used. To achieve this, introduce two abstractions:

1. **Repository abstraction**: Handles direct database interactions.
2. **Model abstraction**: Bridges business logic with the repository.

#### The Repository Layer

```go
type UserRepo interface {
    CreateUser(user User) error
    GetUserByEmail(email string) (*User, error)
}

// PostgreSQL implementation of UserRepo
type UserRepoPostgres struct {
    db *sql.DB
}

func (r *UserRepoPostgres) CreateUser(user User) error {
    _, err := r.db.Exec("INSERT INTO users (name, email, age) VALUES ($1, $2, $3)", user.Name, user.Email, user.Age)
    return err
}

func (r *UserRepoPostgres) GetUserByEmail(email string) (*User, error) {
    var user User
    err := r.db.QueryRow("SELECT id, name, email, age FROM users WHERE email=$1", email).
        Scan(&user.ID, &user.Name, &user.Email, &user.Age)
    if err != nil {
        return nil, err
    }
    return &user, nil
}
```

The interface ensures flexibility—you can replace the database implementation without affecting consumers of `UserRepo`.

#### The Model Layer

```go
type UserModel struct {
    repo UserRepo
}

func (m *UserModel) CreateUser(user User) error {
    if user.Age < 18 {
        return errors.New("user must be an adult")
    }
    return m.repo.CreateUser(user)
}
```

At first, this may seem redundant—why have `CreateUser` in both repository and model layers? But here’s a golden rule:

👉 **Only models should interact with repositories—no other part of the codebase should invoke repositories directly.**

This boundary ensures:
- The repository layer only handles database interactions.
- The model layer orchestrates business logic before invoking the repository.
- Handlers (like `SignInHandler`) remain oblivious to the database implementation.

You should note that the way we have setup the abstractions interaction, the `SignInHandler` knows only of the user model and user model knows only of the repository interface.

### Switching Databases

Returning to our original question: *Where exactly do we need to make changes to switch databases?* Let's say we'll move from Postgres to MySQL. To do so, we do the following:

1. Implement a new struct, `UserRepoMySQL`, that adheres to `UserRepo`.
2. Use `UserRepoMySQL` instead of `UserRepoPostgres` when instantiating `UserModel`.
3. Everything else—business logic, handlers, logging—remains unchanged.

This structured approach ensures that **only the repository layer changes** during a database migration. There is a trade-off here. As your app codebase increases, you’ll have many repository interfaces and when you perform a database switch, you will have to reimplement these interfaces from scratch. That’s a lot of work. But, your business logic won’t need reimplementation as that stays in the model layer only. All other abstractions such as http handlers, loggers, etc too remain as is. That’s a trade-off worth the repository interface reimplementation.

👉 **Software doesn’t become cumbersome when there’s a lot to do—it becomes cumbersome when you can’t pinpoint *where* things need to change.**

Note, An actual database migration involves handling downtime, data transfer, and phased rollouts. But if your codebase follows these principles, switching databases becomes feasible at least from the codebase point of view.

### FAQs

**Why not just merge repositories and models?**

Business logic often extends beyond database operations. For example, if you need to trigger an ETL job when fetching high-spending users, this logic belongs in the model, not the repository. Keeping them separate prevents unnecessary complexity in database interactions.

**I won’t change my database type. Should I care?**

Yes! Even if your database remains unchanged, separating business logic from database interactions improves maintainability. Your codebase becomes easier to extend and debug.

**What if data types differ between databases (e.g., MySQL vs. PostgreSQL)?**

Rather than changing the core application logic, use helper functions to transform data types at the repository level. This keeps the rest of your application agnostic to database-specific differences.

