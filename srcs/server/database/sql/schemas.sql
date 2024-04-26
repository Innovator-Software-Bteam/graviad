/*
===============================================================================
DATABASE INFORMATION
===============================================================================
- Description: This is a simple database schema for a user management system of Graviad Project.
- Created by: Hoang Duc Bach
- Creation Date: 2021-04-16
- Version: 1.1.0
- Last updated: 2021-04-16

===============================================================================
CODE TAGS
===============================================================================
- @TODO: Used to mark the tasks that need to be done.
- @NOTE: Used to mark important notes.
- @FIXME: Used to mark bugs that need to be fixed.
- @OPTIMIZE: Used to mark code that needs to be optimized.
- @HACK: Used to mark code that is a hack and needs to be refactored.
- @REVIEW: Used to mark code that needs to be reviewed.

Note: This is a simple database schema for a user management system of Graviad Project.
*/

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE users
(
    id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(255),
    last_name  VARCHAR(255),
    username   VARCHAR(255)             NOT NULL UNIQUE,
    email      VARCHAR(255)             NOT NULL UNIQUE,
    password   VARCHAR(255)             NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL
);

/*
 @OPTIMIZE: Remove not null constraint for last_name and first_name.
 - Date: 2021-04-16
 - Reason: The first name and last name can be null.
 - Author: Hoang Duc Bach
 */
CREATE TABLE roles
(
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(255)             NOT NULL,
    description TEXT,
    created_at  TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at  TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE permissions
(
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(255)             NOT NULL,
    description TEXT,
    created_at  TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at  TIMESTAMP WITH TIME ZONE NOT NULL
);

