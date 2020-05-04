module.exports = function (sequelize, DataTypes) {
  var Burger = sequelize.define(
    "Burgers",
    {
      burger_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 100],
        }
      },
      devoured: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      }
    }
  );

  Burger.associate = function(models) {
    Burger.belongsTo(models.Customer, {
      onDelete: "Cascade",
      foreignKey: {
        allowNull: true
      }
    });
  };

  return Burger;
};
