const { comparePassword } = require("../helpers/hashing");
const { generateToken } = require("../helpers/jwt");
const {
  User,
  Item,
  Category,
  Ingredient,
  sequelize,
} = require("../models/index");
class Controller {
  // HANDLE REGISTER
  static async register(req, res, next) {
    try {
      const { username, email, password, role, phoneNumber, address } =
        req.body;
      //   if (!username) throw { name: "eror username" };
      //   console.log(req.body, "ini req.bodynyaaaaa");
      const newUser = await User.create({
        username,
        email,
        password,
        role,
        phoneNumber,
        address,
      });

      res.status(201).json({
        id: newUser.id,
        username: newUser.username,
        role: newUser.role,
      });
    } catch (error) {
      next(error);
    }
  }

  // HANDLE LOGIN
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) throw { name: "Invalid Email/Password" };

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) throw { name: "Invalid Email/Password" };

      const isValidPassword = comparePassword(password, user.password);
      if (!isValidPassword) throw { name: "Invalid Email/Password" };

      // console.log(isValidPassword, "ini validasi passwordnya");
      const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      };

      // console.log(payload, "ini payload ");

      const token = generateToken(payload);
      console.log(token, "ini token nya");
      res.status(200).json({
        access_token: token,
        username: user.username,
        email: user.email,
        role: user.role,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // HANDLE READ ITEMS
  static async readItems(req, res, next) {
    const { categoryId } = req.query;
    let form = {};
    try {
      if (categoryId) {
        form = {
          include: [User, Category],
          where: {
            categoryId: +categoryId,
          },
        };
      } else {
        form = {
          include: [User, Category],
        };
      }
      const items = await Item.findAll(form);
      res.status(200).json(items);
    } catch (error) {
      next(error);
    }
  }

  // HANDLE READ CATEGORIES
  static async readCategories(req, res, next) {
    try {
      const categories = await Category.findAll();
      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  }

  //HANDLE ADD CATEGORY
  static async addCategories(req, res, next) {
    try {
      const { name } = req.body;
      const addCategories = await Category.create({ name });

      res.status(201).json({ addCategories });
    } catch (error) {
      next(error);
    }
  }
  //HANDLE DELETE CATEGORY
  static async deleteCategory(req, res, next) {
    try {
      const { id } = req.params;
      const deleteCategories = await Category.destroy({
        where: {
          id,
        },
      });

      res.status(201).json({ message: `id with id: ${id} was deleted` });
    } catch (error) {
      next(error);
    }
  }

  //HANDLE ADD ITEM
  static async addItems(req, res, next) {
    // console.log(req.body, "ini req.bodynya");
    const t = await sequelize.transaction();
    try {
      const {
        name,
        description,
        price,
        imgUrl,
        categoryId,
        ingredients = ["tepung", "meises", "cookies"],
      } = req.body;
      const { id: authorId } = req.user;

      const addItems = await Item.create(
        {
          name,
          description,
          price,
          imgUrl,
          categoryId: +categoryId,
          authorId: +authorId,
        },
        { transaction: t }
      );

      const payloadIngredients = ingredients.map((el) => {
        return {
          itemId: addItems.id,
          name: el,
        };
      });

      await Ingredient.bulkCreate(payloadIngredients, { transaction: t });

      await t.commit();

      //create table ingredient
      //bikin payload
      //bulk create
      //pakai transaksi

      res.status(201).json({ addItems });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  //HANDLE DELETE ITEMS
  static async deleteItems(req, res, next) {
    try {
      const { id } = req.params;
      const deleteItem = await Item.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        message: `item with id: ${id} was deleted`,
      });
    } catch (error) {
      next(error);
    }
  }

  //HANDLE EDIT ITEMS
  static async editItems(req, res, next) {
    try {
      const { id } = req.params;
      const { name, description, price, imgUrl, categoryId, ingredients } =
        req.body;
      console.log(ingredients, "ini ingredientsnya");
      const updatedItem = await Item.update(
        { name, description, price, imgUrl, categoryId },
        {
          where: {
            id,
          },
        }
      );

      const deleteIngredients = await Ingredient.destroy({
        where: {
          itemId: id,
        },
      });

      const payloadIngredients = ingredients.map((el) => {
        return {
          itemId: id,
          name: el,
        };
      });

      await Ingredient.bulkCreate(payloadIngredients);

      res.status(200).json({ updatedItem });
    } catch (error) {
      next(error);
    }
  }
  //HANDLE read DETAILS
  static async readItemsDetails(req, res, next) {
    try {
      const { id } = req.params;
      // const { name, description, price, imgUrl, categoryId } = req.body;
      const item = await Item.findByPk(id);
      const ingredients = await Ingredient.findAll({
        where: {
          itemId: id,
        },
      });

      console.log(ingredients);
      const payload = {
        ...item.dataValues,
        ingredients: ingredients,
      };
      console.log(payload, "<<< ini payloadnya");

      res.status(200).json(payload);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { Controller };
