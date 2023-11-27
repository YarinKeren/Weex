export default {
  dbURL:
    process.env.MONGO_URL ||
    'mongodb+srv://yarin:yarin551@weex.0slqmf9.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp',
  dbName: process.env.DB_NAME || 'WAP_DB',
}
