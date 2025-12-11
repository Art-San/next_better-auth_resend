import { phoneNumberClient } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient({
  plugins: [phoneNumberClient()]
})

// import { createAuthClient } from "better-auth/react";

// export const authClient = createAuthClient({
//   baseURL: "http://localhost:3000",
// });
