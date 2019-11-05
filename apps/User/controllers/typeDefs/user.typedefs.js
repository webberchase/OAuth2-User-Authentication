const { buildSchema } = require('graphql');

const defs = `
    scalar Date
    scalar JSON

    scalar LOGS {
        time: Date
        message: String
    }

    type User {
        id: ID
        accessToken: String
        email: String
        username: String
        firstName: String
        lastName: String
        disabled: Boolean
        accountVerified: Boolean
        dateCreated: Date
        dateModified: Date
        dateLastLoggedIn: Date
        logs: [LOGS]
    }

    type Query {
        getUsers: [User!]!
        getUserById(id: ID!): User
        getUserByAccessToken(accessToken: String!): User
        getUserByUsername(username: String!): User
        getUserByEmail(email: String!): User
    }

    type Mutation {
        createUser(accessToken: String!): User
        deleteUser(id: ID!): User
        updateUser(id: ID!, updateVariable: String!, updateValue: String!): User
    }
`;

module.exports.userTypedefs = buildSchema(`${defs}`);
