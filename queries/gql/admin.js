const gql = require('graphql-tag');
const client = require('../../config/graphql');

exports.createAdmin = async ({ 
    firebaseId,
    displayName,
    phoneNumber
}) => {
    try {
        const mutation = gql`
                mutation(
                    $firebaseId: String!,
                    $displayName: String!,
                    $phoneNumber: String!,
                    $createdBy: Int!
                ) {
                    insert_administrators(objects: {
                        firebase_id: $firebaseId,
                        display_name: $displayName,
                        phone_number: $phoneNumber
                    }) {
                        returning {
                            id
                            firebase_id
                            display_name
                            phone_number
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

        return result.data.insert_administrators.returning[0];
    } catch (error) {
        throw error;
    }
};
