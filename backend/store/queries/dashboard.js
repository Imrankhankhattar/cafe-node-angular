pCount = 
    `SELECT COUNT(*) as count FROM product`;
cCount =
    `SELECT COUNT(*) as count  FROM category`;
oCount =
    `SELECT COUNT(*)as count  FROM bill`;

module.exports = {
    productCount: pCount,
    categoryCount: cCount,
    billCount: oCount
}