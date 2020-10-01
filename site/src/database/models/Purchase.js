module.exports = (sequelize, dataTypes) =>{

    let alias = 'Purchases';

    let cols = {
        id:{
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false    
        },
        usuario_id:{
            type: dataTypes.INTEGER(11),
            allowNull:false
        }
    }

    let config = {
        tableName: 'purchases'
    }

    const Purchase = sequelize.define(alias, cols, config);

    Purchase.associate = (modelos) => {
        Purchase.belongsTo(modelos.Users, {
            as: 'usuario',
            foreignKey: 'usuario_id'
        });
        Purchase.belongsToMany(modelos.Products, {
            as: 'productos',
            through: 'purchase_product',
            foreignKey: 'compra_id',
            otherKey: 'producto_id',
            timestamps: false
        })
    }

    return Purchase

}