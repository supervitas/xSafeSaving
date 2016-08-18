import com.google.gson.Gson
import com.github.salomonbrys.kotson.*
import com.google.gson.JsonObject
import spark.Request
import spark.Response

fun registerUser(req: Request, res: Response): JsonObject {
    val gson = Gson()
    try {
        val list1 = gson.fromJson<Map<String, String>>(req.body())
        res.status(200)
        val obj: JsonObject = jsonObject(
                "property" to list1["login"]
        )
        return obj
    } catch (e: com.google.gson.JsonSyntaxException) {
        res.status(400)
        val obj: JsonObject = jsonObject(
                "error" to "Bad JSON"
        )
        return obj
    }

}