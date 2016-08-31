package DB

/**
 * Created by nikolaev on 29.08.16.
 */

import com.mongodb.MongoClient
import com.mongodb.client.model.Filters.and
import com.mongodb.client.model.Filters.eq
import org.bson.Document

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

}