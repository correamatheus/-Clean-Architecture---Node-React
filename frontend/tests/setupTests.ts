import '@testing-library/jest-dom';
import 'jest-environment-jsdom';

jest.mock('react-icons/fa6', () => ({
  FaFolderTree: () => 'FaFolderTree',
  FaPenToSquare: () => 'FaPenToSquare',
  FaTrashCan: () => 'FaTrashCan'
}));