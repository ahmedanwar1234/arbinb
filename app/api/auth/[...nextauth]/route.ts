import {PrismaAdapter}from '@next-auth/prisma-adapter'
import NextAuth,{AuthOptions}from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CredintioalProvider from 'next-auth/providers/credentials'
import prisma from '@/app/libs/prismadb'
import bcrypt from 'bcrypt'
export const authOptions:AuthOptions={
adapter:PrismaAdapter(prisma),
providers:[
    GithubProvider({
        clientId:process.env.GITHUB_ID as string,
        clientSecret:process.env.GITHUB_SECRET as string
    }),GoogleProvider({
        clientId:process.env.GOOGLE_CLIENT_ID as string,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET as string
    }),CredintioalProvider({
        name:'credintials',
        credentials:{
            email:{label:'email',type:'text'},
            password:{label:'password',type:'password'}
        },
        async authorize(credintials){
            if(!credintials?.email || !credintials?.password){
                throw new Error('Invalid creditials')
            }

            const user=await prisma.user.findUnique({
                where:{
                    email:credintials.email
                }
            })
if(!user || !user?.hashedPassword){
    throw new Error('Invalid creditials')
}

const isCorrectPassword=await bcrypt.compare(credintials.password,user.hashedPassword)

if(!isCorrectPassword){
    throw new Error('Invalid credentials')
}

return user;

        }



    })

],
pages:{
    signIn:'/'
},
debug:process.env.NODE_ENV==='development',
session:{
    strategy:'jwt'
},
secret:process.env.NEXTAUT_SECRET,

}


const handler= NextAuth(authOptions)

export {handler as GET,handler as POST}