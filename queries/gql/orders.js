const gql = require('graphql-tag');
const client = require('../../config/graphql');

exports.createOrder = async ({
    productId,
    customerId, 
    quantity,
    status
}) => {
    try {
        const mutation = gql`
                mutation(
                    $productId: Int!,
                    $customerId: Int!,
                    $quantity: Int!,
                    $status: String!
                ) {
                    insert_orders(objects: {
                        product_id: $productId,
                        customer_id: $customerId,
                        quantity: $quantity,
                        status: $status
                    }) {
                        returning {
                            id
                            product_id
                            customer_id
                            quantity
                            status
                        }
                    }
                }
            `;

        const result = await client.mutate({
            mutation,
            variables: {    
                productId,
                customerId, 
                quantity,
                status
            }
        });

        return result.data.insert_orders.returning[0];
    } catch (error) {
        throw error;
    }
};

exports.updateOrder = async ({ id, status }) => {
    try {
        const mutation = gql`
                mutation(
                    $id: Int!,
                    $status: String!
                ) {
                    update_orders(
                        where: {
                            id: {
                                _eq: $id
                            }
                        },
                        _set: {
                            status: $status
                        }
                    ) {
                        affected_rows
                    }
                }
            `;

        const result = await client.mutate({
            mutation,
            variables: {    
                id,
                status
            }
        }); 

        return result.data;
    } catch (error) {
        throw error;
    }
};
