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

    return PurchaseProduct

}