import '@testing-library/jest-dom';
import 'jest-environment-jsdom';
const { TextEncoder, TextDecoder } = require('util');

jest.mock('react-icons/fa6', () => ({
  FaFolderTree: () => 'FaFolderTree',
  FaPenToSquare: () => 'FaPenToSquare',
  FaTrashCan: () => 'FaTrashCan'
}));

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;