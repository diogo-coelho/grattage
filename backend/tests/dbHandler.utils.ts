import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server"

const mongoServer = new MongoMemoryServer()

export async function dbConnect () {
    await mongoServer.start()
    const uri = await mongoServer.getUri()
    await mongoose.connect(uri).then(() => console.log('Connected'))
}

export async function dbDisconnect () {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongoServer.stop()
}