import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  getAll() {
    return fighterRepository.getAll();
  }

  getById(id) {
    return fighterRepository.getOne({ id });
  }

  create(fighterData) {
    return fighterRepository.create(fighterData);
  }

  update(id, updateData) {
    return fighterRepository.update(id, updateData);
  }

  delete(id) {
    return fighterRepository.delete(id);
  }
}

const fighterService = new FighterService();

export { fighterService };

