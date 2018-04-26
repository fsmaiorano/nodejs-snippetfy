module.exports = (sequelize, DataTypes) => {
  const Snippet = sequelize.define('Snippet', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
  });

  Snippet.associate = (models) => {
    Snippet.belongsTo(models.Category); // Import CategoryId for Snippet table
  };

  return Snippet;
};
