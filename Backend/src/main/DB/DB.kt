package DB

/**
 * Created by nikolaev on 29.08.16.
 */

import com.mongodb.MongoClient
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

}