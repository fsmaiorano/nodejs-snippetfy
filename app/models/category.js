module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    title: DataTypes.STRING,
  });

  Category.associate = (models) => {
    Category.belongsTo(models.User); // Import UserId for Category table
    Category.hasMany(models.Snippet); // One category has has many Snippets
  };

  return Category;
};
