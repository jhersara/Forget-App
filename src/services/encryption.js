// src/services/encryption.js

import bcrypt from 'bcryptjs';

// Número de rondas de encriptación (puedes ajustarlo según tus necesidades)
const saltRounds = 10;

/**
 * Encripta la contraseña utilizando bcrypt.
 * @param {string} password - La contraseña que se quiere encriptar.
 * @returns {Promise<string>} - Contraseña encriptada.
 */
export const encryptPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    console.error('Error encripting password:', error);
    throw new Error('Encription failed');
  }
};

/**
 * Desencripta y compara la contraseña ingresada con la almacenada.
 * @param {string} password - La contraseña ingresada por el usuario.
 * @param {string} hashedPassword - La contraseña encriptada almacenada.
 * @returns {Promise<boolean>} - Verdadero si las contraseñas coinciden, falso de lo contrario.
 */
export const decryptPassword = async (password, hashedPassword) => {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    console.error('Error decrypting password:', error);
    throw new Error('Decryption failed');
  }
};
