type ResponseRaw<T> = {
    data?:T;
    error?:string,
    message?:string,
    statusCode?:number
}