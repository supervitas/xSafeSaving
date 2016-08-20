import com.github.salomonbrys.kotson.fromJson
import com.github.salomonbrys.kotson.jsonObject
import com.google.gson.Gson
import com.google.gson.JsonObject
import spark.Request
import spark.Response

fun registerUser(req: Request, res: Response): JsonObject {
    val gson = Gson()
    val obj: JsonObject
    try {
        val list1 = gson.fromJson<Map<String, String>>(req.body())
        res.status(200)
        obj = jsonObject(
                "property" to list1["login"]
        )

    } catch (e: com.google.gson.JsonSyntaxException) {
        res.status(400)
         obj = jsonObject(
                "error" to "Bad JSON"
        )
    }
    return obj

}