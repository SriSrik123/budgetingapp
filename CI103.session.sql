-- Budgeting App Database --

drop table if exists income, expenses, categories, users;

create table users(
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(25) NOT NULL,
    last_name VARCHAR(25) NOT NULL,
    user_name VARCHAR(35) NOT NULL UNIQUE,
    email VARCHAR(35) NOT NULL UNIQUE,
    pass_code VARCHAR(100) NOT NULL
);

create table categories(
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    category_name VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);


create table expenses(
    expense_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    category_id INT,
    expense_amount DECIMAL(5, 2) NOT NULL,
    expense_date DATE NOT NULL,
    expense_info VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

create table income(
    income_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    category_id INT,
    income_amount DECIMAL(5, 2) NOT NULL,
    income_date DATE NOT NULL,
    income_info VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);
