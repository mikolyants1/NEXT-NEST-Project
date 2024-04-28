export function response(id:string,isHome:boolean):boolean{
    return isHome ? !Boolean(id) : Boolean(id);
};