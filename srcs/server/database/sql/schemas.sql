CREATE TABLE IF NOT EXISTS accounts
(
    account_id SERIAL PRIMARY KEY,
    email      VARCHAR(255) NOT NULL,
    password   VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (email),
    CHECK (email <> '')
);
CREATE TABLE IF NOT EXISTS roles
(
    role_id SERIAL PRIMARY KEY,
    name    VARCHAR(255) NOT NULL,
    UNIQUE (name),
    CHECK (name <> '')
);
CREATE TABLE IF NOT EXISTS customers
(
    customer_id SERIAL PRIMARY KEY,
    account_id  SERIAL       NOT NULL,
    name        VARCHAR(255) NOT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES accounts (account_id)
);
CREATE TABLE IF NOT EXISTS customer_has_roles
(
    customer_id SERIAL NOT NULL,
    role_id     SERIAL NOT NULL,
    PRIMARY KEY (customer_id, role_id),
    FOREIGN KEY (customer_id) REFERENCES customers (customer_id),
    FOREIGN KEY (role_id) REFERENCES roles (role_id)
);
CREATE TABLE IF NOT EXISTS customer_authentications
(
    customer_id SERIAL NOT NULL,
    account_id  SERIAL NOT NULL,
    provider_id SERIAL NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers (customer_id),
    FOREIGN KEY (account_id) REFERENCES accounts (account_id),
    FOREIGN KEY (provider_id) REFERENCES providers (provider_id)
);

CREATE TABLE IF NOT EXISTS providers
(
    provider_id SERIAL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL
)