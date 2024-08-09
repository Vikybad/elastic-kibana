const jwt = require('jsonwebtoken')


// Secret key for signing the token (in a real application, store this securely)
const secretKey = 'my-secret-key';

const createToken = (payload) => {
    return jwt.sign(payload, secretKey, {
        expiresIn: '1m'
    })
}


const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, secretKey, {complete: true})
        return { isValid: true, decoded: decoded }
    } catch (error) {
        return { isValid: false, decoded: null, error: error.message }
    }
}


// // Example usage
// const userPayload = {
//     id: 123,
//     username: 'Vikram Badesara'
// };

// // Create and sign a token
// let token = createToken(userPayload);
// console.log('Created Token:', token);

// // Verify the token
// const verificationResult = verifyToken(token);
// console.log('Verification Result:', verificationResult);



module.exports = {
    createToken,
    verifyToken
}


