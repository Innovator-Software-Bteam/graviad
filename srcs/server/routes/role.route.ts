import express from "express";
import {Customer} from "../models/role.model";
import {CustomerMessage} from "../interface/IUser";

export const router = express.Router();

router.get('/customer/:email', async (req, res) => {
    const email = req.params.email;
    try {
        const customer = await Customer.findOne({where: {email: email}});

        if (!customer) {
            return res.status(404).json({message: CustomerMessage.GET_CUSTOMER_FAILED});
        }
        res.json(customer);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error', error: error});
    }
});