import Sequelize from 'sequelize';

export const stringTypeGenerator = (isUnique: boolean, allowNull: boolean) => ({
  type: Sequelize.STRING,
  unique: isUnique,
  allowNull
});

export const booleanTypeGenerator = (isUnique: boolean, allowNull: boolean) => ({
  type: Sequelize.BOOLEAN,
  unique: isUnique,
  allowNull
});
