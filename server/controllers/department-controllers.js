const Department = require('../db/models/department-schema');

module.exports.getDepartment = async (req, res) => {
  try {
    const dbResponse = await Department.find();
    res.status(200).json(dbResponse);
  } catch (e) {
    res.status(500).json({ message: e.message, error: true });
  }
};

module.exports.postDepartment = async (req, res) => {
  try {
    const { body } = req;
    const dbResponse = await Department.create(body);
    res
      .status(200)
      .json({ message: 'Department added successfully', error: false });
  } catch (e) {
    res.status(500).json({ message: e.message, error: true });
  }
};

module.exports.getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const department = await Department.findById(id);
    return res.status(200).json(department);
  } catch (e) {
    return res.status(500).json({ message: e.message, error: true });
  }
};

module.exports.deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findByIdAndDelete(id);
    return res.status(200).json({
      message: 'Department deleted successfully',
      error: false,
      success: true,
    });
  } catch (e) {
    return res.status(500).json({ message: e.message, error: true });
  }
};

module.exports.updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const department = await Department.findByIdAndUpdate(id, body);
    return res.status(200).json({
      message: 'Department updated successfully',
      error: false,
      success: true,
    });
  } catch (e) {
    return res.status(500).json({ message: e.message, error: true });
  }
};
