CREATE TABLE "Titles" (
    "ID" serial NOT NULL,
    "title_id" VarChar(5) NOT NULL Unique,
    "title" VarChar(50) NOT NULL,
    "last_modified" timestamp default localtimestamp NOT NULL,
    CONSTRAINT "pk_Titles" PRIMARY KEY (
        "ID"
     )
);

CREATE TABLE "Departments" (
    "ID" serial NOT NULL,
    "dept_no" VarChar(5) NOT NULL Unique,
    "dept_name" VarChar(50) NOT NULL,
    "last_modified" timestamp default localtimestamp NOT NULL,
    CONSTRAINT "pk_Departments" PRIMARY KEY (
        "ID"
     )
);

CREATE TABLE "Employees" (
    "ID" serial NOT NULL,
    "emp_no" int NOT NULL Unique,
    "emp_title_id" VarChar(5) NOT NULL,
    "birth_date" date NOT NULL,
    "first_name" VarChar(50) NOT NULL,
    "last_name" VarChar(50) NOT NULL,
    "sex" VarChar(2) NOT NULL,
    "hire_date" date NOT NULL,
    "last_modified" timestamp default localtimestamp NOT NULL,
    CONSTRAINT "pk_Emnployees" PRIMARY KEY (
        "ID"
     )
);

CREATE TABLE "dept_manager" (
    "ID" serial NOT NULL,
    "dept_no" VarChar(5) NOT NULL,
    "emp_no" int NOT NULL,
    "last_modified" timestamp default localtimestamp NOT NULL,
    CONSTRAINT "pk_dept_manager" PRIMARY KEY (
        "ID"
     )
);

CREATE TABLE "Salaries" (
    "ID" serial NOT NULL,
    "emp_no" int NOT NULL,
    "salary" int NOT NULL,
    "last_modified" timestamp default localtimestamp NOT NULL,
    CONSTRAINT "pk_Salaries" PRIMARY KEY (
        "ID"
     )
);

CREATE TABLE "dept_emp" (
    "ID" serial NOT NULL,
    "emp_no" int NOT NULL,
    "dept_no" VarChar(5) NOT NULL,
    "last_modified" timestamp default localtimestamp NOT NULL,
    CONSTRAINT "pk_dept_emp" PRIMARY KEY (
        "ID"
     )
);

ALTER TABLE "Employees" ADD CONSTRAINT "fk_Employees_emp_title_id" FOREIGN KEY("emp_title_id")
REFERENCES "Titles" ("title_id");

ALTER TABLE "dept_manager" ADD CONSTRAINT "fk_dept_manager_dept_no" FOREIGN KEY("dept_no")
REFERENCES "Departments" ("dept_no");

ALTER TABLE "dept_manager" ADD CONSTRAINT "fk_dept_manager_emp_no" FOREIGN KEY("emp_no")
REFERENCES "Employees" ("emp_no");

ALTER TABLE "Salaries" ADD CONSTRAINT "fk_Salaries_emp_no" FOREIGN KEY("emp_no")
REFERENCES "Employees" ("emp_no");

ALTER TABLE "dept_emp" ADD CONSTRAINT "fk_dept_emp_emp_no" FOREIGN KEY("emp_no")
REFERENCES "Employees" ("emp_no");

ALTER TABLE "dept_emp" ADD CONSTRAINT "fk_dept_emp_dept_no" FOREIGN KEY("dept_no")
REFERENCES "Departments" ("dept_no");
