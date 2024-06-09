import { userRepository } from "../repositories/userRepository.js";

class UserService {
  async getUsers() {
    return userRepository.getAll();
  }

  async getUserById(id) {
    return userRepository.getOne({ id });
  }

  async createUser(data) {
    const existingUser = await userRepository.getOne({
      $or: [
        { email: data.email.toLowerCase() },
        { phoneNumber: data.phoneNumber }
      ]
    });

    if (existingUser) {
      throw new Error('User with this email or phone number already exists');
    }

    return userRepository.create(data);
  }

  async updateUser(id, data) {
    const user = await userRepository.getOne({ id });
    if (!user) {
      throw new Error("User not found");
    }

    return userRepository.update(id, data);
  }

  async deleteUser(id) {
    const user = await userRepository.getOne({ id });
    if (!user) {
      throw new Error("User not found");
    }
    return userRepository.delete(id);
  }

  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
}

const userService = new UserService();

export { userService };

