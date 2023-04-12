import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const authOptions = {
    session : {
        stratagy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {},
            authorize(credentials, req) {
                const { email, password } = credentials
                if (email !== 'fe@email.com' || password !== '123') {
                    throw new Error('Invalid email or password')
                }

                return { id: '12', name: 'fe', email: 'fe@email.com' }
            },
        }),
    ],
    pages: {
        signIn: '/auth/SignIn',
    },
};


export default NextAuth(authOptions);
