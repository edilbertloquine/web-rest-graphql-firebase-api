const gql = require('graphql-tag');
const client = require('../../config/graphql');

exports.getCustomerDetail = async ({ firebaseId }) => {
    try {
        const query = gql`
            query ($firebaseId: String!) {
                customers (where: {
                    firebase_id: {
                        _eq: $firebaseId
                    }
                }) {
                    id
                    firebase_id
                    display_name
                    phone_number
                    created_at
                }
            }
        `;

        const result = await client.query({
            query,
            variables: {
                firebaseId
            }
        });

        return result.data.customers[0];
    } catch (error) {
        throw error;
    }
};

exports.createCustomer = async ({ 
    firebaseId,
    displayName,
    phoneNumber
}) => {
    try {
        const mutation = gql`
                mutation(
                    $firebaseId: String!,
                    $displayName: String!,
                    $phoneNumber: String!
                ) {
                    insert_customers(objects: {
                        firebase_id: $firebaseId,
                        display_name: $displayName,
                        phone_number: $phoneNumber
                    }) {
                        returning {
                            id
                            firebase_id
                            display_name
                            phone_number
                            created_at
                        }
                    }
                }
            `;

        const result = await client.mutate({
            mutation,
            variables: {
                firebaseId,
                displayName,
                phoneNumber
            }
        });

        return result.data.insert_customers.returning[0];
    } catch (error) {
        throw error;
    }
};

exports.updateCustomer = async ({ 
    id,
    displayName,
    phoneNumber,
}) => {
    try {
        const mutation = gql`
                mutation(
                    $id: Int!,
                    $displayName: String!,
                    $phoneNumber: String!
                ) {
                    update_customers(where: {
                        id: {
                            _eq: $id
                        }
                    },
                    _set: {
                        display_name: $displayName,
                        phone_number: $phoneNumber
                    }) {
                        affected_rows
                    }
                }
            `;

        const result = await client.mutate({
            mutation,
            variables: {
                id,
                displayName,
                phoneNumber
            }
        });

        return result;
    } catch (error) {
        throw error;
    }
};
