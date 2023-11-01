import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import 'dotenv/config'
import { DB } from './dbConnection';

const insertAdmin = async (req?: Request, res?: Response) => {
    try {
        const [adminCheck] = await DB.promise().query(`SELECT * FROM railway.users WHERE role = 'admin'`);
        
        if (Object.keys(adminCheck).length === 0) {
            const adminUsername = process.env.ADMIN_USERNAME;
            const adminEmail = process.env.ADMIN_EMAIL;
            const adminPass = process.env.ADMIN_PASS;
            const hashedPass = await bcrypt.hash(adminPass!, 10);
            
        await DB.promise().query(`INSERT INTO railway.users (username, email, password, role) VALUES ('${adminUsername}','${adminEmail}', '${hashedPass}', 'admin')`)
        console.log("Admin Account successfully created! Welcome!");    

    } else {
        console.log("Reminder: Admin already exists");
        return
    }
    } catch (error) {
        console.error("Errorr!! Can't input Admin data", error);
    }
}


export default insertAdmin;

