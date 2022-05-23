-- Salaries
Select  
	e.emp_no, e.last_name, e.first_name, e.sex, s.salary
From 
	employees as e 
	Left Join 
		salaries as s on e.emp_no = s.emp_no;

-- Employee start year 1986	
Select
	first_name, last_name, hire_date
From
	employees
Where
	hire_date between '1986-01-01' and '1986-12-31';

-- Employee name Hercules B...	
Select 
	first_name, last_name
From 
	employees
Where 
	first_name = 'Hercules'
	and
	last_name like 'B%';
	
-- Last Name Frequency
Select
	last_name, Count(last_name)
From
	employees
Group By 
	last_name
Order By 
	Count(last_name) desc;
	
-- Managers from each department
Select
	dm.dept_no, d.dept_name, dm.emp_no, e.last_name, e.first_name
From
	dept_manager as dm
	Inner Join
		departments as d on dm.dept_no = d.dept_no
	Inner Join
		employees as e on dm.emp_no = e.emp_no;
		
-- Department of each employee
Select 
	e.emp_no, e.last_name, e.first_name, d.dept_name
From
	employees as e
	Inner Join
		dept_manager as dm on e.emp_no = dm.emp_no
	Inner Join
		departments as d on dm.dept_no = d.dept_no;

-- Employees in Sales
Select 
	e.emp_no, e.last_name, e.first_name, d.dept_name
From
	employees as e
	Inner Join
		dept_emp as de on e.emp_no = de.emp_no
	Inner Join
		departments as d on de.dept_no = d.dept_no
Where 
	dept_name = 'Sales';
	
-- Employees in Sales and Development
Select 
	e.emp_no, e.last_name, e.first_name, d.dept_name
From
	employees as e
	Inner Join
		dept_emp as de on e.emp_no = de.emp_no
	Inner Join
		departments as d on de.dept_no = d.dept_no
Where 
	d.dept_name in ('Sales', 'Development');