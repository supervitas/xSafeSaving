package DB

import com.google.gson.Gson
import com.google.gson.JsonArray
import com.google.gson.JsonObject
import com.mongodb.client.model.Filters
import org.bson.Document
import java.io.File

/**
 * Created by nikolaev on 29.01.17.
 */

fun createFile(username: String, path: String, filename: String, contentType: String) {
    val collection = Database.db.getCollection("files")
    val file = collection.find(Filters.and(Filters.eq("filename", filename), Filters.eq("path", path))).first()
    if (file == null) {
        val doc = Document("username", username)
                .append("path", path)
                .append("filename", filename)
                .append("content-type", contentType)
        collection.insertOne(doc)
    }
}

fun deleteFile(username: String, path: String) {
    val collection = Database.db.getCollection("files")
    val fileFromDB = collection.findOneAndDelete(Filters.and(Filters.eq("username", username), Filters.eq("path", path)))
    if (fileFromDB != null) {
        val file = File(path)
        file.delete()
    }
}

fun getUserFiles(username: String, skip: Int ): String {
    val gson = Gson()
    val jsonArray = JsonArray()

    val collection = Database.db.getCollection("files")
    val natural = "${'$'}natural"
    val getUserFilesCursor = collection.find(Filters.eq("username", username))
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
    val collection = Database.db.getCollection("files")
    val getCount = collection.find(Filters.eq("username", username)).count()
    jsonObject.addProperty("count", getCount)
    return gson.toJson(jsonObject)
}