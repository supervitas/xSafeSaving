package DB

/**
 * Created by nikolaev on 29.08.16.
 */

import com.mongodb.MongoClient
import com.mongodb.client.MongoDatabase

internal object Database {
    val db: MongoDatabase = MongoClient("localhost").getDatabase("xsafesaving")
}