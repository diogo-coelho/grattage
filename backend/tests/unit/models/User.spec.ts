import User from "../../../src/app/models/User"

describe("Model User", () => {
    test("should return a valid name when a string is passed through function setName", () => {
        const user = new User();
        user.setName("Usuário Válido");
        expect(user.name).toBe("Usuário Válido");
    })

    test("should return an error when an empty string is passed through function setName", () => {
        const user = new User();   
        expect(() => user.setName("")).toThrow('O nome não pode estar vazio');
    })

    test("should return an error when a string less than 5 characters through passed through function setName", () => {
        const user = new User();   
        expect(() => user.setName("abc")).toThrow('O nome de usuário deve ter entre 5 e 50 caracteres');
    })

    test("should return an error when a string greater than 50 characters is passed through function setName", () => {
        const user = new User();   
        expect(() => user.setName("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")).toThrow('O nome de usuário deve ter entre 5 e 50 caracteres');
    })

    test("should return a valid username when an string is passed through function setUserName", () => {
        const user = new User(); 
        user.setUserName("user.name")  
        expect(user.userName).toBe("user.name")
    })

    test("should return an error when a string less than 3 characters through passed through function setUserName", () => {
        const user = new User();   
        expect(() => user.setUserName("ab")).toThrow('O username deve ter entre 3 e 50 caracteres');
    })

    test("should return an error when a string greater than 50 characters is passed through function setUserName", () => {
        const user = new User();   
        expect(() => user.setUserName("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")).toThrow('O username deve ter entre 3 e 50 caracteres');
    })

    test("should return an error when a string with upper case is passed through function setUserName", () => {
        const user = new User();   
        expect(() => user.setUserName("UserName")).toThrow("O username deve ter apenas letras minúsculas, números, ponto, hífen ou underline");
    })

    test("should return an error when a string with special characters is passed through function setUserName", () => {
        const user = new User();   
        expect(() => user.setUserName("username/\/?!")).toThrow("O username deve ter apenas letras minúsculas, números, ponto, hífen ou underline");
    })

    test("should return a valid email when a string is passed through function setEmail", () => {
        const user = new User(); 
        user.setEmail("email@email.com")  
        expect(user.email).toBe("email@email.com")
    })

    test("should return an error when a invalid email string is passed through function setEmail", () => {
        const user = new User();         
        expect(() => user.setEmail("emailemail.com")).toThrow("E-mail inválido");
    })

    test("should return a valid password hash when a string is passed through function setPassword", async () => {
        const user = new User();
        await user.setPassword("PassW0rd)")           
        await expect(typeof user.password).toBe("string")
    })

    test("should return an error when an invalid password is passed through function setPassword", async () => {
        const user = new User();         
        await expect(user.setPassword("123456")).rejects.toThrow("Senha inválida. A senha precisa ter entre 8 e 10 caracteres, com ao menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial");
    })
})