import jwt, { JwtPayload } from "jsonwebtoken"

export default {

    decryptdata: (data: string) => {
        try {
            const secretKey = process.env.JWT_SECRETKEY || "";

            const decodedToken = jwt.verify(data, secretKey) as JwtPayload;

            return decodedToken;
        } catch (error) {
            console.error("Error decrypting data:", error);
            throw new Error((error as Error).message);
        }
    }
};
