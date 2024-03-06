export class CreateUserDto{
    constructor(user){
        this.fullName = `${user.firts_name} ${user.last_name}`;
        this.name = user.firts_name;
        this.lastName = user.last_name;
        this.age = user.age;
        this.email = user.email;
        this.password = user.password;
    }
}

export class GetContactoDTO{
    constructor(userDB){
        this.fullName = userDB.fullName;
        this.telefono = userDB.telefono;
        this.email = userDB.email
    }
}