export const validEmail = new RegExp(
    '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
 );

export const validPassword = new RegExp(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,40})\S$/);
//min 6 un chiffre une majuscule une minuscule
export const validPrenom = new RegExp(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,30}$/);
export const validNom = new RegExp(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,30}$/);
export const validUsername = new RegExp(/^[A-Za-z0-9_-]{3,16}$/);