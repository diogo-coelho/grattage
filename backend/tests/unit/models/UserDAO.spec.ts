import User from "../../../src/app/models/User"
import UserDAO from "../../../src/app/models/UserDAO"

import { dbConnect, dbDisconnect } from "../../dbHandler.utils"
import { fakeUserData } from "../../fakeData.database"

beforeAll(async () => dbConnect())
afterAll(async () => dbDisconnect())

describe("UserDAO Model", () => {
    test("deve criar um usuário no banco de dados", async () => {
        const userDAO = new UserDAO()
        
        const user = new User()
        user.setName(fakeUserData._name)
        user.setUserName(fakeUserData._username)
        user.setEmail(fakeUserData._email)
        await user.setPassword(fakeUserData._password)

        const savedUser = await userDAO.model.create({
            ...user, 
            created_at: new Date(),
            updated_at: new Date()
        })

        expect(savedUser).toBeTruthy();
        expect(savedUser._name).toBe("Usuário novo")
        expect(savedUser._email).toBe("email@teste.com")
        expect(savedUser._username).toBe("usuario.novo")
    })
})

