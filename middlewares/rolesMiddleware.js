//! Jab function ke parameter me ... use karte hain, iska matlab hai:
//! “jitne bhi extra arguments aayenge, sab ek array me collect ho jaayenge.”

export const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).json({
                message : "Access Denied By Roles"
            })
        }
        next()
    }
}