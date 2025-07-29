const fs = require('fs').promises;
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

const userRepository = {
  /**
   * Inicializar arquivo de usuários se não existir
   */
  async initialize() {
    try {
      await fs.access(DATA_DIR);
    } catch {
      await fs.mkdir(DATA_DIR, { recursive: true });
    }

    try {
      await fs.access(USERS_FILE);
    } catch {
      await fs.writeFile(USERS_FILE, JSON.stringify([], null, 2));
    }
  },

  /**
   * Ler todos os usuários do arquivo
   */
  async readUsers() {
    try {
      const data = await fs.readFile(USERS_FILE, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Erro ao ler arquivo de usuários:', error);
      return [];
    }
  },

  /**
   * Escrever usuários no arquivo
   */
  async writeUsers(users) {
    try {
      await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
    } catch (error) {
      console.error('Erro ao escrever arquivo de usuários:', error);
      throw new Error('Erro ao salvar dados');
    }
  },

  /**
   * Buscar usuário por email
   */
  async findByEmail(email) {
    await this.initialize();
    const users = await this.readUsers();
    return users.find(user => user.email === email) || null;
  },

  /**
   * Buscar usuário por ID
   */
  async findById(id) {
    await this.initialize();
    const users = await this.readUsers();
    return users.find(user => user.id === id) || null;
  },

  /**
   * Criar novo usuário
   */
  async create(user) {
    await this.initialize();
    const users = await this.readUsers();
    
    // Verificar se email já existe
    const existingUser = users.find(u => u.email === user.email);
    if (existingUser) {
      throw new Error('Usuário já existe');
    }

    users.push(user);
    await this.writeUsers(users);
    
    return user;
  },

  /**
   * Atualizar usuário
   */
  async update(updatedUser) {
    await this.initialize();
    const users = await this.readUsers();
    
    const index = users.findIndex(user => user.id === updatedUser.id);
    if (index === -1) {
      throw new Error('Usuário não encontrado');
    }

    users[index] = { ...users[index], ...updatedUser };
    await this.writeUsers(users);
    
    return users[index];
  },

  /**
   * Deletar usuário
   */
  async delete(id) {
    await this.initialize();
    const users = await this.readUsers();
    
    const filteredUsers = users.filter(user => user.id !== id);
    
    if (filteredUsers.length === users.length) {
      throw new Error('Usuário não encontrado');
    }

    await this.writeUsers(filteredUsers);
    
    return true;
  },

  /**
   * Listar todos os usuários (sem senhas)
   */
  async findAll() {
    await this.initialize();
    const users = await this.readUsers();
    
    return users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      isBlocked: user.isBlocked,
      loginAttempts: user.loginAttempts,
      createdAt: user.createdAt
    }));
  }
};

module.exports = userRepository; 