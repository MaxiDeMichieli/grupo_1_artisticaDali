module.exports = (sequelize, dataTypes)=>{
    
    let alias = 'Subcategories';

    let cols = {
        id:{
            type:dataTypes.INTEGER(11),
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
        },
        nombre:{
            type:dataTypes.STRING(45),
            allowNull:false
        },
        categoria_id:{
            type:dataTypes.INTEGER(11),
            allowNull:false
        }
    }

    let config = {
        tableName: "subcategories",
        timestamps:false
    }

    const Subcategory = sequelize.define(alias, cols, config);
    
    Subcategory.associate = models =>{
        Subcategory.hasMany(models.Products, {
            as:'productos',
            foreignKey:'subcategoria_id'
        })
        Subcategory.belongsTo(models.Categories, {
            as:'categoria',
            foreignKey:'categoria_id'
        })
    }

    return Subcategory;
}