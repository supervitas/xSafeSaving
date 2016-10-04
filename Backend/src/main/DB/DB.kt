package DB

/**
 * Created by nikolaev on 29.08.16.
 */

import com.google.gson.Gson
import com.google.gson.JsonArray
import com.google.gson.JsonObject
import com.mongodb.MongoClient
import com.mongodb.client.model.Filters.and
import com.mongodb.client.model.Filters.eq
import org.bson.Document
import java.io.File

object Database {
    var db = MongoClient("localhost").getDatabase("xsafesaving")

    fun registerUser(username: String, password: String): String {
        val collection = db.getCollection("users")
        val getUser = collection.find(eq("username", username)).first()
        if (getUser != null) {
            return "User already exists"
        } else {
            val doc = Document("username", username).append("password", password)
            collection.insertOne(doc)
            return "OK"
        }
    }

    fun loginUser(username: String, password: String): String {
        val collection = db.getCollection("users")
        val getUser = collection.find(and(eq("username", username), eq("password", password))).first()
        if (getUser != null) {
            return "OK"
        } else {
            return "Wrong login or password"
        }
    }

    fun createFile(username: String, path: String, filename: String, contentType: String) {
        val collection = db.getCollection("files")
        val file = collection.find(and(eq("filename", filename),eq("path", path))).first()
        if (file == null) {
            val doc = Document("username", username)
                    .append("path", path)
                    .append("filename", filename)
                    .append("content-type", contentType)
            collection.insertOne(doc)
        }
    }

    fun deleteFile(username: String, path: String) {
        val collection = db.getCollection("files")
        val fileFromDB = collection.findOneAndDelete(and(eq("username", username), eq("path", path)))
        if (fileFromDB != null) {
            val file = File(path)
            file.delete()
        }
    }


    fun getUserFiles(username: String, skip: Int ): String {
        val gson = Gson()
        val jsonArray = JsonArray()

        val collection = db.getCollection("files")
        val natural = "${'$'}natural"
        val getUserFilesCursor = collection.find(eq("username", username))
                .sort(Document("$natural", -1)).skip(skip).limit(20).iterator()
        try {
            while (getUserFilesCursor.hasNext()) {
                val innerObject = JsonObject()
                val next = getUserFilesCursor.next()
                val path = next["path"].toString()
                val name = next["filename"].toString()
                val contentType = next["content-type"].toString()

                innerObject.addProperty("path", path)
                innerObject.addProperty("content-type",contentType)
                innerObject.addProperty("filename", name)

                jsonArray.add(innerObject)
            }
        } finally {
            getUserFilesCursor.close()
        }
        return gson.toJson(jsonArray)
    }

    fun getCountOfFiles(username: String) : String {
        val gson = Gson()
        val jsonObject = JsonObject()
        val collection = db.getCollection("files")
        val getCount = collection.find(eq("username", username)).count()
        jsonObject.addProperty("count", getCount)
        return gson.toJson(jsonObject)
    }

}