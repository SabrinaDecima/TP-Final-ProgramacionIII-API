export const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.user.role;

        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({
                message: `Acceso denegado. Se requiere uno de los siguientes roles: ${allowedRoles.join(', ')}`,
            });
        }

        next();
    };
};