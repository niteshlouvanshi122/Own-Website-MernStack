const {z} = require("zod");

const loginSchema = z.object({
    email : z
    .string({required_error:"Email is Required"})
    .trim()
    .email({message:"Invalid Email"})
    .min(3,{message:"Email Must Be Atls 3 chars"})
    .max(250,{message:"Email maximum 250 chars"}),
    password : z
    .string({required_error:"Password is Required"})
    .min(6,{message:"PAssword Must Be Atls 6 chars"})
    .max(1000,{message:"Password maximum 250 chars"}),
})

const signUpSchema = loginSchema.extend({
    username : z
    .string({required_error:"Name is Required"})
    .trim()
    .min(3,{message:"Name Must Be Atls 3 chars"})
    .max(250,{message:"Name maximum 250 chars"}),

    email : z
    .string({required_error:"Email is Required"})
    .trim()
    .email({message:"Invalid Email"})
    .min(3,{message:"Email Must Be Atls 3 chars"})
    .max(250,{message:"Email maximum 250 chars"}),

    phone : z
    .string({required_error:"Phone Number is Required"})
    .trim()
    .min(10,{message:"Phone number must be at lease 10 characters"})
    .max(11,{message:"Phone number must not be more than 11 characters"}),

    password : z
    .string({required_error:"Password is Required"})
    .min(6,{message:"PAssword Must Be Atls 6 chars"})
    .max(1000,{message:"Password maximum 250 chars"}),

})

module.exports = { signUpSchema, loginSchema };