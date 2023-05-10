export const sendToken = (res, user, message, statusCode = 200) =>{
    const token = user.getJWTToken();

    const options = {
        expires:new Date(Date.now()+2*24*60*60*1000),
        httpOnly:true,
        // sameSite:true,
        // secure:true
    }

    res.status(statusCode).cookie("token", token, options).json({
        success:true,
        message,
        user
    })
}