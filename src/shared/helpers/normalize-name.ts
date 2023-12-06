const normalizeFileName = (fileName) => {
  fileName = fileName.replace(/\s+/g, '');
  fileName = fileName.replace(/[^\w.-]/g, '');
  fileName = fileName.toLocaleLowerCase();

  return fileName;
};

export default normalizeFileName;
