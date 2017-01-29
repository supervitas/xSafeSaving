package DB

import com.google.gson.Gson
import com.google.gson.JsonArray
import com.google.gson.JsonObject
import com.mongodb.client.MongoCursor
import com.mongodb.client.model.Filters
import org.bson.Document
import java.io.File
import java.util.*

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

fun getUserFiles(username: String, skip: Int, tag: String? ): String {
    val gson = Gson()
    val jsonArray = JsonArray()

    val collection = Database.db.getCollection("files")
    val getUserFilesCursor: MongoCursor<Document>
    if (tag != null) {
        getUserFilesCursor = collection.find(Filters.and(
                Filters.eq("username", username), Filters.eq("tags", tag))
        ).skip(skip).limit(20).iterator()
    } else {
        getUserFilesCursor = collection.find(Filters.eq("username", username))
                .sort(Document("\$natural", -1)).skip(skip).limit(20).iterator()
    }
    getUserFilesCursor.use { getUserFilesCursor ->
        while (getUserFilesCursor.hasNext()) {
            val innerObject = JsonObject()
            val next = getUserFilesCursor.next()

            val path = next["path"].toString()
            val name = next["filename"].toString()
            val contentType = next["content-type"].toString()
            var tags = next["tags"]
            if (tags != null) {
                tags = tags as ArrayList<String>
                val tagsArray = JsonArray()
                for (tag in tags) {
                    tagsArray.add(tag)
                }
                innerObject.add("tags", tagsArray)
            }

            innerObject.addProperty("path", path)
            innerObject.addProperty("content-type",contentType)
            innerObject.addProperty("filename", name)

            jsonArray.add(innerObject)
        }
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