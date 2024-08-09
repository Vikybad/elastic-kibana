// Import necessary modules
const chai = require('chai');
const { expect } = chai;
const jwt = require('jsonwebtoken');
const { createToken, verifyToken } = require('../jwt');

// Secret key for testing (should match the one used in jwtUtils)
const secretKey = 'my-secret-key';

// Test suite for JWT utility functions
describe('JWT Utility Functions', function() {

    describe('createToken', function() {
        it('should create a valid JWT token', function() {
            const payload = {
                id: 123,
                username: 'testuser'
            };

            const token = createToken(payload);

            // Verify token structure
            expect(token).to.be.a('string');
            expect(token).to.not.be.empty;

            // Verify token can be verified and decoded properly
            const { isValid, decoded } = verifyToken(token);
            expect(isValid).to.be.true;
            expect(decoded.payload.id).to.equal(payload.id);
            expect(decoded.payload.username).to.equal(payload.username);
        });
    });

    describe('verifyToken', function() {
        it('should verify a valid JWT token', function() {
            const payload = {
                id: 456,
                username: 'anotheruser'
            };

            const token = jwt.sign(payload, secretKey, { expiresIn: '1m' });

            const { isValid, decoded } = verifyToken(token);

            expect(isValid).to.be.true;
            expect(decoded.payload.id).to.equal(payload.id);
            expect(decoded.payload.username).to.equal(payload.username);
        });

        it('should handle an invalid JWT token', function() {
            const invalidToken = 'invalid.token.string';

            const { isValid, error } = verifyToken(invalidToken);

            expect(isValid).to.be.false;
            expect(error).to.exist;
        });
    });

});
