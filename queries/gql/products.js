const gql = require('graphql-tag');
const client = require('../../config/graphql');

exports.getAllProducts = async () => {
    try {
        const query = gql`
            query {
                products {
                    id
                    sku
                    name
                    description
                    price
                    stock
                }
            }
        `;

        const result = await client.query({
            query
        });

        return result.data.products;
    } catch (error) {
        throw error;
    }
};

exports.createProduct = async ({
    sku,
    name, 
    description,
    price,
    stock
}) => {
    try {
        const mutation = gql`
                mutation(
                    $sku: String!,
                    $name: String!,
                    $description: String,
                    $price: numeric!,
                    $stock: Int!
                ) {
                    insert_products(objects: {
                        sku: $sku,
                        name: $name,
                        description: $description,
                        price: $price,
                        stock: $stock
                    }) {
                        returning {
                            id
                            sku
                            name
                            description
                            price
                            stock
                        }
                    }
                }
            `;

        const result = await client.mutate({
            mutation,
            variables: {    
                sku,
                name, 
                description,
                price,
                stock
            }
        });

        return result.data.insert_products.returning[0];
    } catch (error) {
        throw error;
    }
};