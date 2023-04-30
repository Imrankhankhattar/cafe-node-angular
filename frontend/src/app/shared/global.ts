export class GlobalConstants{
    public static genericError:string = 'Something went wrong. Please try again later.'
    public static nameRegex:string  = '[a-zA-Z ]*'
    public static emailRegex:string  = '[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}'
    public static contactRegex:string  = '^[e0-9]{10,10}$'
    public static passwordRegex:string  = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])'
    public static error:string = 'error'
}

