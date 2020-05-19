
import  EndPoints  from './EndPoints';

/**
 *  This class is used for consuming the spring rest api
 * 
 */
export default class ApiConsumer extends EndPoints
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
        const url = this.getUrlUsers();

        const resp = await this.get(url);

        // Load all the promises in the array
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

        // Wait for all the promises to compleate and then return
        return await Promise.all(promises);
        
    }

    /**
     * Load a single user
     *
     */
    async loadUser( username ) 
    {
        const url = this.getUrlUser( username );
        const resp = await this.get(url);

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


        switch (from) 
        {
            case "users":
                data = {
                    user : await this.loadUser(argument),
                    authorityList: await this.getAuthorityList()
                }
                break;
                
        }

        return data;
    }

    /*
        Get all the authority resources
    */
    async getAuthorityList()
    {
        const url = this.getUrlAuthorities();

        const data = await this.get(url);

        return data._embedded.authorities;



    }

}
