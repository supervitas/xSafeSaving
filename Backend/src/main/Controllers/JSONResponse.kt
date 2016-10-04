package Controllers

import com.google.gson.Gson
import com.google.gson.JsonObject

/**
 * Created by nikolaev on 04.10.16.
 */
object JSONResponse {

    fun badJson(): String {
        val gson = Gson()
        val json = JsonObject()
        json.addProperty("message", "Bad JSON")
        return gson.toJson(json)
    }

    fun authNeed(): String {
        val gson = Gson()
        val json = JsonObject()
        json.addProperty("status", "You need auth to do this")
        return gson.toJson(json)
    }

}