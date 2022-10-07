class AdminatorController {
    index(req, res) {
        res.render('index');
    }
    dashboard(req, res) {
        res.render('dashboard');
    }
    productmanament(req, res) {
        res.render('productmanament');
    }

}
module.exports = new AdminatorController;