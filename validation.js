

validateEmail = (req, res, next) => {
    var email = req.body.email;
    console.log(email);
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (regex.test(email)) {
        next();
    }
    else {
        var error = new Error('Please input proper email');
        error.status = 400
        next(error);
    }
};
validateName = (req, res, next) => {
    var name = req.body.name;
    var regex = /^[a-zA-Z]+$/;
    if (regex.test(name)) {
        next();
    }
    else {
        var error = new Error('Please input proper  Name --> LETTERS ONLY !!!');
        error.status = 400;
        next(error);
    }
}
validatePassword = (req, res, next) => {
    var password = req.body.password;
    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    if (regex.test(password)) {
        next();
    }
    else {
        var error = new Error(' Please enter strong passoword ');
        error.status = 400;
        next(error);
    }
}
module.exports = { validateEmail, validateName, validatePassword }