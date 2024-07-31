import NextAuth from 'next-auth';
import Credentials from "next-auth/providers/credentials";
import {sql} from '@vercel/postgres';
import {compare} from 'bcrypt';

const handler = NextAuth({
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/login'
    },
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials) {
               
                const response = await sql`
                SELECT * FROM users WHERE email = (${credentials?.email})
                `;
                const user = response.rows[0];

                const passwordCorrect = await compare(credentials?.password || ' ', user.password);

                console.log({passwordCorrect});

                if(passwordCorrect) {
                    return {
                        id: user.id,
                        email: user.email
                    }
                }

                 // console.log({credentials});
                return null;
            }
        })
    ]
});

export {handler as GET, handler as POST};