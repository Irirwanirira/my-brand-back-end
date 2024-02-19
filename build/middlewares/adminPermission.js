import pkg from "http-status";
const { UNAUTHORIZED } = pkg;
export default function permit(...allowed) {
    const isAllowed = (role) => allowed.indexOf(role) > -1;
    return (req, res, next) => {
        if (req.body) {
            if (req.body.role === "admin") {
                return next();
            }
            if (isAllowed(req.body.role)) {
                return next();
            }
        }
        return res.status(UNAUTHORIZED).json({
            status: "fail",
            message: "Only admin can access this route",
        });
    };
}
