package DB

/**
 * Created by nikolaev on 29.08.16.
 */

import com.mongodb.MongoClient
import com.mongodb.client.model.Filters.and
import com.mongodb.client.model.Filters.eq
import org.bson.Document
import java.util.*

object Database {
    var db = MongoClient("localhost").getDatabase("xsafesaving")

    fun registerUser(username: String, password: String): String {
        val collection = db.getCollection("users")
        val getUser = collection.find(eq("username",username)).first()
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
        val getUser = collection.find(and(eq("username", username),eq("password", password))).first()
        if (getUser != null) {
            return "OK"
        } else {
            return "Wrong login or password"
        }
    }

    fun createFile(username: String, path: String, filename: String) {
        val collection = db.getCollection("files")
        val doc = Document("username", username).append("path", path).append("filename", filename)
        collection.insertOne(doc)

    }

    fun getUserFiles(username: String): HashMap<String, String> {
        val files = HashMap <String, String>()
        val collection = db.getCollection("files")
        val getUserFilesCursor = collection.find(eq("username", username)).iterator()
        try {
            while (getUserFilesCursor.hasNext()) {
                val next = getUserFilesCursor.next()
                val path = next["path"].toString()
                val name = next["filename"].toString()
                files.put(name, path)
            }
        } finally {
            getUserFilesCursor.close()
        }
        return files
    }

}