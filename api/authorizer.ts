import { CognitoJwtVerifier } from "aws-jwt-verify";

export const handler = async (event) => {
  try {
    const verifier = CognitoJwtVerifier.create({
      userPoolId: process.env.COGNITO_USER_POOL_ID,
      tokenUse: "access",
      clientId: process.env.COGNITO_CLIENT_ID,
    });

    const { headers } = event;
    const { authorization, Authorization } = headers;
    const accessToken = Authorization || authorization;
    const payload = await verifier.verify(accessToken);
    //console.info("Protected operation authorized", payload);
    return { isAuthorized: true };
  } catch (error) {
    console.error("Token validation error", error);
    return { isAuthorized: false };
  }
};
