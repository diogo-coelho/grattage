import { dbDisconnect } from "../../dbHandler.utils"
import request from "supertest"
import Server from "../../../src/config/Server"

let server = Promise.resolve(new Server().server)
let listenServer: any;

beforeAll(async () => {
    listenServer = (await server).listen(3000)
})
afterAll(async () => dbDisconnect())

describe("AuthorizationController", () => {
    test("deve criar um usuário no banco de dados", async () => {
        const response = await request(listenServer).post('/api/v1/authentication/create').send({
            name: "Usuário novo",
            username: "usuario.novo",
            email: "email@teste.com",
            password: "DesigN85!)"
        })

        expect(response.status).toBe(201)
    })

    test("ao tentar criar um usuário com o mesmo e-mail, deve retornar um erro 409", async () => {
        const response = await request(listenServer).post('/api/v1/authentication/create').send({
            name: "Usuário novo 2",
            username: "usuario.novo2",
            email: "email@teste.com",
            password: "PassW0rD$#"
        })

        expect(response.status).toBe(409)
        expect(response.body.message).toBe("ERR_CONFLICT")
    })

    test("ao tentar criar um usuário sem os dados completos, deve retornar um erro 400", async () => {
        const response = await request(listenServer).post('/api/v1/authentication/create').send({
            name: "Usuário novo 3",
            username: "usuario.novo3",
            email: "email.novo@teste.com",
        })

        expect(response.status).toBe(400)
        expect(response.body.message).toBe("ERR_BAD_REQUEST")
    })

    test("ao tentar requisitar um endpoint inexistente, deve retornar um erro 404", async () => {
        const response = await request(listenServer).post('/api/v1/authentication/create/1').send({
            name: "Usuário novo 3",
            username: "usuario.novo3",
            email: "usuario.novo3@teste.com",
            password: "PassW0rD$#"
        })

        expect(response.status).toBe(404)
    })

    test("deve retornar um token ao passar username e senha corretos para o endpoint de login", async () => {
        const response = await request(listenServer).post('/api/v1/authentication/login').send({
            username: "usuario.novo",
            password: "DesigN85!)"
        })

        expect(response.status).toBe(200)
        expect(response.body.token).toBeTruthy()
    })

    test("deve retornar um token ao passar email e senha corretos para o endpoint de login", async () => {
        const response = await request(listenServer).post('/api/v1/authentication/login').send({
            email: "email@teste.com",
            password: "DesigN85!)"
        })

        expect(response.status).toBe(200)
        expect(response.body.token).toBeTruthy()
    })

    test("deve retornar um erro 401 ao informar as credenciais erradas", async () => {
        const response = await request(listenServer).post('/api/v1/authentication/login').send({
            username: "usuarionovo",
            password: "DesigN85!"
        })

        expect(response.status).toBe(401)
        expect(response.body.message).toBe("ERR_UNAUTHORIZED")
    })

    test("deve retornar erro 400 ao não enviar todas as informações de login", async () => {
        const response = await request(listenServer).post('/api/v1/authentication/login').send({
            username: "usuario.novo",
        })

        expect(response.status).toBe(400)
        expect(response.body.message).toBe("ERR_BAD_REQUEST")
    })
})