

const validate = (Schema) => async( req, res, next ) => {
    try {
        const paresBody = await Schema.parseAsync(req.body);
        req.body = paresBody;
        next()
    } catch (err) {
        const message = err.issues[0].message
        res.status(422).json({message:message})
    }
}

module.exports = validate;