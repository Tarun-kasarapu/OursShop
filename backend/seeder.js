import main from "./connectdb.js";
import products  from "./data/products.js";
import users from "./data/users.js";
import Product from "./schema/ProductModel.js";
import User from "./schema/userModel.js";

main();

const importData = async () => {
    try {
     
      
      await Product.deleteMany()
      await User.deleteMany()
  
      const createdUsers = await User.insertMany(users);
     
  
      const adminUser = createdUsers[0]._id;
  
      const sampleProducts = products.map((product) => {
        return { ...product, user: adminUser }
      })
  
      await Product.insertMany(sampleProducts)
  
      console.log('Data Imported!')
      process.exit()
    } catch (error) {
      console.error(error);
      process.exit(1)
    }
  }

  importData();

