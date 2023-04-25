import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"
import {schema} from "@ioc:Adonis/Core/Validator"
import Job from "App/Models/Job";

export default class JobController {
    async postJob({ request, response, auth }: HttpContextContract){
        const jobSchema = schema.create({
            phoneNumber: schema.number(),
            postCode: schema.string(),
            state: schema.string(),
            clothingType: schema.string(),
            image: schema.string(),
            description: schema.string(),
            budget: schema.number()
        })
        const data = await request.validate({schema: jobSchema});
        const job = await Job.create(data);
        return response.json({"msg": "Job created successfully"})
    }
}
