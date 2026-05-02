import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import {checkout, polar, portal} from '@polar-sh/better-auth'
import prisma from "./db";
import { polarClient } from "./polar";


export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  emailAndPassword:{
    enabled: true,
    autoSignIn: true
  },
  plugins:[
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          products:[
            {
              productId: "d0e57017-94b4-4e5f-83d5-77603504d87a",
              slug: "pro"
            }
          ],
          successUrl: process.env.POLAR_SUCCESS_URL,
          authenticatedUsersOnly: true
        }),
        portal()
      ]
    })
  ]
});