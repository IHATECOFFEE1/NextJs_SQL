import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const authOptions = {
    session : {
        stratagy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {},
            async authorize(credentials, req) {
                const { email, password } = credentials
                if (!email  || !password) {
                    throw new Error('Invalid email or password')
                }
                
                const user = await prisma.user.findUnique({
                    where: {
                        email: email,
                    },
                });
                
                if (!user) {
                    throw new Error('Invalid email or password')
                }

                if (user.password !== password) {
                    throw new Error('Invalid email or password')
                }

                return { ...user };
            },
        }),
    ],
    pages: {
        signIn: '/auth/SignIn',
    },
    callbacks: {
        jwt: ({ token, user }) => {
            if (user) {
            
            return {
                ...token,
                type: user.type,
                id: user.id,
                rso: user.rso,
            };
            }
            return token;
        },
        session: ({ session, token }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    type: token.type,
                    id: token.id,
                    rso: token.rso,
                },
            };
        },
    },


};


export default NextAuth(authOptions);
