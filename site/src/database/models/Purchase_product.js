module.exports = (sequelize, dataTypes) =>{

    let alias = 'PurchaseProduct';

    let cols = {
        id:{
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false    
        },
        compra_id:{
            type: dataTypes.INTEGER(11),
            allowNull:false
        },
        producto_id:{
            type: dataTypes.INTEGER(11),
            allowNull:false
        }
    }

    let config = {
        tableName: 'purchase_product'
    }

    const PurchaseProduct = sequelize.define(alias, cols, config);

    PurchaseProduct.associate = (modelos) => {
        PurchaseProduct.belongsTo(modelos.Purchases, {
            as: 'compra',
            foreignKey: 'compra_id'
        });
        PurchaseProduct.belongsTo(modelos.Products, {
            as: 'producto',
            foreignKey: 'producto_id'
        })
    }

    return PurchaseProduct

}