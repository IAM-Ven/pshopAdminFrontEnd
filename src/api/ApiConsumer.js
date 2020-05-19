
import { endPoints } from './points';

/**
 *  This class is used for consuming the spring rest api
 * 
 */
export default class ApiConsumer 
{
    // Execute a raw get request
    async get( link ) 
    {
        try 
        {
            
            const response = await fetch(link);
            
            return await response.json();
        }catch(err) 
        {
            throw err;
        }
    }

    /**
     * Get all the users
     */
    async loadUsers()
    {
        const resp = await this.get(endPoints.URL+ endPoints.USERS);

        const promises = resp._embedded.users.map(async user => {
            return {
                key: user.username,
                username: user.username,
                password: user.password,
                isActive: user.isActive,
                authority: user.authority,
                userDetail: await this.get(user._links.userDetail.href)
            }
        });

        return await Promise.all(promises);
        
    }

    /**
     * Load a single user
     *
     */
    async loadUser( username ) 
    {
        const resp = await this.get(endPoints.URL + endPoints.USERS + "/" + username);

        const data = {
            username: resp.username,
            password: resp.password,
            isActive: resp.isActive,
            authority: resp.authority,
            userDetail: await this.get(resp._links.userDetail.href)
        }

        return data;
    }

    /**
     * Load an resources based on the from arguemnt
     */
    async loader(from, argument) 
    {
        let data;

        console.log(from);
        

        switch (from) 
        {
            case "users":
                data = await this.loadUser( argument )
                break;
                
        }

        return data;
    }

}
