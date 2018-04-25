const { User } = require('../models');
const bcrypt = require('bcryptjs');

module.exports = {
  signin(req, res) {
    return res.render('auth/signin');
  },
  signup(req, res) {
    return res.render('auth/signup');
  },
  async register(req, res) {
    const { email } = req.body;
    if (await User.findOne({ where: { email } })) {
      return res.redirect('back');
    }

    const password = await bcrypt.hash(req.body.password, 5);

    // { name, email, password, password}
    await User.create({ ...req.body, password });
    return res.redirect('/');
  },
};
