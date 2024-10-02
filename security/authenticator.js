export default function authenticator(req, res) {
    const user = req.body.user;
    const password = req.body.password;

    if (user == "ADM" && password == "1234") {
        req.session.authenticated = true;
        res.redirect("http://localhost:3000/more-details-classic-music-concert.html");
    }
    else{
        res.write('<html>');
        res.write('<head>');
        res.write('<title>Falha no login</title>');
        res.write('<meta charset="utf-8">');
        res.write('</head>');
        res.write('<body>');
        res.write('<p>Usuário ou senha inválidos</p>');
        res.write('<a style="border: 1px solid #000; background-color: lightgray; text-decoration: none; color: black;" href="/login.html">Voltar para tela de login</a>');
        res.write('</body>');
        res.write('</html>');
        res.end();
    }
}

export function verifyAuthtentication (req, res, next) {
    if(req.session.authenticated != undefined && req.session.authenticated) {
        next();
    }
    else {
        res.redirect("/login.html");
    }
}

export function logout(req, res){
    req.session.authenticated = undefined;
    res.redirect('/home-page.html');
}