const admin = require('../config/firebase')

const getAuthToken = (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        req.authToken = req.headers.authorization.split(' ')[1];
    } else {

        req.authToken = null
    }

    next();
}

exports.admin = (req, res, next) => {
    getAuthToken(req, res, async () => {
        try {
            const { authToken } = req;
            const user = await admin.auth().verifyIdToken(authToken);
            
            if (user.admin !== true) {
                return res
                    .status(401)
                    .send({ error: 'You are not authorized to make this request' });
            }

            req.authId = user.uid;

            return next();
        } catch (error) {
            return res
                .status(401)
                .send({ error: 'You are not authorized to make this request' });
        }
    });
}

exports.auth = (req, res, next) => {
    getAuthToken(req, res, async () => {
        try {
            const { authToken } = req;
            const user = await admin.auth().verifyIdToken(authToken);

            req.authId = user.uid;

            return next();
        } catch (error) {
            return res
                .status(401)
                .send({ error: 'You are not authorized to make this request' });
        }
    });
}
