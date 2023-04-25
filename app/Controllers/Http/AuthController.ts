import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import {schema, rules } from '@ioc:Adonis/Core/Validator'

export default class AuthController {
    async register({ request, response }: HttpContextContract){
        const userSchema = schema.create({
            email: schema.string([
                rules.email()
            ]),
            password: schema.string([
                rules.minLength(6),
                rules.confirmed("passwordConfirmation")
            ]),
            userType: schema.number()
        })
        const data = await request.validate({
            schema:userSchema,
            messages:{
                required: "{{ field }} is required",
                confirmed: "{{ field }} does not match"
            }
        })
        const user = await User.create({
            email: data.email,
            password: data.password,
            role_id: data.userType
        })
        return response.status(201).json({'msg':'Signup Successfull'})
    } 
    async login({ request, response, auth}: HttpContextContract){
        const userSchema = schema.create({
            email: schema.string(),
            password: schema.string()
        })
        const data = await request.validate({
            schema:userSchema,
            messages:{
                required: "{{ field }} is required",
                confirmed: "{{ field }} does not match"
            }
        })
      try{
          await auth.use('api').attempt(data.email, data.password);
      } catch{
        return response.status(400).json({
            'status':400,
            'msg': 'Invalid credentials'
        })
      }
    }  
    
    async logout({auth}: HttpContextContract){
        await auth.logout()
    }
}
