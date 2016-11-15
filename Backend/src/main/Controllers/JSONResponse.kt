package Controllers

import com.google.gson.Gson
import com.google.gson.JsonObject

/**
 * Created by nikolaev on 04.10.16.
 */
object JSONResponse {

    fun badJson(): String {
        val json = makeCustomJsonResponse("message", "Bad JSON")
        return json
    }

    fun authNeeded(): String {
        val json = makeCustomJsonResponse("status", "You need auth to do this")
        return json
    }
    fun makeCustomJsonResponse(keyMessage: String, message: String ): String {
        val gson = Gson()
        val json = JsonObject()
        json.addProperty(keyMessage, message)
        return gson.toJson(json)
    }

}