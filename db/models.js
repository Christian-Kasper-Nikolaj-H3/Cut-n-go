import sequelize from './database.js';
import Orders from "./models/Orders.js";
import UserRoles from "./models/UserRoles.js";
import Users from "./models/Users.js";
import EmployeeRoles from "./models/EmployeeRoles.js";
import Employees from "./models/Employee.js";
import Salon from "./models/Salon.js";

export default {
    sequelize,
    Orders,
    UserRoles,
    Users,
    EmployeeRoles,
    Employees,
    Salon
};