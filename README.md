- Created by Alvaro S. P. S. @alvarosps


- To run:
`docker-compose up -d`

- Database creation:
Open a terminal and enter the postgres database
`psql -U postgres -d products_db`

Then, you can create the tables:

```
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    is_published BOOLEAN DEFAULT TRUE,
    published_at TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'UTC')
);
```

```
CREATE TABLE product_versions (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL REFERENCES products(id),
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'UTC'),
    is_published BOOLEAN DEFAULT FALSE
);
```

- Running the application:
`npm run dev`