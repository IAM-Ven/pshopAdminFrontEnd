export default class EndPoints
{
   
    constructor() 
    {
        this.URL = "http://localhost:8081";

        /* Resources */
        this.USERS = "/users/";
        this.AUTHORITIES = "/authorities/";
        this.USERDETAILS = "/userDetail/";
    }

    /*
        Getters for the core resources
    */
    getUrl()
    {
        return this.URL;
    }

    getAuthorities() 
    {
        return this.AUTHORITIES;
    }

    getUserDetails() 
    {
        return this.USERDETAILS;
    }

    /* Getters for the most common combinations */

    getUrlUsers()
    {
        return this.URL + this.USERS;
    }

    getUrlUser(argument) 
    {
        return this.URL + this.USERS + argument;
    }

    getUrlAuthorities()
    {
        return this.URL + this.AUTHORITIES;
    }

}