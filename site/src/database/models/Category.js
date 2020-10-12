module.exports = (sequelize, dataTypes) => {

    let alias = 'Categories';

    let cols = {
        id:{
            type: dataTypes.INTEGER(11),
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
        },
        nombre:{
            type:dataTypes.STRING(45),
            allowNull:false
        }, 
        banner:{
            type:dataTypes.STRING(45)
        }
    } 

    let config = {
        tableName:'categories',
        timestamps:false
    }

    const Category = sequelize.define(alias, cols, config);

        Category.associate = models => {
            Category.hasMany(models.Subcategories,{
                as:'subcategorias',
                foreignKey:'categoria_id'
            })
        }

    return Category;
}