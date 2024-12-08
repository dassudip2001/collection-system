import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { NextAuthOptions } from "next-auth"
import prisma from "../../../../config/prismaConfig"
import { compare } from "bcryptjs"

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null
                }
                try {
                    const user = await prisma.user.findUnique({
                        where: { email: credentials.email }
                    })
                    if (!user) {
                        return null
                    }
                    const passwordMatch = await compare(credentials.password, user.password)
                    if (!passwordMatch) {
                        return null
                    }
                    return {
                        id: user.id.toString(),
                        email: user.email,
                        name: user.name
                    }
                } catch (error) {
                    console.error(error)
                    return null
                }
                finally{
                    await prisma.$disconnect()
                }
            }
        })
    ],
    session:{
        strategy:"jwt"
    },
    secret:process.env.NEXTAUTH_SECRET,
    pages:{
        signIn:"/sign-in"
    }
}

const handler=NextAuth(authOptions)

export {handler as GET, handler as POST}
