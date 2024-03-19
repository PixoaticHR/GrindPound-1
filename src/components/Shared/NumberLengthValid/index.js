export const isNumber=(number,length)=>{
const regex = /[^0-9]/g;
const valid=number?.length !== length || regex?.test(number)
    return (!valid);
}