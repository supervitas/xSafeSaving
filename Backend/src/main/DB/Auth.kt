package DB;

import DB.Database.db
import com.mongodb.client.model.Filters.and
import com.mongodb.client.model.Filters.eq
import org.bson.Document

/**
 * Created by nikolaev on 29.01.17.
 */

fun registerUser(username: String, password: String): String {
    val collection = db.getCollection("users")
    val getUser = collection.find(eq("username", username)).first()
    return if (getUser != null) {
        "User already exists"
    } else {
        val doc = Document("username", username).append("password", password)
        collection.insertOne(doc)
        "OK"
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

