import DB.Database.registerUser
import com.github.salomonbrys.kotson.fromJson
import com.github.salomonbrys.kotson.jsonObject
import com.google.gson.Gson
import com.google.gson.JsonObject
import spark.Request
import spark.Response

fun registerUser(req: Request, res: Response): JsonObject {
    val gson = Gson()
    val obj: JsonObject
    val list: Map<String, String>

    res.status(200)
    try {
        list = gson.fromJson<Map<String, String>>( req.body() )
    } catch (e: com.google.gson.JsonSyntaxException) {
        res.status(400)
         obj = jsonObject(
            "error" to "Bad JSON"
        )
        return obj
    }
    val username: String? = list["username"]
    val password: String? = list["password"]
    if (username != null && password != null) {
        val result = registerUser(username, password)

        if (result == "OK") {
            obj = jsonObject(
                "status" to result
            )
        } else {
            res.status(403)
            obj = jsonObject(
                "status" to result
            )
        }

    } else {
        res.status(400)
        obj = jsonObject(
            "error" to "Bad JSON"
        )
    }

    return obj
}