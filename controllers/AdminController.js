const admin = require('../config/firebase');
const auth = admin.auth();

exports.createAdmin = async (req, res) => {
    try {
        const { 
            email,
            password, 
            display_name: displayName, 
            phone_number: phoneNumber 
        } = req.body;

        const admin = await auth.createUser({
            email, 
            password, 
            displayName, 
            phoneNumber
        });

        await auth.setCustomUserClaims(admin.uid , { admin: true });

        return res.send({
            success: true, 
            admin_id: admin.uid 
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error
        })
    }
};
