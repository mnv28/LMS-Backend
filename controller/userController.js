const jwt = require("jsonwebtoken");
const userModel = require("../model/user");


//create token structure
const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.JWT_SECRET_KEY, { expiresIn: "24h" });
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.login(email, password);

    //create token
    const token = createToken(user._id);
    const _id = user._id;
    const name = user.name;
    const avatar = user.avatar;
    const role = user.role;
    res.status(200).json({ name, avatar, _id, email, token, role });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//signup user
const signUpUser = async (req, res) => {
  const { name, email, password,mobile } = req.body;

  try {
    const user = await userModel.signup(name, email, password,mobile);

    //create token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).send( error.message);
  }
};

const studentList =async(req,res)=>{
  try {
    const user = await userModel.find().select("-password")
    res.status(200).send({users: user})
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
}

const deleteUser=async(req,res)=>{
  try {
    const { id } = req.params;
    const user = await userModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(400).json("User not found");
    }
    res.status(200).json("User deleted successfully");
  
  } catch (error) {
    res.status(400).send(error.message)
  }
}



module.exports = {
  loginUser,
  signUpUser,
  studentList,
  deleteUser
};
