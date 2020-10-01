module.exports = (sequelize, dataTypes)=>{
    let alias = 'Product_images'

    let cols = {
        id:{
            type:dataTypes.INTEGER(11),
            primaryKey:true,
            autoIncrement:true,
            allowNull:false
        },
        imagen:{
            type:dataTypes.STRING(45),
            allowNull:false
        },
        producto_id:{
            type:dataTypes.INTEGER(11),
            allowNull:false
        }
    }
    
    let  config = {
        tableName:'product_images',
        timestamps:false
    }

    const Product_image = sequelize.define(alias, cols, config);

    Product_image.associate = models => {
        Product_image.belongsTo(models.Products, {
            as:'imagenes',
            foreignKey:'producto_id'
        })        
    }

    return Product_image;
}