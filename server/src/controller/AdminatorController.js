class AdminatorController {
  async index(req, res) {
    // try {
    //   const category = await db.Categories.findAll({});
    res.render("index", {
      // category,
    });
    // } catch (error) {
    //   next(error);
    // }
  }
  dashboard(req, res) {
    res.render("dashboard");
  }
  productmanament(req, res) {
    res.render("productmanament");
  }
}
module.exports = new AdminatorController();
