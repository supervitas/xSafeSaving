package Controllers

import DB.loginUser
import DB.registerUser
import com.github.salomonbrys.kotson.fromJson
import com.github.salomonbrys.kotson.jsonObject
import com.google.gson.Gson
import com.google.gson.JsonObject
import spark.Request
import spark.Response

fun AuthUser(req: Request, res: Response): JsonObject {
    val gson = Gson()
    var obj: JsonObject
    val list: Map<String, String>
    res.status(200)

    obj = jsonObject (
            "status" to "OK"
    )
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
        when( req.requestMethod() ) {
             in "PUT" -> {
                val result = registerUser(username, password)

                if (result == "OK") {
                    req.session().attribute("user", username)
                    obj = jsonObject(
                            "status" to result,
                            "username" to username
                    )
                } else {
                    res.status(403)
                    obj = jsonObject(
                            "status" to result
                    )
                }
            }
            in "POST" -> {
                val result = loginUser(username, password)
                if (result == "OK") {
                    req.session().attribute("user", username)
                    obj = jsonObject(
                            "status" to result,
                            "username" to username
                    )
                } else {
                    res.status(403)
                    obj = jsonObject(
                            "status" to result
                    )
                }
            }
        }
    } else {
        res.status(400)
        obj = jsonObject(
            "error" to "Bad JSON"
        )
    }

    return obj
}
fun logout(req: Request, res: Response): JsonObject {
    val obj: JsonObject
    res.status(200)
    obj = jsonObject (
            "status" to "OK"
    )
    req.session().removeAttribute("user")
    return obj
}

fun checkUserLoginStatus(req: Request, res: Response): JsonObject {
    val obj: JsonObject
    res.status(200)
    val username : String? = req.session().attribute("user")
    if(username is String) {
        obj = jsonObject (
                "username" to username
        )
    } else {
        obj = jsonObject (
                "username" to ""
        )
    }

    return obj
}
