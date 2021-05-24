const dbSanitizer = (dbObject) => {
  dbObject.activity = dbObject.activity.replace(/'/g, "''");
};

module.exports = {
  dbSanitizer,
};
