module.exports = function(sequelize, dataTypes){
    let alias = 'Products';

    let cols= {
        id:{
            type:dataTypes.INTEGER(11),
            primaryKey:true,
            autonIncrement:true,
            allowNull:false
        },
        nombre:{
            type:dataTypes.STRING(45),
            allowNull:false
        },
        precio:{
            type:dataTypes.INTEGER(11),
            allowNull:false
        },
        descuento:{
            type:dataTypes.INTEGER(11)
        },
        descripcion:{
            type:dataTypes.STRING(300)
        },
        subcategoria_id:{
            type:dataTypes.INTEGER(11),
            allowNull:false
        }
    }

    let config = {
        tableName: "products",
        timestamps:false
    }

    const Product = sequelize.define(alias, cols, config);

    Product.associate = models =>{
        Product.belongsTo(models.Subcategories,{
            as:'subcategoria',
            foreignKey:'subcategoria_id'
        })
    }

    return Product;
}