import axios from "axios";

let usersUrl = "https://api.github.com/users";

export async function getUsers() {
    try {
        const response = await axios.get(usersUrl);
        const users = response.data;

        // fetch detailed information for each user
        const userDetailsPromises = users.map(user => axios.get(`https://api.github.com/users/${user.login}`));

        const userDetailsResponses = await Promise.all(userDetailsPromises);

        // extract relevant information from the detailed responses
        const enrichedUsers = userDetailsResponses.map(userDetail => {
            const { id, login, avatar_url, twitter_username, name, company } = userDetail.data;
            return {
                id,
                login,
                avatar_url,
                username: login,
                firstName: name ? name.split(' ')[0] : '',
                lastName: name ? name.split(' ')[1] : '',
                twitter_username,
                company,
            };
        });

        return enrichedUsers;
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
}

export async function getUserDetails(user) {
    try {
        const response = await axios.get(`https://api.github.com/users/${user}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user details:", error);
        throw error;
    }
}
