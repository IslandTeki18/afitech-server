import Employee from "../models/employee.model.js";

//@desc     Get all emoloyees
//@route    GET /api/employees/
//@access   Public
const getAllEmployees = async (req, res, next) => {
    try {
        const employees = await Employee.find({});
        if (!employees) return res.status(404).send("EMployees not found.");
        res.json(employees);
    } catch (error) {
        res.status(500);
        return next(error);
    }
};

//@desc     Get single emoloyees
//@route    GET /api/employees/:id
//@access   Public

const getSingleEmployee = async (req, res, next) => {
    try {
        const employee = await Employee.findById({ _id: req.params.id });
        if (!employee) return res.status(404).send("Employee not found.");
        res.status(200).json(emloyee);
    } catch (error) {
        res.status(500);
        return next(error);
    }
};

//@desc     Create employee
//@route    POST /api/employees/
//@access   Private
const createEmployee = async (req, res, next) => {
    try {
        const newEmployee = new Employee({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            email: req.body.email,
            image: req.body.image,
            position: req.body.position,
            aboutEmployee: req.body.aboutEmployee,
        });
        await newEmployee.save();
        res.status(200).json(newEmployee);
    } catch (error) {
        res.status(500);
        return next(error);
    }
};

//@desc     Update an employee
//@route    PUT /api/employees/:id/update
//@access   Private
const updateAnEmployee = async (req, res, next) => {
    try {
        const employee = await Employee.findById({ _id: req.params.id });
        if (!employee) return res.status(404).send("Employee not found.");
        if (employee) {
            employee.firstName = employee.firstName || req.body.firstName;
            employee.lastName = employee.lastName || req.body.lastName;
            employee.phone = employee.phone || req.body.phone;
            employee.email = employee.email || req.body.email;
            employee.image = employee.image || req.body.image;
            employee.position = employee.position || req.body.position;
            employee.isActive = employee.isActive || req.body.isActive;
            employee.aboutEmployee =
                employee.aboutEmployee || req.body.aboutEmployee;
        }
        const newEmployee = await employee.save();
        res.status(200).json(newEmployee);
    } catch (error) {
        res.status(500);
        return next(error);
    }
};

//@desc     Remove an employee
//@route    DELETE /api/employees/:id/remove
//@access   Private
const removeEmployee = async (req, res, next) => {
    try {
        const employee = await Employee.findById({ _id: req.params.id });
        if (!employee) return res.status(404).send("Employee not found.");
        await employee.remove();
        res.send("Employee Removed!");
    } catch (error) {
        res.status(500);
        return next(error);
    }
};

export {
    getAllEmployees,
    getSingleEmployee,
    updateAnEmployee,
    createEmployee,
    removeEmployee
}