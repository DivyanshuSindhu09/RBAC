import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    try {
        let token;

        // Prefer header first
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        }

        // If not found in header, check cookies
        if (!token && req.cookies?.token) {
            token = req.cookies.token;
        }

        // No token at all
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Access Denied. No token provided."
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log(decoded)
        // {
        // id: '68b02eabce26c3d58192bb6b',
        // role: 'admin',
        // email: 'divyanshu.sindhu@gmail.com',
        // iat: 1756399520,
        // exp: 1756403120
        // }

        next();
    } catch (error) {
        console.error(error);
        return res.status(403).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};
